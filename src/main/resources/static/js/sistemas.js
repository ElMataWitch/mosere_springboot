var jdatos2 = null;
function funcSistemas() {	
    $(".ocultar").hide();
    actualiza();
    $("#tListaSistemas").bootstrapTable({});
    tInfoSistemasTodos();
    actualiza();
    
}
function botones() {
    $("#bSalvaIfo").click(function () {
        $('#fSistema').submit();
    });

    $("#bNuevo").click(function () {
        $("#nombre").val("");
        $("#descripcion").val("");
        $("#id").val("0");
        $("#dFormulario").show("slow");
        $("#nombre").focus();
        $("#fSistema").attr("action",'/mosere/api/sistemas/guardar');
        $("#fSistema").attr("method",'POST');
        
    });
        
    $("#bCancel").click(function () {
        $("#dFormulario").hide("slow");
    });
        
    $('#fSistema').formValidation({
        excluded: [':disabled', ':hidden'],
        live: 'enabled',
        locale: 'es_ES'
    })
            .on('success.form.fv', function (e) {
                e.preventDefault();
                var $form = $(e.target);
                var fv = $form.data('formValidation');;
                jajaxPost($(this));
            }).on('err.form.fv', function (e) {
        e.preventDefault();
        general.notify('<strong>Alerta</strong><br />', 'Existe uno o mas campos con informacion incorrecta, favor de verificarlo', 'warning', true);
        $("#nombre").focus();
    });
        
    $('#tListaSistemas').on('sort.bs.table', function (e) {
        funcSistemas();
    });
    $('#tListaSistemas').on('search.bs.table', function (e) {
        funcSistemas();
    });
}
function actualiza() {
    $("#tListaSistemas").bootstrapTable({
        uniqueId: 'ID',
        exportTypes: ['excel'],
        exportOptions: {
            fileName: 'Sistemas',
            exportHiddenCells: 'true',
            ignoreColumn: [
                'ACCION']
        }
    });

}
function actionFormatter(value, row, index) {
    return [
        '<button type="button" class="btn btn-success bEdita" id="aEdita' + row.idSistema + '"><i class="fa fa-pencil"> Editar</i></button>'
    ];
}
function llenaCamposEditar(id) {
    var reg = null;
    for (var i = 0; i < jdatos2.datos.length; i++) {
        reg = jdatos2.datos[i];
        if (reg.idSistema == id) {
            $("#id").val(reg.idSistema);
            $("#nombre").val(reg.nombre);
            $("#descripcion").val(reg.descripcion);
            $("#estatus").val(reg.estatus);
            $("#enviaCorreo").val(reg.enviaCorreo);
            return;
        }
    }
}
    
function tInfoSistemasTodos() {
    var dialog = null;
    $.ajax({
        beforeSend: function () {
                dialog=bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Cargando...</div>' });
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
            llenaTablaSistemas(json);
        },
        // Le damos 30 segundos a la petición para recibir una respuesta
        timeout: 30000,
        // Hacemos una petición de tipo "GET"
        type: "GET",
        // La URL que vamos a consultar
        url: "../api/sistemas/obtenerSistemas"
    });
}//fin tInformacion


function llenaTablaSistemas(jdatos) {
    if (jdatos != null) {
        $("#tListaSistemas").bootstrapTable('load', jdatos.datos);
        $("#tListaSistemas").bootstrapTable('selectPage', 1);
        jdatos2 = jdatos;
        $("td").each(function () {
            if ($(this).html() == "null")
                $(this).html("");
        });

    } else {
        $("#tListaSistemas").bootstrapTable({});
    }
    $(".bEdita").click(function () {
        var folio = $(this).attr("id");
        folio = folio.substring(6);
        llenaCamposEditar(folio);
        console.log("entra");
        $("#dFormulario").show("slow");      
        $("#nombre").focus();
        $("#fSistema").attr("action",'/mosere/api/sistemas/actualizar');
        $("#fSistema").attr("method",'PUT');	
    }); 	 
}

function jajaxPost(forma) {
    var url = $(forma).attr('action');
    var method = $(forma).attr('method');
    var parameters = {
        "id" : $("#id").val(),
        "nombre" : $("#nombre").val(),
        "enviaCorreo" : $("#enviaCorreo").val(),
        "estatus" : $("#estatus").val(),
        "usuarioCaptura" : $("#usuarioCaptura").val(),
        "fechaCaptura" : $("#fechaCaptura").val(),
        "usuarioEditor" : $("#usuarioEditor").val(),
        "fechaEdicion" : $("#fechaEdicion").val(),
        "descripcion" : $("#descripcion").val()
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
            funcSistemas();
        }        
    });
}

//botones laterales derecho funcionen
$(window).resize(function(){
    //funcSistemas();
    actionFormatter();
});

funcSistemas();
botones();