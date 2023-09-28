// The URL - a constant to be set and used in the functions when required
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Log the data and create the features:
d3.json(url).then(function(data) {
  console.log(data);
  createFeatures(data.features);
});


// SET THE FUNCTIONS

function markerSize(magnitude) {
  return magnitude * 1000;
};

// marker colour, by depth ( colours from: https://colorbrewer2.org/#type=sequential&scheme=PuRd&n=5)
function colour(depth){
  if (depth < 20) return "#f1eef6";
  else if (depth < 40) return "#d7b5d8";
  else if (depth < 60) return "#df65b0";
  else if (depth < 80) return "#dd1c77";
  else if (depth < 100) return "#980043";
  else return "#edf8fb";
};

 


// features function:
function createFeatures(earthquakeData) {
 
// Give each feature a popup:
  function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}</p>`);
    }
   // Earthquake markers
  function createCircleMarker(features, latlng) {
    let options = {
    radius : features.properties.mag*3,
    color : colour(features.geometry.coordinates[2]),
    fillColor : colour(features.geometry.coordinates[2]),
    fillOpacity : 0.5,
    weight : 1
    }
    return L.circleMarker(latlng,options);
  }
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: createCircleMarker
      // function(feature, latlng)
    });

   // The earthquake map:
  createMap(earthquakes);
  }


 
 


// Create a legend:
let legend = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend".
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h3 style = 'text-align: center'>Depth</h3>"
  depth = [0, 10, 30, 50, 70, 90]
  labels = []
  for (let i = 0; i < depth.length; i++) {
    labels.push('<ul style="background-color:' + colour(depth[i] + 1) + '"></i> ' + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+')); 
  }
  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;

};


function createMap(earthquakes) {
  
  // Create the  layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   });
 

    // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street

  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

// This is the Div for "map". This can come at the start or the bottom of the code.
// Try and get it so the map does not repeat:
let myMap = L.map("map", {
  center: [30, 20],
  zoom: 2.505,
  layers: [street]
});

  
// Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  // Add the info legend to the map.
legend.addTo(myMap);

}

