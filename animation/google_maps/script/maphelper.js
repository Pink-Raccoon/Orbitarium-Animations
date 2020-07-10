var map;

function initMap() {
    var earthcenter = { lat: 0, lng: 0 };
    map = new google.maps.Map(
        document.getElementById('map'),
        { zoom: 1, center: earthcenter }
    );
    let flights = getData();
}

function printMarkers(markers){
    markers.forEach(
        function (element) {
            element.setMap(map);
        }
    )
}