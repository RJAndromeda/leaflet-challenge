const url = "https://api.planningalerts.org.au/authorities/glen_eira/applications.json?key=W1vxCAtsTPUYR5LCFdvb"
// REGEX to try to encapsulate all the possible data: /subdivision|~*proposed$'dwelling|~*demolition|\?(Development)|(double storey|triple storey|multi storey)/mgi (the MGI bit is multiline global and insensitive as the regex1010 settings for the flags, so may need to refine this somewhat when working in SQL)
d3.
// This one might be better: /(mixed use|apartments)|subdivision|~*proposed$'dwelling|~*demolition|\?(Development)|(double storey|triple storey|multi storey|two storey)/mgi

json(url).then(function(data) {
    console.log(data);
    createFeatures(data.features);
});
function createFeatures(Glen_Eira_Data) {
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
      }
      let Glen_Eira = L.geoJSON(Glen_Eira_Data, {
        onEachFeature: onEachFeature
      });
    
      // Send our Glen_Eira layer to the createMap function/
      createMap(Glen_Eira);
    }
    
    function createMap(Glen_Eira) {
   // Create the base layers.
   let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    let overlayMaps = {
      LGA_Glen_Eira: Glen_Eira
    };
  // Creating our initial map object:
  // We set the longitude, latitude, and starting zoom level.
  // This gets inserted into the div with an id of "map".
  let myMap = L.map("map", {
      center: [-37.840935, 144.946457],
      zoom: 10,
      layers: [street, Glen_Eira]
    });
    
  // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
  }