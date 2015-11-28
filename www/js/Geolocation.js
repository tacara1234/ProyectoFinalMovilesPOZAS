//Obtenemos la localizacion
function obtenerLocalizacion() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

}

function onSuccess(position) {
    var longitud = position.coords.longitude;
    var latitud = position.coords.latitude;
    document.getElementById("latitud_poza_alta").value = latitud;
    document.getElementById("longitud_poza_alta").value = longitud;

}

function onError() {
    alert("No se pudo obtener la localizacion");
}