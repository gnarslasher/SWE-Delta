'use strict';

// Expanded SNOTEL data: keyed by station triplet.
// Each entry contains `name`, `lat`, and `lon` for quick lookup.
const SNOTEL_ALL = {
    "OR": [
        {
            "id": "1000:OR:SNTL",
            "name": "Annie Springs",
            "lat": 42.87007,
            "lon": -122.16518
        },
        {
            "id": "1010:OR:SNTL",
            "name": "Crazyman Flat",
            "lat": 42.6381,
            "lon": -120.94917
        },
        {
            "id": "1044:OR:SNTL",
            "name": "Toketee Airstrip",
            "lat": 43.22718,
            "lon": -122.42537
        },
        {
            "id": "1077:OR:SNTL",
            "name": "Swan Lake Mtn",
            "lat": 42.41323,
            "lon": -121.68002
        },
        {
            "id": "1078:OR:SNTL",
            "name": "Sun Pass",
            "lat": 42.78637,
            "lon": -121.97715
        },
        {
            "id": "1079:OR:SNTL",
            "name": "Milk Shakes",
            "lat": 45.9821,
            "lon": -117.94883
        },
        {
            "id": "1084:OR:SNTL",
            "name": "Miller Woods",
            "lat": 45.24755,
            "lon": -123.27563
        },
        {
            "id": "1158:OR:SNTL",
            "name": "Howard Prairie",
            "lat": 42.215,
            "lon": -122.3713
        },
        {
            "id": "1166:OR:SNTL",
            "name": "Bear Grass",
            "lat": 44.3253,
            "lon": -122.0938
        },
        {
            "id": "1167:OR:SNTL",
            "name": "Smith Ridge",
            "lat": 44.30325,
            "lon": -122.04053
        },
        {
            "id": "1314:OR:SNTL",
            "name": "Fifteenmile",
            "lat": 45.35265,
            "lon": -121.53
        },
        {
            "id": "302:OR:SNTL",
            "name": "Aneroid Lake #2",
            "lat": 45.21332,
            "lon": -117.19255
        },
        {
            "id": "304:OR:SNTL",
            "name": "Arbuckle Mtn",
            "lat": 45.19085,
            "lon": -119.25392
        },
        {
            "id": "331:OR:SNTL",
            "name": "Beaver Reservoir",
            "lat": 45.14532,
            "lon": -118.219
        },
        {
            "id": "341:OR:SNTL",
            "name": "Big Red Mountain",
            "lat": 42.05257,
            "lon": -122.85487
        },
        {
            "id": "343:OR:SNTL",
            "name": "Bigelow Camp",
            "lat": 42.07875,
            "lon": -123.34393
        },
        {
            "id": "344:OR:SNTL",
            "name": "Billie Creek Divide",
            "lat": 42.40717,
            "lon": -122.26617
        },
        {
            "id": "351:OR:SNTL",
            "name": "Blazed Alder",
            "lat": 45.4287,
            "lon": -121.85605
        },
        {
            "id": "357:OR:SNTL",
            "name": "Blue Mountain Spring",
            "lat": 44.24767,
            "lon": -118.51722
        },
        {
            "id": "361:OR:SNTL",
            "name": "Bourne",
            "lat": 44.83052,
            "lon": -118.18787
        },
        {
            "id": "362:OR:SNTL",
            "name": "Bowman Springs",
            "lat": 45.36428,
            "lon": -118.46715
        },
        {
            "id": "388:OR:SNTL",
            "name": "Cascade Summit",
            "lat": 43.59042,
            "lon": -122.0601
        },
        {
            "id": "395:OR:SNTL",
            "name": "Chemult Alternate",
            "lat": 43.22625,
            "lon": -121.80662
        },
        {
            "id": "398:OR:SNTL",
            "name": "Clackamas Lake",
            "lat": 45.09658,
            "lon": -121.75443
        },
        {
            "id": "401:OR:SNTL",
            "name": "Clear Lake",
            "lat": 45.18832,
            "lon": -121.6916
        },
        {
            "id": "406:OR:SNTL",
            "name": "Cold Springs Camp",
            "lat": 42.53305,
            "lon": -122.17683
        },
        {
            "id": "422:OR:SNTL",
            "name": "County Line",
            "lat": 45.19107,
            "lon": -118.55015
        },
        {
            "id": "434:OR:SNTL",
            "name": "Daly Lake",
            "lat": 44.52147,
            "lon": -122.08718
        },
        {
            "id": "440:OR:SNTL",
            "name": "Derr.",
            "lat": 44.4465,
            "lon": -119.93012
        },
        {
            "id": "442:OR:SNTL",
            "name": "Diamond Lake",
            "lat": 43.18787,
            "lon": -122.14003
        },
        {
            "id": "464:OR:SNTL",
            "name": "Eilertson Meadows",
            "lat": 44.86887,
            "lon": -118.11387
        },
        {
            "id": "470:OR:SNTL",
            "name": "Emigrant Springs",
            "lat": 45.55808,
            "lon": -118.45385
        },
        {
            "id": "477:OR:SNTL",
            "name": "Fish Creek",
            "lat": 42.70993,
            "lon": -118.63219
        },
        {
            "id": "479:OR:SNTL",
            "name": "Fish Lk.",
            "lat": 42.3801,
            "lon": -122.34943
        },
        {
            "id": "483:OR:SNTL",
            "name": "Fourmile Lake",
            "lat": 42.43933,
            "lon": -122.2288
        },
        {
            "id": "494:OR:SNTL",
            "name": "Gold Center",
            "lat": 44.7638,
            "lon": -118.3117
        },
        {
            "id": "504:OR:SNTL",
            "name": "Greenpoint",
            "lat": 45.62237,
            "lon": -121.70415
        },
        {
            "id": "523:OR:SNTL",
            "name": "High Ridge",
            "lat": 45.69682,
            "lon": -118.10657
        },
        {
            "id": "526:OR:SNTL",
            "name": "Hogg Pass",
            "lat": 44.42042,
            "lon": -121.85655
        },
        {
            "id": "529:OR:SNTL",
            "name": "Holland Meadows",
            "lat": 43.66917,
            "lon": -122.56877
        },
        {
            "id": "545:OR:SNTL",
            "name": "Irish Taylor",
            "lat": 43.80368,
            "lon": -121.94793
        },
        {
            "id": "552:OR:SNTL",
            "name": "Jump Off Joe",
            "lat": 44.38605,
            "lon": -122.16683
        },
        {
            "id": "558:OR:SNTL",
            "name": "King Mountain",
            "lat": 42.72395,
            "lon": -123.20037
        },
        {
            "id": "563:OR:SNTL",
            "name": "Lake Creek R.S.",
            "lat": 44.21007,
            "lon": -118.63752
        },
        {
            "id": "584:OR:SNTL",
            "name": "Little Meadows",
            "lat": 44.61297,
            "lon": -122.22565
        },
        {
            "id": "605:OR:SNTL",
            "name": "Lucky Strike",
            "lat": 45.27478,
            "lon": -118.8479
        },
        {
            "id": "608:OR:SNTL",
            "name": "Madison Butte",
            "lat": 45.10513,
            "lon": -119.49585
        },
        {
            "id": "614:OR:SNTL",
            "name": "Marion Forks",
            "lat": 44.59397,
            "lon": -121.97365
        },
        {
            "id": "619:OR:SNTL",
            "name": "Mckenzie",
            "lat": 44.2103,
            "lon": -121.87292
        },
        {
            "id": "647:OR:SNTL",
            "name": "Moss Springs",
            "lat": 45.27173,
            "lon": -117.68747
        },
        {
            "id": "651:OR:SNTL",
            "name": "Mt Hood Test Site",
            "lat": 45.32097,
            "lon": -121.7158
        },
        {
            "id": "653:OR:SNTL",
            "name": "Mt. Howard",
            "lat": 45.26514,
            "lon": -117.17377
        },
        {
            "id": "655:OR:SNTL",
            "name": "Mud Ridge",
            "lat": 45.25362,
            "lon": -121.73673
        },
        {
            "id": "660:OR:SNTL",
            "name": "New Crescent Lake",
            "lat": 43.51185,
            "lon": -121.97982
        },
        {
            "id": "666:OR:SNTL",
            "name": "North Fork",
            "lat": 45.5505,
            "lon": -122.00283
        },
        {
            "id": "671:OR:SNTL",
            "name": "Ochoco Meadows",
            "lat": 44.42917,
            "lon": -120.3311
        },
        {
            "id": "687:OR:SNTL",
            "name": "Peavine Ridge",
            "lat": 45.04148,
            "lon": -121.93252
        },
        {
            "id": "706:OR:SNTL",
            "name": "Quartz Mountain",
            "lat": 42.31923,
            "lon": -120.82533
        },
        {
            "id": "710:OR:SNTL",
            "name": "Railroad Overpass",
            "lat": 43.65887,
            "lon": -122.21272
        },
        {
            "id": "712:OR:SNTL",
            "name": "Red Hill",
            "lat": 45.4643,
            "lon": -121.70428
        },
        {
            "id": "719:OR:SNTL",
            "name": "Roaring River",
            "lat": 43.90098,
            "lon": -122.03063
        },
        {
            "id": "721:OR:SNTL",
            "name": "Rock Springs",
            "lat": 44.00883,
            "lon": -118.83842
        },
        {
            "id": "726:OR:SNTL",
            "name": "Saddle Mountain",
            "lat": 45.54475,
            "lon": -123.37331
        },
        {
            "id": "729:OR:SNTL",
            "name": "Salt Creek Falls",
            "lat": 43.61193,
            "lon": -122.11758
        },
        {
            "id": "733:OR:SNTL",
            "name": "Santiam Jct.",
            "lat": 44.43503,
            "lon": -121.94502
        },
        {
            "id": "736:OR:SNTL",
            "name": "Schneider Meadows",
            "lat": 45.00107,
            "lon": -117.16522
        },
        {
            "id": "743:OR:SNTL",
            "name": "Seine Creek",
            "lat": 45.52688,
            "lon": -123.29857
        },
        {
            "id": "745:OR:SNTL",
            "name": "Sevenmile Marsh",
            "lat": 42.69825,
            "lon": -122.14165
        },
        {
            "id": "756:OR:SNTL",
            "name": "Silver Creek",
            "lat": 42.95615,
            "lon": -121.18123
        },
        {
            "id": "759:OR:SNTL",
            "name": "Silvies",
            "lat": 42.75333,
            "lon": -118.68785
        },
        {
            "id": "767:OR:SNTL",
            "name": "Snow Mountain",
            "lat": 43.94885,
            "lon": -119.54013
        },
        {
            "id": "789:OR:SNTL",
            "name": "Starr Ridge",
            "lat": 44.26423,
            "lon": -119.02162
        },
        {
            "id": "794:OR:SNTL",
            "name": "Strawberry",
            "lat": 42.12587,
            "lon": -120.8361
        },
        {
            "id": "800:OR:SNTL",
            "name": "Summer Rim",
            "lat": 42.6957,
            "lon": -120.80158
        },
        {
            "id": "801:OR:SNTL",
            "name": "Summit Lake",
            "lat": 43.44907,
            "lon": -122.13808
        },
        {
            "id": "810:OR:SNTL",
            "name": "Taylor Butte",
            "lat": 42.69108,
            "lon": -121.42592
        },
        {
            "id": "812:OR:SNTL",
            "name": "Taylor Green",
            "lat": 45.07707,
            "lon": -117.55067
        },
        {
            "id": "815:OR:SNTL",
            "name": "Three Creeks Meadow",
            "lat": 44.14425,
            "lon": -121.64095
        },
        {
            "id": "821:OR:SNTL",
            "name": "Tipton",
            "lat": 44.65567,
            "lon": -118.42617
        },
        {
            "id": "873:OR:SNTL",
            "name": "Wolf Creek",
            "lat": 45.06704,
            "lon": -118.15185
        },
        {
            "id": "925:OR:SNTL",
            "name": "South Fork Bull Run",
            "lat": 45.44575,
            "lon": -122.03125
        },
        {
            "id": "945:OR:SNTL",
            "name": "Gerber Reservoir",
            "lat": 42.2062,
            "lon": -121.1334
        }
    ],
    "AK": [
        {
            "id": "1001:AK:SNTL",
            "name": "Long Lake",
            "lat": 58.186,
            "lon": -133.83217
        },
        {
            "id": "1003:AK:SNTL",
            "name": "Mcneil Canyon",
            "lat": 59.74521,
            "lon": -151.25839
        },
        {
            "id": "1035:AK:SNTL",
            "name": "Moraine",
            "lat": 61.37727,
            "lon": -148.99917
        },
        {
            "id": "1036:AK:SNTL",
            "name": "Johnsons Camp",
            "lat": 64.5646,
            "lon": -164.29257
        },
        {
            "id": "1037:AK:SNTL",
            "name": "Nuka Glacier",
            "lat": 59.69804,
            "lon": -150.71163
        },
        {
            "id": "1055:AK:SNTL",
            "name": "Upper Tsaina River",
            "lat": 61.19112,
            "lon": -145.64807
        },
        {
            "id": "1062:AK:SNTL",
            "name": "Anchor River Divide",
            "lat": 59.8608,
            "lon": -151.31494
        },
        {
            "id": "1064:AK:SNTL",
            "name": "Middle Fork Bradley",
            "lat": 59.77711,
            "lon": -150.75698
        },
        {
            "id": "1070:AK:SNTL",
            "name": "Anchorage Hillside",
            "lat": 61.11315,
            "lon": -149.68345
        },
        {
            "id": "1071:AK:SNTL",
            "name": "Esther Island",
            "lat": 60.798,
            "lon": -148.0857
        },
        {
            "id": "1072:AK:SNTL",
            "name": "Kantishna",
            "lat": 63.53667,
            "lon": -150.98593
        },
        {
            "id": "1073:AK:SNTL",
            "name": "Mt. Eyak",
            "lat": 60.55648,
            "lon": -145.72201
        },
        {
            "id": "1089:AK:SNTL",
            "name": "Tokositna Valley",
            "lat": 62.62918,
            "lon": -150.7741
        },
        {
            "id": "1090:AK:SNTL",
            "name": "Upper Nome Creek",
            "lat": 65.3671,
            "lon": -146.592
        },
        {
            "id": "1091:AK:SNTL",
            "name": "Independence Mine",
            "lat": 61.79001,
            "lon": -149.2839
        },
        {
            "id": "1092:AK:SNTL",
            "name": "Exit Glacier",
            "lat": 60.18957,
            "lon": -149.6228
        },
        {
            "id": "1093:AK:SNTL",
            "name": "Chisana",
            "lat": 62.06947,
            "lon": -142.04919
        },
        {
            "id": "1094:AK:SNTL",
            "name": "Monahan Flat",
            "lat": 63.30464,
            "lon": -147.64883
        },
        {
            "id": "1095:AK:SNTL",
            "name": "Sugarloaf Mtn",
            "lat": 61.08042,
            "lon": -146.30202
        },
        {
            "id": "1096:AK:SNTL",
            "name": "May Creek",
            "lat": 61.34918,
            "lon": -142.69355
        },
        {
            "id": "1103:AK:SNTL",
            "name": "Mt. Alyeska",
            "lat": 60.95842,
            "lon": -149.08858
        },
        {
            "id": "1175:AK:SNTL",
            "name": "Kelly Station",
            "lat": 67.9297,
            "lon": -162.2906
        },
        {
            "id": "1176:AK:SNTL",
            "name": "Moore Creek Bridge",
            "lat": 59.58668,
            "lon": -135.19455
        },
        {
            "id": "1177:AK:SNTL",
            "name": "Prudhoe Bay",
            "lat": 70.28062,
            "lon": -148.89778
        },
        {
            "id": "1182:AK:SNTL",
            "name": "Bettles Field",
            "lat": 66.91467,
            "lon": -151.53318
        },
        {
            "id": "1183:AK:SNTL",
            "name": "Sagwon",
            "lat": 69.42417,
            "lon": -148.6925
        },
        {
            "id": "1189:AK:SNTL",
            "name": "American Creek",
            "lat": 64.78969,
            "lon": -141.23376
        },
        {
            "id": "1191:AK:SNTL",
            "name": "Mcneil River SGS",
            "lat": 59.08358,
            "lon": -154.27785
        },
        {
            "id": "1260:AK:SNTL",
            "name": "Chena Lakes",
            "lat": 64.75793,
            "lon": -147.21823
        },
        {
            "id": "1265:AK:SNTL",
            "name": "Lower Kachemak Creek",
            "lat": 59.73516,
            "lon": -150.69429
        },
        {
            "id": "1266:AK:SNTL",
            "name": "Telaquana Lake",
            "lat": 60.98347,
            "lon": -153.91866
        },
        {
            "id": "1267:AK:SNTL",
            "name": "Alexander Lake",
            "lat": 61.7493,
            "lon": -150.89199
        },
        {
            "id": "1268:AK:SNTL",
            "name": "Fielding Lake",
            "lat": 63.2026,
            "lon": -145.63442
        },
        {
            "id": "1270:AK:SNTL",
            "name": "Heen Latinee",
            "lat": 58.69652,
            "lon": -134.86448
        },
        {
            "id": "1275:AK:SNTL",
            "name": "Jack Wade Jct",
            "lat": 64.14797,
            "lon": -141.32985
        },
        {
            "id": "1285:AK:SNTL",
            "name": "Flower Mountain",
            "lat": 59.39617,
            "lon": -136.28123
        },
        {
            "id": "1301:AK:SNTL",
            "name": "Paradise Hill",
            "lat": 62.83329,
            "lon": -141.40918
        },
        {
            "id": "1302:AK:SNTL",
            "name": "Creamers Field",
            "lat": 64.86534,
            "lon": -147.73617
        },
        {
            "id": "1303:AK:SNTL",
            "name": "Dahl Creek",
            "lat": 66.94517,
            "lon": -156.90318
        },
        {
            "id": "1318:AK:SNTL",
            "name": "Hoonah",
            "lat": 58.12411,
            "lon": -135.413
        },
        {
            "id": "1327:AK:SNTL",
            "name": "Pilgrim Hot Springs",
            "lat": 65.09455,
            "lon": -164.92472
        },
        {
            "id": "1330:AK:SNTL",
            "name": "Seven Mile",
            "lat": 65.93772,
            "lon": -149.8631
        },
        {
            "id": "1332:AK:SNTL",
            "name": "Elmendorf Field",
            "lat": 61.24777,
            "lon": -149.82331
        },
        {
            "id": "2044:AK:SNTL",
            "name": "Spring Creek",
            "lat": 61.65653,
            "lon": -149.12926
        },
        {
            "id": "2065:AK:SNTL",
            "name": "Aniak",
            "lat": 61.58337,
            "lon": -159.57708
        },
        {
            "id": "2080:AK:SNTL",
            "name": "Tok",
            "lat": 63.32529,
            "lon": -143.03834
        },
        {
            "id": "2081:AK:SNTL",
            "name": "Nenana",
            "lat": 64.68582,
            "lon": -148.9113
        },
        {
            "id": "2210:AK:SNTL",
            "name": "Hozatka Lake",
            "lat": 65.19405,
            "lon": -156.64113
        },
        {
            "id": "2222:AK:SNTL",
            "name": "Gulkana River",
            "lat": 62.40962,
            "lon": -145.37513
        },
        {
            "id": "429:AK:SNTL",
            "name": "Galena AK",
            "lat": 64.69662,
            "lon": -156.71497
        },
        {
            "id": "641:AK:SNTL",
            "name": "Frostbite Bottom",
            "lat": 61.74699,
            "lon": -149.26769
        },
        {
            "id": "768:AK:SNTL",
            "name": "Look Eyrie",
            "lat": 63.32192,
            "lon": -145.59655
        },
        {
            "id": "785:AK:SNTL",
            "name": "McGrath",
            "lat": 62.94652,
            "lon": -155.6102
        },
        {
            "id": "946:AK:SNTL",
            "name": "Indian Pass",
            "lat": 61.06577,
            "lon": -149.48543
        },
        {
            "id": "947:AK:SNTL",
            "name": "Little Chena Ridge",
            "lat": 65.12422,
            "lon": -146.7339
        },
        {
            "id": "948:AK:SNTL",
            "name": "Mt. Ryan",
            "lat": 65.25113,
            "lon": -146.15133
        },
        {
            "id": "949:AK:SNTL",
            "name": "Monument Creek",
            "lat": 65.07738,
            "lon": -145.87358
        },
        {
            "id": "950:AK:SNTL",
            "name": "Munson Ridge",
            "lat": 64.85168,
            "lon": -146.21215
        },
        {
            "id": "951:AK:SNTL",
            "name": "Teuchet Creek",
            "lat": 64.94763,
            "lon": -145.52079
        },
        {
            "id": "952:AK:SNTL",
            "name": "Upper Chena",
            "lat": 65.09852,
            "lon": -144.93318
        },
        {
            "id": "954:AK:SNTL",
            "name": "Turnagain Pass",
            "lat": 60.78043,
            "lon": -149.18325
        },
        {
            "id": "955:AK:SNTL",
            "name": "Summit Creek",
            "lat": 60.61713,
            "lon": -149.53128
        },
        {
            "id": "956:AK:SNTL",
            "name": "Grandview",
            "lat": 60.60832,
            "lon": -149.06313
        },
        {
            "id": "957:AK:SNTL",
            "name": "Atigun Pass",
            "lat": 68.12983,
            "lon": -149.47817
        },
        {
            "id": "958:AK:SNTL",
            "name": "Coldfoot",
            "lat": 67.25333,
            "lon": -150.183
        },
        {
            "id": "959:AK:SNTL",
            "name": "Cooper Lake",
            "lat": 60.39027,
            "lon": -149.6936
        },
        {
            "id": "960:AK:SNTL",
            "name": "Eagle Summit",
            "lat": 65.48588,
            "lon": -145.41212
        },
        {
            "id": "961:AK:SNTL",
            "name": "Fort Yukon",
            "lat": 66.5705,
            "lon": -145.24553
        },
        {
            "id": "962:AK:SNTL",
            "name": "Gobblers Knob",
            "lat": 66.745,
            "lon": -150.6675
        },
        {
            "id": "963:AK:SNTL",
            "name": "Granite Crk",
            "lat": 63.94382,
            "lon": -145.39993
        },
        {
            "id": "964:AK:SNTL",
            "name": "Grouse Creek Divide",
            "lat": 60.25965,
            "lon": -149.34228
        },
        {
            "id": "966:AK:SNTL",
            "name": "Kenai Moose Pens",
            "lat": 60.72499,
            "lon": -150.47369
        },
        {
            "id": "967:AK:SNTL",
            "name": "Susitna Valley High",
            "lat": 62.13245,
            "lon": -150.04391
        },
        {
            "id": "968:AK:SNTL",
            "name": "Imnaviat Creek",
            "lat": 68.61652,
            "lon": -149.3033
        },
        {
            "id": "973:AK:SNTL",
            "name": "Rocky Point",
            "lat": 64.54988,
            "lon": -163.48399
        },
        {
            "id": "986:AK:SNTL",
            "name": "Pargon Creek",
            "lat": 64.99619,
            "lon": -163.10514
        },
        {
            "id": "987:AK:SNTL",
            "name": "Port Graham",
            "lat": 59.35065,
            "lon": -151.84768
        }
    ],
    "CO": [
        {
            "id": "1005:CO:SNTL",
            "name": "Ute Creek",
            "lat": 37.6148,
            "lon": -105.37322
        },
        {
            "id": "1014:CO:SNTL",
            "name": "Middle Fork Camp",
            "lat": 39.79565,
            "lon": -106.02802
        },
        {
            "id": "1030:CO:SNTL",
            "name": "Arapaho Ridge",
            "lat": 40.35098,
            "lon": -106.38141
        },
        {
            "id": "1031:CO:SNTL",
            "name": "Never Summer",
            "lat": 40.40392,
            "lon": -105.95567
        },
        {
            "id": "1032:CO:SNTL",
            "name": "Rawah",
            "lat": 40.70794,
            "lon": -106.00727
        },
        {
            "id": "1033:CO:SNTL",
            "name": "Zirkel",
            "lat": 40.79492,
            "lon": -106.59544
        },
        {
            "id": "1040:CO:SNTL",
            "name": "Mccoy Park",
            "lat": 39.60231,
            "lon": -106.544
        },
        {
            "id": "1041:CO:SNTL",
            "name": "Beaver Ck Village",
            "lat": 39.59871,
            "lon": -106.51113
        },
        {
            "id": "1042:CO:SNTL",
            "name": "Wild Basin",
            "lat": 40.201,
            "lon": -105.6025
        },
        {
            "id": "1057:CO:SNTL",
            "name": "Glen Cove",
            "lat": 38.87602,
            "lon": -105.07605
        },
        {
            "id": "1058:CO:SNTL",
            "name": "Grayback",
            "lat": 37.47051,
            "lon": -106.5379
        },
        {
            "id": "1059:CO:SNTL",
            "name": "Cochetopa Pass",
            "lat": 38.16273,
            "lon": -106.5988
        },
        {
            "id": "1060:CO:SNTL",
            "name": "Sharkstooth",
            "lat": 37.50356,
            "lon": -108.11405
        },
        {
            "id": "1061:CO:SNTL",
            "name": "Bear River",
            "lat": 40.06152,
            "lon": -107.00948
        },
        {
            "id": "1100:CO:SNTL",
            "name": "Saint Elmo",
            "lat": 38.69985,
            "lon": -106.36805
        },
        {
            "id": "1101:CO:SNTL",
            "name": "Chapman Tunnel",
            "lat": 39.2621,
            "lon": -106.62944
        },
        {
            "id": "1102:CO:SNTL",
            "name": "Hayden Pass",
            "lat": 38.29303,
            "lon": -105.85027
        },
        {
            "id": "1120:CO:SNTL",
            "name": "Elliot Ridge",
            "lat": 39.8638,
            "lon": -106.42473
        },
        {
            "id": "1122:CO:SNTL",
            "name": "Hourglass Lake",
            "lat": 40.57717,
            "lon": -105.62584
        },
        {
            "id": "1123:CO:SNTL",
            "name": "Long Draw Resv",
            "lat": 40.51154,
            "lon": -105.7654
        },
        {
            "id": "1124:CO:SNTL",
            "name": "Moon Pass",
            "lat": 37.96627,
            "lon": -106.55857
        },
        {
            "id": "1128:CO:SNTL",
            "name": "Sargents Mesa",
            "lat": 38.2856,
            "lon": -106.37085
        },
        {
            "id": "1141:CO:SNTL",
            "name": "Upper Taylor",
            "lat": 38.99071,
            "lon": -106.74504
        },
        {
            "id": "1160:CO:SNTL",
            "name": "Weminuche Creek",
            "lat": 37.51968,
            "lon": -107.32139
        },
        {
            "id": "1161:CO:SNTL",
            "name": "Black Mountain",
            "lat": 40.8879,
            "lon": -105.66404
        },
        {
            "id": "1185:CO:SNTL",
            "name": "Black Mesa",
            "lat": 37.78968,
            "lon": -108.18376
        },
        {
            "id": "1186:CO:SNTL",
            "name": "Fool Creek",
            "lat": 39.86866,
            "lon": -105.86765
        },
        {
            "id": "1187:CO:SNTL",
            "name": "High Lonesome",
            "lat": 40.0359,
            "lon": -105.75472
        },
        {
            "id": "1188:CO:SNTL",
            "name": "Wager Gulch",
            "lat": 37.88248,
            "lon": -107.36428
        },
        {
            "id": "1251:CO:SNTL",
            "name": "Sawtooth",
            "lat": 40.13632,
            "lon": -105.58486
        },
        {
            "id": "1252:CO:SNTL",
            "name": "Elkhead Divide",
            "lat": 40.79637,
            "lon": -107.10113
        },
        {
            "id": "1324:CO:SNTL",
            "name": "Rat Creek",
            "lat": 37.93571,
            "lon": -106.98192
        },
        {
            "id": "1325:CO:SNTL",
            "name": "Elwood Pass",
            "lat": 37.40563,
            "lon": -106.64136
        },
        {
            "id": "1326:CO:SNTL",
            "name": "Castle Peak",
            "lat": 39.00074,
            "lon": -106.83912
        },
        {
            "id": "1344:CO:SNTL",
            "name": "Alta Lakes",
            "lat": 37.88929,
            "lon": -107.84484
        },
        {
            "id": "303:CO:SNTL",
            "name": "Apishapa",
            "lat": 37.33067,
            "lon": -105.06766
        },
        {
            "id": "322:CO:SNTL",
            "name": "Bear Lake",
            "lat": 40.31176,
            "lon": -105.6467
        },
        {
            "id": "327:CO:SNTL",
            "name": "Beartown",
            "lat": 37.71433,
            "lon": -107.5124
        },
        {
            "id": "335:CO:SNTL",
            "name": "Berthoud Summit",
            "lat": 39.80364,
            "lon": -105.77786
        },
        {
            "id": "345:CO:SNTL",
            "name": "Bison Lake",
            "lat": 39.76458,
            "lon": -107.35628
        },
        {
            "id": "369:CO:SNTL",
            "name": "Brumley",
            "lat": 39.08758,
            "lon": -106.54231
        },
        {
            "id": "378:CO:SNTL",
            "name": "Burro Mountain",
            "lat": 39.87504,
            "lon": -107.59902
        },
        {
            "id": "380:CO:SNTL",
            "name": "Butte",
            "lat": 38.89435,
            "lon": -106.95327
        },
        {
            "id": "387:CO:SNTL",
            "name": "Cascade #2",
            "lat": 37.65751,
            "lon": -107.80287
        },
        {
            "id": "408:CO:SNTL",
            "name": "Columbine",
            "lat": 40.39591,
            "lon": -106.60437
        },
        {
            "id": "409:CO:SNTL",
            "name": "Columbine Pass",
            "lat": 38.41819,
            "lon": -108.38313
        },
        {
            "id": "412:CO:SNTL",
            "name": "Copeland Lake",
            "lat": 40.20733,
            "lon": -105.5695
        },
        {
            "id": "415:CO:SNTL",
            "name": "Copper Mountain",
            "lat": 39.48917,
            "lon": -106.17154
        },
        {
            "id": "426:CO:SNTL",
            "name": "Crosho",
            "lat": 40.16749,
            "lon": -107.05769
        },
        {
            "id": "430:CO:SNTL",
            "name": "Culebra #2",
            "lat": 37.20939,
            "lon": -105.19988
        },
        {
            "id": "431:CO:SNTL",
            "name": "Cumbres Trestle",
            "lat": 37.01877,
            "lon": -106.45275
        },
        {
            "id": "438:CO:SNTL",
            "name": "Deadman Hill",
            "lat": 40.80572,
            "lon": -105.77018
        },
        {
            "id": "457:CO:SNTL",
            "name": "Dry Lake",
            "lat": 40.5337,
            "lon": -106.7814
        },
        {
            "id": "465:CO:SNTL",
            "name": "El Diente Peak",
            "lat": 37.78607,
            "lon": -108.02235
        },
        {
            "id": "467:CO:SNTL",
            "name": "Elk River",
            "lat": 40.84758,
            "lon": -106.96861
        },
        {
            "id": "485:CO:SNTL",
            "name": "Fremont Pass",
            "lat": 39.38014,
            "lon": -106.19784
        },
        {
            "id": "505:CO:SNTL",
            "name": "Grizzly Peak",
            "lat": 39.64646,
            "lon": -105.8694
        },
        {
            "id": "531:CO:SNTL",
            "name": "Hoosier Pass",
            "lat": 39.36092,
            "lon": -106.05999
        },
        {
            "id": "538:CO:SNTL",
            "name": "Idarado",
            "lat": 37.93389,
            "lon": -107.6762
        },
        {
            "id": "542:CO:SNTL",
            "name": "Independence Pass",
            "lat": 39.07543,
            "lon": -106.61154
        },
        {
            "id": "547:CO:SNTL",
            "name": "Ivanhoe",
            "lat": 39.29228,
            "lon": -106.54907
        },
        {
            "id": "551:CO:SNTL",
            "name": "Joe Wright",
            "lat": 40.53285,
            "lon": -105.88747
        },
        {
            "id": "556:CO:SNTL",
            "name": "Kiln",
            "lat": 39.3172,
            "lon": -106.61501
        },
        {
            "id": "564:CO:SNTL",
            "name": "Lake Eldora",
            "lat": 39.93659,
            "lon": -105.59031
        },
        {
            "id": "565:CO:SNTL",
            "name": "Lake Irene",
            "lat": 40.41446,
            "lon": -105.81941
        },
        {
            "id": "580:CO:SNTL",
            "name": "Lily Pond",
            "lat": 37.38028,
            "lon": -106.54823
        },
        {
            "id": "586:CO:SNTL",
            "name": "Lizard Head Pass",
            "lat": 37.79895,
            "lon": -107.92475
        },
        {
            "id": "589:CO:SNTL",
            "name": "Lone Cone",
            "lat": 37.89169,
            "lon": -108.19636
        },
        {
            "id": "602:CO:SNTL",
            "name": "Loveland Basin",
            "lat": 39.67428,
            "lon": -105.90264
        },
        {
            "id": "607:CO:SNTL",
            "name": "Lynx Pass",
            "lat": 40.07832,
            "lon": -106.67095
        },
        {
            "id": "618:CO:SNTL",
            "name": "Mc Clure Pass",
            "lat": 39.12899,
            "lon": -107.28834
        },
        {
            "id": "622:CO:SNTL",
            "name": "Mesa Lakes",
            "lat": 39.05738,
            "lon": -108.05756
        },
        {
            "id": "624:CO:SNTL",
            "name": "Middle Creek",
            "lat": 37.61779,
            "lon": -107.03932
        },
        {
            "id": "629:CO:SNTL",
            "name": "Mineral Creek",
            "lat": 37.84737,
            "lon": -107.72657
        },
        {
            "id": "632:CO:SNTL",
            "name": "Molas Lake",
            "lat": 37.74929,
            "lon": -107.68933
        },
        {
            "id": "658:CO:SNTL",
            "name": "Nast Lake",
            "lat": 39.29695,
            "lon": -106.60786
        },
        {
            "id": "663:CO:SNTL",
            "name": "Niwot",
            "lat": 40.03581,
            "lon": -105.5452
        },
        {
            "id": "669:CO:SNTL",
            "name": "North Lost Trail",
            "lat": 39.07818,
            "lon": -107.14388
        },
        {
            "id": "675:CO:SNTL",
            "name": "Overland Res.",
            "lat": 39.09035,
            "lon": -107.63583
        },
        {
            "id": "680:CO:SNTL",
            "name": "Park Cone",
            "lat": 38.81982,
            "lon": -106.58962
        },
        {
            "id": "682:CO:SNTL",
            "name": "Park Reservoir",
            "lat": 39.04433,
            "lon": -107.87951
        },
        {
            "id": "688:CO:SNTL",
            "name": "Phantom Valley",
            "lat": 40.39803,
            "lon": -105.84606
        },
        {
            "id": "701:CO:SNTL",
            "name": "Porphyry Creek",
            "lat": 38.48864,
            "lon": -106.33967
        },
        {
            "id": "709:CO:SNTL",
            "name": "Rabbit Ears",
            "lat": 40.36735,
            "lon": -106.74118
        },
        {
            "id": "713:CO:SNTL",
            "name": "Red Mountain Pass",
            "lat": 37.89168,
            "lon": -107.71389
        },
        {
            "id": "717:CO:SNTL",
            "name": "Ripple Creek",
            "lat": 40.10844,
            "lon": -107.29383
        },
        {
            "id": "718:CO:SNTL",
            "name": "Roach",
            "lat": 40.87498,
            "lon": -106.04675
        },
        {
            "id": "737:CO:SNTL",
            "name": "Schofield Pass",
            "lat": 39.01467,
            "lon": -107.04933
        },
        {
            "id": "739:CO:SNTL",
            "name": "Scotch Creek",
            "lat": 37.64562,
            "lon": -108.00833
        },
        {
            "id": "762:CO:SNTL",
            "name": "Slumgullion",
            "lat": 37.99076,
            "lon": -107.20392
        },
        {
            "id": "773:CO:SNTL",
            "name": "South Colony",
            "lat": 37.96647,
            "lon": -105.53671
        },
        {
            "id": "780:CO:SNTL",
            "name": "Spud Mountain",
            "lat": 37.69883,
            "lon": -107.77841
        },
        {
            "id": "793:CO:SNTL",
            "name": "Stillwater Creek",
            "lat": 40.22532,
            "lon": -105.9198
        },
        {
            "id": "797:CO:SNTL",
            "name": "Stump Lakes",
            "lat": 37.47647,
            "lon": -107.63348
        },
        {
            "id": "802:CO:SNTL",
            "name": "Summit Ranch",
            "lat": 39.71803,
            "lon": -106.1577
        },
        {
            "id": "825:CO:SNTL",
            "name": "Tower",
            "lat": 40.5374,
            "lon": -106.67655
        },
        {
            "id": "827:CO:SNTL",
            "name": "Trapper Lake",
            "lat": 39.99881,
            "lon": -107.23618
        },
        {
            "id": "829:CO:SNTL",
            "name": "Trinchera",
            "lat": 37.35296,
            "lon": -105.23259
        },
        {
            "id": "838:CO:SNTL",
            "name": "University Camp",
            "lat": 40.03307,
            "lon": -105.57562
        },
        {
            "id": "839:CO:SNTL",
            "name": "Upper Rio Grande",
            "lat": 37.72172,
            "lon": -107.25971
        },
        {
            "id": "840:CO:SNTL",
            "name": "Upper San Juan",
            "lat": 37.48563,
            "lon": -106.83528
        },
        {
            "id": "842:CO:SNTL",
            "name": "Vail Mountain",
            "lat": 39.61765,
            "lon": -106.38019
        },
        {
            "id": "843:CO:SNTL",
            "name": "Vallecito",
            "lat": 37.48524,
            "lon": -107.50748
        },
        {
            "id": "857:CO:SNTL",
            "name": "Whiskey Ck",
            "lat": 37.21423,
            "lon": -105.12262
        },
        {
            "id": "869:CO:SNTL",
            "name": "Willow Creek Pass",
            "lat": 40.34734,
            "lon": -106.0952
        },
        {
            "id": "870:CO:SNTL",
            "name": "Willow Park",
            "lat": 40.43397,
            "lon": -105.73588
        },
        {
            "id": "874:CO:SNTL",
            "name": "Wolf Creek Summit",
            "lat": 37.47903,
            "lon": -106.80234
        },
        {
            "id": "904:CO:SNTL",
            "name": "Columbus Basin",
            "lat": 37.44146,
            "lon": -108.02468
        },
        {
            "id": "905:CO:SNTL",
            "name": "Mancos",
            "lat": 37.43109,
            "lon": -108.17005
        },
        {
            "id": "913:CO:SNTL",
            "name": "Buffalo Park",
            "lat": 40.22838,
            "lon": -106.5962
        },
        {
            "id": "914:CO:SNTL",
            "name": "Medano Pass",
            "lat": 37.85192,
            "lon": -105.43666
        },
        {
            "id": "935:CO:SNTL",
            "name": "Jackwhacker Gulch",
            "lat": 39.57096,
            "lon": -105.80355
        },
        {
            "id": "936:CO:SNTL",
            "name": "Echo Lake",
            "lat": 39.65539,
            "lon": -105.59358
        },
        {
            "id": "937:CO:SNTL",
            "name": "Michigan Creek",
            "lat": 39.43579,
            "lon": -105.91072
        },
        {
            "id": "938:CO:SNTL",
            "name": "Buckskin Joe",
            "lat": 39.30378,
            "lon": -106.11316
        },
        {
            "id": "939:CO:SNTL",
            "name": "Rough And Tumble",
            "lat": 39.02611,
            "lon": -106.08063
        },
        {
            "id": "940:CO:SNTL",
            "name": "Lost Dog",
            "lat": 40.81557,
            "lon": -106.74833
        },
        {
            "id": "970:CO:SNTL",
            "name": "Jones Pass",
            "lat": 39.7645,
            "lon": -105.90655
        }
    ],
    "NV": [
        {
            "id": "1006:NV:SNTL",
            "name": "Lewis Peak",
            "lat": 40.3572,
            "lon": -116.8647
        },
        {
            "id": "1110:NV:SNTL",
            "name": "Rainbow Canyon",
            "lat": 36.2493,
            "lon": -115.62972
        },
        {
            "id": "1111:NV:SNTL",
            "name": "Bristlecone Trail",
            "lat": 36.31575,
            "lon": -115.69543
        },
        {
            "id": "1112:NV:SNTL",
            "name": "Lee Canyon",
            "lat": 36.30537,
            "lon": -115.67508
        },
        {
            "id": "1136:NV:SNTL",
            "name": "Toe Jam",
            "lat": 41.3187,
            "lon": -116.3408
        },
        {
            "id": "1137:NV:SNTL",
            "name": "Vacarro Springs",
            "lat": 39.4495,
            "lon": -115.9834
        },
        {
            "id": "1147:NV:SNTL",
            "name": "Wheeler Peak",
            "lat": 39.00995,
            "lon": -114.31021
        },
        {
            "id": "1150:NV:SNTL",
            "name": "Kalamazoo",
            "lat": 39.5579,
            "lon": -114.62762
        },
        {
            "id": "1152:NV:SNTL",
            "name": "Cave Mountain",
            "lat": 39.16337,
            "lon": -114.6133
        },
        {
            "id": "1155:NV:SNTL",
            "name": "Bird Creek",
            "lat": 39.46138,
            "lon": -114.64863
        },
        {
            "id": "1194:NV:SNTL",
            "name": "Summit Lk",
            "lat": 41.48953,
            "lon": -118.99663
        },
        {
            "id": "1195:NV:SNTL",
            "name": "Golconda",
            "lat": 40.88358,
            "lon": -117.58812
        },
        {
            "id": "1202:NV:SNTL",
            "name": "Tent Mtn Lower",
            "lat": 40.97852,
            "lon": -115.17215
        },
        {
            "id": "1203:NV:SNTL",
            "name": "Stag Mountain",
            "lat": 41.408,
            "lon": -115.4464
        },
        {
            "id": "1204:NV:SNTL",
            "name": "Columbia Basin",
            "lat": 41.67167,
            "lon": -116.07033
        },
        {
            "id": "1205:NV:SNTL",
            "name": "Silver Creek Nv",
            "lat": 39.23305,
            "lon": -114.2429
        },
        {
            "id": "1206:NV:SNTL",
            "name": "Midas",
            "lat": 41.26873,
            "lon": -116.80332
        },
        {
            "id": "1207:NV:SNTL",
            "name": "Merritt Mountain",
            "lat": 41.8927,
            "lon": -115.858
        },
        {
            "id": "1208:NV:SNTL",
            "name": "Snowstorm Mtn",
            "lat": 41.33981,
            "lon": -116.98044
        },
        {
            "id": "1209:NV:SNTL",
            "name": "Corduroy Flat",
            "lat": 38.99651,
            "lon": -115.42478
        },
        {
            "id": "1210:NV:SNTL",
            "name": "Defiance Mines",
            "lat": 39.08527,
            "lon": -114.89977
        },
        {
            "id": "1211:NV:SNTL",
            "name": "Jakes Creek",
            "lat": 41.5687,
            "lon": -115.03243
        },
        {
            "id": "1213:NV:SNTL",
            "name": "White River Nv",
            "lat": 38.94557,
            "lon": -115.37922
        },
        {
            "id": "1242:NV:SNTL",
            "name": "Little Valley",
            "lat": 39.25259,
            "lon": -119.8771
        },
        {
            "id": "1243:NV:SNTL",
            "name": "Dry Creek",
            "lat": 40.8638,
            "lon": -115.22014
        },
        {
            "id": "1244:NV:SNTL",
            "name": "Pole Canyon",
            "lat": 40.86293,
            "lon": -115.12067
        },
        {
            "id": "1262:NV:SNTL",
            "name": "Fry Canyon",
            "lat": 41.58008,
            "lon": -115.9364
        },
        {
            "id": "1272:NV:SNTL",
            "name": "ONeil Creek",
            "lat": 41.86411,
            "lon": -115.08251
        },
        {
            "id": "1310:NV:SNTL",
            "name": "Lamoille Upper",
            "lat": 40.59965,
            "lon": -115.37902
        },
        {
            "id": "2170:NV:SNTL",
            "name": "Porter Canyon",
            "lat": 39.46544,
            "lon": -117.62069
        },
        {
            "id": "321:NV:SNTL",
            "name": "Bear Creek",
            "lat": 41.83391,
            "lon": -115.45278
        },
        {
            "id": "334:NV:SNTL",
            "name": "Berry Creek",
            "lat": 39.31917,
            "lon": -114.62278
        },
        {
            "id": "336:NV:SNTL",
            "name": "Big Bend",
            "lat": 41.76168,
            "lon": -115.6931
        },
        {
            "id": "337:NV:SNTL",
            "name": "Big Creek Sum",
            "lat": 39.29148,
            "lon": -117.11506
        },
        {
            "id": "340:NV:SNTL",
            "name": "Big Meadow",
            "lat": 39.455,
            "lon": -119.9422
        },
        {
            "id": "373:NV:SNTL",
            "name": "Buckskin Lower",
            "lat": 41.75067,
            "lon": -117.53182
        },
        {
            "id": "417:NV:SNTL",
            "name": "Corral Canyon",
            "lat": 40.27551,
            "lon": -115.54017
        },
        {
            "id": "443:NV:SNTL",
            "name": "Diamond Peak",
            "lat": 39.56361,
            "lon": -115.84421
        },
        {
            "id": "445:NV:SNTL",
            "name": "Disaster Peak",
            "lat": 41.96737,
            "lon": -118.18934
        },
        {
            "id": "453:NV:SNTL",
            "name": "Dorsey Basin",
            "lat": 40.89343,
            "lon": -115.21104
        },
        {
            "id": "454:NV:SNTL",
            "name": "Draw Creek",
            "lat": 41.661,
            "lon": -115.3234
        },
        {
            "id": "476:NV:SNTL",
            "name": "Fawn Creek",
            "lat": 41.82098,
            "lon": -116.10153
        },
        {
            "id": "498:NV:SNTL",
            "name": "Granite Peak",
            "lat": 41.67032,
            "lon": -117.56668
        },
        {
            "id": "503:NV:SNTL",
            "name": "Green Mountain",
            "lat": 40.3848,
            "lon": -115.52757
        },
        {
            "id": "527:NV:SNTL",
            "name": "Hole-in-Mountain",
            "lat": 40.94168,
            "lon": -115.0954
        },
        {
            "id": "548:NV:SNTL",
            "name": "Jack Creek Upper",
            "lat": 41.54675,
            "lon": -116.00517
        },
        {
            "id": "549:NV:SNTL",
            "name": "Jacks Peak",
            "lat": 41.5136,
            "lon": -116.0117
        },
        {
            "id": "569:NV:SNTL",
            "name": "Lamance Creek",
            "lat": 41.51542,
            "lon": -117.63197
        },
        {
            "id": "570:NV:SNTL",
            "name": "Lamoille #3",
            "lat": 40.6448,
            "lon": -115.3812
        },
        {
            "id": "573:NV:SNTL",
            "name": "Laurel Draw",
            "lat": 41.77637,
            "lon": -116.02957
        },
        {
            "id": "615:NV:SNTL",
            "name": "Marlette Lake",
            "lat": 39.16395,
            "lon": -119.89672
        },
        {
            "id": "652:NV:SNTL",
            "name": "Mt Rose Ski Area",
            "lat": 39.31573,
            "lon": -119.89473
        },
        {
            "id": "698:NV:SNTL",
            "name": "Pole Creek R.S.",
            "lat": 41.87255,
            "lon": -115.24713
        },
        {
            "id": "746:NV:SNTL",
            "name": "Seventysix Creek",
            "lat": 41.73732,
            "lon": -115.47215
        },
        {
            "id": "750:NV:SNTL",
            "name": "Sheldon",
            "lat": 41.90435,
            "lon": -119.44464
        },
        {
            "id": "811:NV:SNTL",
            "name": "Taylor Canyon",
            "lat": 41.2287,
            "lon": -116.0293
        },
        {
            "id": "849:NV:SNTL",
            "name": "Ward Mountain",
            "lat": 39.13242,
            "lon": -114.95575
        }
    ],
    "MT": [
        {
            "id": "1008:MT:SNTL",
            "name": "Onion Park",
            "lat": 46.91348,
            "lon": -110.8536
        },
        {
            "id": "1009:MT:SNTL",
            "name": "Stringer Creek",
            "lat": 46.9269,
            "lon": -110.90198
        },
        {
            "id": "1105:MT:SNTL",
            "name": "East Boulder Mine",
            "lat": 45.50381,
            "lon": -110.08019
        },
        {
            "id": "1144:MT:SNTL",
            "name": "Blacktail Mtn",
            "lat": 47.98317,
            "lon": -114.35443
        },
        {
            "id": "1190:MT:SNTL",
            "name": "Bassoo Peak",
            "lat": 47.85562,
            "lon": -114.75841
        },
        {
            "id": "1286:MT:SNTL",
            "name": "Slagamelt Lakes",
            "lat": 45.36526,
            "lon": -113.71834
        },
        {
            "id": "1287:MT:SNTL",
            "name": "JL Meadow",
            "lat": 44.77665,
            "lon": -113.12217
        },
        {
            "id": "1311:MT:SNTL",
            "name": "Stryker Basin",
            "lat": 48.68005,
            "lon": -114.66365
        },
        {
            "id": "1312:MT:SNTL",
            "name": "Chicago Ridge",
            "lat": 48.06224,
            "lon": -115.69748
        },
        {
            "id": "1316:MT:SNTL",
            "name": "Elk Peak Alt",
            "lat": 46.47617,
            "lon": -110.72148
        },
        {
            "id": "1322:MT:SNTL",
            "name": "Mill Creek",
            "lat": 45.263,
            "lon": -110.40501
        },
        {
            "id": "307:MT:SNTL",
            "name": "Badger Pass",
            "lat": 48.13091,
            "lon": -113.02311
        },
        {
            "id": "311:MT:SNTL",
            "name": "Banfield Mountain",
            "lat": 48.5712,
            "lon": -115.44573
        },
        {
            "id": "313:MT:SNTL",
            "name": "Barker Lakes",
            "lat": 46.09713,
            "lon": -113.13038
        },
        {
            "id": "315:MT:SNTL",
            "name": "Basin Creek",
            "lat": 45.79737,
            "lon": -112.52047
        },
        {
            "id": "318:MT:SNTL",
            "name": "Beagle Springs",
            "lat": 44.47147,
            "lon": -112.98191
        },
        {
            "id": "328:MT:SNTL",
            "name": "Beaver Creek",
            "lat": 44.94966,
            "lon": -111.35852
        },
        {
            "id": "346:MT:SNTL",
            "name": "Bisson Creek",
            "lat": 47.68386,
            "lon": -113.99895
        },
        {
            "id": "347:MT:SNTL",
            "name": "Black Bear",
            "lat": 44.50832,
            "lon": -111.12803
        },
        {
            "id": "349:MT:SNTL",
            "name": "Black Pine",
            "lat": 46.414,
            "lon": -113.43095
        },
        {
            "id": "355:MT:SNTL",
            "name": "Bloody Dick",
            "lat": 45.16507,
            "lon": -113.50099
        },
        {
            "id": "360:MT:SNTL",
            "name": "Boulder Mountain",
            "lat": 46.5596,
            "lon": -111.28973
        },
        {
            "id": "363:MT:SNTL",
            "name": "Box Canyon",
            "lat": 45.27178,
            "lon": -110.24899
        },
        {
            "id": "365:MT:SNTL",
            "name": "Brackett Creek",
            "lat": 45.89107,
            "lon": -110.93851
        },
        {
            "id": "381:MT:SNTL",
            "name": "Calvert Creek",
            "lat": 45.8838,
            "lon": -113.32553
        },
        {
            "id": "385:MT:SNTL",
            "name": "Carrot Basin",
            "lat": 44.96192,
            "lon": -111.29403
        },
        {
            "id": "403:MT:SNTL",
            "name": "Clover Meadow",
            "lat": 45.01788,
            "lon": -111.8456
        },
        {
            "id": "407:MT:SNTL",
            "name": "Cole Creek",
            "lat": 45.19405,
            "lon": -109.34548
        },
        {
            "id": "410:MT:SNTL",
            "name": "Combination",
            "lat": 46.46523,
            "lon": -113.39358
        },
        {
            "id": "413:MT:SNTL",
            "name": "Copper Bottom",
            "lat": 47.05678,
            "lon": -112.595
        },
        {
            "id": "414:MT:SNTL",
            "name": "Copper Camp",
            "lat": 47.08158,
            "lon": -112.72955
        },
        {
            "id": "427:MT:SNTL",
            "name": "Crystal Lake",
            "lat": 46.78936,
            "lon": -109.51202
        },
        {
            "id": "433:MT:SNTL",
            "name": "Daly Creek",
            "lat": 46.18367,
            "lon": -113.8533
        },
        {
            "id": "436:MT:SNTL",
            "name": "Darkhorse Lake",
            "lat": 45.17368,
            "lon": -113.5846
        },
        {
            "id": "437:MT:SNTL",
            "name": "Deadman Creek",
            "lat": 46.79279,
            "lon": -110.67545
        },
        {
            "id": "448:MT:SNTL",
            "name": "Divide",
            "lat": 44.79317,
            "lon": -112.05645
        },
        {
            "id": "458:MT:SNTL",
            "name": "Dupuyer Creek",
            "lat": 48.06341,
            "lon": -112.7573
        },
        {
            "id": "469:MT:SNTL",
            "name": "Emery Creek",
            "lat": 48.43412,
            "lon": -113.93725
        },
        {
            "id": "480:MT:SNTL",
            "name": "Fisher Creek",
            "lat": 45.06235,
            "lon": -109.94488
        },
        {
            "id": "482:MT:SNTL",
            "name": "Flattop Mtn.",
            "lat": 48.80225,
            "lon": -113.85713
        },
        {
            "id": "487:MT:SNTL",
            "name": "Frohner Meadow",
            "lat": 46.43545,
            "lon": -112.19277
        },
        {
            "id": "500:MT:SNTL",
            "name": "Grave Creek",
            "lat": 48.91453,
            "lon": -114.76663
        },
        {
            "id": "510:MT:SNTL",
            "name": "Hand Creek",
            "lat": 48.30754,
            "lon": -114.84075
        },
        {
            "id": "516:MT:SNTL",
            "name": "Hawkins Lake",
            "lat": 48.9724,
            "lon": -115.95344
        },
        {
            "id": "530:MT:SNTL",
            "name": "Hoodoo Basin",
            "lat": 46.97511,
            "lon": -115.03486
        },
        {
            "id": "562:MT:SNTL",
            "name": "Kraft Creek",
            "lat": 47.42749,
            "lon": -113.77515
        },
        {
            "id": "568:MT:SNTL",
            "name": "Lakeview Ridge",
            "lat": 44.58907,
            "lon": -111.82498
        },
        {
            "id": "576:MT:SNTL",
            "name": "Lemhi Ridge",
            "lat": 44.9938,
            "lon": -113.44399
        },
        {
            "id": "578:MT:SNTL",
            "name": "Lick Creek",
            "lat": 45.5041,
            "lon": -110.96625
        },
        {
            "id": "590:MT:SNTL",
            "name": "Lone Mountain",
            "lat": 45.27412,
            "lon": -111.42692
        },
        {
            "id": "603:MT:SNTL",
            "name": "Lower Twin",
            "lat": 45.50871,
            "lon": -111.92288
        },
        {
            "id": "604:MT:SNTL",
            "name": "Lubrecht Flume",
            "lat": 46.88293,
            "lon": -113.32228
        },
        {
            "id": "609:MT:SNTL",
            "name": "Madison Plateau",
            "lat": 44.58623,
            "lon": -111.11627
        },
        {
            "id": "613:MT:SNTL",
            "name": "Many Glacier",
            "lat": 48.79698,
            "lon": -113.6705
        },
        {
            "id": "635:MT:SNTL",
            "name": "Monument Peak",
            "lat": 45.21759,
            "lon": -110.237
        },
        {
            "id": "646:MT:SNTL",
            "name": "Moss Peak",
            "lat": 47.68497,
            "lon": -113.96239
        },
        {
            "id": "649:MT:SNTL",
            "name": "Mount Lockhart",
            "lat": 47.91727,
            "lon": -112.8238
        },
        {
            "id": "656:MT:SNTL",
            "name": "Mule Creek",
            "lat": 45.40957,
            "lon": -112.95927
        },
        {
            "id": "657:MT:SNTL",
            "name": "N Fk Elk Creek",
            "lat": 46.8716,
            "lon": -113.27725
        },
        {
            "id": "662:MT:SNTL",
            "name": "Nez Perce Camp",
            "lat": 45.73107,
            "lon": -114.48075
        },
        {
            "id": "664:MT:SNTL",
            "name": "Noisy Basin",
            "lat": 48.15668,
            "lon": -113.9463
        },
        {
            "id": "667:MT:SNTL",
            "name": "North Fork Jocko",
            "lat": 47.27258,
            "lon": -113.75631
        },
        {
            "id": "670:MT:SNTL",
            "name": "Northeast Entrance",
            "lat": 45.00568,
            "lon": -110.01411
        },
        {
            "id": "690:MT:SNTL",
            "name": "Pickfoot Creek",
            "lat": 46.57969,
            "lon": -111.26812
        },
        {
            "id": "693:MT:SNTL",
            "name": "Pike Creek",
            "lat": 48.30305,
            "lon": -113.32868
        },
        {
            "id": "696:MT:SNTL",
            "name": "Placer Basin",
            "lat": 45.41905,
            "lon": -110.08844
        },
        {
            "id": "700:MT:SNTL",
            "name": "Porcupine",
            "lat": 46.11192,
            "lon": -110.4696
        },
        {
            "id": "722:MT:SNTL",
            "name": "Rocker Peak",
            "lat": 46.35613,
            "lon": -112.26176
        },
        {
            "id": "725:MT:SNTL",
            "name": "S Fork Shields",
            "lat": 46.08963,
            "lon": -110.43367
        },
        {
            "id": "727:MT:SNTL",
            "name": "Saddle Mtn.",
            "lat": 45.69259,
            "lon": -113.96828
        },
        {
            "id": "753:MT:SNTL",
            "name": "Short Creek",
            "lat": 44.97572,
            "lon": -111.95215
        },
        {
            "id": "754:MT:SNTL",
            "name": "Shower Falls",
            "lat": 45.40125,
            "lon": -110.95758
        },
        {
            "id": "760:MT:SNTL",
            "name": "Skalkaho Summit",
            "lat": 46.24212,
            "lon": -113.7725
        },
        {
            "id": "781:MT:SNTL",
            "name": "Spur Park",
            "lat": 46.77962,
            "lon": -110.62165
        },
        {
            "id": "783:MT:SNTL",
            "name": "Sleeping Woman",
            "lat": 47.17902,
            "lon": -114.33371
        },
        {
            "id": "787:MT:SNTL",
            "name": "Stahl Peak",
            "lat": 48.90902,
            "lon": -114.86298
        },
        {
            "id": "813:MT:SNTL",
            "name": "Tepee Creek",
            "lat": 44.78562,
            "lon": -111.71
        },
        {
            "id": "835:MT:SNTL",
            "name": "Twelvemile Creek",
            "lat": 46.14287,
            "lon": -114.44755
        },
        {
            "id": "836:MT:SNTL",
            "name": "Twin Lakes",
            "lat": 46.1438,
            "lon": -114.5056
        },
        {
            "id": "847:MT:SNTL",
            "name": "Waldron",
            "lat": 47.91998,
            "lon": -112.79087
        },
        {
            "id": "850:MT:SNTL",
            "name": "Warm Springs",
            "lat": 46.27368,
            "lon": -113.164
        },
        {
            "id": "858:MT:SNTL",
            "name": "Whiskey Creek",
            "lat": 44.61088,
            "lon": -111.14998
        },
        {
            "id": "862:MT:SNTL",
            "name": "White Mill",
            "lat": 45.04575,
            "lon": -109.90987
        },
        {
            "id": "876:MT:SNTL",
            "name": "Wood Creek",
            "lat": 47.44847,
            "lon": -112.81428
        },
        {
            "id": "893:MT:SNTL",
            "name": "Tizer Basin",
            "lat": 46.34937,
            "lon": -111.85308
        },
        {
            "id": "901:MT:SNTL",
            "name": "Stuart Mountain",
            "lat": 46.99521,
            "lon": -113.92667
        },
        {
            "id": "903:MT:SNTL",
            "name": "Nevada Ridge",
            "lat": 46.84234,
            "lon": -112.50787
        },
        {
            "id": "916:MT:SNTL",
            "name": "Albro Lake",
            "lat": 45.59723,
            "lon": -111.95902
        },
        {
            "id": "917:MT:SNTL",
            "name": "Rocky Boy",
            "lat": 48.17478,
            "lon": -109.64728
        },
        {
            "id": "918:MT:SNTL",
            "name": "Garver Creek",
            "lat": 48.97523,
            "lon": -115.81915
        },
        {
            "id": "919:MT:SNTL",
            "name": "Daisy Peak",
            "lat": 46.66858,
            "lon": -110.33022
        },
        {
            "id": "924:MT:SNTL",
            "name": "West Yellowstone",
            "lat": 44.65866,
            "lon": -111.09199
        },
        {
            "id": "929:MT:SNTL",
            "name": "Sacajawea",
            "lat": 45.87395,
            "lon": -110.92783
        },
        {
            "id": "930:MT:SNTL",
            "name": "Peterson Meadows",
            "lat": 46.12588,
            "lon": -113.30792
        },
        {
            "id": "932:MT:SNTL",
            "name": "Poorman Creek",
            "lat": 48.12632,
            "lon": -115.6234
        },
        {
            "id": "981:MT:SNTL",
            "name": "Burnt Mtn",
            "lat": 45.2401,
            "lon": -109.45961
        }
    ],
    "WA": [
        {
            "id": "1011:WA:SNTL",
            "name": "MF Nooksack",
            "lat": 48.82441,
            "lon": -121.92947
        },
        {
            "id": "1012:WA:SNTL",
            "name": "Swift Creek",
            "lat": 46.1638,
            "lon": -122.18402
        },
        {
            "id": "1043:WA:SNTL",
            "name": "Sentinel Butte",
            "lat": 48.86133,
            "lon": -118.39843
        },
        {
            "id": "1068:WA:SNTL",
            "name": "Sawmill Ridge",
            "lat": 47.15992,
            "lon": -121.42172
        },
        {
            "id": "1069:WA:SNTL",
            "name": "Lynn Lake",
            "lat": 47.20172,
            "lon": -121.77972
        },
        {
            "id": "1080:WA:SNTL",
            "name": "Brown Top",
            "lat": 48.92753,
            "lon": -121.19717
        },
        {
            "id": "1085:WA:SNTL",
            "name": "Cayuse Pass",
            "lat": 46.86956,
            "lon": -121.53434
        },
        {
            "id": "1104:WA:SNTL",
            "name": "Pepper Creek",
            "lat": 46.10242,
            "lon": -121.95555
        },
        {
            "id": "1107:WA:SNTL",
            "name": "Buckinghorse",
            "lat": 47.7086,
            "lon": -123.45747
        },
        {
            "id": "1109:WA:SNTL",
            "name": "Calamity",
            "lat": 45.90362,
            "lon": -122.21633
        },
        {
            "id": "1126:WA:SNTL",
            "name": "Mt. Tebo",
            "lat": 47.46061,
            "lon": -123.41219
        },
        {
            "id": "1129:WA:SNTL",
            "name": "Indian Rock",
            "lat": 45.99077,
            "lon": -120.80768
        },
        {
            "id": "1159:WA:SNTL",
            "name": "Gold Axe Camp",
            "lat": 48.9516,
            "lon": -118.9864
        },
        {
            "id": "1171:WA:SNTL",
            "name": "Trinity",
            "lat": 48.07471,
            "lon": -120.84989
        },
        {
            "id": "1231:WA:SNTL",
            "name": "Satus Pass",
            "lat": 45.98797,
            "lon": -120.67734
        },
        {
            "id": "1256:WA:SNTL",
            "name": "Gold Mountain",
            "lat": 48.19253,
            "lon": -118.45715
        },
        {
            "id": "1257:WA:SNTL",
            "name": "Skate Creek",
            "lat": 46.64336,
            "lon": -121.83044
        },
        {
            "id": "1259:WA:SNTL",
            "name": "Muckamuck",
            "lat": 48.58526,
            "lon": -119.86624
        },
        {
            "id": "1263:WA:SNTL",
            "name": "Pinto Rock",
            "lat": 46.32318,
            "lon": -121.94219
        },
        {
            "id": "1319:WA:SNTL",
            "name": "Decline Creek",
            "lat": 48.23594,
            "lon": -121.455
        },
        {
            "id": "1345:WA:SNTL",
            "name": "Deer Pass",
            "lat": 48.3325,
            "lon": -121.72133
        },
        {
            "id": "352:WA:SNTL",
            "name": "Blewett Pass",
            "lat": 47.35037,
            "lon": -120.6796
        },
        {
            "id": "375:WA:SNTL",
            "name": "Bumping Ridge",
            "lat": 46.81003,
            "lon": -121.33058
        },
        {
            "id": "376:WA:SNTL",
            "name": "Bunchgrass Mdw",
            "lat": 48.68688,
            "lon": -117.17633
        },
        {
            "id": "418:WA:SNTL",
            "name": "Corral Pass",
            "lat": 47.01872,
            "lon": -121.46464
        },
        {
            "id": "420:WA:SNTL",
            "name": "Cougar Mountain",
            "lat": 47.27666,
            "lon": -121.67138
        },
        {
            "id": "478:WA:SNTL",
            "name": "Fish Lake",
            "lat": 47.53565,
            "lon": -121.08553
        },
        {
            "id": "502:WA:SNTL",
            "name": "Green Lake",
            "lat": 46.54741,
            "lon": -121.17093
        },
        {
            "id": "507:WA:SNTL",
            "name": "Grouse Camp",
            "lat": 47.28107,
            "lon": -120.48771
        },
        {
            "id": "515:WA:SNTL",
            "name": "Harts Pass",
            "lat": 48.72047,
            "lon": -120.6586
        },
        {
            "id": "553:WA:SNTL",
            "name": "June Lake",
            "lat": 46.14778,
            "lon": -122.15413
        },
        {
            "id": "591:WA:SNTL",
            "name": "Lone Pine",
            "lat": 46.27143,
            "lon": -121.96288
        },
        {
            "id": "599:WA:SNTL",
            "name": "Lost Horse",
            "lat": 46.35754,
            "lon": -121.0809
        },
        {
            "id": "606:WA:SNTL",
            "name": "Lyman Lake",
            "lat": 48.19798,
            "lon": -120.91678
        },
        {
            "id": "642:WA:SNTL",
            "name": "Morse Lake",
            "lat": 46.90585,
            "lon": -121.4827
        },
        {
            "id": "644:WA:SNTL",
            "name": "Moses Mtn",
            "lat": 48.36166,
            "lon": -119.08158
        },
        {
            "id": "648:WA:SNTL",
            "name": "Mount Crag",
            "lat": 47.7637,
            "lon": -123.026
        },
        {
            "id": "672:WA:SNTL",
            "name": "Olallie Meadows",
            "lat": 47.37406,
            "lon": -121.44213
        },
        {
            "id": "679:WA:SNTL",
            "name": "Paradise",
            "lat": 46.78266,
            "lon": -121.74767
        },
        {
            "id": "681:WA:SNTL",
            "name": "Park Creek Ridge",
            "lat": 48.44488,
            "lon": -120.91551
        },
        {
            "id": "692:WA:SNTL",
            "name": "Pigtail Peak",
            "lat": 46.62153,
            "lon": -121.38643
        },
        {
            "id": "699:WA:SNTL",
            "name": "Pope Ridge",
            "lat": 47.9909,
            "lon": -120.56622
        },
        {
            "id": "702:WA:SNTL",
            "name": "Potato Hill",
            "lat": 46.3497,
            "lon": -121.51415
        },
        {
            "id": "707:WA:SNTL",
            "name": "Quartz Peak",
            "lat": 47.87927,
            "lon": -117.08938
        },
        {
            "id": "711:WA:SNTL",
            "name": "Rainy Pass",
            "lat": 48.51865,
            "lon": -120.7358
        },
        {
            "id": "728:WA:SNTL",
            "name": "Salmon Meadows",
            "lat": 48.65518,
            "lon": -119.8383
        },
        {
            "id": "734:WA:SNTL",
            "name": "Sasse Ridge",
            "lat": 47.38485,
            "lon": -121.06323
        },
        {
            "id": "748:WA:SNTL",
            "name": "Sheep Canyon",
            "lat": 46.19325,
            "lon": -122.25393
        },
        {
            "id": "776:WA:SNTL",
            "name": "Spencer Meadow",
            "lat": 46.1795,
            "lon": -121.92661
        },
        {
            "id": "777:WA:SNTL",
            "name": "Spirit Lake",
            "lat": 46.26113,
            "lon": -122.1772
        },
        {
            "id": "788:WA:SNTL",
            "name": "Stampede Pass",
            "lat": 47.27427,
            "lon": -121.34162
        },
        {
            "id": "791:WA:SNTL",
            "name": "Stevens Pass",
            "lat": 47.74607,
            "lon": -121.09288
        },
        {
            "id": "804:WA:SNTL",
            "name": "Surprise Lakes",
            "lat": 46.09497,
            "lon": -121.76345
        },
        {
            "id": "817:WA:SNTL",
            "name": "Thunder Basin",
            "lat": 48.52753,
            "lon": -120.9895
        },
        {
            "id": "824:WA:SNTL",
            "name": "Touchet",
            "lat": 46.11868,
            "lon": -117.8505
        },
        {
            "id": "832:WA:SNTL",
            "name": "Trough",
            "lat": 47.23328,
            "lon": -120.29412
        },
        {
            "id": "841:WA:SNTL",
            "name": "Upper Wheeler",
            "lat": 47.28734,
            "lon": -120.37015
        },
        {
            "id": "863:WA:SNTL",
            "name": "White Pass E.S.",
            "lat": 46.64142,
            "lon": -121.38153
        },
        {
            "id": "897:WA:SNTL",
            "name": "Meadows Pass",
            "lat": 47.28312,
            "lon": -121.47197
        },
        {
            "id": "898:WA:SNTL",
            "name": "Mount Gardner",
            "lat": 47.35768,
            "lon": -121.56812
        },
        {
            "id": "899:WA:SNTL",
            "name": "Tinkham Creek",
            "lat": 47.33198,
            "lon": -121.46975
        },
        {
            "id": "908:WA:SNTL",
            "name": "Alpine Meadows",
            "lat": 47.77957,
            "lon": -121.69847
        },
        {
            "id": "909:WA:SNTL",
            "name": "Wells Creek",
            "lat": 48.8661,
            "lon": -121.78976
        },
        {
            "id": "910:WA:SNTL",
            "name": "Elbow Lake",
            "lat": 48.69092,
            "lon": -121.90893
        },
        {
            "id": "911:WA:SNTL",
            "name": "Rex River",
            "lat": 47.30218,
            "lon": -121.60475
        },
        {
            "id": "912:WA:SNTL",
            "name": "Skookum Creek",
            "lat": 47.68433,
            "lon": -121.61007
        },
        {
            "id": "928:WA:SNTL",
            "name": "Huckleberry Creek",
            "lat": 47.06565,
            "lon": -121.58778
        },
        {
            "id": "941:WA:SNTL",
            "name": "Mowich",
            "lat": 46.92833,
            "lon": -121.95232
        },
        {
            "id": "942:WA:SNTL",
            "name": "Burnt Mountain",
            "lat": 47.0444,
            "lon": -121.94032
        },
        {
            "id": "943:WA:SNTL",
            "name": "Dungeness",
            "lat": 47.8722,
            "lon": -123.07879
        },
        {
            "id": "974:WA:SNTL",
            "name": "Waterhole",
            "lat": 47.94485,
            "lon": -123.42594
        },
        {
            "id": "975:WA:SNTL",
            "name": "Swamp Creek",
            "lat": 48.57142,
            "lon": -120.78267
        },
        {
            "id": "984:WA:SNTL",
            "name": "Spruce Springs",
            "lat": 46.18287,
            "lon": -117.54155
        },
        {
            "id": "985:WA:SNTL",
            "name": "Sourdough Gulch",
            "lat": 46.23713,
            "lon": -117.39435
        },
        {
            "id": "990:WA:SNTL",
            "name": "Beaver Pass",
            "lat": 48.8793,
            "lon": -121.2555
        },
        {
            "id": "991:WA:SNTL",
            "name": "Hozomeen Camp",
            "lat": 48.98075,
            "lon": -121.07976
        },
        {
            "id": "998:WA:SNTL",
            "name": "Easy Pass",
            "lat": 48.85933,
            "lon": -121.43895
        },
        {
            "id": "999:WA:SNTL",
            "name": "Marten Ridge",
            "lat": 48.76292,
            "lon": -121.69823
        }
    ],
    "UT": [
        {
            "id": "1013:UT:SNTL",
            "name": "Temple Fork",
            "lat": 41.793,
            "lon": -111.54605
        },
        {
            "id": "1039:UT:SNTL",
            "name": "Cascade Mountain",
            "lat": 40.283,
            "lon": -111.60992
        },
        {
            "id": "1054:UT:SNTL",
            "name": "Farmington Lower",
            "lat": 40.992,
            "lon": -111.81702
        },
        {
            "id": "1056:UT:SNTL",
            "name": "Lightning Ridge",
            "lat": 41.35891,
            "lon": -111.48749
        },
        {
            "id": "1065:UT:SNTL",
            "name": "Gutz Peak",
            "lat": 37.49617,
            "lon": -113.94235
        },
        {
            "id": "1066:UT:SNTL",
            "name": "Gardner Peak",
            "lat": 37.40083,
            "lon": -113.45988
        },
        {
            "id": "1097:UT:SNTL",
            "name": "Timberline",
            "lat": 39.67712,
            "lon": -110.43395
        },
        {
            "id": "1098:UT:SNTL",
            "name": "Usu Doc Daniel",
            "lat": 41.86425,
            "lon": -111.50603
        },
        {
            "id": "1099:UT:SNTL",
            "name": "Jones Corral",
            "lat": 38.07125,
            "lon": -112.16788
        },
        {
            "id": "1113:UT:SNTL",
            "name": "Tony Grove RS",
            "lat": 41.88573,
            "lon": -111.56918
        },
        {
            "id": "1114:UT:SNTL",
            "name": "Garden City Summit",
            "lat": 41.9215,
            "lon": -111.4693
        },
        {
            "id": "1115:UT:SNTL",
            "name": "Klondike Narrows",
            "lat": 41.96769,
            "lon": -111.59713
        },
        {
            "id": "1116:UT:SNTL",
            "name": "Lakefork #3",
            "lat": 40.5502,
            "lon": -110.3529
        },
        {
            "id": "1117:UT:SNTL",
            "name": "Spirit Lk",
            "lat": 40.83868,
            "lon": -110.00527
        },
        {
            "id": "1118:UT:SNTL",
            "name": "Lost Creek Resv",
            "lat": 41.22155,
            "lon": -111.35947
        },
        {
            "id": "1135:UT:SNTL",
            "name": "Burts Miller Ranch",
            "lat": 40.98492,
            "lon": -110.85075
        },
        {
            "id": "1145:UT:SNTL",
            "name": "Kilfoil Creek",
            "lat": 41.24764,
            "lon": -111.41249
        },
        {
            "id": "1146:UT:SNTL",
            "name": "Oak Creek",
            "lat": 39.3485,
            "lon": -112.192
        },
        {
            "id": "1148:UT:SNTL",
            "name": "Panguitch Lake RS",
            "lat": 37.70463,
            "lon": -112.65037
        },
        {
            "id": "1149:UT:SNTL",
            "name": "Fish Lake Utah",
            "lat": 38.50455,
            "lon": -111.76693
        },
        {
            "id": "1151:UT:SNTL",
            "name": "George Creek",
            "lat": 41.91562,
            "lon": -113.41154
        },
        {
            "id": "1153:UT:SNTL",
            "name": "Buckboard Flat",
            "lat": 37.86943,
            "lon": -109.44717
        },
        {
            "id": "1154:UT:SNTL",
            "name": "Brian Head",
            "lat": 37.67994,
            "lon": -112.85674
        },
        {
            "id": "1156:UT:SNTL",
            "name": "Box Springs",
            "lat": 38.49746,
            "lon": -112.00779
        },
        {
            "id": "1162:UT:SNTL",
            "name": "Blacks Fork Jct",
            "lat": 40.95814,
            "lon": -110.5828
        },
        {
            "id": "1163:UT:SNTL",
            "name": "EF Blacks Fork GS",
            "lat": 40.88472,
            "lon": -110.54056
        },
        {
            "id": "1164:UT:SNTL",
            "name": "Wolf Creek Peak",
            "lat": 40.47733,
            "lon": -111.04469
        },
        {
            "id": "1184:UT:SNTL",
            "name": "Gooseberry RS Up",
            "lat": 38.7882,
            "lon": -111.68892
        },
        {
            "id": "1192:UT:SNTL",
            "name": "Buck Pasture",
            "lat": 40.84456,
            "lon": -110.66068
        },
        {
            "id": "1197:UT:SNTL",
            "name": "Yankee Reservoir",
            "lat": 37.74797,
            "lon": -112.77495
        },
        {
            "id": "1214:UT:SNTL",
            "name": "Bevans Cabin",
            "lat": 40.46182,
            "lon": -112.25233
        },
        {
            "id": "1215:UT:SNTL",
            "name": "Lasal Mountain-Lower",
            "lat": 38.48167,
            "lon": -109.29164
        },
        {
            "id": "1216:UT:SNTL",
            "name": "Huntington Horse",
            "lat": 39.61774,
            "lon": -111.30576
        },
        {
            "id": "1217:UT:SNTL",
            "name": "Rees Flat",
            "lat": 39.49667,
            "lon": -111.72508
        },
        {
            "id": "1221:UT:SNTL",
            "name": "GBRC HQ",
            "lat": 39.32019,
            "lon": -111.48827
        },
        {
            "id": "1222:UT:SNTL",
            "name": "GBRC Meadows",
            "lat": 39.30229,
            "lon": -111.45383
        },
        {
            "id": "1223:UT:SNTL",
            "name": "Hobble Creek",
            "lat": 40.18538,
            "lon": -111.35971
        },
        {
            "id": "1224:UT:SNTL",
            "name": "Mt Baldy",
            "lat": 39.13648,
            "lon": -111.50527
        },
        {
            "id": "1225:UT:SNTL",
            "name": "Redden Mine Lwr",
            "lat": 40.67505,
            "lon": -111.21765
        },
        {
            "id": "1226:UT:SNTL",
            "name": "Thistle Flat",
            "lat": 39.23803,
            "lon": -111.51998
        },
        {
            "id": "1227:UT:SNTL",
            "name": "Upper Joes Valley",
            "lat": 39.4155,
            "lon": -111.2491
        },
        {
            "id": "1228:UT:SNTL",
            "name": "Wrigley Creek",
            "lat": 39.13233,
            "lon": -111.35685
        },
        {
            "id": "1236:UT:SNTL",
            "name": "Corral",
            "lat": 39.65795,
            "lon": -110.37906
        },
        {
            "id": "1247:UT:SNTL",
            "name": "Takka Wiiya",
            "lat": 39.74104,
            "lon": -113.98262
        },
        {
            "id": "1248:UT:SNTL",
            "name": "Suu Ranch",
            "lat": 37.59711,
            "lon": -112.92949
        },
        {
            "id": "1249:UT:SNTL",
            "name": "Sunflower Flat",
            "lat": 38.048,
            "lon": -111.33981
        },
        {
            "id": "1261:UT:SNTL",
            "name": "Lonesome Beaver",
            "lat": 38.07,
            "lon": -110.77241
        },
        {
            "id": "1269:UT:SNTL",
            "name": "Mt Pennell",
            "lat": 37.97793,
            "lon": -110.7933
        },
        {
            "id": "1278:UT:SNTL",
            "name": "Bobs Hollow",
            "lat": 38.94569,
            "lon": -112.15349
        },
        {
            "id": "1280:UT:SNTL",
            "name": "Santaquin Meadows",
            "lat": 39.92076,
            "lon": -111.71802
        },
        {
            "id": "1300:UT:SNTL",
            "name": "Powder Mountain",
            "lat": 41.37428,
            "lon": -111.76673
        },
        {
            "id": "1304:UT:SNTL",
            "name": "Gold Basin",
            "lat": 38.46516,
            "lon": -109.26332
        },
        {
            "id": "1308:UT:SNTL",
            "name": "Atwater",
            "lat": 40.59124,
            "lon": -111.63775
        },
        {
            "id": "1309:UT:SNTL",
            "name": "Rockwood GS",
            "lat": 38.67101,
            "lon": -112.3305
        },
        {
            "id": "1321:UT:SNTL",
            "name": "Mill Creek Canyon",
            "lat": 40.69656,
            "lon": -111.67712
        },
        {
            "id": "1323:UT:SNTL",
            "name": "Elk Ridge",
            "lat": 37.82308,
            "lon": -109.77156
        },
        {
            "id": "329:UT:SNTL",
            "name": "Beaver Dams",
            "lat": 39.13683,
            "lon": -111.55813
        },
        {
            "id": "330:UT:SNTL",
            "name": "Beaver Divide",
            "lat": 40.61233,
            "lon": -111.09782
        },
        {
            "id": "332:UT:SNTL",
            "name": "Ben Lomond Peak",
            "lat": 41.37603,
            "lon": -111.94405
        },
        {
            "id": "333:UT:SNTL",
            "name": "Ben Lomond Trail",
            "lat": 41.38291,
            "lon": -111.92103
        },
        {
            "id": "339:UT:SNTL",
            "name": "Big Flat",
            "lat": 38.30183,
            "lon": -112.35672
        },
        {
            "id": "348:UT:SNTL",
            "name": "Black Flat-U.M. Ck",
            "lat": 38.6799,
            "lon": -111.59765
        },
        {
            "id": "364:UT:SNTL",
            "name": "Box Creek",
            "lat": 38.50809,
            "lon": -112.01856
        },
        {
            "id": "366:UT:SNTL",
            "name": "Brighton",
            "lat": 40.59936,
            "lon": -111.58167
        },
        {
            "id": "368:UT:SNTL",
            "name": "Brown Duck",
            "lat": 40.58102,
            "lon": -110.58587
        },
        {
            "id": "371:UT:SNTL",
            "name": "Buck Flat",
            "lat": 39.134,
            "lon": -111.43722
        },
        {
            "id": "374:UT:SNTL",
            "name": "Bug Lake",
            "lat": 41.68541,
            "lon": -111.41987
        },
        {
            "id": "383:UT:SNTL",
            "name": "Camp Jackson",
            "lat": 37.81333,
            "lon": -109.48723
        },
        {
            "id": "390:UT:SNTL",
            "name": "Castle Valley",
            "lat": 37.66098,
            "lon": -112.74093
        },
        {
            "id": "392:UT:SNTL",
            "name": "Chalk Creek #1",
            "lat": 40.85464,
            "lon": -111.04765
        },
        {
            "id": "393:UT:SNTL",
            "name": "Chalk Creek #2",
            "lat": 40.88529,
            "lon": -111.06954
        },
        {
            "id": "396:UT:SNTL",
            "name": "Chepeta",
            "lat": 40.77458,
            "lon": -110.0105
        },
        {
            "id": "399:UT:SNTL",
            "name": "Clear Creek #1",
            "lat": 39.86671,
            "lon": -111.28363
        },
        {
            "id": "400:UT:SNTL",
            "name": "Clear Creek #2",
            "lat": 39.89275,
            "lon": -111.25154
        },
        {
            "id": "432:UT:SNTL",
            "name": "Currant Creek",
            "lat": 40.35747,
            "lon": -111.08993
        },
        {
            "id": "435:UT:SNTL",
            "name": "Daniels-Strawberry",
            "lat": 40.2953,
            "lon": -111.25677
        },
        {
            "id": "444:UT:SNTL",
            "name": "Dills Camp",
            "lat": 39.04554,
            "lon": -111.46875
        },
        {
            "id": "452:UT:SNTL",
            "name": "Donkey Reservoir",
            "lat": 38.2084,
            "lon": -111.47412
        },
        {
            "id": "455:UT:SNTL",
            "name": "Dry Bread Pond",
            "lat": 41.41289,
            "lon": -111.5377
        },
        {
            "id": "461:UT:SNTL",
            "name": "East Willow Creek",
            "lat": 39.31213,
            "lon": -109.53179
        },
        {
            "id": "474:UT:SNTL",
            "name": "Farmington",
            "lat": 40.97462,
            "lon": -111.80975
        },
        {
            "id": "475:UT:SNTL",
            "name": "Farnsworth Lake",
            "lat": 38.77246,
            "lon": -111.67662
        },
        {
            "id": "481:UT:SNTL",
            "name": "Five Points Lake",
            "lat": 40.71785,
            "lon": -110.46721
        },
        {
            "id": "495:UT:SNTL",
            "name": "Gooseberry RS",
            "lat": 38.80034,
            "lon": -111.68333
        },
        {
            "id": "513:UT:SNTL",
            "name": "Lakefork Basin",
            "lat": 40.73785,
            "lon": -110.62121
        },
        {
            "id": "514:UT:SNTL",
            "name": "Harris Flat",
            "lat": 37.48997,
            "lon": -112.57602
        },
        {
            "id": "517:UT:SNTL",
            "name": "Hayden Fork",
            "lat": 40.79669,
            "lon": -110.88472
        },
        {
            "id": "521:UT:SNTL",
            "name": "Hewinta",
            "lat": 40.95009,
            "lon": -110.48419
        },
        {
            "id": "522:UT:SNTL",
            "name": "Hickerson Park",
            "lat": 40.90663,
            "lon": -109.96287
        },
        {
            "id": "528:UT:SNTL",
            "name": "Hole-in-Rock",
            "lat": 40.92167,
            "lon": -110.18623
        },
        {
            "id": "533:UT:SNTL",
            "name": "Horse Ridge",
            "lat": 41.31372,
            "lon": -111.44624
        },
        {
            "id": "543:UT:SNTL",
            "name": "Wilbur Bench",
            "lat": 39.89166,
            "lon": -110.74604
        },
        {
            "id": "557:UT:SNTL",
            "name": "Kimberly Mine",
            "lat": 38.48383,
            "lon": -112.39273
        },
        {
            "id": "559:UT:SNTL",
            "name": "Kings Cabin",
            "lat": 40.71632,
            "lon": -109.54401
        },
        {
            "id": "561:UT:SNTL",
            "name": "Kolob",
            "lat": 37.52664,
            "lon": -113.05386
        },
        {
            "id": "566:UT:SNTL",
            "name": "Lakefork #1",
            "lat": 40.59709,
            "lon": -110.43316
        },
        {
            "id": "572:UT:SNTL",
            "name": "Lasal Mountain",
            "lat": 38.48226,
            "lon": -109.27198
        },
        {
            "id": "579:UT:SNTL",
            "name": "Lily Lake",
            "lat": 40.86493,
            "lon": -110.79813
        },
        {
            "id": "582:UT:SNTL",
            "name": "Little Bear",
            "lat": 41.40562,
            "lon": -111.82607
        },
        {
            "id": "583:UT:SNTL",
            "name": "Little Grassy",
            "lat": 37.48631,
            "lon": -113.84582
        },
        {
            "id": "592:UT:SNTL",
            "name": "Long Flat",
            "lat": 37.51255,
            "lon": -113.39661
        },
        {
            "id": "593:UT:SNTL",
            "name": "Long Valley Jct",
            "lat": 37.48756,
            "lon": -112.51458
        },
        {
            "id": "596:UT:SNTL",
            "name": "Lookout Peak",
            "lat": 40.83731,
            "lon": -111.70965
        },
        {
            "id": "612:UT:SNTL",
            "name": "Mammoth-Cottonwood",
            "lat": 39.68338,
            "lon": -111.31818
        },
        {
            "id": "621:UT:SNTL",
            "name": "Merchant Valley",
            "lat": 38.30285,
            "lon": -112.43637
        },
        {
            "id": "626:UT:SNTL",
            "name": "Midway Valley",
            "lat": 37.56933,
            "lon": -112.83849
        },
        {
            "id": "628:UT:SNTL",
            "name": "Mill-D North",
            "lat": 40.65883,
            "lon": -111.63683
        },
        {
            "id": "631:UT:SNTL",
            "name": "Mining Fork",
            "lat": 40.49384,
            "lon": -112.61141
        },
        {
            "id": "634:UT:SNTL",
            "name": "Monte Cristo",
            "lat": 41.46547,
            "lon": -111.49688
        },
        {
            "id": "643:UT:SNTL",
            "name": "Mosby Mtn.",
            "lat": 40.60798,
            "lon": -109.8881
        },
        {
            "id": "684:UT:SNTL",
            "name": "Parleys Summit",
            "lat": 40.76184,
            "lon": -111.62917
        },
        {
            "id": "686:UT:SNTL",
            "name": "Payson R.S.",
            "lat": 39.92976,
            "lon": -111.63109
        },
        {
            "id": "691:UT:SNTL",
            "name": "Pickle Keg",
            "lat": 39.01219,
            "lon": -111.58259
        },
        {
            "id": "694:UT:SNTL",
            "name": "Pine Creek",
            "lat": 38.88185,
            "lon": -112.24915
        },
        {
            "id": "714:UT:SNTL",
            "name": "Red Pine Ridge",
            "lat": 39.45197,
            "lon": -111.27221
        },
        {
            "id": "720:UT:SNTL",
            "name": "Rock Creek",
            "lat": 40.54875,
            "lon": -110.69292
        },
        {
            "id": "723:UT:SNTL",
            "name": "Rocky Basin-Settleme",
            "lat": 40.44293,
            "lon": -112.22377
        },
        {
            "id": "742:UT:SNTL",
            "name": "Seeley Creek",
            "lat": 39.31042,
            "lon": -111.43297
        },
        {
            "id": "763:UT:SNTL",
            "name": "Smith  Morehouse",
            "lat": 40.78931,
            "lon": -111.09192
        },
        {
            "id": "766:UT:SNTL",
            "name": "Snowbird",
            "lat": 40.56914,
            "lon": -111.65852
        },
        {
            "id": "790:UT:SNTL",
            "name": "Steel Creek Park",
            "lat": 40.90862,
            "lon": -110.50462
        },
        {
            "id": "795:UT:SNTL",
            "name": "Strawberry Divide",
            "lat": 40.16483,
            "lon": -111.20665
        },
        {
            "id": "814:UT:SNTL",
            "name": "Thaynes Canyon",
            "lat": 40.6235,
            "lon": -111.53322
        },
        {
            "id": "820:UT:SNTL",
            "name": "Timpanogos Divide",
            "lat": 40.42817,
            "lon": -111.61633
        },
        {
            "id": "823:UT:SNTL",
            "name": "Tony Grove Lake",
            "lat": 41.89833,
            "lon": -111.62957
        },
        {
            "id": "828:UT:SNTL",
            "name": "Trial Lake",
            "lat": 40.678,
            "lon": -110.94873
        },
        {
            "id": "833:UT:SNTL",
            "name": "Trout Creek",
            "lat": 40.739,
            "lon": -109.6728
        },
        {
            "id": "844:UT:SNTL",
            "name": "Vernon Creek",
            "lat": 39.93667,
            "lon": -112.41478
        },
        {
            "id": "853:UT:SNTL",
            "name": "Webster Flat",
            "lat": 37.575,
            "lon": -112.90155
        },
        {
            "id": "856:UT:SNTL",
            "name": "Parleys Upper",
            "lat": 40.70194,
            "lon": -111.60619
        },
        {
            "id": "864:UT:SNTL",
            "name": "White River #1",
            "lat": 39.9645,
            "lon": -110.98845
        },
        {
            "id": "865:UT:SNTL",
            "name": "Widtsoe #3",
            "lat": 37.83633,
            "lon": -111.88163
        },
        {
            "id": "896:UT:SNTL",
            "name": "Hardscrabble",
            "lat": 40.86833,
            "lon": -111.71865
        },
        {
            "id": "906:UT:SNTL",
            "name": "Dry Fork",
            "lat": 40.56533,
            "lon": -112.17343
        },
        {
            "id": "907:UT:SNTL",
            "name": "Agua Canyon",
            "lat": 37.52217,
            "lon": -112.27118
        },
        {
            "id": "971:UT:SNTL",
            "name": "Parrish Creek",
            "lat": 40.93417,
            "lon": -111.81372
        },
        {
            "id": "972:UT:SNTL",
            "name": "Louis Meadow",
            "lat": 40.83033,
            "lon": -111.76457
        },
        {
            "id": "983:UT:SNTL",
            "name": "Clayton Springs",
            "lat": 37.9725,
            "lon": -111.83355
        },
        {
            "id": "992:UT:SNTL",
            "name": "Bear River RS",
            "lat": 40.8852,
            "lon": -110.8277
        }
    ],
    "WY": [
        {
            "id": "1015:WY:SNTL",
            "name": "Sage Creek Basin",
            "lat": 41.40107,
            "lon": -107.2574
        },
        {
            "id": "1045:WY:SNTL",
            "name": "Crow Creek",
            "lat": 41.22824,
            "lon": -105.38571
        },
        {
            "id": "1046:WY:SNTL",
            "name": "Cinnabar Park",
            "lat": 41.23843,
            "lon": -106.23101
        },
        {
            "id": "1047:WY:SNTL",
            "name": "Little Snake River",
            "lat": 41.07051,
            "lon": -106.94284
        },
        {
            "id": "1082:WY:SNTL",
            "name": "Grand Targhee",
            "lat": 43.77933,
            "lon": -110.92783
        },
        {
            "id": "1119:WY:SNTL",
            "name": "Blackhall Mtn",
            "lat": 41.05623,
            "lon": -106.714
        },
        {
            "id": "1130:WY:SNTL",
            "name": "Castle Creek",
            "lat": 43.6748,
            "lon": -109.3774
        },
        {
            "id": "1131:WY:SNTL",
            "name": "Little Goose",
            "lat": 44.54315,
            "lon": -107.17865
        },
        {
            "id": "1132:WY:SNTL",
            "name": "Soldier Park",
            "lat": 44.34847,
            "lon": -107.0136
        },
        {
            "id": "1133:WY:SNTL",
            "name": "Pocket Creek",
            "lat": 42.7121,
            "lon": -109.4112
        },
        {
            "id": "1134:WY:SNTL",
            "name": "Larsen Creek",
            "lat": 42.58019,
            "lon": -109.08829
        },
        {
            "id": "1196:WY:SNTL",
            "name": "Med Bow",
            "lat": 41.37833,
            "lon": -106.34697
        },
        {
            "id": "309:WY:SNTL",
            "name": "Bald Mtn.",
            "lat": 44.80061,
            "lon": -107.84428
        },
        {
            "id": "314:WY:SNTL",
            "name": "Base Camp",
            "lat": 43.94019,
            "lon": -110.44544
        },
        {
            "id": "317:WY:SNTL",
            "name": "Battle Mountain",
            "lat": 41.05402,
            "lon": -107.26674
        },
        {
            "id": "325:WY:SNTL",
            "name": "Bear Trap Meadow",
            "lat": 43.88743,
            "lon": -107.06135
        },
        {
            "id": "326:WY:SNTL",
            "name": "Beartooth Lake",
            "lat": 44.94307,
            "lon": -109.56743
        },
        {
            "id": "342:WY:SNTL",
            "name": "Big Sandy Opening",
            "lat": 42.6458,
            "lon": -109.25965
        },
        {
            "id": "350:WY:SNTL",
            "name": "Blackwater",
            "lat": 44.37667,
            "lon": -109.79333
        },
        {
            "id": "353:WY:SNTL",
            "name": "Blind Bull Sum",
            "lat": 42.96413,
            "lon": -110.60992
        },
        {
            "id": "358:WY:SNTL",
            "name": "Bone Springs Div",
            "lat": 44.67881,
            "lon": -107.5811
        },
        {
            "id": "367:WY:SNTL",
            "name": "Brooklyn Lake",
            "lat": 41.36038,
            "lon": -106.23038
        },
        {
            "id": "377:WY:SNTL",
            "name": "Burgess Junction",
            "lat": 44.78765,
            "lon": -107.52917
        },
        {
            "id": "379:WY:SNTL",
            "name": "Burroughs Creek",
            "lat": 43.69733,
            "lon": -109.67021
        },
        {
            "id": "384:WY:SNTL",
            "name": "Canyon",
            "lat": 44.71961,
            "lon": -110.51084
        },
        {
            "id": "389:WY:SNTL",
            "name": "Casper Mtn.",
            "lat": 42.73362,
            "lon": -106.31789
        },
        {
            "id": "402:WY:SNTL",
            "name": "Cloud Peak Reservoir",
            "lat": 44.40328,
            "lon": -107.06074
        },
        {
            "id": "405:WY:SNTL",
            "name": "Cold Springs",
            "lat": 43.27676,
            "lon": -109.44585
        },
        {
            "id": "419:WY:SNTL",
            "name": "Cottonwood Creek",
            "lat": 42.6459,
            "lon": -110.81482
        },
        {
            "id": "449:WY:SNTL",
            "name": "Divide Peak",
            "lat": 41.30399,
            "lon": -107.15255
        },
        {
            "id": "451:WY:SNTL",
            "name": "Dome Lake",
            "lat": 44.57462,
            "lon": -107.29537
        },
        {
            "id": "460:WY:SNTL",
            "name": "East Rim Divide",
            "lat": 43.13097,
            "lon": -110.2023
        },
        {
            "id": "468:WY:SNTL",
            "name": "Elkhart Park G.S.",
            "lat": 43.00657,
            "lon": -109.75893
        },
        {
            "id": "472:WY:SNTL",
            "name": "Evening Star",
            "lat": 44.65258,
            "lon": -109.78422
        },
        {
            "id": "497:WY:SNTL",
            "name": "Granite Creek",
            "lat": 43.34298,
            "lon": -110.43495
        },
        {
            "id": "499:WY:SNTL",
            "name": "Grassy Lake",
            "lat": 44.12602,
            "lon": -110.83429
        },
        {
            "id": "501:WY:SNTL",
            "name": "Grave Springs",
            "lat": 43.46643,
            "lon": -107.23977
        },
        {
            "id": "506:WY:SNTL",
            "name": "Gros Ventre Summit",
            "lat": 43.38939,
            "lon": -110.12943
        },
        {
            "id": "509:WY:SNTL",
            "name": "Hams Fork",
            "lat": 42.146,
            "lon": -110.67833
        },
        {
            "id": "512:WY:SNTL",
            "name": "Hansen Sawmill",
            "lat": 44.25602,
            "lon": -106.97983
        },
        {
            "id": "525:WY:SNTL",
            "name": "Hobbs Park",
            "lat": 42.86984,
            "lon": -109.09455
        },
        {
            "id": "544:WY:SNTL",
            "name": "Indian Creek",
            "lat": 42.30023,
            "lon": -110.67753
        },
        {
            "id": "554:WY:SNTL",
            "name": "Kelley R.S.",
            "lat": 42.26554,
            "lon": -110.80181
        },
        {
            "id": "555:WY:SNTL",
            "name": "Kendall R.S.",
            "lat": 43.24922,
            "lon": -110.01671
        },
        {
            "id": "560:WY:SNTL",
            "name": "Kirwin",
            "lat": 43.86067,
            "lon": -109.32163
        },
        {
            "id": "571:WY:SNTL",
            "name": "Laprele Creek",
            "lat": 42.43566,
            "lon": -105.86051
        },
        {
            "id": "577:WY:SNTL",
            "name": "Lewis Lake Divide",
            "lat": 44.20862,
            "lon": -110.66628
        },
        {
            "id": "585:WY:SNTL",
            "name": "Little Warm",
            "lat": 43.50278,
            "lon": -109.752
        },
        {
            "id": "597:WY:SNTL",
            "name": "Loomis Park",
            "lat": 43.17387,
            "lon": -110.14007
        },
        {
            "id": "616:WY:SNTL",
            "name": "Marquette",
            "lat": 44.3016,
            "lon": -109.24019
        },
        {
            "id": "625:WY:SNTL",
            "name": "Middle Powder",
            "lat": 43.62733,
            "lon": -107.18152
        },
        {
            "id": "661:WY:SNTL",
            "name": "New Fork Lake",
            "lat": 43.11265,
            "lon": -109.94947
        },
        {
            "id": "668:WY:SNTL",
            "name": "North French Creek",
            "lat": 41.33087,
            "lon": -106.37558
        },
        {
            "id": "673:WY:SNTL",
            "name": "Old Battle",
            "lat": 41.15426,
            "lon": -106.96926
        },
        {
            "id": "676:WY:SNTL",
            "name": "Owl Creek",
            "lat": 43.65868,
            "lon": -109.00988
        },
        {
            "id": "683:WY:SNTL",
            "name": "Parker Peak",
            "lat": 44.73396,
            "lon": -109.91484
        },
        {
            "id": "689:WY:SNTL",
            "name": "Phillips Bench",
            "lat": 43.51687,
            "lon": -110.91258
        },
        {
            "id": "703:WY:SNTL",
            "name": "Powder River Pass",
            "lat": 44.16188,
            "lon": -107.12622
        },
        {
            "id": "716:WY:SNTL",
            "name": "Reno Hill",
            "lat": 42.57089,
            "lon": -106.08969
        },
        {
            "id": "730:WY:SNTL",
            "name": "Salt River Summit",
            "lat": 42.5075,
            "lon": -110.9099
        },
        {
            "id": "731:WY:SNTL",
            "name": "Sand Lake",
            "lat": 41.4625,
            "lon": -106.281
        },
        {
            "id": "732:WY:SNTL",
            "name": "Sandstone RS",
            "lat": 41.11179,
            "lon": -107.17043
        },
        {
            "id": "751:WY:SNTL",
            "name": "Shell Creek",
            "lat": 44.50012,
            "lon": -107.42947
        },
        {
            "id": "764:WY:SNTL",
            "name": "Snake River Station",
            "lat": 44.13361,
            "lon": -110.66917
        },
        {
            "id": "765:WY:SNTL",
            "name": "Snider Basin",
            "lat": 42.4949,
            "lon": -110.53203
        },
        {
            "id": "772:WY:SNTL",
            "name": "South Brush Creek",
            "lat": 41.3295,
            "lon": -106.5025
        },
        {
            "id": "775:WY:SNTL",
            "name": "South Pass",
            "lat": 42.57314,
            "lon": -108.84324
        },
        {
            "id": "779:WY:SNTL",
            "name": "Spring Creek Divide",
            "lat": 42.52516,
            "lon": -110.66148
        },
        {
            "id": "786:WY:SNTL",
            "name": "St. Lawrence Alt",
            "lat": 43.03312,
            "lon": -109.17021
        },
        {
            "id": "798:WY:SNTL",
            "name": "Sucker Creek",
            "lat": 44.72279,
            "lon": -107.40035
        },
        {
            "id": "806:WY:SNTL",
            "name": "Sylvan Lake",
            "lat": 44.47764,
            "lon": -110.15651
        },
        {
            "id": "807:WY:SNTL",
            "name": "Sylvan Road",
            "lat": 44.47825,
            "lon": -110.03808
        },
        {
            "id": "816:WY:SNTL",
            "name": "Thumb Divide",
            "lat": 44.36917,
            "lon": -110.57717
        },
        {
            "id": "818:WY:SNTL",
            "name": "Tie Creek",
            "lat": 44.81243,
            "lon": -107.41017
        },
        {
            "id": "819:WY:SNTL",
            "name": "Timber Creek",
            "lat": 44.0274,
            "lon": -109.17879
        },
        {
            "id": "822:WY:SNTL",
            "name": "Togwotee Pass",
            "lat": 43.74902,
            "lon": -110.0578
        },
        {
            "id": "826:WY:SNTL",
            "name": "Townsend Creek",
            "lat": 42.69525,
            "lon": -108.89572
        },
        {
            "id": "831:WY:SNTL",
            "name": "Triple Peak",
            "lat": 42.76393,
            "lon": -110.5914
        },
        {
            "id": "837:WY:SNTL",
            "name": "Two Ocean Plateau",
            "lat": 44.15178,
            "lon": -110.22122
        },
        {
            "id": "852:WY:SNTL",
            "name": "Webber Springs",
            "lat": 41.1591,
            "lon": -106.92809
        },
        {
            "id": "859:WY:SNTL",
            "name": "Whiskey Park",
            "lat": 41.00368,
            "lon": -106.90795
        },
        {
            "id": "868:WY:SNTL",
            "name": "Willow Creek",
            "lat": 42.81513,
            "lon": -110.83515
        },
        {
            "id": "872:WY:SNTL",
            "name": "Windy Peak",
            "lat": 42.27991,
            "lon": -105.57782
        },
        {
            "id": "875:WY:SNTL",
            "name": "Wolverine",
            "lat": 44.80417,
            "lon": -109.657
        },
        {
            "id": "878:WY:SNTL",
            "name": "Younts Peak",
            "lat": 43.93225,
            "lon": -109.81775
        },
        {
            "id": "923:WY:SNTL",
            "name": "Deer Park",
            "lat": 42.59076,
            "lon": -108.90273
        },
        {
            "id": "931:WY:SNTL",
            "name": "Big Goose",
            "lat": 44.57922,
            "lon": -107.20068
        },
        {
            "id": "944:WY:SNTL",
            "name": "Gunsight Pass",
            "lat": 43.38332,
            "lon": -109.87815
        },
        {
            "id": "982:WY:SNTL",
            "name": "Cole Canyon",
            "lat": 44.48632,
            "lon": -104.41057
        }
    ],
    "ID": [
        {
            "id": "1016:ID:SNTL",
            "name": "Long Valley",
            "lat": 44.78835,
            "lon": -116.08878
        },
        {
            "id": "1053:ID:SNTL",
            "name": "Myrtle Creek",
            "lat": 48.72263,
            "lon": -116.46312
        },
        {
            "id": "1081:ID:SNTL",
            "name": "Ragged Mountain",
            "lat": 47.85583,
            "lon": -117.03667
        },
        {
            "id": "1142:ID:SNTL",
            "name": "Pierce R.S.",
            "lat": 46.49597,
            "lon": -115.7957
        },
        {
            "id": "1299:ID:SNTL",
            "name": "Pebble Creek",
            "lat": 42.7674,
            "lon": -112.10648
        },
        {
            "id": "1305:ID:SNTL",
            "name": "Fish Ck",
            "lat": 43.55545,
            "lon": -113.71931
        },
        {
            "id": "1306:ID:SNTL",
            "name": "Couch Summit",
            "lat": 43.51762,
            "lon": -114.80214
        },
        {
            "id": "2029:ID:SNTL",
            "name": "Reynolds Creek",
            "lat": 43.28863,
            "lon": -116.8431
        },
        {
            "id": "306:ID:SNTL",
            "name": "Atlanta Summit",
            "lat": 43.7569,
            "lon": -115.23907
        },
        {
            "id": "312:ID:SNTL",
            "name": "Banner Summit",
            "lat": 44.30342,
            "lon": -115.23447
        },
        {
            "id": "319:ID:SNTL",
            "name": "Bear Basin",
            "lat": 44.95222,
            "lon": -116.14293
        },
        {
            "id": "320:ID:SNTL",
            "name": "Bear Canyon",
            "lat": 43.74367,
            "lon": -113.93797
        },
        {
            "id": "323:ID:SNTL",
            "name": "Bear Mountain",
            "lat": 48.30583,
            "lon": -116.07444
        },
        {
            "id": "324:ID:SNTL",
            "name": "Bear Saddle",
            "lat": 44.60533,
            "lon": -116.98097
        },
        {
            "id": "338:ID:SNTL",
            "name": "Big Creek Summit",
            "lat": 44.62621,
            "lon": -115.79561
        },
        {
            "id": "359:ID:SNTL",
            "name": "Bostetter R.S.",
            "lat": 42.16442,
            "lon": -114.19272
        },
        {
            "id": "370:ID:SNTL",
            "name": "Brundage Reservoir",
            "lat": 45.04315,
            "lon": -116.13253
        },
        {
            "id": "382:ID:SNTL",
            "name": "Camas Creek Divide",
            "lat": 43.26548,
            "lon": -115.3453
        },
        {
            "id": "411:ID:SNTL",
            "name": "Cool Creek",
            "lat": 46.76361,
            "lon": -115.29528
        },
        {
            "id": "423:ID:SNTL",
            "name": "Cozy Cove",
            "lat": 44.28846,
            "lon": -115.65508
        },
        {
            "id": "424:ID:SNTL",
            "name": "Crab Creek",
            "lat": 44.437,
            "lon": -111.99384
        },
        {
            "id": "425:ID:SNTL",
            "name": "Crater Meadows",
            "lat": 46.56394,
            "lon": -115.28903
        },
        {
            "id": "439:ID:SNTL",
            "name": "Deadwood Summit",
            "lat": 44.54492,
            "lon": -115.56386
        },
        {
            "id": "450:ID:SNTL",
            "name": "Dollarhide Summit",
            "lat": 43.6025,
            "lon": -114.67417
        },
        {
            "id": "466:ID:SNTL",
            "name": "Elk Butte",
            "lat": 46.83998,
            "lon": -116.12233
        },
        {
            "id": "471:ID:SNTL",
            "name": "Emigrant Summit",
            "lat": 42.36055,
            "lon": -111.56085
        },
        {
            "id": "484:ID:SNTL",
            "name": "Franklin Basin",
            "lat": 42.0505,
            "lon": -111.6012
        },
        {
            "id": "489:ID:SNTL",
            "name": "Galena",
            "lat": 43.87722,
            "lon": -114.6725
        },
        {
            "id": "490:ID:SNTL",
            "name": "Galena Summit",
            "lat": 43.87497,
            "lon": -114.71363
        },
        {
            "id": "492:ID:SNTL",
            "name": "Garfield R.S.",
            "lat": 43.6104,
            "lon": -113.9308
        },
        {
            "id": "493:ID:SNTL",
            "name": "Giveout",
            "lat": 42.4132,
            "lon": -111.1663
        },
        {
            "id": "496:ID:SNTL",
            "name": "Graham Guard Sta.",
            "lat": 43.9538,
            "lon": -115.27387
        },
        {
            "id": "520:ID:SNTL",
            "name": "Hemlock Butte",
            "lat": 46.48111,
            "lon": -115.63361
        },
        {
            "id": "524:ID:SNTL",
            "name": "Hilts Creek",
            "lat": 44.01896,
            "lon": -113.47242
        },
        {
            "id": "534:ID:SNTL",
            "name": "Howell Canyon",
            "lat": 42.32029,
            "lon": -113.61587
        },
        {
            "id": "535:ID:SNTL",
            "name": "Humboldt Gulch",
            "lat": 47.53178,
            "lon": -115.77643
        },
        {
            "id": "537:ID:SNTL",
            "name": "Hyndman",
            "lat": 43.71077,
            "lon": -114.15894
        },
        {
            "id": "546:ID:SNTL",
            "name": "Island Park",
            "lat": 44.4203,
            "lon": -111.38512
        },
        {
            "id": "550:ID:SNTL",
            "name": "Jackson Peak",
            "lat": 44.05092,
            "lon": -115.44322
        },
        {
            "id": "588:ID:SNTL",
            "name": "Lolo Pass",
            "lat": 46.63448,
            "lon": -114.58072
        },
        {
            "id": "594:ID:SNTL",
            "name": "Lookout",
            "lat": 47.45749,
            "lon": -115.70457
        },
        {
            "id": "600:ID:SNTL",
            "name": "Lost Lake",
            "lat": 47.0809,
            "lon": -115.9604
        },
        {
            "id": "601:ID:SNTL",
            "name": "Lost-Wood Divide",
            "lat": 43.82441,
            "lon": -114.26404
        },
        {
            "id": "610:ID:SNTL",
            "name": "Magic Mountain",
            "lat": 42.18071,
            "lon": -114.28665
        },
        {
            "id": "620:ID:SNTL",
            "name": "Meadow Lake",
            "lat": 44.43655,
            "lon": -113.31815
        },
        {
            "id": "623:ID:SNTL",
            "name": "Mica Creek",
            "lat": 47.15045,
            "lon": -116.26643
        },
        {
            "id": "627:ID:SNTL",
            "name": "Mill Creek Summit",
            "lat": 44.47212,
            "lon": -114.48992
        },
        {
            "id": "636:ID:SNTL",
            "name": "Moonshine",
            "lat": 44.41478,
            "lon": -113.39814
        },
        {
            "id": "637:ID:SNTL",
            "name": "Mores Creek Summit",
            "lat": 43.932,
            "lon": -115.66588
        },
        {
            "id": "638:ID:SNTL",
            "name": "Moose Creek",
            "lat": 45.67008,
            "lon": -113.95315
        },
        {
            "id": "639:ID:SNTL",
            "name": "Morgan Creek",
            "lat": 44.84237,
            "lon": -114.26871
        },
        {
            "id": "645:ID:SNTL",
            "name": "Mosquito Ridge",
            "lat": 48.05726,
            "lon": -116.23055
        },
        {
            "id": "650:ID:SNTL",
            "name": "Mountain Meadows",
            "lat": 45.69694,
            "lon": -115.22972
        },
        {
            "id": "654:ID:SNTL",
            "name": "Mud Flat",
            "lat": 42.6004,
            "lon": -116.55925
        },
        {
            "id": "677:ID:SNTL",
            "name": "Oxford Spring",
            "lat": 42.26024,
            "lon": -112.12523
        },
        {
            "id": "695:ID:SNTL",
            "name": "Pine Creek Pass",
            "lat": 43.56998,
            "lon": -111.21157
        },
        {
            "id": "704:ID:SNTL",
            "name": "Prairie",
            "lat": 43.50513,
            "lon": -115.573
        },
        {
            "id": "735:ID:SNTL",
            "name": "Savage Pass",
            "lat": 46.46633,
            "lon": -114.63333
        },
        {
            "id": "738:ID:SNTL",
            "name": "Schweitzer Basin",
            "lat": 48.37428,
            "lon": -116.63917
        },
        {
            "id": "740:ID:SNTL",
            "name": "Secesh Summit",
            "lat": 45.18848,
            "lon": -115.97152
        },
        {
            "id": "741:ID:SNTL",
            "name": "Sedgwick Peak",
            "lat": 42.52463,
            "lon": -111.95632
        },
        {
            "id": "747:ID:SNTL",
            "name": "Shanghi Summit",
            "lat": 46.56603,
            "lon": -115.74216
        },
        {
            "id": "749:ID:SNTL",
            "name": "Sheep Mtn.",
            "lat": 43.2103,
            "lon": -111.68792
        },
        {
            "id": "752:ID:SNTL",
            "name": "Sherwin",
            "lat": 46.95028,
            "lon": -116.33972
        },
        {
            "id": "761:ID:SNTL",
            "name": "Slug Creek Divide",
            "lat": 42.56248,
            "lon": -111.29797
        },
        {
            "id": "769:ID:SNTL",
            "name": "Soldier R.S.",
            "lat": 43.48407,
            "lon": -114.82692
        },
        {
            "id": "770:ID:SNTL",
            "name": "Somsen Ranch",
            "lat": 42.95275,
            "lon": -111.35933
        },
        {
            "id": "774:ID:SNTL",
            "name": "South Mtn.",
            "lat": 42.76476,
            "lon": -116.90029
        },
        {
            "id": "782:ID:SNTL",
            "name": "Puhi Flat",
            "lat": 44.77091,
            "lon": -116.24805
        },
        {
            "id": "792:ID:SNTL",
            "name": "Stickney Mill",
            "lat": 43.86117,
            "lon": -114.20902
        },
        {
            "id": "803:ID:SNTL",
            "name": "Sunset",
            "lat": 47.55545,
            "lon": -115.82422
        },
        {
            "id": "805:ID:SNTL",
            "name": "Swede Peak",
            "lat": 43.626,
            "lon": -113.96887
        },
        {
            "id": "830:ID:SNTL",
            "name": "Trinity Mtn.",
            "lat": 43.62903,
            "lon": -115.43818
        },
        {
            "id": "845:ID:SNTL",
            "name": "Vienna Mine",
            "lat": 43.79942,
            "lon": -114.85273
        },
        {
            "id": "855:ID:SNTL",
            "name": "West Branch",
            "lat": 45.0722,
            "lon": -116.45413
        },
        {
            "id": "860:ID:SNTL",
            "name": "White Elephant",
            "lat": 44.53267,
            "lon": -111.41085
        },
        {
            "id": "867:ID:SNTL",
            "name": "Wildhorse Divide",
            "lat": 42.75743,
            "lon": -112.47783
        },
        {
            "id": "871:ID:SNTL",
            "name": "Wilson Creek",
            "lat": 42.01257,
            "lon": -115.00278
        },
        {
            "id": "895:ID:SNTL",
            "name": "Chocolate Gulch",
            "lat": 43.7685,
            "lon": -114.41812
        },
        {
            "id": "915:ID:SNTL",
            "name": "Schwartz Lake",
            "lat": 44.84618,
            "lon": -113.83732
        },
        {
            "id": "926:ID:SNTL",
            "name": "Smiley Mountain",
            "lat": 43.72718,
            "lon": -113.83402
        },
        {
            "id": "978:ID:SNTL",
            "name": "Bogus Basin",
            "lat": 43.76377,
            "lon": -116.09685
        },
        {
            "id": "979:ID:SNTL",
            "name": "Van Wyck",
            "lat": 44.37665,
            "lon": -116.3366
        },
        {
            "id": "988:ID:SNTL",
            "name": "Hidden Lake",
            "lat": 48.89368,
            "lon": -116.75743
        },
        {
            "id": "989:ID:SNTL",
            "name": "Moscow Mountain",
            "lat": 46.805,
            "lon": -116.8535
        }
    ],
    "NM": [
        {
            "id": "1017:NM:SNTL",
            "name": "Vacas Locas",
            "lat": 36.02653,
            "lon": -106.81361
        },
        {
            "id": "1034:NM:SNTL",
            "name": "Sierra Blanca",
            "lat": 33.40682,
            "lon": -105.79467
        },
        {
            "id": "1048:NM:SNTL",
            "name": "Mcknight Cabin",
            "lat": 33.00796,
            "lon": -107.86982
        },
        {
            "id": "1083:NM:SNTL",
            "name": "Tres Ritos",
            "lat": 36.1279,
            "lon": -105.52706
        },
        {
            "id": "1138:NM:SNTL",
            "name": "Navajo Whiskey Ck",
            "lat": 36.17716,
            "lon": -108.94556
        },
        {
            "id": "1168:NM:SNTL",
            "name": "Taos Powderhorn",
            "lat": 36.58195,
            "lon": -105.45617
        },
        {
            "id": "1169:NM:SNTL",
            "name": "Shuree",
            "lat": 36.78765,
            "lon": -105.2392
        },
        {
            "id": "1170:NM:SNTL",
            "name": "Palo",
            "lat": 36.40869,
            "lon": -105.33038
        },
        {
            "id": "1172:NM:SNTL",
            "name": "San Antonio Sink",
            "lat": 36.85967,
            "lon": -106.22657
        },
        {
            "id": "1173:NM:SNTL",
            "name": "Garita Peak",
            "lat": 36.00469,
            "lon": -106.54805
        },
        {
            "id": "1254:NM:SNTL",
            "name": "Rio Santa Barbara",
            "lat": 36.07196,
            "lon": -105.62949
        },
        {
            "id": "1307:NM:SNTL",
            "name": "Taos Pueblo",
            "lat": 36.54099,
            "lon": -105.35944
        },
        {
            "id": "316:NM:SNTL",
            "name": "Bateman",
            "lat": 36.51174,
            "lon": -106.31543
        },
        {
            "id": "394:NM:SNTL",
            "name": "Chamita",
            "lat": 36.95606,
            "lon": -106.65723
        },
        {
            "id": "486:NM:SNTL",
            "name": "Frisco Divide",
            "lat": 33.73687,
            "lon": -108.94327
        },
        {
            "id": "491:NM:SNTL",
            "name": "Gallegos Peak",
            "lat": 36.19418,
            "lon": -105.55742
        },
        {
            "id": "532:NM:SNTL",
            "name": "Hopewell",
            "lat": 36.71632,
            "lon": -106.2637
        },
        {
            "id": "595:NM:SNTL",
            "name": "Lookout Mountain",
            "lat": 33.36089,
            "lon": -107.83203
        },
        {
            "id": "665:NM:SNTL",
            "name": "North Costilla",
            "lat": 36.99396,
            "lon": -105.25988
        },
        {
            "id": "708:NM:SNTL",
            "name": "Quemazon",
            "lat": 35.92195,
            "lon": -106.39179
        },
        {
            "id": "715:NM:SNTL",
            "name": "Red River Pass #2",
            "lat": 36.69935,
            "lon": -105.34145
        },
        {
            "id": "744:NM:SNTL",
            "name": "Senorita Divide #2",
            "lat": 36.00152,
            "lon": -106.83408
        },
        {
            "id": "755:NM:SNTL",
            "name": "Signal Peak",
            "lat": 32.92342,
            "lon": -108.14546
        },
        {
            "id": "757:NM:SNTL",
            "name": "Silver Creek Divide",
            "lat": 33.3696,
            "lon": -108.70711
        },
        {
            "id": "854:NM:SNTL",
            "name": "Wesner Springs",
            "lat": 35.77584,
            "lon": -105.54337
        },
        {
            "id": "921:NM:SNTL",
            "name": "Elk Cabin",
            "lat": 35.7073,
            "lon": -105.80584
        },
        {
            "id": "922:NM:SNTL",
            "name": "Santa Fe",
            "lat": 35.77154,
            "lon": -105.78487
        },
        {
            "id": "933:NM:SNTL",
            "name": "Rice Park",
            "lat": 35.23658,
            "lon": -108.27404
        },
        {
            "id": "934:NM:SNTL",
            "name": "Tolby",
            "lat": 36.47498,
            "lon": -105.19534
        }
    ],
    "CA": [
        {
            "id": "1049:CA:SNTL",
            "name": "Forestdale Creek",
            "lat": 38.68245,
            "lon": -119.9597
        },
        {
            "id": "1050:CA:SNTL",
            "name": "Horse Meadow",
            "lat": 38.83652,
            "lon": -119.88732
        },
        {
            "id": "1051:CA:SNTL",
            "name": "Burnside Lake",
            "lat": 38.71943,
            "lon": -119.8942
        },
        {
            "id": "1052:CA:SNTL",
            "name": "Summit Meadow",
            "lat": 38.39747,
            "lon": -119.53522
        },
        {
            "id": "1067:CA:SNTL",
            "name": "Carson Pass",
            "lat": 38.6927,
            "lon": -120.0022
        },
        {
            "id": "1258:CA:SNTL",
            "name": "State Line",
            "lat": 41.98609,
            "lon": -120.71574
        },
        {
            "id": "1277:CA:SNTL",
            "name": "Fredonyer Peak",
            "lat": 40.68799,
            "lon": -120.60805
        },
        {
            "id": "1317:CA:SNTL",
            "name": "Willow Flat CA",
            "lat": 38.27203,
            "lon": -119.45124
        },
        {
            "id": "1331:CA:SNTL",
            "name": "Lost Lakes",
            "lat": 38.64745,
            "lon": -119.95141
        },
        {
            "id": "301:CA:SNTL",
            "name": "Adin Mtn",
            "lat": 41.23583,
            "lon": -120.79192
        },
        {
            "id": "356:CA:SNTL",
            "name": "Blue Lakes",
            "lat": 38.60801,
            "lon": -119.92455
        },
        {
            "id": "391:CA:SNTL",
            "name": "Cedar Pass",
            "lat": 41.58216,
            "lon": -120.30253
        },
        {
            "id": "428:CA:SNTL",
            "name": "Css Lab",
            "lat": 39.32565,
            "lon": -120.36807
        },
        {
            "id": "446:CA:SNTL",
            "name": "Dismal Swamp",
            "lat": 41.99127,
            "lon": -120.18033
        },
        {
            "id": "462:CA:SNTL",
            "name": "Ebbetts Pass",
            "lat": 38.5497,
            "lon": -119.80468
        },
        {
            "id": "463:CA:SNTL",
            "name": "Echo Peak",
            "lat": 38.849,
            "lon": -120.0795
        },
        {
            "id": "473:CA:SNTL",
            "name": "Fallen Leaf",
            "lat": 38.93403,
            "lon": -120.0545
        },
        {
            "id": "508:CA:SNTL",
            "name": "Hagans Meadow",
            "lat": 38.8519,
            "lon": -119.9374
        },
        {
            "id": "518:CA:SNTL",
            "name": "Heavenly Valley",
            "lat": 38.92431,
            "lon": -119.91641
        },
        {
            "id": "539:CA:SNTL",
            "name": "Independence Camp",
            "lat": 39.45269,
            "lon": -120.29367
        },
        {
            "id": "540:CA:SNTL",
            "name": "Independence Creek",
            "lat": 39.49001,
            "lon": -120.28226
        },
        {
            "id": "541:CA:SNTL",
            "name": "Independence Lake",
            "lat": 39.42752,
            "lon": -120.31342
        },
        {
            "id": "574:CA:SNTL",
            "name": "Leavitt Lake",
            "lat": 38.27594,
            "lon": -119.61281
        },
        {
            "id": "575:CA:SNTL",
            "name": "Leavitt Meadows",
            "lat": 38.30367,
            "lon": -119.55111
        },
        {
            "id": "587:CA:SNTL",
            "name": "Lobdell Lake",
            "lat": 38.43745,
            "lon": -119.36572
        },
        {
            "id": "633:CA:SNTL",
            "name": "Monitor Pass",
            "lat": 38.6683,
            "lon": -119.6087
        },
        {
            "id": "697:CA:SNTL",
            "name": "Poison Flat",
            "lat": 38.50576,
            "lon": -119.62624
        },
        {
            "id": "724:CA:SNTL",
            "name": "Rubicon #2",
            "lat": 38.99927,
            "lon": -120.13139
        },
        {
            "id": "771:CA:SNTL",
            "name": "Sonora Pass",
            "lat": 38.31021,
            "lon": -119.6003
        },
        {
            "id": "778:CA:SNTL",
            "name": "Spratt Creek",
            "lat": 38.66627,
            "lon": -119.81741
        },
        {
            "id": "784:CA:SNTL",
            "name": "Palisades Tahoe",
            "lat": 39.18986,
            "lon": -120.26576
        },
        {
            "id": "809:CA:SNTL",
            "name": "Tahoe City Cross",
            "lat": 39.17162,
            "lon": -120.15362
        },
        {
            "id": "834:CA:SNTL",
            "name": "Truckee #2",
            "lat": 39.30087,
            "lon": -120.18407
        },
        {
            "id": "846:CA:SNTL",
            "name": "Virginia Lakes Ridge",
            "lat": 38.07298,
            "lon": -119.23433
        },
        {
            "id": "848:CA:SNTL",
            "name": "Ward Creek #3",
            "lat": 39.13545,
            "lon": -120.21865
        },
        {
            "id": "977:CA:SNTL",
            "name": "Crowder Flat",
            "lat": 41.89318,
            "lon": -120.75202
        }
    ],
    "AZ": [
        {
            "id": "1121:AZ:SNTL",
            "name": "Fort Valley",
            "lat": 35.26773,
            "lon": -111.74479
        },
        {
            "id": "1125:AZ:SNTL",
            "name": "Mormon Mtn Summit",
            "lat": 34.96942,
            "lon": -111.50868
        },
        {
            "id": "1127:AZ:SNTL",
            "name": "Nutrioso",
            "lat": 33.89791,
            "lon": -109.15465
        },
        {
            "id": "1139:AZ:SNTL",
            "name": "Chalender",
            "lat": 35.26238,
            "lon": -112.06221
        },
        {
            "id": "1140:AZ:SNTL",
            "name": "Baker Butte Smt",
            "lat": 34.45552,
            "lon": -111.38262
        },
        {
            "id": "1143:AZ:SNTL",
            "name": "Beaver Spring",
            "lat": 36.32671,
            "lon": -109.05702
        },
        {
            "id": "1212:AZ:SNTL",
            "name": "Bar M",
            "lat": 34.86142,
            "lon": -111.60497
        },
        {
            "id": "1271:AZ:SNTL",
            "name": "Hawley Lake",
            "lat": 33.97121,
            "lon": -109.76531
        },
        {
            "id": "308:AZ:SNTL",
            "name": "Baker Butte",
            "lat": 34.45654,
            "lon": -111.40651
        },
        {
            "id": "310:AZ:SNTL",
            "name": "Baldy",
            "lat": 33.97845,
            "lon": -109.50357
        },
        {
            "id": "416:AZ:SNTL",
            "name": "Coronado Trail",
            "lat": 33.80418,
            "lon": -109.15352
        },
        {
            "id": "488:AZ:SNTL",
            "name": "Fry",
            "lat": 35.07356,
            "lon": -111.84477
        },
        {
            "id": "511:AZ:SNTL",
            "name": "Hannagan Meadows",
            "lat": 33.65352,
            "lon": -109.30877
        },
        {
            "id": "519:AZ:SNTL",
            "name": "Heber",
            "lat": 34.31254,
            "lon": -110.75433
        },
        {
            "id": "617:AZ:SNTL",
            "name": "Maverick Fork",
            "lat": 33.92123,
            "lon": -109.45872
        },
        {
            "id": "640:AZ:SNTL",
            "name": "Mormon Mountain",
            "lat": 34.94141,
            "lon": -111.51864
        },
        {
            "id": "705:AZ:SNTL",
            "name": "Promontory",
            "lat": 34.36848,
            "lon": -111.01088
        },
        {
            "id": "861:AZ:SNTL",
            "name": "White Horse Lake",
            "lat": 35.14189,
            "lon": -112.14966
        },
        {
            "id": "866:AZ:SNTL",
            "name": "Wildcat",
            "lat": 33.74347,
            "lon": -109.48078
        },
        {
            "id": "877:AZ:SNTL",
            "name": "Workman Creek",
            "lat": 33.81259,
            "lon": -110.91852
        },
        {
            "id": "902:AZ:SNTL",
            "name": "Beaver Head",
            "lat": 33.69115,
            "lon": -109.21685
        },
        {
            "id": "927:AZ:SNTL",
            "name": "Snowslide Canyon",
            "lat": 35.34179,
            "lon": -111.65084
        },
        {
            "id": "969:AZ:SNTL",
            "name": "Happy Jack",
            "lat": 34.74594,
            "lon": -111.41219
        }
    ],
    "SD": [
        {
            "id": "354:SD:SNTL",
            "name": "Blind Park",
            "lat": 44.10772,
            "lon": -103.97688
        },
        {
            "id": "920:SD:SNTL",
            "name": "North Rapid Creek",
            "lat": 44.20617,
            "lon": -103.78758
        }
    ]
};

// `SNOTEL` is intentionally global so pages can access it directly.
