function getData() {
    
    fetch('https://opensky-network.org/api/states/all')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    convertToFlightObject(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function convertToFlightObject(data){
    var  flightstates = data.states;
    var flights = [];
    flightstates.forEach(
        function(element) {
            let title = element[0];
            let longitude = parseFloat(element[5]);
            let latitude = parseFloat(element[6]);
            let position = { lat: latitude, lng: longitude};
            
            var marker = new google.maps.Marker({
                position: position,
                title:title
            });     
            flights.push(marker)
        });
        printMarkers(flights);
}