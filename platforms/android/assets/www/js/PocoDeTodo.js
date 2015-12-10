document.addEventListener("deviceready", onDeviceReady, false);
var firstTime = true;

//En este onDevice hay muchas cosas q se usan pero no ce si se pueden hacer otros onDevice o q 
//lo que pude quitar lo quite pero hay cosas que deje alla
//esta tambien todo lo de file aca pero no creo q se use todo pero no se lo quite

function onDeviceReady() {
    //Agregamos el evento volumeupbutton (El chiste es que solo se pueda usar cuando estemos en alta)
    window.geofence.initialize();

    if (localStorage.getItem("password") == null) {
        document.getElementById("btnChangePassword").style.display = 'none';
        document.getElementById("regBtn").style.display = 'block';
    } else {
        document.getElementById("btnChangePassword").style.display = 'block';
        document.getElementById("regBtn").style.display = 'none';
    }

    document.addEventListener("volumeupbutton", onVolumeUpKeyDown, false);
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;

    //Verificamos la contraseña ya fue registrada o todavia
    if (localStorage.getItem("passRegistrada") != 1) {
        localStorage.setItem("passRegistrada", 0);
    }

    //Iniciamos los archivos:
    window.requestFileSystem = window.requestFileSystem
        || window.webkitRequestFileSystem;
    // Start the app by requesting a FileSystem (if the browser supports the API)
    if (window.requestFileSystem) {
        initFileSystem();
    }

    //si la contrase�a ya fue registrada quitamos el boton para registrarnos
    //Pero ese boton lo quiero sustituir por uno con el que se pueda cambiar la contrase�a
    //if (localStorage.getItem("passRegistrada") == 1) {
    //    document.getElementById("regBtn").style.display = 'none';
    //}
    if (firstTime) {
        initDataBase();
        firstTime = false;
    }
}

//Asignamos la funcion para escoger la imagen cunado se presione el boton volumeup
function onVolumeUpKeyDown() {
    //se llama al getPicture
    navigator.camera.getPicture(selectPictureSuccess, selectPictureFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: pictureSource.SAVEDPHOTOALBUM
    })
}

//Se selecciona la imagen y se sustituye 
function selectPictureSuccess(imageData) {
    var img;
    if (is_editable)
        img = document.getElementById("img-from-library");
    else
        img = document.getElementById("mi_img");

    var path_image = decodeURIComponent(imageData);
    if (path_image.indexOf("providers") > -1) {
        path_image = "content://media/external/images/media/" +
            path_image.split(":")[2];
    }
    window.localStorage.setItem("photo", path_image);

    img.src = imageData;
}


function selectPictureFail(message) {
    alert("Fallo al inicializar la camara " + message);
}


//Esto no sirve pero tarde un vergo en hacerlo no lo quiten jaja
function guargarDatosUsuario() {
    var nombre = document.getElementById("nombre_usuario_alta").value;
    var password = document.getElementById("password_usuario_alta").value;
    if (parseInt(localStorage.getItem("numUsuarios")) >= 0 && parseInt(localStorage.getItem("numPasswords")) >= 0) {
        alert("Ya habian usuarios y claves");

        if (nombre != "" && password != "") {

            var existe = false;
            for (var cont = 0; cont < localStorage.length; cont++) {
                var valor = localStorage.getItem('usuario' + cont);
                if (valor == nombre) {
                    alert("Este Usuario ya Existe");
                    existe = true;
                }
            }

            if (!existe) {
                var inc1 = localStorage.getItem("numUsuarios");
                var inc2 = localStorage.getItem("numPasswords");
                inc1 = parseInt(inc1) + 1;
                inc2 = parseInt(inc2) + 1;
                alert("inc1: " + inc1 + '/n' + "inc2: " + inc2);
                localStorage.setItem("numUsuarios", inc1);
                localStorage.setItem("numPasswords", inc2);
                alert('a)Local Storage es:' + localStorage.length);


                localStorage.setItem("usuario" + localStorage.getItem("numUsuarios"), nombre);
                localStorage.setItem("password" + localStorage.getItem("numPasswords"), password);
            }

        } else {
            alert("Faltan Datos");
        }
    } else {
        alert("No habian usuarios y claves");
        if (nombre != "" && password != "") {
            localStorage.setItem("numUsuarios", 0);
            localStorage.setItem("numPasswords", 0);
            alert('b)Local Storage es:' + localStorage.length);

            localStorage.setItem("usuario" + localStorage.getItem("numUsuarios"), nombre);
            localStorage.setItem("password" + localStorage.getItem("numPasswords"), password);
        } else {
            alert("Faltan Datos");
        }
    }


    alert('c)Local Storage es:' + localStorage.length);
}


//Esto no sirve pero tarde un vergo en hacerlo no lo quiten jaja
function iniciarSesion() {
    localStorage.setItem("logueado", 1);
    var valido = false;
    //alert("Se apreto entrar");
    var usuario_id = document.getElementById("usuario_id").value;
    //alert("usuario_id: "+usuario_id);
    var usuario_password = document.getElementById("usuario_password").value;
    //alert("usuario_password: "+usuario_password);
    alert("storage length: " + localStorage.length);
    for (var cont = 0; cont < localStorage.length; cont++) {
        var valor = localStorage.getItem('usuario' + cont);
        var clave = localStorage.getItem('password' + cont);
        //alert('valor es ' + valor + '\nclave es ' + clave);
        if (valor == usuario_id && clave == usuario_password) {
            //alert("usuario valido");
            valido = true;
            window.location = '#listaRestaurantes';
        }
    }

    if (valido == false) {
        alert("Usuario no Existente");
    }

}


