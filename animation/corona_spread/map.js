var map;

function initMap() {
    //zoom level must be at 3.485 for a render screen of 2000x2000 pixels (web mercator is a square!)
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 3.485
    });
    readCoronaData();
}
