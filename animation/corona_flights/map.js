var map;


function initMap() {

    //zoom level must be at 3.485 for a render screen of 2000x2000 pixels (web mercator is a square!)
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 3.485
    });
    var firstSeenString =  "25.04.2020 19:32";
    var lastSeenString =  "26.04.2020 02:04";
    var firstSeenDate = convertToDate(firstSeenString);
    var lastSeenDate = convertToDate(lastSeenString);
    console.log(firstSeenDate);
    console.log(lastSeenDate);
    var timediff = calculateTimeDiffMinutes(firstSeenDate, lastSeenDate);
    console.log(timediff)


  
//   var dateTimeSplitted = firstSeenString.split(" ");
//   console.log(dateTimeSplitted);
//   var dateSplitted = dateTimeSplitted[0].split(".");
//   var ISOdatetimeString = dateSplitted[2] + "-" + dateSplitted[1] + "-" + dateSplitted[0];
//   ISOdatetimeString+= "T" + dateTimeSplitted[1];
//   console.log(ISOdatetimeString);


//     var firstSeen = Date.parse(ISOdatetimeString);
//     var lastSeen = Date.parse("26.04.2020 02:04");
//     console.log(firstSeen);
        
  
    var originCoords = {lat: 14.53843689, lng: 121.079754};

    var destinationCoords = {lat: -27.38104869, lng: 153.130663358248};

    var originMarker = new google.maps.Marker({
        position: originCoords,
        map: map,
        title: 'origin'
      });

    var originMarker = new google.maps.Marker({
        position: destinationCoords,
        map: map,
        title: 'destination'
    });
    


}

function convertToDate(dateTimeString){
    var dateTimeSplitted = dateTimeString.split(" ");
    var dateSplitted = dateTimeSplitted[0].split(".");
    var ISOdatetimeString = dateSplitted[2] + "-" + dateSplitted[1] + "-" + dateSplitted[0];
    ISOdatetimeString+= "T" + dateTimeSplitted[1];
    var dateTime = Date.parse(ISOdatetimeString);
    return dateTime;
}

function calculateTimeDiffMinutes(date1, date2){
    var diff = Math.abs(date1 - date2);
    return diff / 60000;
}

