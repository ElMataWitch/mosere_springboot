var jdatos2 = null;

function iniLeyenda() {
    $(".ocultar").hide();
    actualiza();
    $("#tListaLeyendas").bootstrapTable({});
    tInfoLeyendasTodos();
    
    actualiza();
}

function botones() {
    iniLeyenda();
    
    $("#bSalvaIfo").click(function () {
        $('#fLeyendas').submit();
    });

    $("#bNuevo").click(function () {
        $("#descripcion").val("");
        $("#id").val("0");
        $("#dFormulario").show("slow");
        $("#idSistema").focus();
        $("#fLeyendas").attr("action",'/mosere/api/etiquetas/guardar');
        $("#fLeyendas").attr("method",'POST');
        
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
    $("#bComando").click(function () {
        if (myHtml == "") {
            tInfoListaComandos();
        }
        else {
            bootbox.alert("<center><h1>LISTA DE COMANDOS</h1><br><br><h2>" + myHtml + "</h2></center>");
        }
    });
    $('#tListaLeyendas').on('sort.bs.table', function (e) {
        iniLeyenda();
    });
    $('#tListaLeyendas').on('search.bs.table', function (e) {
        tInfoLeyendasTodos();
    });
}

function tInfoLeyendasTodos() {
    var dialog = null;
    $.ajax({
        beforeSend: function () {
            dialog = bootbox.dialog({message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Cargando...</div>'});
        },
        cache: false,
        complete: function () {
            dialog.modal('hide');
        },        
        contentType: "application/x-www-form-urlencoded; charset=utf-8",        
        dataType: "json",        
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
            llenaTablaLeyendas(json);            
        },        
        timeout: 30000,
        type: "GET",
        url: "../api/etiquetas/obtenerEtiquetas"
    });
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
    function dameFolio(folio) {
        folio = folio.substring(6);
        return folio;
    }
    $(".bEdita").click(function () {        
        llenaCamposEditar(dameFolio($(this).attr("id")));
        $("#dFormulario").show("slow");
        $("#idSistema").focus();
        $("#fLeyendas").attr("action",'/mosere/api/etiquetas/actualizar');
        $("#fLeyendas").attr("method",'PUT');
    });
}
function llenaCamposEditar(id) {
    var reg = null;
    for (var i = 0; i < jdatos2.datos.length; i++) {
        reg = jdatos2.datos[i];
        if (reg.idEtiqueta == id) {
            $("#id").val(reg.idEtiqueta);
            $("#idSistema").val(reg.sistema.idSistema);
            $("#descripcion").val(reg.descripcion);
            $("#estatus").val(reg.estatus);
            $("#posicion").val(reg.posicion);
            return;
        }
    }
}

function actionFormatter(value, row, index) {
    return [
    	'<div class="form-inline">'+
        '<button type="button" class="btn btn-success bEdita" id="aEdita' + row.idEtiqueta + '"><i class="fa fa-pencil"> Editar</i></button>'+
        '</div>'
    ];
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
//insertPorJson
function jajaxPost(forma) {
    var url = $(forma).attr('action');
    var method = $(forma).attr('method');
    var parameters = {
        "id" : $("#id").val(),
        "idSistema" : $("#idSistema").val(),
        "posicion" : $("#posicion").val(),
        "descripcion" : $("#descripcion").val(),
        "estatus" : $("#estatus").val(),
        "usuarioCaptura" : $("#usuarioCaptura").val(),
        "fechaCaptura" : $("#fechaCaptura").val(),
        "usuarioEditor" : $("#usuarioEditor").val(),
        "fechaEdicion" : $("#fechaEdicion").val()
    }
    //console.log(parameters);
    $.ajax({
        timeout: 40000,
        type: method,
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(parameters),
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
                general.notify('<strong> Error!!</strong><br />', 'Ah ocurrido Un Error al Guardar/Actualizar la etiqueta', 'danger', true);
                return;
            }
            general.notify('<strong> Éxito</strong><br />', 'Operación Realizada Con Éxito', 'success', true);
            iniLeyenda();
        }        
    });
}

function tInfoListaSistemas() {//recibe el listado de sistemas
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
        type: "GET",
        // La URL que vamos a consultar
        url: "../api/sistemas/obtenerIdNombre"
    });
}//fin tInformacion

function llenacCbSistema(json) {
    var reg = null;
    var myHtml = "";
    for (var i = 0; i < json.datos.length; i++) {
        reg = json.datos[i];
        myHtml += "<option value=" + reg.idSistema + ">" + reg.nombre + "</option>";
    }
    $("#idSistema").html(myHtml);
}
function tInfoListaPosiciones() {//recibe el listado de sistemas
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
            llenacCbPosicion(json);
        },
        // Le damos 30 segundos a la petición para recibir una respuesta
        timeout: 30000,
        // Hacemos una petición de tipo "GET"
        type: "GET",
        // La URL que vamos a consultar
        url: "../api/etiquetas/obtenerPosicionEtiquetas"
    });
}//fin tInformacion

function llenacCbPosicion(json) {
    var reg = null;
    var myHtml = "";
    for (var i = 0; i < json.datos.length; i++) {
        reg = json.datos[i];
        //console.log(reg);
        myHtml += "<option value='" + reg + "'>" + reg + "</option>";
    }
    $("#posicion").html(myHtml);
}



var myHtml = "";
function muestraComandos(json) {
    myHtml = "<table class='table table-bordered table-hover table-condensed' border='1'><tr><th>COMANDO</th><th>DESCRIPCIÓN</th></tr>";
    var reg = null;
    for (var i = 0; i < json.datos.length; i++) {
        reg = json.datos[i];
        myHtml += "<tr><td>";
        myHtml += reg.nombre + "</td><td>" + reg.descripcion + "</td></tr>";
    }
    myHtml += "</table>";
    bootbox.alert("<center><h1>LISTA DE COMANDOS</h1><br><h2>" + myHtml + "</h2></center>");
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
        type: "GET",
        // La URL que vamos a consultar
        url: "../api/variables/obtenerVariables"
    });
}//fin tInformacion
$(window).resize(function(){
    //iniUsuarios();
    actionFormatter();
});
tInfoListaSistemas();
//tInfoListaPosiciones();
botones();