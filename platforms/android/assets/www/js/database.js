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
    var listado = "";
    var popUps = "";
    var status = document.getElementById("divListPonds");
    localStorage.setItem("last_id", len + 1);
    if (len == 0) {
        status.innerHTML = "No hay pozas registradas.";
    } else {
        //var string = "Pozas: " + len + "<br/>";
        //string += "<table><tr><td>Número</td>" +
        //    "<td>Nombre de la poza</td>" +
        //    "</tr>";
        for (var i = 0; i < len; i++) {
            listado += "<li data-icon='gear'><a href='#opciones" + i +
                    "' data-rel='popup' data-position-to='window' " +
                    "data-transition='pop'>" + results.rows.item(i).id + ") " + results.rows.item(i).name +
                    "</a></li>";

            // string +=
            //   "<tr><td>" + results.rows.item(i).id + "</td>" +
            //   "<td>" + results.rows.item(i).name + "</td>" +
            //   "</tr>";
            var options = "opciones" + i;
            var deleteOperation = "delop" + i;
            var editOperation = "editop" + i;
            var seeOperation = "seeop" + i;

            popUps += "<div data-role='popup' id='" + options + "' data-theme='a' data-overlay-theme='b' " +
                    "class='ui-content' style='max-width:340px; padding-bottom:2em;'> " +
                    "<h3>Escoja la operacion</h3>" +
                    "<input id='" + deleteOperation + "' type='button' data-icon='delete' " +
                    "value='eliminar' />" +
                    "<input id='" + editOperation + "' type='button' data-icon='edit' " +
                    "value='modificar' />" +
                    "<input id='" + seeOperation + "' type='button' data-icon='eye' " +
                    "value='modificar' /></div>";

        }
        //status.innerHTML = string;

        actualizarLista(listado);
        crearPopUps(popUps);

        for (var counter1 = 0; counter1 < len; counter1++) {
            (function (counter1) {
                //It is added the delete operation as 'onclick' in each link
                document.getElementById('delop' + counter1).
                        addEventListener("click", function () {
                            delete_pond(results.rows.item(counter1).id);
                        });
            }(counter1));

        }

        
        for (var counter2 = 0; counter2 < len; counter2++) {
            (function (counter2) {
                //It is added the the function that will set the info from the read file, in the view
                document.getElementById('editop' + counter2).
                        addEventListener("click", function () {
                            //Aqui se tiene que setear la info y de la poza en base al id y que esta se
                            //pueda modificar
                            //setInfoFromFile(entries[k].name);
                            pruebaFuncion(results.rows.item(counter2).id);
                        });
            }(counter2));

        }

        for (var counter3 = 0; counter3 < len; counter3++) {
            (function (counter3) {
                //It is added the the function that will set the info from the read file, in the view
                document.getElementById('seeop' + counter3).
                        addEventListener("click", function () {
                            get_pond(results.rows.item(counter3).id);
                            //setInfoFromFile(entries[k].name);
                        });
            }(counter3));

        }
    }

}

function pruebaFuncion(msgID){
    alert("El id de esta poza es: " + msgID);
}

var listcreated = false;
function actualizarLista(datos) {
    if (!listcreated) {
        var divList = $("#divListPonds");
        divList.append("<ul id='lista' data-role='listview' data-inset='true' data-filter='true' " +
                "data-filter-placeholder='buscar..'></ul>");
        listCreated = true;
        divList.trigger("create");
    }
    var list = $("#lista");
    list.append(datos);
    list.listview("refresh");
}

function crearPopUps(popups) {
    var divPopups = $('#popups');
    divPopups.append(popups);
    divPopups.trigger("create");
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




