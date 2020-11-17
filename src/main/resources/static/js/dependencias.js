var jdatos2 = null;
function iniDependencia() {
    $(".ocultar").hide();
    actualiza();
    tInfoDependenciasTodos();
    actualiza();
}

function botones() {
    iniDependencia();
    $("#bSalvaIfo").click(function () {
        $('#fDependencias').submit();
    });

    $("#bNuevo").click(function () {
        $("#descripcion").val("");
        $("#id").val("0");
        $("#dFormulario").show("slow");
        $("#descripcion").focus();
        $("#fDependencias").attr("action",'/mosere/api/dependencias/guardar');        
        $("#fDependencias").attr("method",'POST');
    });

    $("#bCancel").click(function () {
        $("#dFormulario").hide("slow");
    });
    
    $('#fDependencias').formValidation({
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
    $('#tListaDependencia').on('sort.bs.table', function (e) {
        iniDependencia();
    });
    $('#tListaDependencia').on('search.bs.table', function (e) {
        iniDependencia();
    });
    
}

function tInfoDependenciasTodos() {
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
            llenaTablaDependencias(json);
        },
        // Le damos 30 segundos a la petición para recibir una respuesta
        timeout: 30000,
        // Hacemos una petición de tipo "GET"
        type: "GET",
        // La URL que vamos a consultar
        url: "../api/dependencias/obtenerDependencias"
    });
}//fin tInformacion

function llenaTablaDependencias(jdatos) {
    if (jdatos != null) {
        $("#tListaDependencia").bootstrapTable('load', jdatos.datos);
        $("#tListaDependencia").bootstrapTable('selectPage', 1);
        jdatos2 = jdatos;
        $("td").each(function () {
            if ($(this).html() == "null")
                $(this).html("");
        });
    } else {
        $("#tListaDependencia").bootstrapTable({});
    }
    $(".bEdita").click(function () {
        var folio = $(this).attr("id");
        folio = folio.substring(6);
        llenaCamposEditar(folio);
        $("#dFormulario").show("slow");
        $("#fDependencias").attr("action",'/mosere/api/dependencias/actualizar');        
        $("#fDependencias").attr("method",'PUT');
        $("#descripcion").focus();
    });
}

function actualiza() {
    $("#tListaDependencia").bootstrapTable({
        exportTypes: ['excel'],
        exportOptions: {
            fileName: 'Dependencias',
            exportHiddenCells: 'true',
            ignoreColumn: [
                'ACCION']
        }
    });
}

function actionFormatter(value, row, index) {
    return [
        '<button type="button" class="btn btn-success bEdita" id="aEdita' + row.idDependencia + '"><i class="fa fa-pencil"> Editar</i></button>'
    ];
}
function llenaCamposEditar(id) {
    var reg = null;
    for (var i = 0; i < jdatos2.datos.length; i++) {
        reg = jdatos2.datos[i];
        if (reg.idDependencia == id) {
            $("#id").val(id);
            $("#descripcion").val(reg.descripcion);
            $("#estatus").val(reg.estatus);
            return;
        }
    }
}

function jajaxPost(forma) {
    var url = $(forma).attr('action');
    var method = $(forma).attr('method');
    var parameters = {
        "id" : $("#id").val(),
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
            iniDependencia();
        }        
    });
}
//
$(window).resize(function(){ 
    actionFormatter();
});


botones();