var polygons = new Object();
var run = 1;
var latlng;
var infoWindow1;
var infoWindow2;
var infoWindow3;
async function getAnimationInit(){

    infoWindow1 = new google.maps.InfoWindow({
        content: "blabla"
      });
      infoWindow1.setPosition({lat: -5, lng: -25});
    
    infoWindow2 = new google.maps.InfoWindow({
        content: "left"
      });
      infoWindow2.setPosition({lat: -5, lng: -120});

    infoWindow3 = new google.maps.InfoWindow({
        content: "right"
      });
      infoWindow3.setPosition({lat: -5, lng: 80});
    
    let url = "http://localhost:12345/api/animation";
    const response = await fetch(url,{
        method: 'POST',
        cache: 'no-cache',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify("get_init,corona_spread")
    })
        .then(response => response.text())
        .then(data => parseData(data))
        .catch(error => console.log("error:" + error));
}

function parseData(serialized){
    console.log("got initialization instructions!");
    var parsed = JSON.parse(JSON.parse(serialized));
    generatePolygons(parsed);
}

function generatePolygons(mapsObjects){
    Object.keys(mapsObjects).forEach(function(key) {
        var name = key;
        var polygonOptions = mapsObjects[key];
        var polygon = new google.maps.Polygon({
            paths: polygonOptions.Paths ,
            strokeColor: polygonOptions.StrokeColor,
            strokeOpacity: polygonOptions.StrokeOpacity,
            strokeWeight: polygonOptions.StrokeWeight,
            fillColor: polygonOptions.FillColor,
            fillOpacity: polygonOptions.FillOpacity
        });
        polygon.addListener("click", () => {
            console.log(key);
        });
        
        polygons[name] = polygon;
        if(polygonOptions.Paint == true) {
            polygon.setMap(map);
        }
    });
    console.log("finished painting!")
}

async function runAnimation(){
    console.log("running animation..")
    let url = "http://localhost:12345/api/animation";
    const response = await fetch(url,{
        method: 'POST',
        cache: 'no-cache',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify("start,corona_spread")
    })
        .then(response => response.text())
        .then(data => getUpdates())
        .catch(error => console.log("error:" + error));
}

async function getUpdates(){
    let url = "http://localhost:12345/api/animation";
    const response = await fetch(url,{
        method: 'POST',
        cache: 'no-cache',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify("get_update,corona_spread")
    })
        .then(response => response.text())
        .then(data => parseUpdates(data))
        .catch(error => console.log("error:" + error));

}

function parseUpdates(data){
    if(run == 0){
        return;
    }
    var parsed = JSON.parse(JSON.parse(data));
    if(parsed != "noop"){
        applyUpdate(parsed);
    }
    getUpdates();
}

function applyUpdate(mapUpdates){
    console.log(mapUpdates.TimeStamp);
    
    infoWindow1.setContent(mapUpdates.TimeStamp)
    infoWindow1.open(map);
    infoWindow2.setContent(mapUpdates.TimeStamp)
    infoWindow2.open(map);
    infoWindow3.setContent(mapUpdates.TimeStamp)
    infoWindow3.open(map);


    var updates = mapUpdates.Updates;
    Object.keys(updates).forEach(function(key) {
        var name = key;
        //console.log(key);
        var polygonUpdate = updates[key];
        var polygonObject = polygons[key];

        // console.log("before:");
        // console.log(polygonObject);
        polygonObject.setOptions({strokeColor: polygonUpdate.StrokeColor, fillColor: polygonUpdate.FillColor, fillOpacity: polygonUpdate.FillOpacity});
        // console.log("country: " + name);
        // console.log("getMap: " + polygonObject.getMap());
        // console.log("paint value: " + polygonUpdate.Paint);
        var getMap = polygonObject.getMap();
        if(getMap === undefined){
            var paint = polygonUpdate.Paint;
            var a = typeof(paint);
            var b = 1;
            if(paint === true){
                polygonObject.setMap(map);
                var c = 2;
            }
        }
        if(getMap === undefined && polygonUpdate.Paint == true){
            polygonObject.setMap(map);
        }
        
        // console.log("after:");
        // console.log(polygonObject);
        // console.log("in structure");
        // console.log(polygons["Switzerland"]);

    });
    //clearObjects();
}

function drawInfo(){
    var position = { lat: 0.0, lng: 0.0 };
}

function clearObjects(){
    Object.keys(polygons).forEach(function(key) {
        console.log("key is: " + key);
        polygons[key].setMap(null);
    });
    //redrawObjects();
}

function redrawObjects(){
    Object.keys(polygons).forEach(function(key) {
        console.log("key is: " + key);
        polygons[key].setMap(map);
    });
}