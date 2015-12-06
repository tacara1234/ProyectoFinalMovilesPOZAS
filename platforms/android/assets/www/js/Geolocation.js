//Obtenemos la localizacion
function obtenerLocalizacion() {
    var options = {
        maximumAge: 5000,
        timeout: 5000,
        enableHighAccuracy: true
    };
    navigator.geolocation.getCurrentPosition(initMap, geolocationError, options);

}

function initMap(position) {
    var myLatLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        scrollwheel: false,
        zoom: 5
    });

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'Marcador!'
    });
    document.getElementById("latitud_poza_alta").value = position.coords.latitude;
    document.getElementById("longitud_poza_alta").value = position.coords.longitude;

}

function geolocationError() {
    alert("No se pudo obtener la localizacion");
}