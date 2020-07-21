// This example creates a simple polygon representing the Bermuda Triangle.

function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,
      center: { lat: 24.886, lng: -70.268 },
      mapTypeId: "terrain"
    });
  
    var finalCoords = [];
    // Define the LatLng coordinates for the polygon's path.
    var triangleCoords = [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.19 }
    ];

    var movedTriangleCoords = [
      { lat: 25.774, lng: -50.19 },
      { lat: 18.466, lng: -36.118 },
      { lat: 32.321, lng: -34.757 },
      { lat: 25.774, lng: -50.19 }
    ];

    finalCoords.push(triangleCoords);
    finalCoords.push(movedTriangleCoords);
  
    // Construct the polygon.
    var bermudaTriangle = new google.maps.Polygon({
      paths: finalCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35
    });
    bermudaTriangle.setMap(map);
  }