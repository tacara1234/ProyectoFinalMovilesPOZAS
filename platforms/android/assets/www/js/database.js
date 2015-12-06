/**
 * Created by lalo on 5/12/15.
 */
var db_name = "project_ponds";
var db_version = "3.0";

function initDataBase() {

    var db = window.openDatabase(db_name, db_version, db_name, 200000);
    db.transaction(populateDB, errorDB, successDB);
}

function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS ponds');
    tx.executeSql('CREATE TABLE IF NOT EXISTS ponds (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, latitude, altitude, name, path_image)');
    tx.executeSql('INSERT INTO ponds (id, latitude, altitude, name, path_image) VALUES (1,"55.3","43.7", "Poza 1", "path_image")');
    tx.executeSql('INSERT INTO ponds (id, latitude, altitude, name, path_image) VALUES (2,"55.3","43.7","Poza 2","path_image")');
    tx.executeSql('INSERT INTO ponds (id, latitude, altitude, name, path_image) VALUES (3,"55.3","43.7", "Poza 3","path_image")');
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
    localStorage.setItem("last_id", len + 1);
    var status = document.getElementById("divListPonds");
    var string = "Pozas: " + len + "<br/>";
    string += "<table><tr><td>ID</td>" +
            //"<td>Latitude</td>" +
            //"<td>Altitude</td>" +
        "<td>Nombre de la poza</td>" +
            //"<td>Path Image</td>" +
        "</tr>";
    for (var i = 0; i < len; i++) {
        string +=
            "<tr><td>" + results.rows.item(i).id + "</td>" +
                //"<td>" + results.rows.item(i).latitude + "</td>" +
                //"<td>" + results.rows.item(i).altitude + "</td>" +
            "<td>" + results.rows.item(i).name + "</td>" +
                //"<td>" + results.rows.item(i).path_image + "</td>" +
            "</tr>";
    }
    status.innerHTML = string;
}
function guargarDatosPoza() {
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
var id_pond_to_delete;
function delete_pond(pond_id) {
    id_pond_to_delete = pond_id;
    var db = window.openDatabase(db_name, db_version, db_name, 200000);
    db.transaction(delete_from_db, errorDB, successDB);

}

function delete_from_db(tx) {
    //DELETE FROM ponds WHERE id=pond_id;
    tx.executeSql('DELETE FROM ponds WHERE id=?', [id_pond_to_delete]);

}

