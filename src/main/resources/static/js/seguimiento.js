
/* global e */
function iniSegui() {
    actualiza();
    //$("#tDatosResguardo").bootstrapTable({});
    tInfoFolioTodos($("#chRecibidos").prop('checked'));
    //actualiza();
}

function cargato2() {
    iniSegui();
    $("#bBuscaFolio").click(function () {
        tInfoFolioTodos($("#chRecibidos").prop('checked'));
    });
    $('#tDatosResguardo').on('sort.bs.table', function (e) {
         iniSegui();
    });
}
function actualiza() {
    $("#tDatosResguardo").bootstrapTable({
        uniqueId: 'FOLIO',
        exportTypes: ['excel'],
        exportOptions: {
            fileName: 'Resguardos',
            exportHiddenCells: 'true',
            ignoreColumn: [
                'ACCION']
        }
    });
}
function eventosBotones() {

    $(".bReci").click(function () {
        var folio = $(this).attr("id");
        folio = folio.substring(10);
        bootbox.confirm({
            message: "Se cambia a estatus de <p style='color:green;'><b>Recibido</b></p> el Folio " + folio + ", ¿Desea continuar?",
            buttons: {
                confirm: {
                    label: 'Continuar',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Cancelar',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result) {
                    cambiaEstatus(folio);
                }
                console.log('This was logged in the callback: ' + result);
            }
        });
    });
    $(".bInac").click(function () {
        var folio = $(this).attr("id");
        folio = folio.substring(10);
        bootbox.confirm({
            message: "Se cambia a estatus a <p style='color:red;'><b>INACTIVO</b></p> el Folio " + folio + ", ¿Desea continuar?",
            buttons: {
                confirm: {
                    label: 'Continuar',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Cancelar',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result) {
                    cambiaEstatus(folio, "ina");
                }
                console.log('This was logged in the callback: ' + result);
            }
        });
    });
}

function llenaTablaExpediente(jdatos) {
    if (jdatos != null) {
        //console.log(jdatos);
        $("#tDatosResguardo").bootstrapTable('load', jdatos.datos);
        $("#tDatosResguardo").bootstrapTable('selectPage', 1);
        $("td").each(function () {
            if ($(this).html() == "null")
                $(this).html("");
        });
    } else {
        $("#tDatosResguardo").bootstrapTable({});
    }
    eventosBotones();
    $('#tDatosResguardo').on('search.bs.table', function (e) {
        eventosBotones();
    });
    
}

function cambiaEstatus(folio, paso) {
    var dialog = null;
    $.ajax({
        beforeSend: function () {
            dialog = bootbox.dialog({message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Cargando...</div>'});
        },
        cache: false,
        complete: function () {
            dialog.modal('hide');
        },
        // Definir codificación para el envío de datos
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        // Indicar que esperamos un código JSON como respuesta
        dataType: "json",
        // Manejador de errores cuando ocurra uno al hacer la petición
        error: function ajaxError(peticion, tipoError, excepcion) {
            $("#divImgCargando").hide();
            if (tipoError == "timeout") {
                general.notify('<strong>Alerta</strong><br />', 'No se tiene respuesta con el servidor.\nFavor de intentarlo más tarde ', 'warning', true);
            } else if (peticion.status == 500) {
                general.notify('<strong>Alerta</strong><br />', 'Error en el servidor al ejecutar el servicio..\nFavor de intentarlo más tarde ', 'warning', true);
            } else if (peticion.status == 404) {
                general.notify('<strong>Alerta</strong><br />', 'No se encontro el servicio solictado.\nFavor de verificar.', 'warning', true);
            } else if (tipoError == "parsererror") {
                general.notify('<strong>Alerta</strong><br />', 'Error en la respuesta enviada del servidor.\nFavor de intentarlo más tarde ', 'warning', true);
            } else {
                general.notify('<strong>Alerta</strong><br />', 'Ocurrio un error al ejecutar el servicio.\nFavor de intentarlo más tarde ', 'warning', true);
            }
        },
        scriptCharset: "utf-8",
        success: function (json) {
            // Validar que es un objeto
            /*if (!json) {
             $("#divImgCargando").hide();
             //bootbox.alert("<b>No hay registros con esa seleccion.!!…</b>");
             general.notify('<strong>Alerta</strong><br />', 'No se pudo actualizar el folio ' + folio, 'danger', true);
             return;
             }*/
            if (json == "0") {
                general.notify('<strong>Alerta</strong><br />', 'No se pudo actualizar el folio ' + folio, 'danger', true);
                return;
            }
            /*if (!json.datos || !json.datos.length || (!json.datos.length < 0)) {
             $("#divImgCargando").hide();
             general.notify('<strong>Alerta</strong><br />', 'No hay Informacion con esa seleccion. ' + folio, 'warning', true);
             return;
             }*/

            general.notify('<strong>Actualizado</strong><br />', 'Se actualizo el folio ' + folio, 'success', true);
            iniSegui();
        },
        // Le damos 30 segundos a la petición para recibir una respuesta
        timeout: 30000,
        // Hacemos una petición de tipo "GET"
        type: "POST",
        // La URL que vamos a consultar
        url: "sActualizaSeguimiento?folio=" + folio + "&paso=" + paso
    });
}

function tInfoFolioTodos(recibido) {
    var dialog = null;
    $.ajax({
        beforeSend: function () {
            dialog = bootbox.dialog({message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Cargando...</div>'});
        },
        cache: false,
        complete: function () {
            dialog.modal('hide');
        },
        // Definir codificación para el envío de datos
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        // Indicar que esperamos un código JSON como respuesta
        dataType: "json",
        // Manejador de errores cuando ocurra uno al hacer la petición
        error: function ajaxError(peticion, tipoError, excepcion) {
            $("#divImgCargando").hide();
            if (tipoError == "timeout") {
                alert("No se tiene respuesta con el servidor.\nFavor de intentarlo más "
                        + "tarde.");
            } else if (peticion.status == 500) {
                alert("Error en el servidor al ejecutar el servicio.\nFavor de "
                        + "intentarlo más tarde.");
            } else if (peticion.status == 404) {
                alert("No se encontro el servicio solictado.\nFavor de verificar.");
            } else if (tipoError == "parsererror") {
                alert("Error en la respuesta enviada del servidor.\nFavor de intentarlo "
                        + "más tarde.");
            } else {
                alert("Ocurrio un error al ejecutar el servicio.\nFavor de intentarlo "
                        + "más tarde.");
            }
        },
        scriptCharset: "utf-8",
        success: function (json) {

            // Validar que es un objeto
            if (!json) {
                $("#divImgCargando").hide();
                alert("No hay registros con esa seleccion.");
                return;
            }
            if (!json.datos || !json.datos.length || (!json.datos.length < 0)) {
                $("#divImgCargando").hide();
                alert("No hay Informacion con esa seleccion.");
                return;
            }
            llenaTablaExpediente(json);
        },
        // Le damos 30 segundos a la petición para recibir una respuesta
        timeout: 30000,
        // Hacemos una petición de tipo "GET"
        type: "GET",
        // La URL que vamos a consultar
        url: "../api/resguardo/obtenerRegResguardos?recibido="+recibido
    });    
}//fin tInformacion

function verResguardo(fila) {
    var datosRes = (fila !== undefined) ? $.parseJSON($.base64.decode(fila)) : null;
    console.log(datosRes);
    var datos = {
        "usuario": datosRes.USUARIO,
        "nombreUsuario": datosRes.NOMBRE,
        "idSistemaResguardo": datosRes.ID,
        "from": "ajuarez@queretaro.gob.mx"//luisdelacruz
    };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: 'sVerResguardo',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: 'json',
        responseType: 'json',
        success: function (resultado) {
            try {
                console.log(resultado);
                var pdfResult = resultado.datos;
                let pdfWindow = window.open("");
                pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(pdfResult) + "'></iframe>");
            } catch (e) {
                setTimeout(function () {
                    general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error al cargar el resguardo: ' + e + '.', 'danger', true);
                }, 500);
            }
        },
        error: function () {
            general.unblock();
            setTimeout(function () {
                general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error en la petición al servidor al cargar el resguardo.', 'danger', true);
            }, 500);
        },
        complete: function () {
            general.unblock();
        }
    });
}



function actionFormatter(value, row, index) {
    var sReci = "";
    var sInac = "";
    var ver = "";
    if (row.FECHA_REC == 'null') {
        sReci = '<button type="button" class="btn btn-success bReci  btn-xs" id="aCambiaEst' + row.FOLIO + '"><i class="fa fa-exchange"></i></button> ';
    }
    if (row.ESTATUS == 'AC') {
        sInac = '<button type="button" class="btn btn-danger bInac  btn-xs" id="aCambiaIna' + row.FOLIO + '"><i class="fa fa-ban"></i></button>';
    }
    var ver = '&nbsp;<a class="btn btn-primary btn-lg btn-xs" role="button"  href="javascript:verResguardo(\'' + $.base64.encode(JSON.stringify(row)) + '\');" data-toggle="tooltip" data-placement="top" title="Ver Resguardo"><i class="glyphicon glyphicon-eye-open"></i></a>';
    return (sReci + sInac + ver);
}

cargato2();
