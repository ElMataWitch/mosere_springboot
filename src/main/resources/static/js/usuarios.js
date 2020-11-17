var jdatos2 = null;

function iniUsuarios() {
    $(".ocultar").hide();
    //actualiza();
    tInfoUsuariosTodos();
    actualiza();
}

function botones() {
    iniUsuarios();
    $("#bSalvaIfo").click(function () {
        $('#fUsuarios').submit();
    });

    $("#bInfoUsr").click(function () {
        var user = $("#usuario").val();

        if (user.length > 4){
            tInfoUsuariolDAP(user);}
        else{
            general.notify('<strong>Alerta</strong><br />', 'Son pocos caracteres para un usuario, favor de verificarlo', 'warning', true);
        }
    });

    $("#bNuevo").click(function () {
        $("#usuario").val("");
        $("#id").val("0");
        $("#dFormulario").show("slow");
        $("#usuario").focus();
        $("#fUsuarios").attr("action",'/mosere/api/usuarios/guardar');        
        $("#fUsuarios").attr("method",'POST');
    });
    
    $("#bCancel").click(function () {
        $("#dFormulario").hide("slow");
    });

    
    $('#fUsuarios').formValidation({
        excluded: [':disabled', ':hidden'],
        live: 'enabled',
        locale: 'es_ES'
    })
            .on('success.form.fv', function (e) {
                //Prevent form submission
                e.preventDefault();
                // You can get the form instance
                var $form = $(e.target);
                // and the FormValidation instance
                var fv = $form.data('formValidation');
                jajaxPost($(this));
            })
            .on('err.form.fv', function (e) {
                e.preventDefault();
                general.notify('<strong>Alerta</strong><br />', 'Existe uno o mas campos con informacion incorrecta, favor de verificarlo', 'warning', true);
                $("#DESCIPCION").focus();
            });
    
    
    $('#tListaUsuario').on('sort.bs.table', function (e) {
        iniUsuarios();
    });
    $('#tListaUsuario').on('search.bs.table', function (e) {
        iniUsuarios();
    });
}

function tInfoUsuariosTodos() {
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
            llenaTablaUsuarios(json);
        },
        // Le damos 30 segundos a la petición para recibir una respuesta
        timeout: 30000,
        // Hacemos una petición de tipo "GET"
        type: "GET",
        // La URL que vamos a consultar
        url: "../api/usuarios/obtenerUsuarios"
    });
}//fin tInformacion

function llenaTablaUsuarios(jdatos) {
    if (jdatos != null) {        
        $("#tListaUsuario").bootstrapTable('load', jdatos.datos);
        $("#tListaUsuario").bootstrapTable('selectPage', 1);
        jdatos2 = jdatos;
        $("td").each(function () {
            if ($(this).html() == "null")
                $(this).html("");
        });
    } else {
        $("#tListaUsuario").bootstrapTable({});
    }
    function dameFolio(folio) {
        folio = folio.substring(6);
        return folio;
    }
    $(".bEdita").click(function () {
        llenaCamposEditar(dameFolio($(this).attr("id")));
        $("#dFormulario").show("slow");
        $("#fUsuarios").attr("action",'/mosere/api/usuarios/actualizar');        
        $("#fUsuarios").attr("method",'PUT');
    });

    $(".bInfor").click(function () {
        var user = dameFolio($(this).attr("id"));        
        tInfoUsuariolDAP(user);
    });
}

function actualiza() {
    $("#tListaUsuario").bootstrapTable({
        exportTypes: ['excel'],
        exportOptions: {
            fileName: 'Usuarios',
            exportHiddenCells: 'true',
            ignoreColumn: [
                'ACCION']
        }
    });
}

function actionFormatter(value, row, index) {
    return [
    	'<div class="form-inline">'+
        '<button type="button" class="btn btn-success bEdita" id="aEdita' + row.idUsuarioMosere + '"><i class="fa fa-pencil"> Editar</i></button>' +        
//        '<button type="button" class="btn btn-info bInfor" id="aInfor' + row.usuario + '"><i class="fa fa-info">&nbsp;&nbsp;&nbsp;Info&nbsp;&nbsp;&nbsp;</i></button>'+
        '</div>'
    ];
}
function llenaCamposEditar(id) {
    var reg = null;
    
    for (var i = 0; i < jdatos2.datos.length; i++) {
        reg = jdatos2.datos[i];    
        if (reg.idUsuarioMosere == id) {
            $("#id").val(reg.idUsuarioMosere);
            $("#usuario").val(reg.usuario);
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
        "usuario" : $("#usuario").val(),
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
            iniUsuarios();
        }        
    });
}

function tInfoUsuariolDAP(user) {
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
                dialog.modal('hide');
                general.notify('<strong>Alerta</strong><br />', 'No hay registros con esa selección!! ', 'warning', true);
                return;
            }
            if (json.estatus != "success") {
                dialog.modal('hide');
                general.notify('<strong>Alerta</strong><br />', 'No hay Informacion con esa seleccion.', 'warning', true);
                return;
            }
            muestraInfoLdap(json);
        },
        // Le damos 30 segundos a la petición para recibir una respuesta
        timeout: 30000,
        // Hacemos una petición de tipo "GET"
        type: "GET",
        // La URL que vamos a consultar
        url: "../api/ldapInfo/infoUsuario/" + user
    });
}//fin tInformacion
function muestraInfoLdap(json) {

    var reg = json.datos;
    var myHtml = "<table class='table table-bordered table-hover table-condensed' border='1'><tr><th>CAMPO</th><th>VALOR</th></tr>";
    myHtml += "<tr><td>Cuenta</td><td>" + reg.cuenta + "</td></tr>";
    myHtml += "<tr><td>Nombre</td><td>" + reg.nombre + "</td></tr>";
    myHtml += "<tr><td>Apellidos</td><td>" + reg.apellido + "</td></tr>";
    myHtml += "<tr><td>Correo</td><td>" + reg.correo + "</td></tr>";
    myHtml += "<tr><td>Secretaria</td><td>" + reg.secretaria + "</td></tr>";
    myHtml += "<tr><td>Dirección</td><td>" + reg.direccion + "</td></tr>";
    myHtml += "<tr><td>Habilitado&nbsp;&nbsp;&nbsp;</td><td>" + reg.habilitado + "</td></tr>";
    myHtml += "</table>";
    bootbox.alert("<center><h3>INFORMACIÓN DE USUARIO</h3><br><br>" + myHtml + "</center>");
}

$(window).resize(function(){
    //iniUsuarios();
    actionFormatter();
});


//setInterval('actionFormatter()',1000);

botones();