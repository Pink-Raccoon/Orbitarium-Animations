var map;
var latitudes = [];
var longitudes = [];

function initMap() {
  //zoom level must be at 3.485 for a render screen of 2000x2000 pixels (web mercator is a square!)
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 3.485
  });
  getData();
  
}

function getData(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4){
            paintSwitzerland(xhr.responseText);
        }
    };;
    xhr.open('GET', 'http://localhost:50330/api/animation');
    xhr.send()
}

function paintSwitzerland(data){
    var parsed = JSON.parse(JSON.parse(data));
    console.log(parsed.Name);
    console.log(parsed.Path);

    const switzerland = new google.maps.Polygon({
        paths: parsed.Path,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35
      });
      switzerland.setMap(map);
}