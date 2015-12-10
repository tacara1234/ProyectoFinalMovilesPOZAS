//Esta funcion solo la estoy usando para pruebas luego se quitara
function limpiarLocalStorage() {
    localStorage.clear();
    alert("LocalStorage limpiado");
}

//Esta funcion solo la estoy usando para pruebas luego se quitara
function mostrarValores() {
    alert("LocalStorage: " + localStorage.length + '\n' + 'passRegistrada: ' + localStorage.getItem("passRegistrada") + '\n' + 'password: ' + localStorage.getItem("password"));
}

//Ingresar a con la contraseña registrada anteriormente
function entrar() {
    var usuario_password = document.getElementById("usuario_password").value;
    var password = localStorage.getItem("password");

    if (usuario_password == password) {
        window.location.href = '#listaPozas';
    } else {
        alert("Contraseña Incorrecta");
    }
}

//Registramos la Contraseña
function guardarPassword() {
    var password = document.getElementById("password_alta").value;
    var repeated_password = document.getElementById("password_alta_repeticion").value;
    if (password === repeated_password) {
        localStorage.setItem("password", password);
        localStorage.setItem("passRegistrada", 1);
        alert("Contraseña Guardada");
        window.location.href = '#index';
    } else {
        document.getElementById("msg-warning").style.display = 'block';
        password.focus();
    }
}

function change_password() {
    var old_password = document.getElementById("password_cambio_antigua").value;


    if (old_password != localStorage.getItem("password")) {
        alert("La contraseña antigua que escribió, no coincide con la registrada en el celular");
        return;
    }
    var new_password = document.getElementById("password_cambio").value;
    var repeated_password = document.getElementById("password_cambio_repeticion").value;

    if (new_password === repeated_password) {
        localStorage.setItem("password", new_password);
        alert("Contraseña modificada con éxito");
        window.location.href = '#index';
    } else {
        document.getElementById("msg-warning-changing-password").style.display = 'block';
        new_password.focus();
    }

}