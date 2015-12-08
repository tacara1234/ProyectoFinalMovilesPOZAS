/**
 * Created by lalo on 5/12/15.
 */
var db_name = "project_ponds";
var db_version = "3.0";

function initDataBase() {

    var db = window.openDatabase(db_name, db_version, db_name, 200000);
    db.transaction(createDB, errorDB, successDB);
}

function createDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS ponds');
    tx.executeSql('CREATE TABLE IF NOT EXISTS ponds (id INTEGER' +
        ' PRIMARY KEY AUTOINCREMENT NOT NULL, latitude, altitude, name, path_image)');
    //Lo siguiente son datos dummy, si los queremos solo descomentamos lo sig:
    //tx.executeSql('INSERT INTO ponds (id, latitude, altitude, name, path_image) ' +
    //    'VALUES (1,"55.3","43.7", "Poza 1", "Test Path")');
    //tx.executeSql('INSERT INTO ponds (id, latitude, altitude, name, path_image) ' +
    //    'VALUES (2,"55.3","43.7","Poza 2","Test Path")');
    //tx.executeSql('INSERT INTO ponds (id, latitude, altitude, name, path_image) ' +
    //    'VALUES (3,"55.3","43.7", "Poza 3","Test Path")');
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
        var string = "Pozas: " + len + "<br/>";

        for (var i = 0; i < len; i++) {
            string+=generarCard(i,results);
        }
        status.innerHTML = string;
    }

}

function generarCard(i, results){
    var string="";
        string += "<div class='nd2-card'>";
        string += "<div class='card-action'>";
        string += "<div class='card-supporting-text'>"+ "ID : "+ results.rows.item(i).id+"</div>";
        string += "<div class='card-supporting-text'>"+ "Nombre : " + results.rows.item(i).name+"</div>";
        string += "<div class='row between-xs'>";
        string += "<div class='col-xs-12 align-right'>";
        string += "<a href='#' class='ui-btn ui-btn-inline ui-btn-fab'><i class='zmdi zmdi-delete'></i></a>" +
            "<a href='#' class='ui-btn ui-btn-inline ui-btn-fab'><i class='zmdi zmdi-edit'></i></a>" + "</div></div>";
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
        [id, latitude, longitude, name, photo_image]
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
    id_pond_to_delete = pond_id;
    var db = window.openDatabase(db_name, db_version, db_name, 200000);
    db.transaction(delete_from_db, errorDB, successDB);

}

function delete_from_db(tx) {
    tx.executeSql('DELETE FROM ponds WHERE id=?', [id_pond_to_delete]);
}

/**
 * Para ver una poza, esta función vas a llamar.
 * Solo le pasas el id.
 */
var id_pond;
function get_pond(id) {
    id_pond = id;
    var db = window.openDatabase(db_name, db_version, db_name, 200000);
    db.transaction(get_pond_from_db, errorDB);
    window.location.href = "#verPoza";
}

function get_pond_from_db(tx) {
    tx.executeSql('SELECT * FROM ponds WHERE id=?',
        [id_pond], querySelectSuccess, errorDB);

}

function querySelectSuccess(tx, results) {
    document.getElementById("nombre_poza_ver").value = results.rows.item(0).name;
    document.getElementById("latitud_poza_ver").value = results.rows.item(0).latitude;
    document.getElementById("longitud_poza_ver").value = results.rows.item(0).altitude;
    draw_map(results.rows.item(0).latitude, results.rows.item(0).altitude);
}




