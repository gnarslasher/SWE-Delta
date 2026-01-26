'use strict';

// SNOTEL data (station metadata) is now provided in `snotel_data.js` as a
// single `SNOTEL` object keyed by station triplet. Example:
// SNOTEL['916:MT:SNTL'] -> { name: 'Albro Lake', lat: 45.59723, lon: -111.95902 }
// Keep the mapping in a separate file to keep this file small.

let map = null;
// Current base tile layer so we can swap providers
let baseLayer = null;
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
 */
async function getSnotelSwe(TimeBefore = TIME_COUNT, duration = DATA_DURATION) {
    const sweData = {};
    const beginDate = SNOTEL_BEGIN || computeBeginDate(TimeBefore, duration);
    const endDate = SNOTEL_END || computeEndDate();
    // Initialize all triplet keys to null so callers can rely on keys existing
    const triplets = Object.keys(SNOTEL || {});
    for (const t of triplets) sweData[t] = null;

    if (triplets.length === 0) return sweData;

    // Build a single request for all triplets. encodeURIComponent will encode
    // colons as %3A and commas as %2C which the AWDB API accepts.
    const tripletParam = encodeURIComponent(triplets.join(','));
    const url = `https://wcc.sc.egov.usda.gov/awdbRestApi/services/v1/data?stationTriplets=${tripletParam}&elements=WTEQ&duration=${encodeURIComponent(duration)}&beginDate=${beginDate}&endDate=${endDate}&periodRef=START&centralTendencyType=NONE&returnFlags=false&returnOriginalValues=false&returnSuspectData=false`;
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            console.warn(`Fetching multiple triplets failed: ${resp.status}`);
            return sweData;
        }
        const json = await resp.json();

        // The API returns an array of station objects. Each object should have
        // a `stationTriplet` property. To keep compatibility with the rest of
        // this code (which expects data[triplet] to be an array), store the
        // returned object inside an array at sweData[triplet].
        if (Array.isArray(json)) {
            for (const item of json) {
                const key = item && (item.stationTriplet || item.station || item.stationId || null);
                if (key && triplets.includes(key)) {
                    sweData[key] = [item];
                }
            }
        }
    } catch (err) {
        console.error('Error fetching multiple triplets:', err);
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
    // add legend to the map
    addLegend();
}

// Keep map sized correctly when window changes
window.addEventListener('resize', function () {
    adjustMapHeight();
    if (map && typeof map.invalidateSize === 'function') map.invalidateSize();
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
        toggle.setAttribute('aria-expanded', 'true');
        toggle.title = 'Collapse legend';
        toggle.innerHTML = '\u2212'; // minus sign
        header.appendChild(toggle);

        container.appendChild(header);

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
 * Main entry: fetch SWE data and plot markers with basic metrics in popups.
 */
async function plotTodaysSwe(TimeBefore = TIME_COUNT, duration = 'HOURLY') {
    showLoading();
    let data = null;
    try {
        data = await getSnotelSwe(TimeBefore, duration);
    } catch (err) {
        console.error('Error fetching SWE data:', err);
    }

    // initialize map if needed, otherwise clear existing markers
    if (!map) {
        initMap();
    } else if (markersLayer) {
        markersLayer.clearLayers();
    }

    const beginDateStr = SNOTEL_BEGIN || computeBeginDate(TimeBefore, duration);
    const beginDateObj = new Date(beginDateStr);
    const triplets = Object.keys(SNOTEL);
    for (const triplet of triplets) {
        const meta = SNOTEL[triplet] || {};
        const latlng = [meta.lat, meta.lon];

        // Safely extract the values array from the AWDB response structure.
        const raw = (data[triplet] && data[triplet][0] && data[triplet][0].data && data[triplet][0].data[0] && data[triplet][0].data[0].values) || [];
        const entries = raw.filter((v) => v && v.value != null && Number.isFinite(Number(v.value)));
        const deltaInfo = computeDelta(entries, beginDateObj);
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
        const icon = L.divIcon({ className: 'snotel-div-icon', html: iconHtml, iconSize: [48, 48], iconAnchor: [24, 48] });
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

    // hide loading overlay once markers are added (or attempted)
    hideLoading();

    // add the duration control (if not present) so users can switch DAILY/HOURLY
    addDurationControl();
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
            ctlToggle.setAttribute('aria-expanded', 'true');
            ctlToggle.title = 'Collapse controls';
            ctlToggle.innerHTML = '\u2212';
            header.appendChild(ctlToggle);
            container.appendChild(header);

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

            // visual divider between basemap selector and the datetime inputs
            const divider = document.createElement('div');
            divider.className = 'control-divider';
            divider.setAttribute('aria-hidden', 'true');
            row.appendChild(divider);

            // State selector (unwired for now) placed immediately below the divider
            const stateSelect = document.createElement('select');
            stateSelect.id = 'snotel-state-select';
            stateSelect.style.fontSize = '13px';
            stateSelect.style.padding = '6px';
            stateSelect.style.borderRadius = '4px';
            stateSelect.style.border = '1px solid #cfcfcf';
            stateSelect.style.marginBottom = '8px';
            const states = ['AK', 'WA', 'ID', 'MT', 'OR', 'WY', 'CA', 'NV', 'UT', 'CO', 'NM', 'AZ'];
            for (const s of states) {
                const opt = document.createElement('option');
                opt.value = s;
                opt.textContent = s;
                stateSelect.appendChild(opt);
            }
            // default selection: MT
            stateSelect.value = 'MT';
            row.appendChild(stateSelect);

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