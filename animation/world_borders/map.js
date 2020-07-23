var map;
var latitudes = [];
var longitudes = [];

function initMap() {
  //zoom level must be at 3.485 for a render screen of 2000x2000 pixels (web mercator is a square!)
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 3.485
  });
  getCountryNames();
}

function getCountryNames(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4){
        console.log(xhr.responseText);
        var parsed = JSON.parse(JSON.parse(xhr.responseText));
        console.log(parsed);
        getCountryData(parsed);
    }
  };;
  xhr.open('GET', 'http://localhost:50330/api/countries?id=1');
  xhr.send();
}

function getCountryData(names){
  var urls = [];
  var counter = 0;
  names.forEach(element => {
    urls[counter] = 'http://localhost:50330/api/animation?name="' + element + '"';
    counter = counter + 1;
  });
  callAllUrls(urls);
}

async function callAllUrls(urls){
  try {
    var data = await Promise.all(
        urls.map(
            url =>
                fetch(url).then(
                    (response) => response.json())
                    .then(data => paintSwitzerland(data))));

    return (data)

  } catch (error) {
    console.log(error)

    throw (error)
  }
}


function paintSwitzerland(data){
    //var parsed = JSON.parse(JSON.parse(data));
    //console.log(parsed.Name);
    //console.log(parsed.Path);

      var jsonData = JSON.parse(data);
      console.log(jsonData.Name);
      //jsonData.log(parsed.Path);
      if(jsonData.Name != "Antarctica"){
        const switzerland = new google.maps.Polygon({
          paths: jsonData.Path,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35
        });
        switzerland.setMap(map);
      }
}