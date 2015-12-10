/**
 * Created by lalo on 5/12/15.
 */
var db_name = "project_ponds";
var db_version = "3.0";
var cont = 0;
function initDataBase() {

    var db = window.openDatabase(db_name, db_version, db_name, 200000);
    db.transaction(createDB, errorDB, successDB);
}

function createDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS ponds (id INTEGER' +
            ' PRIMARY KEY AUTOINCREMENT NOT NULL, latitude, altitude, name, path_image)');
    //tx.executeSql('INSERT INTO ponds (id, latitude, altitude, name, path_image) ' +
    //    'VALUES (1,"55.3","43.7", "Poza 1", "Test Path")');
}
function errorDB(err) {
    alert("Error processing SQL: " + err.code + ", " + err.message);
}

function successDB() {
    var db = window.openDatabase(db_name, db_version, db_name, 200000);
    db.transaction(queryDB, errorDB);
}
function queryDB(tx) {
    tx.executeSql('SELECT * FROM ponds', [], querySuccess, errorDB);
}
function querySuccess(tx, results) {
    //first get the number of rows in the result set
    var len = results.rows.length;
    var status = document.getElementById("divListPonds");
    localStorage.setItem("last_id", len + 1);
    if (len == 0) {
        status.innerHTML = "No hay pozas registradas.";
    } else {
        var string = "Pozas registradas: " + len + "<br/>";

        for (var i = 0; i < len; i++) {
            string += generarCard(i, results);
        }
        status.innerHTML = string;
    }

}

function generarCard(i, results) {
    var string = "";
    var id = results.rows.item(i).id;
    string += "<div class='nd2-card'>";
    string += "<div class='card-action'>";
    string += "<div class='card-supporting-text'>" + "Número de poza : " + results.rows.item(i).id + "</div>";
    string += "<div class='card-supporting-text'>" + "Nombre : " + results.rows.item(i).name + "</div>";
    string += "<div class='row between-xs'>";
    string += "<div class='col-xs-12 align-right'>";
    string += "<a href='#' class='ui-btn ui-btn-inline ui-btn-fab' " +
            "onclick='delete_pond(" + id + ")" + '\'' + ";><i class='zmdi zmdi-delete'></i></a>" +
            "<a href='#' class='ui-btn ui-btn-inline ui-btn-fab' " +
            "onclick='get_pond(" + id + ")" + '\'' + ";><i class='zmdi zmdi-eye'></i></a>" +
            "<a href='#' class='ui-btn ui-btn-inline ui-btn-fab' " +
            "onclick='select_pond_to_edit(" + id + ")" + '\'' + ";><i class='zmdi zmdi-edit'></i></a>" +
            "</div></div></div></div>";

    string += "</div></div>";
    return string;
}


function guargarDatosPoza() {

    if ($('#nombre_poza_alta').val() == '' ||
            $('#latitud_poza_alta').val() == '' ||
            $('#longitud_poza_alta').val() == '') {
        alert("Llene todos los campos por favor. ");
        return;
    }

    if (window.localStorage.getItem("photo") == null) {
        alert("Escoja una foto por favor");
        return;
    }


    var db = window.openDatabase(db_name, db_version, db_name, 200000);
    db.transaction(save_new_pond, errorDB, successDB);
}
function save_new_pond(tx) {
    var id = Number(localStorage.getItem("last_id"));
    var name = document.getElementById("nombre_poza_alta").value;
    var latitude = document.getElementById("latitud_poza_alta").value;
    var longitude = document.getElementById("longitud_poza_alta").value;
    var photo_image = window.localStorage.getItem("photo");

    tx.executeSql(
            'INSERT INTO ponds (id, latitude, altitude, name, path_image)' +
            ' VALUES ( ? , ? , ? , ?, ? )',
            [null, latitude, longitude, name, photo_image]
            );

    enableWifi(id, latitude, longitude, name);

    window.location.href = "#listaPozas";
    limpiar_campos();
}

function enableWifi(id, latitude, longitude, name) {
    cordova.plugin.pDialog.init({
        theme: 'HOLO_DARK',
        title: 'Espere Porfavor...',
        progressStyle: 'HORIZONTAL'
    }).setProgress(50).setMessage('Activando Wifi...');
    for (var x = 0; x < 100000000; x++) {
    }
    WifiWizard.setWifiEnabled(true, wifiEnableSuccess(id, latitude, longitude, name), wifiEnableFail);
}

function wifiEnableSuccess(id, latitude, longitude, name) {

    cordova.plugin.pDialog.setProgress(75);
    cordova.plugin.pDialog.setMessage('Agregando Geocerca...');
    for (var x = 0; x < 100000000; x++) {
    }
    var idGeocerca = id;
    //alert("Se agregara Geocerca");
    // alert('Latitud: ' + lat + '\nLongitud: ' + lon);
    // este es un id fijo pero hay que ponerle el id de la poza + nombre de la poza
    window.geofence.addOrUpdate({
        id: idGeocerca, //A unique identifier of geofence 
        latitude: latitude, //Geo latitude of geofence 
        longitude: longitude, //Geo longitude of geofence 
        radius: 18, //Radius of geofence in meters 
        transitionType: 3, //Type of transition 1 - Enter, 2 - Exit, 3 - Both 
        notification: {//Notification object 
            title: "Entro a: " + name, //Title of notification 
            text: "Preparese", //Text of notification 
            openAppOnClick: false //is main app activity should be opened after clicking on notification 

        }
    }).then(function () {
        //alert('Geofence successfully added');
        cordova.plugin.pDialog.setProgress(100);
        cordova.plugin.pDialog.setMessage('Proceso Completado');
        for (var x = 0; x < 100000000; x++) {
        }
        cordova.plugin.pDialog.dismiss();
        window.geofence.onTransitionReceived = function (geofences) {
            geofences.forEach(function (geo) {
                if (cont % 2 == 0) {
                    //alert('Entro a la poza ');
                    navigator.vibrate(3000);
                    //WifiWizard.setWifiEnabled(false, win2, fail);
                    //.setWifiEnabled(true, win2, fail);
                    cont++;
                } else {
                    //alert('Salio de la poza');
                    navigator.vibrate(1000);
                    //WifiWizard.setWifiEnabled(false, win2, fail);
                    //WifiWizard.setWifiEnabled(true, win2, fail);
                    cont++;
                }
            });
        };

    }, function (reason) {
        alert('Adding geofence failed', reason);
    });
}

function wifiEnableFail() {
    alert("Fallo la activacion del Wifi");
}
/**
 * Esta función es llamada desde el html
 */
function edit_data_pond() {

    if ($('#nombre_poza_modif').val() == '' ||
            $('#latitud_poza_modif').val() == '' ||
            $('#longitud_poza_modif').val() == '') {
        alert("Llene todos los campos por favor. ");
        return;
    }

    var db = window.openDatabase(db_name, db_version, db_name, 200000);
    db.transaction(save_edited_pond, errorDB, successDB);
}
function save_edited_pond(tx) {
    var id = document.getElementById("id-pond-editing").value;
    var name = document.getElementById("nombre_poza_modif").value;
    var latitude = document.getElementById("latitud_poza_modif").value;
    var longitude = document.getElementById("longitud_poza_modif").value;

    var photo_image = window.localStorage.getItem("photo");

    cordova.plugin.pDialog.init({
        theme: 'HOLO_DARK',
        title: 'Espere Porfavor...',
        progressStyle: 'HORIZONTAL'
    }).setProgress(30).setMessage('Reubicando Geocerca...');
    for (var x = 0; x < 100000000; x++) {
    }
    cordova.plugin.pDialog.setProgress(60);
    for (var x = 0; x < 100000000; x++) {
    }


    window.geofence.addOrUpdate({
        id: id, //A unique identifier of geofence 
        latitude: latitude, //Geo latitude of geofence 
        longitude: longitude, //Geo longitude of geofence 
        radius: 20, //Radius of geofence in meters 
        transitionType: 3, //Type of transition 1 - Enter, 2 - Exit, 3 - Both 
        notification: {//Notification object 
            title: "Entro a: " + name, //Title of notification 
            text: "Preparense", //Text of notification 
            openAppOnClick: false, //is main app activity should be opened after clicking on notification 
            vibration: [3000] //Optional vibration pattern - see description 
        }
    }).then(function () {
        cordova.plugin.pDialog.setProgress(100);
        cordova.plugin.pDialog.setMessage('Geocerca Reubicada');
        for (var x = 0; x < 100000000; x++) {
        }
        cordova.plugin.pDialog.dismiss();

    }, function (reason) {
        alert('Adding geofence failed', reason);
    });

    tx.executeSql(
            "UPDATE ponds SET latitude=?, altitude=?, name=?, path_image=? " +
            "WHERE id=?",
            [latitude, longitude, name, photo_image, id]
            );


    window.location.href = "#listaPozas";
    limpiar_campos();
}

/**
 * Cuando quieras borrar una poza, esta función vas a llamar.
 * Solo le pasas el id y ya.
 */
var id_pond_to_delete;
function delete_pond(pond_id) {
    if (!confirm("¿Seguro desea eliminar esta poza?"))
        return;

    id_pond_to_delete = pond_id;

    window.geofence.remove(id_pond_to_delete);
    var db = window.openDatabase(db_name, db_version, db_name, 200000);
    db.transaction(delete_from_db, errorDB, successDB);

}

function delete_from_db(tx) {
    //Aqui se puede poner un confirm para eliminar
    cordova.plugin.pDialog.init({
        theme: 'HOLO_DARK',
        title: 'Eliminando...',
        progressStyle: 'HORIZONTAL'
    }).setProgress(25).setMessage('Quitando Geocerca...');
    cordova.plugin.pDialog.setProgress(50);
    for (var x = 0; x < 100000000; x++) {
    }
    cordova.plugin.pDialog.setMessage('Eliminando Poza...');
    for (var x = 0; x < 100000000; x++) {
    }
    cordova.plugin.pDialog.setProgress(75);
    tx.executeSql('DELETE FROM ponds WHERE id=?', [id_pond_to_delete]);
    for (var x = 0; x < 100000000; x++) {
    }
    cordova.plugin.pDialog.setMessage('Poza Eliminada');
    cordova.plugin.pDialog.setProgress(100);
    for (var x = 0; x < 100000000; x++) {
    }
    cordova.plugin.pDialog.dismiss();

}

/**
 * Para ver una poza, esta función vas a llamar.
 * Solo le pasas el id.
 */
var id_pond;
var is_editable = false;
function get_pond(id) {
    id_pond = id;
    is_editable = false;
    var db = window.openDatabase(db_name, db_version, db_name, 200000);
    db.transaction(get_pond_from_db, errorDB);
    window.location.href = "#verPoza";
}

function get_pond_from_db(tx) {
    tx.executeSql('SELECT * FROM ponds WHERE id=?',
            [id_pond], querySelectSuccess, errorDB);

}

function querySelectSuccess(tx, results) {
    if (is_editable) {
        document.getElementById("id-pond-editing").value = results.rows.item(0).id;
        document.getElementById("nombre_poza_modif").value = results.rows.item(0).name;
        document.getElementById("latitud_poza_modif").value = results.rows.item(0).latitude;
        document.getElementById("longitud_poza_modif").value = results.rows.item(0).altitude;
        draw_map(results.rows.item(0).latitude, results.rows.item(0).altitude, "map-edit");
        document.getElementById("img-from-library").src = results.rows.item(0).path_image;
        window.localStorage.setItem("photo", results.rows.item(0).path_image);
    } else {
        document.getElementById("nombre_poza_ver").value = results.rows.item(0).name;
        document.getElementById("latitud_poza_ver").value = results.rows.item(0).latitude;
        document.getElementById("longitud_poza_ver").value = results.rows.item(0).altitude;
        draw_map(results.rows.item(0).latitude, results.rows.item(0).altitude, "mapaPoza");
        document.getElementById("pond-to-see").src = results.rows.item(0).path_image;
    }

}

/**
 * Para editar una poza.
 * @param id
 */
function select_pond_to_edit(id) {
    id_pond = id;
    is_editable = true;

    var db = window.openDatabase(db_name, db_version, db_name, 200000);
    db.transaction(get_pond_from_db, errorDB);
    window.location.href = "#modificarPoza";
}




