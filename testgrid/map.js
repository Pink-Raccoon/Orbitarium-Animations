var map;
var latitudes = [];
var longitudes = [];

function initMap() {
  //zoom level must be at 3.485 for a render screen of 2000x2000 pixels (web mercator is a square!)
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 3.485
  });
  generateLatitudeLines();
  generateLongitudeLines();
  
}

function generateLatitudeLines(){
    for (i = -90; i < 100; i+=10) {
        var point1 = new google.maps.LatLng({lat: i, lng: -180});
        var point2 = new google.maps.LatLng({lat: i, lng: 0});
        var point3 = new google.maps.LatLng({lat: i, lng: 180});
        var color;
        var weight;
        if(i == 0){
            color = '#FF0000';
            weight = 5;
        } else {
            color = '#0000FF';
            weight = 2;
        }
        var latLine = new google.maps.Polyline({
            path: [point1, point2, point3],
            geodesic: false,
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: weight
        });
        latitudes.push(latLine);
        latLine.setMap(map);
    } 
}

function generateLongitudeLines(){
    for (i = -180; i < 190; i+=20) {
        var point1 = new google.maps.LatLng({lat: -90, lng: i});
        var point2 = new google.maps.LatLng({lat: 0, lng: i});
        var point3 = new google.maps.LatLng({lat: 90, lng: i});
        var color;
        var weight;
        if(i == 0){
            color = '#FF0000';
            weight = 5;
        } else {
            color = '#0000FF';
            weight = 2;
        }
        var longLine = new google.maps.Polyline({
            path: [point1, point2, point3],
            geodesic: false,
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: weight
        });
        latitudes.push(longLine);
        longLine.setMap(map);
    } 
}