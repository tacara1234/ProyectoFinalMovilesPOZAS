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