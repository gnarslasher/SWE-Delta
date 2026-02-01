'use strict';

// SNOTEL data (station metadata) historically came from `snotel_data.js` as a
// single `SNOTEL` object keyed by station triplet. Example:
// SNOTEL['916:MT:SNTL'] -> { name: 'Albro Lake', lat: 45.59723, lon: -111.95902 }
// Newer build/exports use `snotel_data_all.js` which defines `SNOTEL_ALL`.
// For compatibility create a `window.SNOTEL` alias when `SNOTEL_ALL` is present.
if (typeof window !== 'undefined' && typeof SNOTEL === 'undefined' && typeof SNOTEL_ALL !== 'undefined') {
    // If SNOTEL_ALL is the newer state-keyed object (state -> [stations]),
    // build a flat mapping `SNOTEL[triplet] = { name, lat, lon }` so existing
    // code that expects SNOTEL by triplet continues to work.
    try {
        // Detect grouped-by-state format: values are arrays with `id` fields
        const sampleKeys = Object.keys(SNOTEL_ALL || {});
        const firstVal = sampleKeys.length ? SNOTEL_ALL[sampleKeys[0]] : null;
        if (Array.isArray(firstVal)) {
            const flat = {};
            for (const st of sampleKeys) {
                const arr = Array.isArray(SNOTEL_ALL[st]) ? SNOTEL_ALL[st] : [];
                for (const rec of arr) {
                    if (rec && rec.id) {
                        flat[rec.id] = { name: rec.name || '', lat: rec.lat, lon: rec.lon };
                    }
                }
            }
            window.SNOTEL = flat;
            // also expose SNOTEL_BY_STATE for future use
            window.SNOTEL_BY_STATE = SNOTEL_ALL;
        } else {
            // If it's already a flat mapping, just alias it
            window.SNOTEL = SNOTEL_ALL;
        }
    } catch (e) {
        console.error('Error normalizing SNOTEL_ALL:', e);
        window.SNOTEL = {};
    }
}

let map = null;
// Enable verbose debug logging during development (set to `true` locally)
const DEBUG = false;
// Current base tile layer so we can swap providers
let baseLayer = null;
// Optional radar overlay tile layer (added/removed by user)
let radarLayer = null;
// debounce handle for window resize events
let resizeTimeout = null;
// Radar tile template (RainViewer). {time} will be replaced with the latest timestamp.
const RADAR_TILE_TEMPLATE = 'https://tilecache.rainviewer.com/v2/radar/{time}/256/{z}/{x}/{y}/2/1_0.png';
let radarTileErrorCount = 0;
let radarTileLoadCount = 0;
let radarTimestamp = null;
let radarLoading = false;
// Default opacity (0.0 - 1.0). Persisted in localStorage under this key.
let RADAR_OPACITY = 0.6;
const RADAR_OPACITY_KEY = 'snotelRadarOpacity';
// Layer group to hold markers so we can clear/refresh easily
let markersLayer = null;
// Optional manual date range (strings in 'YYYY-MM-DD HH:MM' format). When set,
// `getSnotelSwe` will use these instead of computing a begin/end from `TIME_COUNT`.
let SNOTEL_BEGIN = null;
let SNOTEL_END = null;

/**
 * Resize `#leaflet_map` to fill the viewport below the header so the
 * map and legend are always fully visible.
 */
function adjustMapHeight() {
    const mapEl = document.getElementById('leaflet_map');
    if (!mapEl) return;
    // Prefer the new header element; fall back to any h2 for older versions
    const header = document.querySelector('header.main-header') || document.querySelector('h2');
    const headerHeight = header ? header.offsetHeight : 0;
    // smaller margin to better fit map+legend on small screens
    const margin = 8;
    const target = Math.max(window.innerHeight - headerHeight - margin, 160);
    mapEl.style.height = `${target}px`;
}

// Show/hide loading overlay
function showLoading() {
    const el = document.getElementById('loading-overlay');
    if (!el) return;
    el.classList.remove('loading-hidden');
    el.classList.add('loading-visible');
}

function hideLoading() {
    const el = document.getElementById('loading-overlay');
    if (!el) return;
    el.classList.remove('loading-visible');
    el.classList.add('loading-hidden');
}

// By default request the last N (hours when HOURLY is selected)
const DEFAULT_TIME_BEFORE = 7; // default: 7 hours when HOURLY
// Mutable count controlled by user input on the map (defaults to DEFAULT_TIME_BEFORE)
let TIME_COUNT = DEFAULT_TIME_BEFORE;

/**
 * Compute a beginDate string (YYYY-MM-DD) for the AWDB API.
 * If `duration === 'HOURLY'`, `count` is interpreted as hours; otherwise as days.
 */
function computeBeginDate(count = TIME_COUNT, duration = 'HOURLY') {
  const now = Date.now();
  const ms = duration === 'HOURLY' ? count * 3600 * 1000 : count * 24 * 3600 * 1000;
    return formatDateYYYYMMDD(new Date(now - ms));
}

function computeEndDate() {
    const now = Date.now();
    return formatDateYYYYMMDD(new Date(now));
}

/**
 * Format a Date as 'YYYY-MM-DD HH:MM' (minutes fixed to '00').
 * @param {Date} d
 * @returns {string}
 */
function formatDateYYYYMMDD(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const MM = '00';
    return `${yyyy}-${mm}-${dd} ${hh}:${MM}`;
}

// Helper to build a `datetime-local` value from a Date: 'YYYY-MM-DDTHH:MM'
function toDatetimeLocal(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

// Simple HTML escape to prevent injection in popup content
function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Fetch SWE (WTEQ) data for all configured SNOTEL sites.
 * Uses `TimeBefore` to compute a beginDate for the API.
 * Returns an object mapping station triplet -> JSON response (or null on error).
 *
 * Note: Large station lists are split into smaller chunked requests to avoid
 * overly long query URLs which can cause the AWDB request to fail.
 */
async function getSnotelSwe(tripletList = null, TimeBefore = TIME_COUNT, duration = DATA_DURATION) {
    const sweData = {};
    const beginDate = SNOTEL_BEGIN || computeBeginDate(TimeBefore, duration);
    const endDate = SNOTEL_END || computeEndDate();

    // Use provided tripletList when available, otherwise fall back to all SNOTEL keys
    const triplets = Array.isArray(tripletList) && tripletList.length ? tripletList.slice() : Object.keys(SNOTEL || {});
    for (const t of triplets) sweData[t] = null;

    if (triplets.length === 0) return sweData;

    // To avoid very long URLs (which may cause the AWDB call to fail) split
    // the station list into manageable chunks and fetch them one at a time.
    const CHUNK_SIZE = 50; // safe chunk size; adjust if needed
    const chunks = [];
    for (let i = 0; i < triplets.length; i += CHUNK_SIZE) {
        chunks.push(triplets.slice(i, i + CHUNK_SIZE));
    }

    // Fire all chunked requests in parallel and merge results. Use
    // Promise.allSettled so a few failed chunks won't abort the whole batch.
    const chunkPromises = chunks.map(async (chunk) => {
        const tripletParam = encodeURIComponent(chunk.join(','));
        const url = `https://wcc.sc.egov.usda.gov/awdbRestApi/services/v1/data?stationTriplets=${tripletParam}&elements=WTEQ&duration=${encodeURIComponent(duration)}&beginDate=${beginDate}&endDate=${endDate}&periodRef=START&centralTendencyType=NONE&returnFlags=false&returnOriginalValues=false&returnSuspectData=false`;
        try {
            if (DEBUG) console.debug('Requesting AWDB for triplets (parallel):', chunk.length, chunk.slice(0, 5));
            const resp = await fetch(url);
            if (!resp.ok) {
                console.warn(`Fetching triplet chunk failed: ${resp.status}`);
                return { chunk, json: null };
            }
            const json = await resp.json();
            return { chunk, json };
        } catch (err) {
            console.error('Error fetching triplet chunk (parallel):', err);
            return { chunk, json: null };
        }
    });

    const settled = await Promise.allSettled(chunkPromises);
    for (const s of settled) {
        if (s.status !== 'fulfilled' || !s.value || !s.value.json) continue;
        const { chunk, json } = s.value;
        // The API commonly returns an array of station objects. Each object should have
        // a `stationTriplet` property. To keep compatibility with the rest of
        // this code (which expects data[triplet] to be an array), store the
        // returned object inside an array at sweData[triplet].
        if (Array.isArray(json)) {
            for (const item of json) {
                const key = item && (item.stationTriplet || item.station || item.stationId || null);
                if (key && chunk.includes(key)) {
                    sweData[key] = [item];
                }
            }
        } else if (json && typeof json === 'object') {
            // Some responses may be keyed by triplet
            for (const k of Object.keys(json)) {
                if (chunk.includes(k)) sweData[k] = [json[k]];
            }
        }
    }

    return sweData;
}

/**
 * Compute the change (delta) between the first and last meaningful numeric values,
 * rounded to the nearest tenth (0.1).
 * Returns `null` when no numeric values exist.
 * @param {Array} values
 * @returns {number|null}
 */

function getEntryTimestamp(entry) {
  if (!entry || typeof entry !== 'object') return null;
  return (
    entry.date ||
    entry.validDate ||
    entry.valid_date ||
    entry.dateTime ||
    entry.time ||
    entry.timestamp ||
    entry.datetime ||
    null
  );
}

/**
 * Compute delta and include the first/last value and timestamps.
 * Accepts either an array of raw AWDB value objects (preferred) or numeric values.
 * Returns `null` when no numeric values exist.
 * @param {Array} entries
 * @returns {object|null} { delta, first: {value, timestamp}, last: {value, timestamp} }
 */
function computeDelta(entries, targetDate = null) {
    if (!Array.isArray(entries) || entries.length === 0) return null;

    // If entries are primitive numbers, normalize to objects
    if (typeof entries[0] !== 'object') {
        const nums = entries.map(Number).filter((n) => Number.isFinite(n));
        if (nums.length === 0) return null;
        const first = nums[0];
        const last = nums[nums.length - 1];
        const rawDelta = last - first;
        return {
            delta: Math.round(rawDelta * 10) / 10,
            first: { value: first, timestamp: null },
            last: { value: last, timestamp: null }
        };
    }

    // Entries are objects from AWDB; filter to numeric values
    const filtered = entries.filter((e) => e && e.value != null && Number.isFinite(Number(e.value)));
    if (filtered.length === 0) return null;

    // Determine firstEntry relative to targetDate (prefer first >= targetDate)
    let firstEntry = filtered[0];
    if (targetDate instanceof Date && !isNaN(targetDate)) {
        const targetTime = targetDate.getTime();
        // find first entry with timestamp >= targetTime
        let candidate = null;
        for (const e of filtered) {
            const ts = new Date(getEntryTimestamp(e)).getTime();
            if (!isNaN(ts) && ts >= targetTime) { candidate = e; break; }
        }
        if (candidate) firstEntry = candidate;
        else {
            // choose closest by absolute difference
            let best = filtered[0];
            let bestDiff = Math.abs(new Date(getEntryTimestamp(best)).getTime() - targetTime) || Infinity;
            for (const e of filtered) {
                const ts = new Date(getEntryTimestamp(e)).getTime();
                if (isNaN(ts)) continue;
                const diff = Math.abs(ts - targetTime);
                if (diff < bestDiff) { best = e; bestDiff = diff; }
            }
            firstEntry = best;
        }
    }

    const lastEntry = filtered[filtered.length - 1];
    const firstVal = Number(firstEntry.value);
    const lastVal = Number(lastEntry.value);
    const rawDelta = lastVal - firstVal;
    return {
        delta: Math.round(rawDelta * 10) / 10,
        first: { value: firstVal, timestamp: getEntryTimestamp(firstEntry) },
        last: { value: lastVal, timestamp: getEntryTimestamp(lastEntry) }
    };
}

// Zoom-to-location input removed — feature deprecated and trimmed.

/**
 * Initialize the Leaflet map into the element `leaflet_map`.
 * This keeps map setup separate for clarity and easier testing.
 */
function initMap(center = [46.5483, -110.9022], zoom = 7) {
    // ensure the map container is sized to the viewport before creating map
    adjustMapHeight();
    map = L.map('leaflet_map').setView(center, zoom);
    baseLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
        attribution: 'Tiles © Esri, National Geographic'
    }).addTo(map);
    // create a layer group for markers so we can clear them on refresh
    markersLayer = L.layerGroup().addTo(map);
    // create a dedicated pane for radar overlay tiles so they render between
    // base tiles and overlay panes (and so we can control pointer behavior)
    if (!map.getPane('radarPane')) {
        map.createPane('radarPane');
        const rp = map.getPane('radarPane');
        // zIndex chosen to sit between tilePane (200) and overlayPane (400)
        rp.style.zIndex = 350;
        // allow clicks to pass through to markers and the map
        rp.style.pointerEvents = 'none';
    }
    // add legend to the map
    addLegend();

    // Create a lower-left duration badge showing the current From/To range
    // (keeps the user aware of the date range being used by the plots)
    try {
        const mapEl = document.getElementById('leaflet_map');
        if (mapEl && !document.getElementById('snotel-duration-badge')) {
            const badge = document.createElement('div');
            badge.id = 'snotel-duration-badge';
            badge.className = 'snotel-duration-badge';
            badge.style.display = 'none';
            mapEl.appendChild(badge);
        }
    } catch (e) { /* ignore */ }
}

// Keep map sized correctly when window changes (debounced)
window.addEventListener('resize', function () {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        adjustMapHeight();
        if (map && typeof map.invalidateSize === 'function') map.invalidateSize();
    }, 200);
});

/**
 * Add a legend control to the map showing SWE delta color scale.
 */
function addLegend() {
    if (!map) return;
    if (document.getElementById('snotel-legend')) return;

    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
        const container = L.DomUtil.create('div', 'snotel-legend');
        container.id = 'snotel-legend';

        // Header with title and toggle button
        const header = document.createElement('div');
        header.className = 'legend-header';

        const title = document.createElement('div');
        title.className = 'legend-title';
        title.textContent = 'SWE Δ (in)';
        header.appendChild(title);

        const toggle = document.createElement('button');
        toggle.className = 'legend-toggle';
        // default to collapsed
        toggle.setAttribute('aria-expanded', 'false');
        toggle.title = 'Expand legend';
        toggle.innerHTML = '+'; // plus sign
        header.appendChild(toggle);

        container.appendChild(header);
        // start collapsed by default so legend is minimized on load
        container.classList.add('collapsed');

        const content = document.createElement('div');
        content.className = 'legend-content';
        content.innerHTML =
            '<div class="legend-row"><span class="legend-swatch snotel-marker-red"></span><span class="legend-label">&lt; -1.0</span></div>' +
            '<div class="legend-row"><span class="legend-swatch snotel-marker-orange"></span><span class="legend-label">-1.0 to -0.5</span></div>' +
            '<div class="legend-row"><span class="legend-swatch snotel-marker-yellow"></span><span class="legend-label">-0.5 to 0</span></div>' +
            '<div class="legend-row"><span class="legend-swatch snotel-marker-gray"></span><span class="legend-label">0</span></div>' +
            '<div class="legend-row"><span class="legend-swatch snotel-marker-cyan"></span><span class="legend-label">0 to 0.5</span></div>' +
            '<div class="legend-row"><span class="legend-swatch snotel-marker-blue"></span><span class="legend-label">0.5 to 1.0</span></div>' +
            '<div class="legend-row"><span class="legend-swatch snotel-marker-purple"></span><span class="legend-label">&gt; 1.0</span></div>';

        container.appendChild(content);

        // Stop clicks on legend from propagating to the map (prevents map panning)
        L.DomEvent.disableClickPropagation(container);

        // Toggle handler: collapse/expand the legend content
        L.DomEvent.on(toggle, 'click', function (ev) {
            L.DomEvent.stopPropagation(ev);
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                container.classList.add('collapsed');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.title = 'Expand legend';
                toggle.innerHTML = '+';
            } else {
                container.classList.remove('collapsed');
                toggle.setAttribute('aria-expanded', 'true');
                toggle.title = 'Collapse legend';
                toggle.innerHTML = '\u2212';
            }
        });

        return container;
    };
    legend.addTo(map);
}

/**
 * Switch base tile layer on the map.
 * Accepts provider keys: 'OpenStreetMap' (default), 'Esri.WorldImagery',
 * 'CartoDB.Positron', 'Stamen.Terrain'.
 */
function setBaseLayer(provider) {
    if (!map) return;
    try {
        if (baseLayer) map.removeLayer(baseLayer);
    } catch (e) {
        console.warn('Error removing baseLayer', e);
    }
    let url;
    let options = {};
    switch (provider) {
        case 'OpenStreetMap.HOT':
            url = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
            options = { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors (HOT)' };
            break;
        case 'Esri.NatGeoWorldMap':
            url = 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';
            options = { maxZoom: 16, attribution: 'Tiles © Esri, National Geographic' };
            break;
        case 'Esri.WorldImagery':
            url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
            options = { maxZoom: 19, attribution: 'Tiles © Esri' };
            break;
        case 'CartoDB.Positron':
            url = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
            options = { maxZoom: 19, attribution: '&copy; <a href="https://carto.com/">Carto</a>' };
            break;
        case 'CartoDB.DarkMatter':
            url = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
            options = { maxZoom: 19, attribution: '&copy; <a href="https://carto.com/">Carto</a>' };
            break;
        case 'Stamen.Terrain':
            url = 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg';
            options = { maxZoom: 18, subdomains: 'abcd', attribution: 'Map tiles by Stamen' };
            break;
        case 'Stamen.Toner':
            url = 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
            options = { maxZoom: 20, subdomains: 'abcd', attribution: 'Map tiles by Stamen' };
            break;
        case 'OpenTopoMap':
            url = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
            options = { maxZoom: 17, attribution: 'Map data: &copy; OpenTopoMap contributors' };
            break;
        default:
            url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
            options = { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' };
    }
    baseLayer = L.tileLayer(url, options).addTo(map);
}

/**
 * Helper: fetch latest RainViewer timestamp for radar tiles.
 * Returns a string timestamp (seconds since epoch) or null.
 */
async function fetchRainViewerLatestTime() {
    try {
        const resp = await fetch('https://api.rainviewer.com/public/maps.json');
        if (!resp.ok) return null;
        const json = await resp.json();
        if (Array.isArray(json) && json.length) return String(json[json.length - 1]);
        return null;
    } catch (e) {
        console.warn('Error fetching RainViewer maps.json:', e);
        return null;
    }
}

/**
 * Show or hide a radar overlay tile layer (RainViewer).
 * The layer is added with reduced opacity and a zIndex underneath markers.
 * @param {boolean} show
 */
async function setRadarOverlay(show) {
    if (!map) return;
    const statusEl = document.getElementById('snotel-radar-status');
    if (!show) {
        if (radarLayer) {
            try { map.removeLayer(radarLayer); } catch (e) { /* ignore */ }
            radarLayer = null;
            radarLoading = false;
        }
        if (statusEl) statusEl.textContent = '';
        try {
            const opacityEl = document.getElementById('snotel-radar-opacity');
            if (opacityEl && opacityEl.parentElement) opacityEl.parentElement.style.display = 'none';
        } catch (e) { /* ignore */ }
        return;
    }

    // guard against concurrent radar loads
    if (radarLoading) {
        if (statusEl) statusEl.textContent = 'Radar loading...';
        return;
    }

    radarTileErrorCount = 0;
    radarTileLoadCount = 0;

    // fetch latest timestamp before creating the layer to avoid immediate tile errors
    try {
        if (statusEl) statusEl.textContent = 'Loading radar...';
        radarLoading = true;
        const latest = await fetchRainViewerLatestTime();
        radarLoading = false;
        if (!latest) {
            if (statusEl) statusEl.textContent = 'Radar unavailable';
            try {
                const chk = document.getElementById('snotel-radar-toggle');
                if (chk) chk.checked = false;
            } catch (ex) { /* ignore */ }
            return;
        }
        radarTimestamp = latest;
    } catch (e) {
        radarLoading = false;
        console.warn('Error fetching radar timestamp:', e);
        if (statusEl) statusEl.textContent = 'Radar unavailable';
        try {
            const chk = document.getElementById('snotel-radar-toggle');
            if (chk) chk.checked = false;
        } catch (ex) { /* ignore */ }
        return;
    }

    // Create layer with the fetched timestamp
    const url = RADAR_TILE_TEMPLATE.replace('{time}', radarTimestamp);
    radarLayer = L.tileLayer(url, { pane: 'radarPane', opacity: RADAR_OPACITY, attribution: 'Radar © RainViewer' });

    radarLayer.on('tileerror', function (ev) {
        radarTileErrorCount += 1;
        const src = (ev && ev.tile && ev.tile.src) ? ev.tile.src : (ev && ev.url ? ev.url : '<unknown>');
        const coords = ev && ev.coords ? `${ev.coords.z}/${ev.coords.y}/${ev.coords.x}` : '<no-coords>';
        console.warn('Radar tile error:', { src, coords, event: ev });
        if (statusEl) statusEl.textContent = `Radar tile errors: ${radarTileErrorCount}`;
        if (radarTileErrorCount > 10) {
            // If too many errors, remove layer and notify user
            try { map.removeLayer(radarLayer); } catch (e) { /* ignore */ }
            radarLayer = null;
            radarLoading = false;
            if (statusEl) statusEl.textContent = 'Radar unavailable';
            try {
                const chk = document.getElementById('snotel-radar-toggle');
                if (chk) chk.checked = false;
            } catch (ex) { /* ignore */ }
        }
    });

    radarLayer.on('tileload', function () {
        radarTileLoadCount += 1;
        if (statusEl) statusEl.textContent = `Radar loaded (${radarTileLoadCount} tiles)`;
    });

    radarLayer.addTo(map);

    // show opacity control
    try {
        const opacityEl = document.getElementById('snotel-radar-opacity');
        if (opacityEl && opacityEl.parentElement) opacityEl.parentElement.style.display = 'inline-flex';
        if (radarLayer && typeof radarLayer.setOpacity === 'function') radarLayer.setOpacity(RADAR_OPACITY);
    } catch (e) { /* ignore */ }
}

/**
 * Main entry: fetch SWE data and plot markers with basic metrics in popups.
 */
async function plotTodaysSwe(TimeBefore = TIME_COUNT, duration = 'HOURLY') {
    showLoading();

    // Ensure the map and control panel exist before we inspect the selected state.
    if (!map) {
        initMap();
    }
    // add/ensure duration control (which includes the state selector)
    addDurationControl();
    // Clear existing markers if present so the refreshed plot starts clean
    if (markersLayer) markersLayer.clearLayers();

    // Determine selected states and triplets up-front so we only request needed stations
    const stateEl = document.getElementById('snotel-state-select');
    const selectedStates = stateEl ? Array.from(stateEl.selectedOptions).map((o) => String(o.value).toUpperCase()).filter(Boolean) : [];
    let triplets = [];
    if (selectedStates.length && window.SNOTEL_BY_STATE && typeof window.SNOTEL_BY_STATE === 'object') {
        // Aggregate all triplets for the chosen states
        for (const st of selectedStates) {
            if (Array.isArray(window.SNOTEL_BY_STATE[st])) {
                triplets.push(...window.SNOTEL_BY_STATE[st].map((r) => r && r.id).filter(Boolean));
            }
        }
        // de-duplicate
        triplets = Array.from(new Set(triplets));
    } else {
        triplets = Object.keys(SNOTEL || {});
        if (selectedStates.length) {
            triplets = triplets.filter((t) => {
                const parts = String(t).split(':');
                return selectedStates.includes(((parts[1] || '').toUpperCase()));
            });
        }
    }

    let data = null;
    try {
        data = await getSnotelSwe(triplets, TimeBefore, duration);
    } catch (err) {
        console.error('Error fetching SWE data:', err);
    }

    const beginDateStr = SNOTEL_BEGIN || computeBeginDate(TimeBefore, duration);
    const beginDateObj = new Date(beginDateStr);
    // We'll collect the actual entry timestamps used by computeDelta across stations
    // and show those in the badge so it matches the SWE delta popups.
    let badgeFirst = null;
    let badgeLast = null;
    let badgeFirstDate = null;
    let badgeLastDate = null;
    // Update the lower-left badge with the range being used for this plot
    try {
        const badge = document.getElementById('snotel-duration-badge');
        if (badge) {
            // Prefer timestamps derived from the actual SWE entries (so the badge matches popups)
            if (badgeFirst || badgeLast) {
                const fromText = badgeFirst || beginDateStr;
                const toText = badgeLast || (SNOTEL_END || computeEndDate());
                badge.textContent = `From ${fromText} to ${toText}`;
            } else {
                const endStr = SNOTEL_END || computeEndDate();
                badge.textContent = `From ${beginDateStr} to ${endStr}`;
            }
            badge.style.display = 'block';
        }
    } catch (e) { /* ignore */ }

    for (const triplet of triplets) {
        const meta = SNOTEL[triplet] || {};
        const latlng = [meta.lat, meta.lon];

        // Safely extract the values array from the AWDB response structure.
        const raw = (data && data[triplet] && data[triplet][0] && data[triplet][0].data && data[triplet][0].data[0] && data[triplet][0].data[0].values) || [];
        const entries = raw.filter((v) => v && v.value != null && Number.isFinite(Number(v.value)));
        const deltaInfo = computeDelta(entries, beginDateObj);
        // Collect timestamps so the badge can reflect the exact times used in popups
        if (deltaInfo && deltaInfo.first && deltaInfo.last) {
            try {
                const fts = deltaInfo.first.timestamp;
                const lts = deltaInfo.last.timestamp;
                if (fts) {
                    const fDate = new Date(fts);
                    if (!isNaN(fDate)) {
                        if (!badgeFirstDate || fDate < badgeFirstDate) { badgeFirstDate = fDate; badgeFirst = fts; }
                    } else if (!badgeFirst) { badgeFirst = fts; }
                }
                if (lts) {
                    const lDate = new Date(lts);
                    if (!isNaN(lDate)) {
                        if (!badgeLastDate || lDate > badgeLastDate) { badgeLastDate = lDate; badgeLast = lts; }
                    } else if (!badgeLast) { badgeLast = lts; }
                }
            } catch (e) { /* ignore timestamp parsing errors */ }
        }
        const stationName = (SNOTEL[triplet] && SNOTEL[triplet].name) || triplet;

        // Create a marker icon that displays the delta value
        let deltaLabel = 'N/A';
        if (deltaInfo && typeof deltaInfo.delta === 'number') deltaLabel = String(deltaInfo.delta);
        // Choose marker color class based on SWE magnitude (delta)
        let magnitudeClass = 'snotel-marker-none';
        if (deltaInfo && typeof deltaInfo.delta === 'number') {
            const d = Number(deltaInfo.delta);
            if (d === 0) magnitudeClass = 'snotel-marker-gray';
            else if (d < -1.0) magnitudeClass = 'snotel-marker-red';
            else if (d >= -1.0 && d < -0.5) magnitudeClass = 'snotel-marker-orange';
            else if (d >= -0.5 && d < 0) magnitudeClass = 'snotel-marker-yellow';
            else if (d > 0 && d <= 0.5) magnitudeClass = 'snotel-marker-cyan';
            else if (d > 0.5 && d <= 1.0) magnitudeClass = 'snotel-marker-blue';
            else if (d > 1.0) magnitudeClass = 'snotel-marker-purple';
        }
        const iconHtml = `<div class="snotel-pin ${magnitudeClass}"><span class="snotel-pin-label">${deltaLabel}</span></div>`;
        // Smaller icon size for less visual clutter
        const icon = L.divIcon({ className: 'snotel-div-icon', html: iconHtml, iconSize: [32, 32], iconAnchor: [16, 32] });
        const marker = L.marker(latlng, { icon });

        let popupHtml;
        if (!deltaInfo) {
            popupHtml = `<div class="popup-header">${escapeHtml(stationName)}</div><div class="popup-body"><div class="popup-row"><span class="popup-label">SWE Delta:</span> <span class="popup-value">N/A</span></div></div>`;
        } else {
            const firstTs = deltaInfo.first.timestamp || 'unknown';
            const lastTs = deltaInfo.last.timestamp || 'unknown';
            popupHtml = `
                <div class="popup-header">${escapeHtml(stationName)}</div>
                <div class="popup-body">
                    <div class="popup-row"><span class="popup-label">From:</span> <span class="popup-value">${escapeHtml(String(deltaInfo.first.value))}</span> <span class="popup-ts">${escapeHtml(String(firstTs))}</span></div>
                    <div class="popup-row"><span class="popup-label">To:</span> <span class="popup-value">${escapeHtml(String(deltaInfo.last.value))}</span> <span class="popup-ts">${escapeHtml(String(lastTs))}</span></div>
                    <div class="popup-divider" aria-hidden="true"></div>
                    <div class="popup-row"><span class="popup-label">SWE Delta:</span> <span class="popup-value">${escapeHtml(String(deltaInfo.delta))}</span></div>
                </div>`;
        }
        // Larger popup for readability; add className so CSS styles apply
        marker.bindPopup(popupHtml, { minWidth: 260, maxWidth: 640, maxHeight: 400, className: 'snotel-popup' });
        if (markersLayer) markersLayer.addLayer(marker);
        else marker.addTo(map);
    }

    // Update badge to reflect timestamps actually used in popups (if collected)
    try {
        const badge = document.getElementById('snotel-duration-badge');
        if (badge && (badgeFirst || badgeLast)) {
            const fromText = badgeFirst || (SNOTEL_BEGIN || beginDateStr);
            const toText = badgeLast || (SNOTEL_END || computeEndDate());
            badge.textContent = `From ${fromText} to ${toText}`;
            badge.style.display = 'block';
        }
    } catch (e) { /* ignore */ }

    // hide loading overlay once markers are added (or attempted)
    hideLoading();

    // Zoom map to the plotted data. Prefer using SNOTEL_BY_STATE for the
    // selected state when available (fast); otherwise derive bounds from
    // the markers we added or from SNOTEL coordinates.
    try {
        if (map) {
            let bounds = null;
            if (selectedStates.length && window.SNOTEL_BY_STATE && typeof window.SNOTEL_BY_STATE === 'object') {
                const pts = [];
                for (const st of selectedStates) {
                    if (Array.isArray(window.SNOTEL_BY_STATE[st])) {
                        pts.push(...window.SNOTEL_BY_STATE[st].filter((r) => r && r.lat != null && r.lon != null).map((r) => [r.lat, r.lon]));
                    }
                }
                if (pts.length) bounds = L.latLngBounds(pts);
            }
            if (!bounds && markersLayer && typeof markersLayer.getLayers === 'function') {
                const layers = markersLayer.getLayers();
                const latlngs = layers.map((m) => m.getLatLng()).filter(Boolean);
                if (latlngs.length) bounds = L.latLngBounds(latlngs);
            }
            if (!bounds) {
                // Last resort: compute from SNOTEL mapping
                const pts = triplets
                    .map((t) => {
                        const m = SNOTEL[t];
                        return m && m.lat != null && m.lon != null ? [m.lat, m.lon] : null;
                    })
                    .filter(Boolean);
                if (pts.length) bounds = L.latLngBounds(pts);
            }
            if (bounds && bounds.isValid && bounds.isValid()) {
                // Add slight padding and limit max zoom so markers remain visible
                map.fitBounds(bounds.pad ? bounds.pad(0.08) : bounds, { maxZoom: 10 });
            }
        }
    } catch (err) {
        console.warn('Could not auto-fit map bounds:', err);
    }

    // Ensure radar follows visibility state of control when refreshing plot
    const radarChk = document.getElementById('snotel-radar-toggle');
    if (radarChk && radarChk.checked) setRadarOverlay(true);
}

/**
 * Add a small Leaflet control with a select box to choose DAILY or HOURLY.
 * When changed, it updates `DATA_DURATION` and refreshes the plotted data.
 */
function addDurationControl() {
    if (!map) return;
    // avoid adding control multiple times
    if (document.getElementById('snotel-duration-control')) return;

    const DurationControl = L.Control.extend({
        onAdd: function () {
            const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
            // mark as snotel control panel for CSS styling
            container.classList.add('snotel-control-panel');
            container.style.padding = '6px';
            container.id = 'snotel-duration-control';

            // Header with title and toggle
            const header = document.createElement('div');
            header.className = 'control-header';
            const hdr = document.createElement('h4');
            hdr.textContent = 'Control Panel';
            header.appendChild(hdr);
            const ctlToggle = document.createElement('button');
            ctlToggle.className = 'control-toggle';
            // default collapsed so the control panel is minimized on load
            ctlToggle.setAttribute('aria-expanded', 'false');
            ctlToggle.title = 'Expand controls';
            ctlToggle.innerHTML = '+';
            header.appendChild(ctlToggle);
            container.appendChild(header);
            // start collapsed by default
            container.classList.add('collapsed');

            // content wrapper so it can be collapsed
            const content = document.createElement('div');
            content.className = 'control-content';

            // arrange inputs inline for compactness
            const row = document.createElement('div');
            row.className = 'control-row';
            // (duration toggle removed) -- keeping control panel compact
            // From / To datetime-local inputs
            // Basemap selector
            const basemapSelect = document.createElement('select');
            basemapSelect.id = 'snotel-basemap-select';
            basemapSelect.style.fontSize = '13px';
            basemapSelect.style.padding = '6px';
            basemapSelect.style.borderRadius = '4px';
            basemapSelect.style.border = '1px solid #cfcfcf';
            basemapSelect.style.marginRight = '8px';
            const options = [
                { v: 'Esri.NatGeoWorldMap', t: 'Esri NatGeo World Map' },
                { v: 'OpenStreetMap', t: 'OpenStreetMap' },
                { v: 'OpenStreetMap.HOT', t: 'OSM Humanitarian (HOT)' },
                { v: 'Esri.WorldImagery', t: 'Esri World Imagery' },
                { v: 'OpenTopoMap', t: 'OpenTopoMap' }
            ];
            for (const o of options) {
                const opt = document.createElement('option');
                opt.value = o.v;
                opt.textContent = o.t;
                basemapSelect.appendChild(opt);
            }
            basemapSelect.addEventListener('change', function () {
                setBaseLayer(this.value);
            });
            row.appendChild(basemapSelect);

            // Radar overlay toggle (placed before the divider so it applies immediately)
            const radarLabel = document.createElement('label');
            radarLabel.style.display = 'inline-flex';
            radarLabel.style.alignItems = 'center';
            radarLabel.style.marginLeft = '6px';
            radarLabel.style.marginRight = '8px';
            radarLabel.style.fontSize = '13px';
            const radarChk = document.createElement('input');
            radarChk.type = 'checkbox';
            radarChk.id = 'snotel-radar-toggle';
            radarChk.style.marginRight = '6px';
            radarLabel.appendChild(radarChk);
            const radarText = document.createElement('span');
            radarText.textContent = 'Show Current Radar';
            radarLabel.appendChild(radarText);
            // small status element to show radar availability/errors (adjacent to toggle)
            const radarStatus = document.createElement('span');
            radarStatus.id = 'snotel-radar-status';
            radarStatus.className = 'small-note';
            radarStatus.style.fontSize = '11px';
            radarStatus.style.marginLeft = '6px';
            radarStatus.textContent = '';
            radarLabel.appendChild(radarStatus);

            // Opacity slider (0-100%) shown next to radar control — only visible when radar is enabled
            const opacityWrapper = document.createElement('span');
            opacityWrapper.style.display = 'inline-flex';
            opacityWrapper.style.alignItems = 'center';
            opacityWrapper.style.marginLeft = '8px';

            const opacityInput = document.createElement('input');
            opacityInput.type = 'range';
            opacityInput.id = 'snotel-radar-opacity';
            opacityInput.min = '0';
            opacityInput.max = '100';
            opacityInput.style.marginLeft = '8px';
            opacityInput.style.verticalAlign = 'middle';
            opacityInput.title = 'Radar opacity';

            const opacityLabel = document.createElement('span');
            opacityLabel.id = 'snotel-radar-opacity-label';
            opacityLabel.className = 'small-note';
            opacityLabel.style.fontSize = '11px';
            opacityLabel.style.marginLeft = '6px';

            // initialize slider from localStorage if available
            try {
                const saved = localStorage.getItem(RADAR_OPACITY_KEY);
                if (saved != null) {
                    const v = Number(saved);
                    if (!isNaN(v) && v >= 0 && v <= 1) RADAR_OPACITY = v;
                }
            } catch (e) { /* ignore localStorage */ }
            opacityInput.value = String(Math.round(RADAR_OPACITY * 100));
            opacityLabel.textContent = `${Math.round(RADAR_OPACITY * 100)}%`;

            // hide slider when radar is not enabled
            opacityWrapper.style.display = radarChk.checked ? 'inline-flex' : 'none';

            // update opacity and persist on change
            opacityInput.addEventListener('input', function () {
                const pct = Number(this.value);
                RADAR_OPACITY = Math.max(0, Math.min(1, pct / 100));
                opacityLabel.textContent = `${Math.round(RADAR_OPACITY * 100)}%`;
                try { localStorage.setItem(RADAR_OPACITY_KEY, String(RADAR_OPACITY)); } catch (e) { /* ignore */ }
                if (radarLayer && typeof radarLayer.setOpacity === 'function') {
                    radarLayer.setOpacity(RADAR_OPACITY);
                }
            });

            opacityWrapper.appendChild(opacityInput);
            opacityWrapper.appendChild(opacityLabel);

            radarLabel.appendChild(opacityWrapper);

            radarChk.addEventListener('change', function () {
                setRadarOverlay(this.checked);
                // show/hide opacity slider based on enabled state
                opacityWrapper.style.display = this.checked ? 'inline-flex' : 'none';
                // if toggling on, ensure opacity is applied
                if (this.checked && radarLayer && typeof radarLayer.setOpacity === 'function') {
                    radarLayer.setOpacity(RADAR_OPACITY);
                }
            });
            row.appendChild(radarLabel);

            // visual divider between basemap selector and the datetime inputs
            const divider = document.createElement('div');
            divider.className = 'control-divider';
            divider.setAttribute('aria-hidden', 'true');
            row.appendChild(divider);

            // State selector (now supports multi-select) placed immediately below the divider
            const stateSelect = document.createElement('select');
            stateSelect.id = 'snotel-state-select';
            stateSelect.multiple = true; // allow selecting more than one state
            stateSelect.style.fontSize = '13px';
            stateSelect.style.padding = '6px';
            stateSelect.style.borderRadius = '4px';
            stateSelect.style.border = '1px solid #cfcfcf';
            // Show a few rows so users can see multiple choices; small width to keep panel compact
            stateSelect.style.minWidth = '72px';
            stateSelect.style.marginRight = '8px';
            stateSelect.style.marginBottom = '8px';
            // Populate states from SNOTEL_BY_STATE when available (fast),
            // otherwise derive from flat `SNOTEL` keys.
            let states = [];
            try {
                if (window.SNOTEL_BY_STATE && typeof window.SNOTEL_BY_STATE === 'object') {
                    states = Object.keys(window.SNOTEL_BY_STATE).map((s) => String(s).toUpperCase()).sort();
                } else {
                    const keys = Object.keys(window.SNOTEL || {});
                    const sset = new Set();
                    for (const k of keys) {
                        const parts = String(k).split(':');
                        if (parts[1]) sset.add(parts[1].toUpperCase());
                    }
                    states = Array.from(sset).sort();
                }
            } catch (e) {
                // Fallback to a sensible default list when data isn't available
                states = ['AK', 'WA', 'ID', 'MT', 'OR', 'WY', 'CA', 'NV', 'UT', 'CO', 'NM', 'AZ'];
            }
            for (const s of states) {
                const opt = document.createElement('option');
                opt.value = s;
                opt.textContent = s;
                stateSelect.appendChild(opt);
            }
            // Show a few rows so users can see multiple choices; set size now that `states` is known
            stateSelect.size = Math.min(6, Math.max(3, states.length));
            // default selection: prefer MT when available, otherwise select the first option
            if (states.includes('MT')) {
                for (const opt of stateSelect.options) { if (opt.value === 'MT') { opt.selected = true; break; } }
            } else if (stateSelect.options.length) {
                stateSelect.options[0].selected = true;
            }
            row.appendChild(stateSelect);
            // Small helper buttons to select/clear all states
            const selectAllBtn = document.createElement('button');
            selectAllBtn.type = 'button';
            selectAllBtn.className = 'snotel-select-btn';
            selectAllBtn.textContent = 'Select All';
            selectAllBtn.title = 'Select all states';
            selectAllBtn.style.fontSize = '12px';
            selectAllBtn.style.padding = '4px 6px';
            selectAllBtn.style.marginLeft = '8px';
            selectAllBtn.style.marginTop = '6px';
            selectAllBtn.style.border = '1px solid #cfcfcf';
            selectAllBtn.style.backgroundColor = '#f3f3f3';
            selectAllBtn.style.borderRadius = '4px';
            selectAllBtn.style.cursor = 'pointer';
            selectAllBtn.addEventListener('click', function (ev) {
                ev.preventDefault();
                for (const opt of stateSelect.options) opt.selected = true;
                stateSelect.focus();
            });
            const clearBtn = document.createElement('button');
            clearBtn.type = 'button';
            clearBtn.className = 'snotel-clear-btn';
            clearBtn.textContent = 'Clear';
            clearBtn.title = 'Clear selected states';
            clearBtn.style.fontSize = '12px';
            clearBtn.style.padding = '4px 6px';
            clearBtn.style.marginLeft = '4px';
            clearBtn.style.marginTop = '6px';
            clearBtn.style.border = '1px solid #cfcfcf';
            clearBtn.style.backgroundColor = '#fff';
            clearBtn.style.borderRadius = '4px';
            clearBtn.style.cursor = 'pointer';
            clearBtn.addEventListener('click', function (ev) {
                ev.preventDefault();
                for (const opt of stateSelect.options) opt.selected = false;
                stateSelect.focus();
            });
            row.appendChild(selectAllBtn);
            row.appendChild(clearBtn);
            // The state change is applied when the user clicks "Apply" below.
            const stateNote = document.createElement('div');
            stateNote.className = 'small-note';
            stateNote.style.marginLeft = '8px';
            stateNote.style.display = 'inline-block';
            stateNote.textContent = 'Choose one or more states (or use Select All/Clear) and click Apply to update map. Selecting multiple states will take longer to load.';
            row.appendChild(stateNote);

            const now = new Date();
            const defaultTo = toDatetimeLocal(now);
            const defaultFrom = toDatetimeLocal(new Date(now.getTime() - 10 * 3600 * 1000));

            const fromInput = document.createElement('input');
            fromInput.type = 'datetime-local';
            fromInput.id = 'snotel-from-dt';
            fromInput.className = 'snotel-dt-input';
            fromInput.value = defaultFrom;
            fromInput.title = 'From (start datetime)';
            fromInput.style.fontSize = '13px';
            fromInput.style.padding = '6px';
            fromInput.style.borderRadius = '4px';
            fromInput.style.border = '1px solid #cfcfcf';
            row.appendChild(fromInput);

            // A small note below the control to remind users about radar data coverage
            const radarNote = document.createElement('div');
            radarNote.className = 'small-note';
            radarNote.style.fontSize = '11px';
            radarNote.style.marginTop = '6px';
            radarNote.textContent = 'Radar overlay may not cover all regions; tiles provided by RainViewer (public).';
            content.appendChild(radarNote);

            const toInput = document.createElement('input');
            toInput.type = 'datetime-local';
            toInput.id = 'snotel-to-dt';
            toInput.className = 'snotel-dt-input';
            toInput.value = defaultTo;
            toInput.title = 'To (end datetime)';
            toInput.style.fontSize = '13px';
            toInput.style.padding = '6px';
            toInput.style.borderRadius = '4px';
            toInput.style.border = '1px solid #cfcfcf';
            row.appendChild(toInput);

            // create apply button after inputs, inside the same row
            const applyBtn = document.createElement('button');
            applyBtn.id = 'snotel-duration-apply';
            applyBtn.className = 'snotel-apply-btn';
            applyBtn.textContent = 'Apply';
            applyBtn.style.fontSize = '14px';
            applyBtn.style.padding = '6px 10px';
            applyBtn.style.marginTop = '6px';
            applyBtn.style.backgroundColor = '#007acc';
            applyBtn.style.color = '#ffffff';
            applyBtn.style.border = 'none';
            applyBtn.style.borderRadius = '4px';
            applyBtn.style.cursor = 'pointer';
            applyBtn.style.fontWeight = '600';
            applyBtn.title = 'Apply duration changes and refresh map';
            applyBtn.addEventListener('click', async function () {
                // read inputs and set global date strings used by getSnotelSwe
                const fromVal = document.getElementById('snotel-from-dt').value;
                const toVal = document.getElementById('snotel-to-dt').value;
                if (fromVal) SNOTEL_BEGIN = fromVal.replace('T', ' ');
                else SNOTEL_BEGIN = null;
                if (toVal) SNOTEL_END = toVal.replace('T', ' ');
                else SNOTEL_END = null;
                const unitsEl = document.getElementById('snotel-duration-units');
                if (unitsEl) unitsEl.textContent = SNOTEL_BEGIN && SNOTEL_END ? `From ${SNOTEL_BEGIN} to ${SNOTEL_END}` : `Custom range`;
                // Let the main plot function update the badge based on actual data used
                try {
                    const badge = document.getElementById('snotel-duration-badge');
                    if (badge) {
                        badge.textContent = 'Updating...';
                        badge.style.display = 'block';
                    }
                } catch (e) { /* ignore */ }
                await plotTodaysSwe();
            });
            row.appendChild(applyBtn);
            content.appendChild(row);

            const units = document.createElement('div');
            units.id = 'snotel-duration-units';
            units.style.fontSize = '12px';
            units.style.marginTop = '6px';
            units.style.clear = 'both';
            units.textContent = `From ${defaultFrom.replace('T',' ')} to ${defaultTo.replace('T',' ')}`;
            content.appendChild(units);
            const note = document.createElement('div');
            note.className = 'small-note';
            note.textContent = 'Click Apply to refresh map';
            content.appendChild(note);

            container.appendChild(content);

            // Prevent the control from causing map interactions when interacting with it
            L.DomEvent.disableClickPropagation(container);

            // Toggle handler for collapsing/expanding control content
            L.DomEvent.on(ctlToggle, 'click', function (ev) {
                L.DomEvent.stopPropagation(ev);
                const expanded = ctlToggle.getAttribute('aria-expanded') === 'true';
                if (expanded) {
                    container.classList.add('collapsed');
                    ctlToggle.setAttribute('aria-expanded', 'false');
                    ctlToggle.title = 'Expand controls';
                    ctlToggle.innerHTML = '+';
                } else {
                    container.classList.remove('collapsed');
                    ctlToggle.setAttribute('aria-expanded', 'true');
                    ctlToggle.title = 'Collapse controls';
                    ctlToggle.innerHTML = '\u2212';
                }
            });

            return container;
        }
    });

    map.addControl(new DurationControl({ position: 'topright' }));
}

// Expose functions to the global scope if desired by page HTML
window.plotTodaysSwe = plotTodaysSwe;