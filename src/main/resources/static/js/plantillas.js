/* global general, bootbox, e */
var plantillas = {

    cmbDependencia: null,
    encabezado: null,
    leyenda: null,
    cuerpo: null,
    apertura: null,
    mensaje: null,
    sFormulario: null,
    cmbSistema: null,
    btnGenera: null,
    btnVisualiza: null,
    btnReset: null,
    correo: null,
    btnBuscar: null,
    EnableBuscar: null,
    dependenciaTxt: null,
    tListaEtiquetas: null,

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
        this.EnableBuscar = $('#EnableBuscar');
        /// this.dependenciaTxt = $('#dependenciaTxt');

        this.cmbSistema = $('#sistema');
        this.cmbDependencia = $('#dependencia');

        this.correo = $('#correo');

        this.btnGenera = $('#btnGenera');
        this.btnVisualiza = $('#btnVisualiza');
        this.btnReset = $('#btnReset');
        this.btnBuscar = $('#btnBuscar');
        this.btresguardo = $('#btresguardo');
        this.btresguardo = $('#btresguardo');
   

        this.cargaVariables();

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
        }).on('summernote.change', function (customEvent, contents, $editable) {
            plantillas.sFormulario.formValidation('revalidateField', plantillas.encabezado.attr('name'));
        }).end();



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
        }).on('summernote.change', function (customEvent, contents, $editable) {
            plantillas.sFormulario.formValidation('revalidateField', plantillas.leyenda.attr('name'));
        }).end();


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
        }).on('summernote.change', function (customEvent, contents, $editable) {
            plantillas.sFormulario.formValidation('revalidateField', plantillas.apertura.attr('name'));
        }).end();

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
        }).on('summernote.change', function (customEvent, contents, $editable) {
            plantillas.sFormulario.formValidation('revalidateField', plantillas.cuerpo.attr('name'));
        }).end();


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
        }).on('summernote.change', function (customEvent, contents, $editable) {
            plantillas.sFormulario.formValidation('revalidateField', plantillas.mensaje.attr('name'));
        }).end();



        plantillas.sFormulario.formValidation({excluded: [':disabled'],
            live: 'enabled',
            locale: 'es_ES',
            fields: {
                encabezado: {
                    validators: {
                        callback: {
                            message: 'Las cajas de texo no pueden contener caracteres especiales ni estar vacias',
                            callback: function (value, validator, $field) {
                                var flag = true;
                                var code = plantillas.encabezado.summernote('code');
                                if (code === '' || code === '<p><br></p>' || code === '<br>' || code === '&nbsp;<br>') {
                                    flag = false;
                                } else {
                                    var res = code.match(/[^\x22\&\=\{\}\w\d\sá-úÁ-Úä-üÄ-ü\,\.\;\:\-\+\ª\(\)\'\>\<\/\!\¿\¡\¡\?\¡\*\[\]]/g);
                                    if (res !== null && res.length > 0) {
                                        flag = false;
                                    }

                                }
                                return flag;
                            }
                        }
                    }
                },
                leyenda: {
                    validators: {
                        callback: {
                            message: 'Las cajas de texo no pueden contener caracteres especiales ni estar vacias',
                            callback: function (value, validator, $field) {
                                var flag = true;
                                var code = plantillas.leyenda.summernote('code');
                                if (code === '' || code === '<p><br></p>' || code === '<br>') {
                                    flag = false;
                                } else {
                                    var res = code.match(/[^\x22\&\=\{\}\w\d\sá-úÁ-Úä-üÄ-ü\,\.\;\:\-\+\ª\(\)\'\>\<\/\!\¿\¡\¡\?\¡\*\[\]]/g);
                                    if (res !== null && res.length > 0) {
                                        flag = false;
                                    }

                                }
                                return flag;
                            }
                        }
                    }
                },
                apertura: {
                    validators: {
                        callback: {
                            message: 'Las cajas de texo no pueden contener caracteres especiales ni estar vacias',
                            callback: function (value, validator, $field) {
                                var flag = true;
                                var code = plantillas.apertura.summernote('code');
                                if (code === '' || code === '<p><br></p>' || code === '<br>') {
                                    flag = false;
                                } else {
                                    var res = code.match(/[^\x22\&\=\{\}\w\d\sá-úÁ-Úä-üÄ-ü\,\.\;\:\-\+\ª\(\)\'\>\<\/\!\¿\¡\¡\?\¡\*\[\]]/g);
                                    if (res !== null && res.length > 0) {
                                        flag = false;
                                    }

                                }
                                return flag;
                            }
                        }
                    }
                },
                cuerpo: {
                    validators: {
                        callback: {
                            message: 'Las cajas de texo no pueden contener caracteres especiales ni estar vacias',
                            callback: function (value, validator, $field) {
                                var flag = true;
                                var code = plantillas.cuerpo.summernote('code');
                                if (code === '' || code === '<p><br></p>' || code === '<br>') {
                                    flag = false;
                                } else {
                                    var res = code.match(/[^\x22\&\=\{\}\w\d\sá-úÁ-Úä-üÄ-ü\,\.\;\:\-\+\ª\(\)\'\>\<\/\!\¿\¡\¡\?\¡\*\[\]]/g);
                                    if (res !== null && res.length > 0) {
                                        flag = false;
                                    }

                                }
                                return flag;
                            }
                        }
                    }
                },
                mensaje: {
                    validators: {
                        callback: {
                            message: 'Las cajas de texo no pueden contener caracteres especiales ni estar vacias',
                            callback: function (value, validator, $field) {
                                var flag = true;
                                var code = plantillas.mensaje.summernote('code');
                                if (code === '' || code === '<p><br></p>' || code === '<br>') {
                                    flag = false;
                                } else {
                                    var res = code.match(/[^\x22\&\=\{\}\w\d\sá-úÁ-Úä-üÄ-ü\,\.\;\:\-\+\ª\(\)\'\>\<\/\!\¿\¡\¡\?\¡\*\[\]]/g);
                                    if (res !== null && res.length > 0) {
                                        flag = false;
                                    }

                                }
                                return flag;
                            }
                        }
                    }
                }
            }

        }).on('success.form.fv', function (e) {
            e.preventDefault();
            var activeElement = document.activeElement;
            if (activeElement.type === 'submit') {
                if (activeElement.value === 'ver') {

                    plantillas.previsualizar();

                } else if (activeElement.value === 'guardar') {///si es guardar plantilla

                    plantillas.guardarPlantilla();
                }

            }






        }).on('err.form.fv', function (e) {
            $('html, body').animate({scrollTop: 0}, 'slow');
            general.notify('<strong>Mensaje del Sistema</strong><br />', 'Los campos (*) obligatorios, son requeridos.', 'warning', true);
        });



        this.btnReset.click(function () {
            plantillas.resetForm();

        });



        this.cmbSistema.on("change", function () {

            //if(plantillas.cmbSistema.val()!==seleccionado){
            if (plantillas.cmbSistema.val() !== seleccionado) {
                plantillas.limpiaParametros();
               // plantillas.limpiaUsuario();
                plantillas.obtieneEtiquetas();
             
            }

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

    usuarioAutomatico: function () {

        $('#btnBuscar').show();
        //$('#divDepInput').show();
        //-------------------------------------- $('#divDepSelec').hide();


        //$('#dependenciaTxt').prop('disabled', true);
        $('#departamento').prop('disabled', true);
        $('#usuario').prop('disabled', true);
        $('#nombre').prop('disabled', true);
        $('#dependencia').prop('disabled', true);
       // $('#autoriza').prop('disabled', true);
    },

    cargaSelect: function () {


        plantillas.cmbSistema.select2({
            placeholder: 'Ingresa el sistema',
            language: {
                errorLoading: function () {
                    return "Ingrese un sistema correcto";
                },
                noResults: function () {
                    return "No hay resultado";
                },
                searching: function () {
                    return "Buscando..";
                },
                inputTooShort: function () {
                    return 'Ingresa 3 caracteres';
                }

            },
            ajax: {
                url: 'sListaSistemas',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                delay: 25,
                data: function (params) {
                    return {
                        dato: params.term,
                    };
                },
                processResults: function (data, params) {
                    return {
                        results: $.map(data.datos, function (item) {
                            return {
                                id: item.ID,
                                text: item.NOMBRE
                            };
                        })
                    };
                },
                cache: true

            },
            escapeMarkup: function (markup) {
                return markup;
            },
            minimumInputLength: 3
        });

        plantillas.cmbDependencia.select2({
            placeholder: 'Ingresa la dependencia',
            language: 'es',
            ajax: {
                url: 'sGestorDependencias',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                delay: 25,
                data: function (params) {
                    return {
                        dependencia: params.term,
                    };
                },
                processResults: function (data, params) {
                    return {
                        results: $.map(data.datos, function (item) {

                            return {
                                id: item.flexValue,
                                text: item.description
                            };
                        })
                    };
                },
                cache: true

            },
            escapeMarkup: function (markup) {
                return markup;
            },
            minimumInputLength: 3
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


        var datos = {
            sistema: sistema,
            nombreUsuario: nombre,
            dependencia: dependencia,
            departamento: departamento,
            autorizaName: autorizador,
            usuario: usuario,
            leyenda: leyenda,
            cabezal: encabezado,
            apertura: apertura,
            cuerpo: cuerpo,
            roles: roles
        };



        $.ajax({
            type: 'POST',
            url: 'sVisorResguardo',
            data: JSON.stringify(datos),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            responseType: 'json',
            /*beforeSend: function (xhr) {
             general.block();
             },*/
            success: function (resultado) {
                try {
                    if (resultado.estatus === 'success') {
                        general.notify('<strong>Mensaje del Sistema</strong><br />', resultado.mensaje, resultado.estatus, true);
                        //var pdfResult = JSON.parse(resultado.datos);
                        var pdfResult = resultado.datos;
                        let pdfWindow = window.open("");
                        pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(pdfResult) + "'></iframe>");

                    }

                } catch (e) {
                    setTimeout(function () {
                        general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error en la impresion: ' + e + '.', 'danger', true);
                    }, 500);
                }
            },
            error: function () {
                general.unblock();
                setTimeout(function () {
                    general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error en la petición al servidor al generar la impresion.', 'danger', true);
                }, 500);
            },
            complete: function () {
                return false;
                general.unblock();
            }
        });

    },

    buscarUsuario: function (usuario) {

        $.ajax({
            type: 'GET',
            url: 'sBuscaUsuarios?usuario=' + usuario,
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
        $('#encabezado').summernote('reset');
        $('#leyenda').summernote('reset');
        $('#cuerpo').summernote('reset');
        $('#apertura').summernote('reset');
        $('#mensaje').summernote('reset');
        $("#sistema").select2("val", null);
        $("#usuario").val("");
        $("#dependencia").select2("val", null);
        $("#nombre").val("");
        $("#departamento").val("");
        $("#correo").val("");


        window.location.href = '/mosere/simulador.jsp';

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


        $.ajax({
            type: 'POST',
            url: 'sResguardoPlantilla',
            data: datos,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: 'json',
            responseType: 'json',

            success: function (resultado) {

                try {
                    if (resultado.datos) {
                        //  $('#sistema').append(new Option($.trim(resultado.sistema[0].nombre), $.trim(resultado.sistema[0].id)), true, true);
                        if (bandera) {
                            var newOption = new Option($.trim(resultado.sistema[0].nombre), $.trim(resultado.sistema[0].id), true, true);
                            $('#sistema').append(newOption).trigger('change');

                        }
                        console.log(resultado.correo);
                        $('#leyenda').summernote('code', resultado.leyenda);

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
            type: 'POST',
            data: 'redo',
            url: 'sVariables',
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


    }

};

plantillas.init();