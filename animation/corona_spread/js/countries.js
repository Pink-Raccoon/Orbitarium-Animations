var polygons = new Object();
var run = 1;

async function getAnimationInit(){
    let url = "http://localhost:50330/api/animation";
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
        if(polygonOptions.StrokeColor != "#8cdc37") {
            polygon.setMap(map);
        }
    });
    console.log("finished painting!")
}

async function runAnimation(){
    console.log("running animation..")
    let url = "http://localhost:50330/api/animation";
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
    let url = "http://localhost:50330/api/animation";
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
    var updates = mapUpdates.Updates;
    Object.keys(updates).forEach(function(key) {
        var name = key;
        //console.log(key);
        var polygonUpdates = updates[key];
        var polygonObject = polygons[key];

        if(polygonUpdates.StrokeColor == "#ff0000" && polygonObject.strokeColor == "#8cdc37"){
            polygonObject.setMap(map);
        }
        // console.log("before:");
        // console.log(polygonObject);
        polygonObject.setOptions({strokeColor: polygonUpdates.StrokeColor, fillColor: polygonUpdates.FillColor});
        
        
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