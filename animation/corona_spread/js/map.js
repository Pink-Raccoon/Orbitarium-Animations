var map;

function initMap() {
    //zoom level must be at 3.0768155970508308922315362613328397021 for a render screen of 2160x2160 pixels (web mercator is a square!)
    //at zoom level 0, the world map is projected using a single tile of 256x256 pixels. Manycam renders 4k @ 3840x2160 pixels.
    //we need the mercator projection of the world only once on a resolution of 2160x2160 pixels. formula:
    //2160 = 256 * 2^zoom
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 3.0768155970508308922315362613328397021
    });
    console.log(getAnimationInit());
    //var polygon = drawPolyLine("asd");
    //polygon.setMap(map);   
    //readCoronaData();
}
