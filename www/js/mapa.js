var map;


function initMap() {
    
    
    var latitude = Number(localStorage.getItem("latitudMapa"));;
    var longitude = Number(localStorage.getItem("longitudMapa"));;

    var myLatLng = {lat: latitude, lng: longitude};

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 16
    });

    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'Poza!'
    });
}

function errorMapa() {
    alert('error mostrar mapa');
}

function mostrarGMapa() {
    var lat = document.getElementById("latitud_poza_ver").value;
    var lon = document.getElementById("longitud_poza_ver").value;
    localStorage.setItem("latitudMapa", lat);
    localStorage.setItem("longitudMapa", lon);
    window.location.href='Mapa.html';
}

function irAinicio(){
        window.location.href='index.html';

}