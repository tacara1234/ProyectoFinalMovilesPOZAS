//Nos regresa a la pagina #listaPozas y resetea datos
function cancelar() {

    limpiar_campos();

    //Regresamos a la pagina #listaPozas
    window.location.href = "#listaPozas";
}

function cerrarSesion() {
    document.getElementById("password_alta").value = "";
    document.getElementById("password_alta_repeticion").value = "";
    document.getElementById("usuario_password").value = "";
    //Regresamos al index.html
    window.location.href = '#index';

}

function IrAagregarPoza() {
    //Vamos a la pagina #altaPoza
    window.location.href = '#altaPoza';
}

function limpiar_campos() {
    //Restablecemos los datos del alta poza
    document.getElementById("nombre_poza_alta").value = "";
    document.getElementById("latitud_poza_alta").value = "";
    document.getElementById("longitud_poza_alta").value = "";
    document.getElementById("mi_img").src = "";

    //Restablecemos los datos de  modificar poza
    document.getElementById("nombre_poza_modif").value = "";
    document.getElementById("latitud_poza_modif").value = "";
    document.getElementById("longitud_poza_modif").value = "";

    //removemos el local storage de la foto.
    window.localStorage.removeItem("photo");
}

