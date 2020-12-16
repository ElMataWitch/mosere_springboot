/* global general, bootbox, e */
var idRoles = "";
var band = "";
var plantillas = {

    cmbDependencia: null,
    encabezado: null,
    leyenda: null,
    cuerpo: null,
    apertura: null,
    autoriza: null,
    correo: null,
    mensaje: null,
    sFormulario: null,
    cmbSistema: null,
    btnGenera: null,
    btnVisualiza: null,
    btnReset: null,
    correo: null,
    btnBuscar: null,
    EnableBuscar: null,
    EnableResguardo: null,
    dependenciaTxt: null,
    tListaEtiquetas: null,
    

    btnNuevoRol:null,
    
    tblRoles: null,
    cmbTxtRol: null,
    btnAgregarRol:null,

    

    btnResguardo: null,

    //metodos
    init: function () {

        let searchParams = new URLSearchParams(window.location.search);
        var seleccionado = searchParams.get('sys');

        this.sFormulario = $('#sFormulario');
        this.encabezado = $('#encabezado');
        this.cuerpo = $('#cuerpo');
        this.leyenda = $('#leyenda');
        this.apertura = $('#apertura');
        this.mensaje = $('#mensaje');
        this.usuario = $('#usuario');
        this.autoriza = $('#autoriza');
        this.correo = $('#correo');
        this.EnableBuscar = $('#EnableBuscar');
        this.EnableResguardo = $('#EnableResguardo');
        /// this.dependenciaTxt = $('#dependenciaTxt');

        this.cmbSistema = $('#sistema');
        this.cmbDependencia = $('#dependencia');

        this.correo = $('#correo');

        this.btnGenera = $('#btnGenera');
        this.btnVisualiza = $('#btnVisualiza');
        this.btnReset = $('#btnReset');
        this.btnBuscar = $('#btnBuscar');
        this.btresguardo = $('#btresguardo');        

        this.cmbTxtRol = $('#cmbTxtRol');
        this.btnAgregarRol = $('#btnAgregarRol');
   
        this.tblRoles = $('#tblRoles');
        this.tblRoles.bootstrapTable('load',"");
        
   
        this.tblRoles.bootstrapTable();
     
        this.tblRoles.bootstrapTable('resetView');

        this.btnNuevoRol = $('#btnNuevoRol');

        this.btnResguardo = $('#btnResguardo');

        //this.cargaVariables();

        

        plantillas.encabezado.summernote({
            disableDragAndDrop: true,
            lang: 'es-ES',
            height: 100,
            callbacks: {
                onPaste: function (e) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    e.preventDefault();
                    document.execCommand('insertText', false, bufferText);
                },
                onChange: function (contents, $editable) {
                    if (contents.search('<a') !== -1) {
                        plantillas.encabezado.summernote('undo');
                    }
                }
            }
        });



        plantillas.leyenda.summernote({
            disableDragAndDrop: true,
            lang: 'es-ES',
            height: 100,
            callbacks: {
                onPaste: function (e) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    e.preventDefault();
                    document.execCommand('insertText', false, bufferText);
                },
                onChange: function (contents, $editable) {
                    if (contents.search('<a') !== -1) {
                        plantillas.leyenda.summernote('undo');
                    }
                }
            }
        });


        plantillas.apertura.summernote({
            disableDragAndDrop: true,
            lang: 'es-ES',
            height: 100,
            callbacks: {
                onPaste: function (e) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    e.preventDefault();
                    document.execCommand('insertText', false, bufferText);
                },
                onChange: function (contents, $editable) {
                    if (contents.search('<a') !== -1) {
                        plantillas.apertura.summernote('undo');
                    }
                }
            }
        });

        plantillas.cuerpo.summernote({
            disableDragAndDrop: true,
            lang: 'es-ES',
            height: 100,
            callbacks: {
                onPaste: function (e) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    e.preventDefault();
                    document.execCommand('insertText', false, bufferText);
                },
                onChange: function (contents, $editable) {
                    if (contents.search('<a') !== -1) {
                        plantillas.cuerpo.summernote('undo');
                    }
                }
            }
        });


        plantillas.mensaje.summernote({
            disableDragAndDrop: true,
            lang: 'es-ES',
            height: 100,
            callbacks: {
                onPaste: function (e) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    e.preventDefault();
                    document.execCommand('insertText', false, bufferText);
                },
                onChange: function (contents, $editable) {
                    if (contents.search('<a') !== -1) {
                        plantillas.mensaje.summernote('undo');
                    }
                }
            }
        });



        

        this.btnAgregarRol.click(function () {
            plantillas.agregarRol($.trim(plantillas.cmbTxtRol.val()));
         });

        this.btnAgregarRol.click(function () {
            plantillas.agregarRol($.trim(plantillas.cmbTxtRol.val()));
         });
         

        this.btnReset.click(function () {
            plantillas.resetForm();

        });

        this.btnNuevoRol.click(function () {
            window.location.href = '/mosere/roles/listado';
        });

        this.btnResguardo.click(function () {     
            var fecha = new Date();
            var anio = fecha. getFullYear();       
            console.log("boton verde");            
            var datos = {
                "idResguardo": 0,
                "anio": anio,                
                "usuario": $("#usuario").val(),
                "nombre": $("#nombre").val(),
                "dependenciaName": $("#dependenciaName").val(),
                "departamento": $("#departamento").val(),
                "autoriza": $("#autoriza").val(),
                "correo": $("#correo").val(),
                "estatus": "AC",
                "usuarioCaptura": "ehermosillo",
                "sistema": $("#sistemaName").val(),
                "idSistema": $("#idSistema").val()
            }                
            console.log(datos);
            jajaxPost(datos) 
            
        });

        this.btnVisualiza.click(function () {  
            console.log("dandole");
            $("#sFormulario").submit();
        });



        this.cmbSistema.on("change", function () {

            //if(plantillas.cmbSistema.val()!==seleccionado){
            if (plantillas.cmbSistema.val() !== seleccionado) {
                plantillas.limpiaParametros();
                $("#sistemaName").val($("#sistema option:selected").text());
                $("#idSistema").val($('#sistema option:selected').val());
                plantillas.cargaRoles();
               // plantillas.limpiaUsuario();
                //plantillas.obtieneEtiquetas(); aca es donde comenzare tabla para usarla                
                $('#contenedor').show();
                tInfoLeyendasTodos();
            }

        });

        this.cmbDependencia.on("change", function () {            
                plantillas.limpiaParametros();
                $("#dependenciaName").val($("#dependencia option:selected").text());                       

        });
        


        this.btnBuscar.click(function () {

            if (plantillas.usuario.val().length > 0) {
                plantillas.buscarUsuario(plantillas.usuario.val());
            } else {
                general.notify('<strong>Campos vacios</strong><br />', 'Ingrese el usuario por favor.', 'warning', true);


            }

        });

        this.btnBuscar.hide();
        // $('#divDepInput').hide();


        this.EnableBuscar.click(function () {
            if (plantillas.usuario.val().length > 0) {
                if (plantillas.EnableBuscar.prop('checked')) {
                    plantillas.usuarioAutomatico();
                } else {
                    plantillas.usuarioManual();
                }
            } else {
                general.notify('<strong>Campos vacios</strong><br />', 'Ingrese el usuario por favor.', 'warning', true);
                plantillas.EnableBuscar.prop('checked', false);

            }

        });

        this.EnableResguardo.click(function () {
            
            console.log("llegamos")
                        
            if(band != 0 && band != ""){
                console.log(false);  
                $("#btnVisualiza").show('slow');
                $("#btnResguardo").hide('slow');
                //$("#sFormulario").attr("action",'/mosere/api/resguardo/visualizarResguardo');   
                //$("#sFormulario").attr("method",'GET');
                band -= 1;        
            }else{
                console.log(true);              
                band += 1;
                $("#btnVisualiza").hide('slow');
                $("#btnResguardo").show('slow'); 
                //$("#sFormulario").attr("action",'/mosere/api/resguardo/guardar'); 
                //$("#sFormulario").attr("method",'POST');
                //$("#sFormulario").attr("target",''); 
                
               
            }

        });

        
        plantillas.cargaSelect();

        


        if (seleccionado !== null) {
            if (seleccionado.length > 0) {
                plantillas.obtieneEtiquetas();

                plantillas.usuarioAutomatico();
                $('#btnBuscar').hide();
                plantillas.EnableBuscar.hide();
                plantillas.btnVisualiza.hide();
                $('#autoriza').prop('disabled', true);



            }

        }






        /*  var url = new URL(window.location.search);
         var c = url.searchParams.get("c");
         console.log(c);
         */


    },
    limpiaParametros: function () {
        var uri = window.location.toString();
        if (uri.indexOf("?") > 0) {
            var clean_uri = uri.substring(0, uri.indexOf("?"));
            window.history.replaceState({}, document.title, clean_uri);
        }
    },

    usuarioManual: function () {
        $('#nombre').val("");
        $('#departamento').val("");
        $("#dependencia").select2("val", null);

        $('#departamento').prop('disabled', false);
        $('#usuario').prop('disabled', false);
        $('#nombre').prop('disabled', false);
        $('#dependencia').prop('disabled', false);

        $('#btnBuscar').hide();


    },
    cargaRoles : function() {
        var idSistema = plantillas.cmbSistema.val();            
    $.ajax({
        type : 'GET',            
        url : '../api/roles/obtenerRolesPorIdSistema/'+idSistema,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        // Indicar que esperamos un código JSON como respuesta
        dataType: "json",
        scriptCharset: "utf-8",
        success : function(resultado) {
            //console.log(resultado.estado);
            //console.log(resultado.datos[0].rol.idRol);
            try {
                if (resultado.estado === 'exito') {
                    //console.log("Si llega hasta aqui");
                    plantillas.cmbTxtRol.empty();  
                    $("#btnAgregarRol").show();
                    if(resultado.mensaje){
                                          $.each(resultado.datos, function(i, item) {
                        plantillas.cmbTxtRol.append('<option value="' + $.trim(item.rol.idRol) + '|' + $.trim(item.rol.rol) + '|' + $.trim(item.rol.descripcion) + '" >' + $.trim(item.rol.rol) + '</option>');
                      });
                    }else{
                            general.notify('<strong>Nos se encontraron roles</strong><br />', 'No se han registrado roles para el sistema seleccionado.', 'warning', true);
                            
                    }
                                            
                } else {
                    general.notify('<strong>Mensaje del Sistema</strong><br />', resultado.mensaje, resultado.estatus, true);
                }                    
                if(resultado.datos.length === 0){
                    general.notify('<strong>Nos se encontraron roles</strong><br />', 'No se han registrado roles para el sistema seleccionado.', 'warning', true);
                    $("#btnAgregarRol").hide();
                    plantillas.cmbTxtRol.empty();
                    plantillas.cmbTxtRol.append('<option value="">No Existen Roles Para El Sistema Seleccionado</option>');
                }                   
            } catch (e) {
                setTimeout(function() {
                    general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error al cargar los Roles: ' + e + '.', 'danger', true);
                }, 500);
            }
        },
        error : function() {
            general.unblock();
            setTimeout(function() {
                general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error en la petición al servidor al cargar los Roles.', 'danger', true);
            }, 500);
        },
        complete : function() {
                general.unblock();
        }
    });
},

    usuarioAutomatico: function () {

        $('#btnBuscar').show();
        //$('#divDepInput').show();
        //-------------------------------------- $('#divDepSelec').hide();


        //$('#dependenciaTxt').prop('disabled', true);
        /*
        $('#departamento').prop('disabled', true);
        $('#usuario').prop('disabled', true);
        $('#nombre').prop('disabled', true);
        $('#dependencia').prop('disabled', true);
        */
       // $('#autoriza').prop('disabled', true);
    },

    cargaSelect: function () {
        
        plantillas.cmbSistema.select2({
            placeholder: 'Ingrese Sistema',
            language: {
                errorLoading: function () {
                    return "Ingrese un sistema existente";
                },
                noResults: function () {
                    return "No hay resultado";
                },
                searching: function () {
                    return "Buscando..";
                },
                inputTooShort: function () {
                    return '...';
                }

            }
        });

        plantillas.cmbDependencia.select2({
            placeholder: 'Ingrese Dependencia',
            language: {
                errorLoading: function () {
                    return "Ingrese un sistema existente";
                },
                noResults: function () {
                    return "No hay resultado";
                },
                searching: function () {
                    return "Buscando..";
                },
                inputTooShort: function () {
                    return '...';
                }

            }
        });    
    },

    previsualizar: function () {
        console.log($('#nombre').val());

        var sistema = $("#sistema option:last-child").text();

        var dependencia = $("#dependencia option:last-child").text();
        /*  if (dependencia.length===0){
         
         dependencia=$('#dependenciaTxt').val();
         
         }*/

        var nombre = $('#nombre').val();
        var departamento = $('#departamento').val();
        var encabezado = $('#encabezado').val();
        var leyenda = $('#leyenda').val();
        var usuario = $('#usuario').val();
        var apertura = $('#apertura').val();
        var autorizador = $('#autoriza').val();
        var cuerpo = $('#cuerpo').val();

        var roles = [{
                rol: 'ROLE_ADMIN',
                descripcion: 'Rol del Administrador del Sistema'
            }];

            /*
        var datos = {
            dependencia: dependencia,
            departamento: departamento,
            encabezado: encabezado,
            folio: null,
            leyenda: leyenda,
            apertura: apertura,
            cuerpo: cuerpo,
            roles: roles,
            usuario: usuario,
            nombreUsuario: nombre,
            sistema: sistema,                                    
            autorizaName: autorizador                                                             
        }*/
        
        var datos = {
            "idResguardo": 0,
            "ejercicio": 0,
            "dependencia": dependencia,
            "departamento": departamento,
            "encabezado": encabezado,
            "folio": "2020",
            "leyenda": leyenda,
            "apertura": apertura,
            "cuerpo": cuerpo,
            "usuario": usuario,
            "nombreUsuario": nombre,
            "jefeInmediato": null,
            "correo": null,
            "enviado": null,
            "recibido": null,
            "fechaEmision": "2020-11-24T03:21:09.126Z",
            "fechaRecibido": "2020-11-24T03:21:09.126Z",
            "estatus": "AC",
            "usuarioCaptura": "ehermosillo",
            "fechaCaptura": "2020-11-24T03:21:09.126Z",
            "usuarioEditor": null,
            "fechaEdicion": "2020-11-24T03:21:09.126Z"
          };

        

        //console.log(datos);
        jajaxPost(datos);

    },

    buscarUsuario: function (usuario) {

        $.ajax({
            type: 'GET',
            url: '../api/ldapInfo/consultarUsuario/' + usuario,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            responseType: 'json',
            /*beforeSend: function (xhr) {
             general.block();
             },*/
            success: function (resultado) {
                try {
                    if (resultado.estatus === 'success') {
                        general.notify('<strong>Usuario verificado</strong><br />', "El usuario se encuentra registrado", resultado.estatus, true);

                        
                        $('#nombre').val(resultado.datos.nombre + " " + resultado.datos.apellido);
                        var newOption = new Option($.trim(resultado.datos.secretaria).toUpperCase(), $.trim("0"), true, true);
                        $('#dependencia').append(newOption).trigger('change');
                        $('#dependenciaName').val(resultado.datos.secretaria);
                        $('#departamento').val(resultado.datos.direccion);


                    } else if (resultado.estatus === 'danger') {
                        general.notify('<strong>Usuario no registrado</strong><br />', resultado.mensaje + ' <strong>¡Ingresar Manualmente!</strong>', 'warning', true);
                        plantillas.usuarioManual();
                        plantillas.EnableBuscar.prop('checked', false);


                    }


                } catch (e) {
                    setTimeout(function () {
                        general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error al buscar el usuario: ' + e + '.', 'danger', true);
                    }, 500);
                }
            },
            error: function () {
                general.unblock();
                setTimeout(function () {
                    general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error en la petición al servidor al buscar el usuario.', 'danger', true);
                }, 500);
            },
            complete: function () {
                return false;
                general.unblock();
            }
        });

    },

    resetFields: function () {

        $('#encabezado').summernote('code', '');
        $('#leyenda').summernote('code', '');
        $('#cuerpo').summernote('code', '');
        $('#apertura').summernote('code', '');
        $('#mensaje').summernote('code', '');

        plantillas.muestraEtiquetas();

    },
    
    limpiaUsuario: function () {

        $("#usuario").val("");
        $("#dependencia").select2("val", null);
        $("#nombre").val("");
        $("#departamento").val("");
        $("#autoriza").val("");

    },

    resetForm: function () {        
        window.location.href = '/mosere/resguardo/generar';
    },

    guardarPlantilla: function () {

        var idSistema = plantillas.cmbSistema.val();
        var correo = plantillas.correo.val();

        var cabezal1 = $('#encabezado').val();
        var apertura = $('#apertura').val();
        var leyenda = $('#leyenda').val();
        var mensaje = $('#mensaje').val();
        var cuerpo = $('#cuerpo').val();


        console.log("*---" + leyenda.trim());




        if ($("#leyenda").summernote("code").replace(/&nbsp;|<\/?[^>]+(>|$)/g, "").trim().length === 0) {
            general.notify('<strong>Verifique la leyenda</strong><br />', ' Su contenido no es valido.', 'warning', true);

        } else if ($("#encabezado").summernote("code").replace(/&nbsp;|<\/?[^>]+(>|$)/g, "").trim().length === 0) {

            general.notify('<strong>Verifique el encabezado</strong><br />', ' Su contenido no es valido.', 'warning', true);

        } else if ($("#apertura").summernote("code").replace(/&nbsp;|<\/?[^>]+(>|$)/g, "").trim().length === 0) {

            general.notify('<strong>Verifique la apertura</strong><br />', ' Su contenido no es valido.', 'warning', true);

        } else if ($("#cuerpo").summernote("code").replace(/&nbsp;|<\/?[^>]+(>|$)/g, "").trim().length === 0) {

            general.notify('<strong>Verifique el cuerpo</strong><br />', ' Su contenido no es valido.', 'warning', true);

        } else if ($("#mensaje").summernote("code").replace(/&nbsp;|<\/?[^>]+(>|$)/g, "").trim().length === 0) {

            general.notify('<strong>Verifique el mensaje</strong><br />', ' Su contenido no es valido.', 'warning', true);

        } else {
            var etiquetas = {
                leyenda: leyenda,
                mensaje: mensaje,
                apertura: apertura,
                cuerpo: cuerpo,
                correo: correo,
                lugarFecha: 'Santiago de Querétaro, Qro., [fecha]',
                cabezal1: cabezal1,
                firma: 'FIRMA DEL USUARIO',
                autoriza: 'NOMBRE Y FIRMA DEL JEFE INMEDIATO SUPERIOR Y/O PERSONA QUE AUTORIZA'
            };

            var datos = {
                etiquetas: etiquetas,
                idSistema: idSistema
            };



            bootbox.confirm({
                message: '¿Desea Guardar la plantilla de etiquetas para el Resguardo?',
                buttons: {
                    confirm: {
                        label: 'Sí',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'No',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    if (result) {
                        $.ajax({
                            type: 'POST',
                            url: 'sGuardaPlantilla',
                            data: JSON.stringify(datos),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            responseType: 'json',
//            beforeSend: function (xhr) {
//             general.block();
//            },    
                            success: function (resultado) {
                                try {
                                    if (resultado === 1) {
                                        general.notify('<strong>Exito</strong><br />', 'La plantilla se guardo correctamente.', 'success', true);

                                    }

                                } catch (e) {
                                    setTimeout(function () {
                                        general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error al guardar la plantilla: ' + e + '.', 'danger', true);
                                    }, 500);
                                }
                            },
                            error: function () {
                                general.unblock();
                                setTimeout(function () {
                                    general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error en la petición al servidor al guardar la plantilla.', 'danger', true);
                                }, 500);
                            },
                            complete: function () {
                                return false;
                                general.unblock();
                            }
                        });
                    }
                }
            });
        }
    },

    obtieneEtiquetas: function () {
        let searchParams = new URLSearchParams(window.location.search);
        var sistema = searchParams.get('sys');

        var idSistema = null;
        var bandera = false;

        if (sistema === null) {
            idSistema = plantillas.cmbSistema.val();
        } else {
            if (sistema.length > 0) {

                bandera = true;
                idSistema = sistema;

            }

        }

        var datos = {
            idSistema: idSistema
        };

        console.log(idSistema);
        $.ajax({
            type: 'GET',
            url: '../api/etiquetas/obtenerPorIdSistema/' + idSistema,
            data: datos,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: 'json',
            responseType: 'json',
            
            success: function (resultado) {
                console.log("mostrando Info");   
                console.log(resultado.datos[0]);         
                console.log(resultado.datos[0].posicion);       
                try {
                    if (resultado.datos) {
                        //  $('#sistema').append(new Option($.trim(resultado.sistema[0].nombre), $.trim(resultado.sistema[0].id)), true, true);
                        /*if (bandera) {
                            var newOption = new Option($.trim(resultado.sistema[0].nombre), $.trim(resultado.sistema[0].id), true, true);
                            $('#sistema').append(newOption).trigger('change');

                        }*/
                        if(resultado.datos[0].posicion = "leyenda"){
                            $('#leyenda').summernote('code', resultado.datos[0].leyenda);
                        }                
                                                
                        $('#cuerpo').summernote('code', resultado.cuerpo);

                        $('#apertura').summernote('code', resultado.apertura);

                        $('#encabezado').summernote('code', resultado.cabezal1);

                        $('#mensaje').summernote('code', resultado.mensaje);
                        
                        //$("#correo").val(resultado.correo);

                        general.notify('<strong>Exito</strong><br />', 'La plantilla se cargo correctamente.', 'success', true);


                    } else {

                        general.notify('<strong>Nota!!</strong><br />', 'No existe plantilla registrada para el sistema selecionado, se guardara como nuevo.', 'warning', true);

                        /*setTimeout(function () {
                            window.location.href = general.base_url + "/simulador.jsp";
                        }, 3000);*/

                    }

                } catch (e) {
                    setTimeout(function () {
                        general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error al cargar la plantilla: ' + e + '.', 'danger', true);
                    }, 500);
                }
            },
            error: function () {
                general.unblock();
                setTimeout(function () {
                    general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error en la petición al servidor al cargar la plantilla.', 'danger', true);
                }, 500);
            },
            complete: function () {
                return false;
                general.unblock();
            }
        });
    },

    cargaVariables: function () {
        $.ajax({
            type: 'GET',
            data: 'redo',
            url: '../api/variables/obtenerVariables',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: 'json',
            responseType: 'json',
            success: function (resultado) {
                try {
                    if (resultado.estatus === 'success') {

                        plantillas.llenaTablaSistemas(resultado.datos);


                    } else {
                        general.notify('<strong>Mensaje del Sistema</strong><br />', resultado.mensaje, resultado.estatus, true);
                    }
                } catch (e) {
                    setTimeout(function () {
                        general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error al cargar los Roles: ' + e + '.', 'danger', true);
                    }, 500);
                }
            },
            error: function () {
                general.unblock();
                setTimeout(function () {
                    general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error en la petición al servidor al cargar los Roles.', 'danger', true);
                }, 500);
            },
            complete: function () {
                general.unblock();
            }
        });
    },

    llenaTablaSistemas: function (tdatos) {



        $('#tListaEtiquetas').bootstrapTable({
            data: tdatos, "columnDefs": [
                {"searchable": false, "targets": 0}
            ]
        });
        console.log(tdatos);
        /* 
         $("#tListaEtiquetas").bootstrapTable('load', tdatos.datos);
         $("#tListaEtiquetas").bootstrapTable('selectPage', 1);
         */


    },
    agregarRol: function (datos) {
        
                 
        var datosRol = datos.split('|');
            //console.log(datos);
            var bandera = true;
            var registros = plantillas.tblRoles.bootstrapTable('getData');
            console.log(registros);
            if(datos.length>0){
       if (plantillas.tblRoles.bootstrapTable('getRowByUniqueId',parseInt(datosRol[0]) ) === null||parseInt(datosRol[0])===0) {
                   
                  
                   
                       for(var x in registros) {
                          
               if ($.trim(registros[x].rol) === datosRol[1]) {
                                    //console.log(registros[x].rol+datosRol[1]);                                        
                                    general.notify('<strong>Mensaje del sistema</strong><br />', 'El rol seleccionado ya se ha agregado previamente.', 'warning', true);
                    bandera = false;
                                    break;
               }
                               else{
                                   
                               }

           
           }
                   if(bandera){
                    /*var html = [];
                    var count = 1;

                    

                    html.push("<div class='rol"+datosRol[1]+"'>");
                    html.push("<input type='text' id='rol", count, "' value='"+datosRol[0]+"'>");
                    html.push("<input type='text' id='rol", count, "' value='"+datosRol[1]+"'>");
                    html.push("<input type='text' id='rol", count, "' value='"+datosRol[2]+"'>");
                    html.push("<div/>");
                    count += + 1;
                    $('#sFormulario').append(html.join(''));*/
                    
                    if(idRoles === ""){
                        idRoles = datosRol[0];
                    }else{
                        idRoles = idRoles+","+datosRol[0];
                    }
                                                        
                    //console.log(idRoles);
                    $("#idRoles").val(idRoles);

           plantillas.tblRoles.bootstrapTable('insertRow', {
               index: datosRol[0],
               row: {
                   id: datosRol[1],
                   rol: datosRol[0],
                   descripcion: datosRol[2]
               }
           });
                   }
           plantillas.cmbTxtRol.val('x').trigger('change');
       } else {
           general.notify('<strong>Mensaje del sistema</strong><br />', 'El rol seleccionado ya se ha agregado previamente.', 'warning', true);
       }
           
       }
       
   },
       
       quitarRol: function (idIn) {
       var id = $.base64.decode(idIn);
       var datos = plantillas.tblRoles.bootstrapTable('getRowByUniqueId', id);

            var nuevoIdroles = "";
            var arrayDeCadenas = idRoles.split(",");
            //console.log("valor a borrar "+ id);
            
            for (var i=0; i < arrayDeCadenas.length; i++) {
                //console.log(arrayDeCadenas[i]);
                if(id != arrayDeCadenas[i]){
                    
                    if(nuevoIdroles === ""){
                        nuevoIdroles = arrayDeCadenas[i];
                    }else{
                        nuevoIdroles = nuevoIdroles+","+arrayDeCadenas[i];
                    }
                    
                }
                if(id === arrayDeCadenas[i] && arrayDeCadenas.length === 1){
                    
                    idRoles="";
                }
                
                idRoles = nuevoIdroles;
                
             }

           //$(".rol"+id).remove();

            //console.log(idRoles);
            $("#idRoles").val(idRoles);
           

       if (datos !== null) {
           plantillas.tblRoles.bootstrapTable('removeByUniqueId', id);           
   
       } else {
           general.notify('<strong>Mensaje del sistema</strong><br />', 'El rol seleccionado no se ha agregado previamente.', 'warning', true);
       }
   },
   rolesFormatter: function (value, row, index) {
   return [
       '&nbsp;<a class="btn btn-danger btn-lg btn-xs" role="button" href="javascript:plantillas.quitarRol(\'' + $.base64.encode(row.rol) + '\');" data-toggle="tooltip" data-placement="top" title="Borrar Rol"><i class="glyphicon glyphicon-trash"></i></a>'
   ].join('');
},

 sleep : function (milliseconds) {
var start = new Date().getTime();
for (var i = 0; i < 1e7; i++) {
if ((new Date().getTime() - start) > milliseconds){
 break;
}
}
}
       

};

plantillas.init();

