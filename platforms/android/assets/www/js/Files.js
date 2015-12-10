/**
 * Created by lalo on 10/12/15.
 */
var filesystem = null;
var pathContext = "proyecto/";
var filename = "Pozas";

function initFileSystem() {
    // Request a file system with the new size.
    window.requestFileSystem(window.PERSISTENT, 1024, function (fs) {
        filesystem = fs;
    }, error_handler);
}

function export_file() {
    //window.requestFileSystem(LocalFileSystem.PERSISTENT,
    //    0, write_in_File, fail_reading_files);
    select_all_records_from_db();
}


function select_all_records_from_db() {
    var db = window.openDatabase(db_name, db_version, db_name, 200000);
    db.transaction(select_ponds_from_db, errorDB);
}

function select_ponds_from_db(tx) {
    tx.executeSql('SELECT * FROM ponds', [], function (tx, results) {
        //first get the number of rows in the result set
        var len = results.rows.length;
        var string_file = "Listado de pozas\n\n";
        for (var cont = 0; cont < len; cont++) {
            string_file += "Nombre: " + results.rows.item(cont).name + "\n" +
                "Latitud: " + results.rows.item(cont).latitude + "\n" +
                "Longitud: " + results.rows.item(cont).altitude + "\n\n";
        }
        write_in_File(string_file);
    }, errorDB);
}


function write_in_File(content) {


    var path = pathContext + filename + ".txt";

    filesystem.root.getFile(path,
        {
            create: true
        },
        function (fileEntry) {

            fileEntry.createWriter(function (fileWriter) {
                var fileParts = [content];
                var contentBlob = new Blob(fileParts, {type: 'text/html'});
                fileWriter.write(contentBlob);

                fileWriter.onwriteend = function (e) {
                    alert("Archivo Guardado");
                    window.location.href = "#listaPozas";
                };

                fileWriter.onerror = function (e) {
                    console.log('Write error: ' + e.toString());
                    alert('An error occurred and your file could not be saved!');
                };

            }, error_handler);

        }, error_handler);
}


function fail_reading_files() {
    alert("No Soportan Archivos");
}


// A simple error handler to be used throughout this demo.
function error_handler(error) {
    var message = '';
    switch (error.code) {
        case FileError.SECURITY_ERR:
            message = 'Security Error';
            break;
        case FileError.NOT_FOUND_ERR:
            message = 'Not Found Error';
            break;
        case FileError.QUOTA_EXCEEDED_ERR:
            message = 'Quota Exceeded Error';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            message = 'Invalid Modification Error';
            break;
        case FileError.INVALID_STATE_ERR:
            message = 'Invalid State Error';
            break;
        default:
            message = 'Unknown Error UAY';
            break;
    }
    alert(message);
}
