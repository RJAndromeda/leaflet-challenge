// The URL - a constant to be set and used in the functions when required
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"

// Log the data and create the features:
d3.json(url).then(function(data) {
    console.log(data);
    createFeatures(data.features);
});


// SET THE FUNCTIONS
// The earthquake map:
function createMap(earthquakes) {
  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   })
 
   let hot = L.tileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
   });


// marker colour, by depth ( colours from: https://colorbrewer2.org/#type=sequential&scheme=PuRd&n=5)
function colour(depth){
  if (depth < 20) return "#f1eef6";
  else if (depth < 40) return "#d7b5d8";
  else if (depth < 60) return "#df65b0";
  else if (depth < 80) return "#dd1c77";
  else if (depth < 100) return "#980043";
  else return "#edf8fb";
}

// size of the bubble (will depend on the data as to what looks good/differentiated - less strong will need bigger)
function markerSize(magnitude){
  return magnitude * 100;
}

// features function:
function createFeatures(earthquakeData) {
 
// Give each feature a popup:
  function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}</p>`);
    }
  
    // Create the markers for the earthquakes. Need depth and magnitude, lat, lng. Need to do this with the 3rd (ie [2]) position
  function createCircleMarker(feature, latlng) {
    let options = {
        radius : markerSize(features.properties.mag),
        color : colour(features.geometry.coordinates[2]),
        fillColor : colour(features.geometry.coordinates[2]),
        fillOpacity : 0.5,
        stroke : true,
        weight : 5

      }
      return L.circleMarker(latlng,options);
    }


    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: createCircleMarker,
      // function(feature, latlng)
  });

    //Earthquakes layer to the createMap function:
    createMap(earthquakes);
  }
  
 // This is the starting map. The Div is set for "map". This can come at the start or the bottom of the code.
// Try and get it so the map does not repeat:
let myMap = L.map("map", {
  center: [30, 20],
  zoom: 2.505,
  layers: [street, earthquakes]
});


  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Hot Map": hot,
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  
// Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


// Create a legend:
let info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend".
info.onAdd = function() {
  let div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map.
info.addTo(map);


}


// FROM: https://cran.r-project.org/web/packages/leaflet/leaflet.pdf
// addCircleMarkers(
// map,
// lng = NULL,
// lat = NULL,
// radius = 10,
// layerId = NULL,
// group = NULL,
// stroke = TRUE,
// color = "#03F",
// weight = 5,
// opacity = 0.5,
// fill = TRUE,
// fillColor = color,
// fillOpacity = 0.2,
// dashArray = NULL,
// popup = NULL,
// popupOptions = NULL,
// label = NULL,
// labelOptions = NULL,
// options = pathOptions(),
// clusterOptions = NULL,
// clusterId = NULL,
// // 