
//Esta funcion solo la estoy usando para pruebas luego se quitara
function limpiarLocalStorage() {
    localStorage.clear();
    alert("LocalStorage limpiado");
}

//Esta funcion solo la estoy usando para pruebas luego se quitara
function mostrarValores() {
    alert("LocalStorage: " + localStorage.length + '\n' + 'passRegistrada: ' + localStorage.getItem("passRegistrada") + '\n' + 'password: ' + localStorage.getItem("password"));
}

//Ingresar a con la contraseņa registrada anteriormente
function entrar(){
        var usuario_password = document.getElementById("usuario_password").value;
        var password = localStorage.getItem("password");
        
        if(usuario_password == password){
            window.location.href = '#listaPozas';
        }else{
            alert("Contraseņa Incorrecta");
        }
}

//Registramos la Contraseņa
function guardarPassword() {
    var password = document.getElementById("password_alta").value;
    localStorage.setItem("password", password);
    localStorage.setItem("passRegistrada", 1);
    alert("Contraseņa Guardada");
    window.location.href = 'index.html';

}