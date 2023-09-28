# leaflet-challenge




Created and submitted as Week 15 challenge for Monash University Data Analytics Boot Camp (September 2023).

## Table of Contents

## Tasks 

- Part 1: Create the Earthquake Visualisation

To start off, went to the USGS GeoJSON Feed to choose: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson (Past 7 days all earthquakes)

Using Leaflet, I designed a map that plots the earthquakes based on longitude and latitude.

Then made sure that I used the 3rd coordinate, depth, so that the size and depth is reflected in colour and size.

Popups were bound, to ensure that the details of the location, the time, and the magnitude are show on on click.

Created a legend that shows the depth colour scale.



## Comments & References

In addition to course materials, I have also reviewed the MongoDB manual, StackOverflow and other general information sources for problem-solving for particular errors in my code. 

I did not manage to get the dots to have much variation in size, given the types of earthquakes that have occurred in the past week. This could probably have been done with an additional formula for the radius: 

function createCircleMarker(features, latlng) {

 let options = {

 radius : features.properties.mag*7, >>>>> **This could perhaps be something by the square root, rather than a simple *7.** 

  color : colour(features.geometry.coordinates[2]),

  fillColor : colour(features.geometry.coordinates[2]),

  fillOpacity : 0.5,

  weight : 1



https://cran.r-project.org/web/packages/leaflet/leaflet.pdf  https://leafletjs.com/reference.html#layer: for additional information on popups, layers, legends, and additional fields above what learnt in class.

 Also http://rstudio.github.io/leaflet/legends.html for more on legends, and 

https://gis.stackexchange.com/questions/429125/leaflet-how-pointtolayer-function-works-for-different-geometries#:~:text=Description%20from%20pointToLayer%20Leaflet%20docs,point%20feature%20and%20its%20LatLng. for information on pointToLayer.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else for if else statements refresher when building the colour choice. 

Street Map and ColorBrewer attributed on the map directly.

Thanks to Will Dady for stepping me through how to check my own code more efficiently in VSCode.



