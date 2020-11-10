var jdatos2 = null;
function iniLeyenda() {
    $(".ocultar").hide();
    actualiza();
    tInfoLeyendasTodos("todos");
    actualiza();
}

function llenaTablaLeyendas(jdatos) {
    if (jdatos != null) {
        $("#tListaLeyendas").bootstrapTable('load', jdatos.datos);
        $("#tListaLeyendas").bootstrapTable('selectPage', 1);
        jdatos2 = jdatos;
        $("td").each(function () {
            if ($(this).html() == "null")
                $(this).html("");
        });
    } else {
        $("#tListaLeyendas").bootstrapTable({});
    }
    $(".bEdita").click(function () {
        var folio = $(this).attr("id");
        folio = folio.substring(6);
        llenaCamposEditar(folio);
        $("#dFormulario").show("slow");
    });
}
function llenaCamposEditar(id) {
    var reg = null;
    for (var i = 0; i < jdatos2.datos.length; i++) {
        reg = jdatos2.datos[i];
        if (reg.ID == id) {
            $("#ID").val(id);
            $("#ID_SISTEMA").val(reg.ID_SISTEMA);
            $("#DESCRIPCION").val(reg.DESCRIPCION);
            $("#ESTATUS").val(reg.ESTATUS);
            $("#POSICION").val(reg.POSICION);
            return;
        }
    }
}

function actionFormatter(value, row, index) {
    return [
        '<button type="button" class="btn btn-success bEdita" id="aEdita' + row.ID + '"><i class="fa fa-pencil"> Editar</i></button>'
    ];
}

function tInfoLeyendasTodos(filtro) {
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
            if (!json) {
                $("#divImgCargando").hide();
                general.notify('<strong>Alerta</strong><br />', 'No hay registros con esa selección!! ', 'warning', true);
                return;
            }
            if (!json.datos || !json.datos.length || (!json.datos.length < 0)) {
                $("#divImgCargando").hide();
                general.notify('<strong>Alerta</strong><br />', 'No hay Informacion con esa seleccion.', 'warning', true);
                return;
            }
            if (filtro == "todos") {
                llenaTablaLeyendas(json);
            }
            else {
                llenacCbPosicion(json);
            }
        },
        // Le damos 30 segundos a la petición para recibir una respuesta
        timeout: 30000,
        // Hacemos una petición de tipo "GET"
        type: "POST",
        // La URL que vamos a consultar
        url: "sListaLeyendas?filtro=" + filtro
    });
}//fin tInformacion
var myHtml = "";
function botones() {
    iniLeyenda();
    $("#bSalvaIfo").click(function () {
        $('#fLeyendas').submit();
    });

    $("#bNuevo").click(function () {
        $("#DESCRIPCION").val("");
        $("#ID").val("0");
        $("#dFormulario").show("slow");
        $("#SISTEMA").focus();
    });

    $("#bCancel").click(function () {
        $("#dFormulario").hide("slow");
    });

    $('#fLeyendas').formValidation({
        excluded: [':disabled', ':hidden'],
        live: 'enabled',
        locale: 'es_ES'
    })
            .on('success.form.fv', function (e) {
                // Prevent form submission
                e.preventDefault();
                // You can get the form instance
                var $form = $(e.target);
                // and the FormValidation instance
                var fv = $form.data('formValidation');
                jajaxPost($(this));
            }).on('err.form.fv', function (e) {
        e.preventDefault();
        general.notify('<strong>Alerta</strong><br />', 'Existe uno o mas campos con informacion incorrecta, favor de verificarlo', 'warning', true);
        $("#DESCIPCION").focus();
    });
    tInfoListaSistemas("idname");//llena ch de sistemas
    tInfoLeyendasTodos("posicion");//llena ch de posiciones
    $("#bComando").click(function () {
        if (myHtml == "") {
            tInfoListaComandos();
        }
        else {
            bootbox.alert("<center><h1>LISTA DE COMANDOS</h1><br><br><h2>" + myHtml + "</h2></center>");
        }
    });
}
function actualiza() {
    $("#tListaLeyendas").bootstrapTable({
        //uniqueId: 'ID',
        exportTypes: ['excel'],
        exportOptions: {
            fileName: 'Sistemas',
            exportHiddenCells: 'true',
            ignoreColumn: [
                'ACCION']
        }
    });

}

function jajaxPost(forma) {
    var url = $(forma).attr('action');  //la url del action del formulario
    var datos = $(forma).serialize(); // los datos del formulario
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
            if (json == "0") {
                general.notify('<strong>Alerta</strong><br />', 'No se pudo actualizar la Leyenda', 'danger', true);
                return;
            }
            general.notify('<strong>Actualizado</strong><br />', 'Se actualizo la Leyenda', 'success', true);
            iniLeyenda();
        },
        timeout: 40000,
        data: datos,
        type: "POST",
        url: url
    });
}

function tInfoListaSistemas(filtro) {//recibe el listado de sistemas
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
        scriptCharset: "utf-8",
        success: function (json) {

            // Validar que es un objeto
            if (!json) {
                $("#divImgCargando").hide();
                general.notify('<strong>Alerta</strong><br />', 'No hay registros de sistemas!! ', 'warning', true);
                return;
            }
            if (!json.datos || !json.datos.length || (!json.datos.length < 0)) {
                $("#divImgCargando").hide();
                general.notify('<strong>Alerta</strong><br />', 'No hay registros de sistemas.', 'warning', true);
                return;
            }
            llenacCbSistema(json);
        },
        // Le damos 30 segundos a la petición para recibir una respuesta
        timeout: 30000,
        // Hacemos una petición de tipo "GET"
        type: "POST",
        // La URL que vamos a consultar
        url: "sListaSistemas?dato=" + filtro
    });
}//fin tInformacion

function llenacCbSistema(json) {
    var reg = null;
    var myHtml = "";
    for (var i = 0; i < json.datos.length; i++) {
        reg = json.datos[i];
        myHtml += "<option value=" + reg.ID + ">" + reg.NOMBRE + "</option>";
    }
    $("#ID_SISTEMA").html(myHtml);
}

function llenacCbPosicion(json) {
    var reg = null;
    var myHtml = "";
    for (var i = 0; i < json.datos.length; i++) {
        reg = json.datos[i];
        myHtml += "<option value='" + reg.POSICION + "'>" + reg.POSICION + "</option>";
    }
    $("#POSICION").html(myHtml);
}


function jajaxPost(forma) {
    var url = $(forma).attr('action');  //la url del action del formulario
    var datos = $(forma).serialize(); // los datos del formulario

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
            if (json == "0") {
                general.notify('<strong>Alerta</strong><br />', 'No se pudo actualizar la Leyenda', 'danger', true);
                return;
            }
            general.notify('<strong>Actualizado</strong><br />', 'Se actualizo la Leyenda', 'success', true);
            iniLeyenda();
        },
        timeout: 40000,
        data: datos,
        type: "POST",
        url: url
    });
}

function muestraComandos(json) {
    myHtml = "<table border='1'><tr><th>COMANDO</th><th>DESCRIPCIÓN</th></tr>";
    var reg = null;
    for (var i = 0; i < json.datos.length; i++) {
        reg = json.datos[i];
        myHtml += "<tr><td>";
        myHtml += reg.NOMBRE + "</td><td>" + reg.DESCRIPCION + "</td></tr>";
    }
    myHtml += "</table>";
    bootbox.alert("<center><h1>LISTA DE COMANDOS</h1><br><br><h2>" + myHtml + "</h2></center>");
}
function tInfoListaComandos() {//recibe el listado de los comandos
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
        scriptCharset: "utf-8",
        success: function (json) {

            // Validar que es un objeto
            if (!json) {
                dialog.modal('hide');
                general.notify('<strong>Alerta</strong><br />', 'No hay registros de comandos!! ', 'warning', true);
                return;
            }
            if (!json.datos || !json.datos.length || (!json.datos.length < 0)) {
                dialog.modal('hide');
                general.notify('<strong>Alerta</strong><br />', 'No hay registros de comandos.', 'warning', true);
                return;
            }
            muestraComandos(json);
        },
        // Le damos 30 segundos a la petición para recibir una respuesta
        timeout: 30000,
        // Hacemos una petición de tipo "GET"
        type: "POST",
        // La URL que vamos a consultar
        url: "sListaVariables"
    });
}//fin tInformacion

botones();