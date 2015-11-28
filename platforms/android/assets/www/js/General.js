//Nos regresa a la pagina #listaPozas y resetea datos
function cancelar() {

    //Restablecemos los datos del alta poza
    document.getElementById("nombre_poza_alta").value = "";
    document.getElementById("latitud_poza_alta").value = "";
    document.getElementById("longitud_poza_alta").value = "";
    document.getElementById("mi_img").src = "";

    //Restablecemos los datos de  modificar poza
    document.getElementById("nombre_poza_modif").value = "";
    document.getElementById("latitud_poza_modif").value = "";
    document.getElementById("longitud_poza_modif").value = "";

    //Regresamos a la pagina #listaPozas
    window.location.href = "#listaPozas";
}

function cerrarSesion() {
    //Regresamos al index.html
    window.location.href = 'index.html';
}

function IrAagregarPoza() {
    //Vamos a la pagina #altaPoza
    window.location.href = '#altaPoza';
}

