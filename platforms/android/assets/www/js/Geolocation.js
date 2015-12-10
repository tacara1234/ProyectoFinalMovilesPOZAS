function enableWifi2() {
    WifiWizard.setWifiEnabled(true, wifiEnableSuccess2, wifiEnableFail2);
}
//Obtenemos la localizacion
function wifiEnableSuccess2() {
    var options = {
        maximumAge: 5000,
        timeout: 5000,
        enableHighAccuracy: true
    };
    navigator.geolocation.getCurrentPosition(initMap, geolocationError, options);

}

function wifiEnableFail2() {
    alert("No se pudo encender el wifi");
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
    if (is_editable) {
        document.getElementById("latitud_poza_modif").value = position.coords.latitude;
        document.getElementById("longitud_poza_modif").value = position.coords.longitude;
    } else {
        document.getElementById("latitud_poza_alta").value = position.coords.latitude;
        document.getElementById("longitud_poza_alta").value = position.coords.longitude;
    }


}

function draw_map(cords_latitude, cords_longitude, div) {
    var myLatLng = {
        lat: cords_latitude,
        lng: cords_longitude
    };

    // Create a map object and specify the DOM element for display. div
    var watch_map = new google.maps.Map(document.getElementById(div), {
        zoom: 8,
        center: new google.maps.LatLng(cords_latitude, cords_longitude), //myLatLng,
        scrollwheel: false
    });

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
        map: watch_map,
        position: myLatLng,
        title: '¡Marcador!'
    });


}

function geolocationError() {
    alert("No se pudo obtener la localizacion");
}