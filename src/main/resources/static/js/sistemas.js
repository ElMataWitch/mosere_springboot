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
        $("#fSistema").attr("action",'/mosere/sistemas/guardar');
        
    });
        
    $("#bCancel").click(function () {
        $("#dFormulario").hide("slow");
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
        $("#fSistema").attr("action",'/mosere/sistemas/actualizar');
		$("#nombre").focus();  
	
    }); 	 
}

//botones laterales derecho funcionen
console.log(screen.width);
$(window).resize(function(){
    //funcSistemas();
    actionFormatter();
});



funcSistemas();
botones();