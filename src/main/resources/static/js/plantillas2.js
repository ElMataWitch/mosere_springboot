var jdatos2 = null;

function iniEtiqueta() {
    $(".ocultar").hide();
    actualiza();
    $("#tListaLeyendas").bootstrapTable({});
    //tInfoLeyendasTodos();
    actualiza();
}

function botones() {
    

    iniEtiqueta();

    $('#tListaLeyendas').on('sort.bs.table', function (e) {
        iniLeyenda();
    });
    $('#tListaLeyendas').on('search.bs.table', function (e) {
        tInfoLeyendasTodos();
    });
}

function tInfoLeyendasTodos() {
    var idSistema = $("#sistema").val();    
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
                $("#btnPlantilla").show("slow");
                $('#contenedor').hide();
                llenaTablaLeyendas(json);
            }
            if(json.datos.length > 0 ){
                $("#divImgCargando").hide();            
                $("#btnPlantilla").hide("slow");
                llenaTablaLeyendas(json);       
            }                        
                 
        },        
        timeout: 30000,
        type: "GET",
        url: "../api/etiquetas/obtenerPorIdSistema/" + idSistema
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
    });
}
function llenaCamposEditar(id) {
    var reg = null;
    for (var i = 0; i < jdatos2.datos.length; i++) {
        reg = jdatos2.datos[i];        
        if (reg.idEtiqueta == id) { 
            if(reg.posicion == "Encabezado"){                                
                $('#encabezado').summernote('code', reg.descripcion);
            }
            if(reg.posicion == "Leyenda"){                
                $('#leyenda').summernote('code', reg.descripcion);
            }
            if(reg.posicion == "Apertura"){                                
                $('#apertura').summernote('code', reg.descripcion);
            }
            if(reg.posicion == "Cuerpo"){                
                $('#cuerpo').summernote('code', reg.descripcion);
            } 
            if(reg.posicion == "Mensaje"){                                
                $('#mensaje').summernote('code', reg.descripcion);
            }                    
                        
            /*$("#apertura").val(reg.descripcion);  
            $("#cuerpo").val(reg.descripcion);              
            $("#mensaje").val(reg.descripcion);
            */
            //return;
        }
    }
}

function actionFormatter(value, row, index) {
    return [
    	'<div class="form-inline">'+
        '<button type="button" class="btn btn-success bEdita" id="aEdita' + row.idEtiqueta + '"><i class="fa fa-pencil"> Usar</i></button>'+
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
function tInfoListaSistemas() {
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
        scriptCharset: "utf-8",
        success: function (json) {            
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
        timeout: 30000,
        type: "GET",        
        url: "../api/sistemas/obtenerIdNombre"
    });
}

function llenacCbSistema(json) {
    var reg = null;
    var myHtml = "";
    myHtml += "<option value=''>Seleccione un Sistema</option>";
    for (var i = 0; i < json.datos.length; i++) {
        reg = json.datos[i];
        myHtml += "<option value=" + reg.idSistema + ">" + reg.nombre + "</option>";
    }
    $("#sistema").html(myHtml);
}
function tInfoListaDependencias() {//recibe el listado de sistemas
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
                general.notify('<strong>Alerta</strong><br />', 'No hay registros de dependencias!! ', 'warning', true);
                return;
            }
            if (!json.datos || !json.datos.length || (!json.datos.length < 0)) {
                $("#divImgCargando").hide();
                general.notify('<strong>Alerta</strong><br />', 'No hay registros de dependencias.', 'warning', true);
                return;
            }
            llenacCbDependencias(json);
        },
        // Le damos 30 segundos a la petición para recibir una respuesta
        timeout: 30000,
        // Hacemos una petición de tipo "GET"
        type: "GET",
        // La URL que vamos a consultar
        url: "../api/ldapInfo/consultarDependencia/s"
    });
}//fin tInformacion

function llenacCbDependencias(json) {
    var reg = null;
    var myHtml = "";
    myHtml += "<option value=''>Seleccione una Dependencia</option>";
    for (var i = 0; i < json.datos.length; i++) {
        reg = json.datos[i];
        //console.log(reg);
        myHtml += "<option value='" + reg.description + "'>" + reg.description + "</option>";
    }
    $("#dependencia").html(myHtml);
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

function jajaxPost(datos) {    
    //console.log(datos);
    console.log("si llegamos a la funcion");
    $.ajax({
        timeout: 40000,
        type: "POST",
        url: "../api/resguardo/guardar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(datos),
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
        }        
    });
}

$(window).resize(function(){
    //funcSistemas();
    actionFormatter();
    console._inspectorCommandLineAPI.clear() 
});


tInfoListaSistemas();
tInfoListaDependencias();
botones();
