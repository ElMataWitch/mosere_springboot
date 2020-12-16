                                                                                                                                                                                                           /* global general, bootbox, e */
        
var resguardos = {

    dome:null,
    cmbDependencia: null,
    encabezado: null,
    leyenda: null,
    cuerpo: null,
    apertura: null,
    mensaje: null,
    rFormulario: null,
    frmRol: null,
    cmbSistema: null,
    btnResguardo: null,
    modalRol: null,
    btnEditar:null,
   

    btnReset: null,
    correo: null,
    btnBuscar: null,
    EnableBuscar: null,
    dependenciaTxt: null,

    btnNuevoRol:null,
    
   tblRoles: null,
   cmbTxtRol: null,
   btnAgregarRol:null,
    //metodos
    init: function () {
        
       
        this.rFormulario = $('#rFormulario');
        this.encabezado = $('#encabezado');
        this.cuerpo = $('#cuerpo');
        this.leyenda = $('#leyenda');
        this.apertura = $('#apertura');
        this.mensaje = $('#mensaje');
        this.usuario = $('#usuario');
        this.EnableBuscar = $('#EnableBuscar');
        this.dependenciaTxt = $('#dependenciaTxt');
        this.btnResguardo = $('#btnResguardo');
        this.btnEditar = $('#btnEditar');
       
        this.cmbTxtRol = $('#cmbTxtRol');
        this.btnAgregarRol = $('#btnAgregarRol');
        



        this.cmbSistema = $('#sistema');
        this.cmbDependencia = $('#dependencia');

        this.correo = $('#correo');

        
        this.btnReset = $('#btnReset');
        this.btnBuscar = $('#btnBuscar');

        this.btresguardo = $('#btresguardo');
        this.btnNuevoRol = $('#btnNuevoRol');

        this.tblRoles = $('#tblRoles');
        this.tblRoles.bootstrapTable('load',"");
        
   
        this.tblRoles.bootstrapTable();
     
        this.tblRoles.bootstrapTable('resetView');
     
        this.dome=null;
        

    resguardos.encabezado.summernote({
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
                        resguardos.encabezado.summernote('undo');
                    }
                }
            }
        }).on('summernote.change', function (customEvent, contents, $editable) {
            resguardos.rFormulario.formValidation('revalidateField', resguardos.encabezado.attr('name'));
        }).end();



        resguardos.leyenda.summernote({
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
                        resguardos.leyenda.summernote('undo');
                    }
                }
            }
        }).on('summernote.change', function (customEvent, contents, $editable) {
            resguardos.rFormulario.formValidation('revalidateField', resguardos.leyenda.attr('name'));
        }).end();


        resguardos.apertura.summernote({
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
                        resguardos.apertura.summernote('undo');
                    }
                }
            }
        }).on('summernote.change', function (customEvent, contents, $editable) {
            resguardos.rFormulario.formValidation('revalidateField', resguardos.apertura.attr('name'));
        }).end();

        resguardos.cuerpo.summernote({
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
                        resguardos.cuerpo.summernote('undo');
                    }
                }
            }
        }).on('summernote.change', function (customEvent, contents, $editable) {
            resguardos.rFormulario.formValidation('revalidateField', resguardos.cuerpo.attr('name'));
        }).end();


        resguardos.mensaje.summernote({
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
                        resguardos.mensaje.summernote('undo');
                    }
                }
            }
        }).on('summernote.change', function (customEvent, contents, $editable) {
            resguardos.rFormulario.formValidation('revalidateField', resguardos.mensaje.attr('name'));
        }).end();



        resguardos.rFormulario.formValidation({excluded: [':disabled', ':hidden'],
            live: 'enabled',
            locale: 'es_ES',
            fields: {
                leyenda: {
                    validators: {
                        callback: {
                            message: 'Las cajas de texo no pueden contener caracteres especiales ni estar vacias',
                            callback: function (value, validator, $field) {
                                var flag = true;
                                var code = resguardos.leyenda.summernote('code');
                                if (code === '' || code === '<p><br></p>' || code === '<br>') {
                                    flag = false;
                                } else {
                                    var res = code.match(/[^\x22\&\=\{\}\w\d\sá-úÁ-Úä-üÄ-ü\,\.\;\:\-\+\ª\(\)\'\>\<\/\!\¿\¡\¡\?\¡\*\[\]]/g);
                                    if (res !== null && res.length > 0) {
                                        flag = false;
                                    }
//
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
                                var code = resguardos.apertura.summernote('code');
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
                                var code = resguardos.cuerpo.summernote('code');
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
                                var code = resguardos.mensaje.summernote('code');
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
                
              if(resguardos.tblRoles.bootstrapTable('getData').length > 0){
             resguardos.guardarResguardo();
              }else{
                  
                  general.notify('<strong>Alerta</strong><br />', 'Debes seleccionar los roles del usuario.', 'warning', true);
              }
         
           
            }

        ).on('err.form.fv', function (e) {
              resguardos.rFormulario.formValidation('revalidateField', resguardos.mensaje.attr('name'));
            $('html, body').animate({scrollTop: 0}, 'slow');
            general.notify('<strong>Mensaje del Sistema</strong><br />', 'Los campos (*) obligatorios, son requeridos.', 'warning', true);
        });



        this.btnReset.click(function () {
            resguardos.resetForm();

        });
        
        this.btnEditar.click(function () {
          window.location.href = general.base_url+"/simulador/generar"; 
        });

        this.cmbSistema.on("change", function () {      
            resguardos.resetFields();
            tInfoLeyendasTodos();
            //resguardos.muestraEtiquetas();
            resguardos.cargaRoles();
            $('#contenedor').show();
                
                      
        
          
        });
        
        
        this.btnAgregarRol.click(function () {
           resguardos.agregarRol($.trim(resguardos.cmbTxtRol.val()));
        });
        
        this.btnNuevoRol.click(function () {
            window.location.href = '/mosere/roles/listado';
        });
        
        this.btnResguardo.click(function () {
            
            

        });

        this.btnBuscar.click(function () {
 
            if (resguardos.usuario.val().length > 0) {
                resguardos.buscarUsuario(resguardos.usuario.val());
            } else {

                general.notify('<strong>Campos vacios</strong><br />', 'Ingrese el usuario por favor.', 'warning', true);


            }

        });

        this.btnBuscar.hide();
        $('#divDepInput').hide();
        


        this.EnableBuscar.click(function () {
            if (resguardos.usuario.val().length > 0) {
                if (resguardos.EnableBuscar.prop('checked')) {
                    
                    resguardos.usuarioAutomatico();

                } else {
                    
                    resguardos.usuarioManual();

                }
            } else {
                general.notify('<strong>Campos vacios</strong><br />', 'Ingrese el usuario por favor.', 'warning', true);
                resguardos.EnableBuscar.prop('checked', false);

            }

        });

        resguardos.cargaSelect();
        $('#contenedor').hide();



    },

    cargaSelect: function () {


        resguardos.cmbSistema.select2({
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

        resguardos.cmbDependencia.select2({
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
    
        buscarUsuario: function (usuario) {

        $.ajax({
            type: 'GET',
            url: '../api/ldapInfo/consultarUsuario/' + usuario,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            responseType: 'json',                        
            success: function (resultado) {
                try {
                    if (resultado.estatus === 'success') {
                        general.notify('<strong>Usuario verificado</strong><br />', "El usuario se encuentra registrado", resultado.estatus, true);

                         
                        $('#nombre').val(resultado.datos.nombre + " " + resultado.datos.apellido);
                        var newOption = new Option($.trim(resultado.datos.secretaria).toUpperCase(), $.trim("0"), true, true);
                        $('#dependencia').append(newOption).trigger('change');
                        $('#departamento').val(resultado.datos.direccion);
                        $('#correoUsuario').val(resultado.datos.correo);
                                                 


                    } else if (resultado.estatus === 'danger') {
                        general.notify('<strong>Usuario no registrado</strong><br />', resultado.mensaje+'<strong> Registre manualmente.</strong><br />', 'warning', true);

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

        $('#departamento').prop('disabled', true);
        $('#usuario').prop('disabled', true);
        $('#nombre').prop('disabled', true);
        $('#dependencia').prop('disabled', true);
    },
    
    buscaDependencia: function (dependencia) {
        
        $.ajax({
            type: 'GET',
            url: 'sBuscaDependencia?dependencia=' + dependencia,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            responseType: 'json',
            /*beforeSend: function (xhr) {
             general.block();
             },*/
            success: function (resultado) {
                try {
                    if (resultado.estatus === 'success') {
                                           resguardos.dome=resultado.datos[0].flexValue;   
                                           console.log("plum-"+resguardos.dome);
                                           
                              var newOption = new Option($.trim(dependencia), resultado.datos[0].flexValue, true, true);
                               $('#dependencia').append(newOption).trigger('change');

                    } else if (resultado.estatus === 'danger') {
                        general.notify('<strong>Usuario no registrado</strong><br />', resultado.mensaje, 'warning', true);


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
    
    

    activarForma: function (usuario) {

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
                        $('#dependenciaTxt').val(resultado.datos.secretaria);
                        $('#departamento').val(resultado.datos.direccion);


                    } else if (resultado.estatus === 'danger') {
                        general.notify('<strong>Usuario no registrado</strong><br />', resultado.mensaje, 'warning', true);


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
        
        $('#encabezado').summernote('code','');
        $('#leyenda').summernote('code','');
        $('#cuerpo').summernote('code','');
        $('#apertura').summernote('code','');
        $('#mensaje').summernote('code','');
         
        //resguardos.muestraEtiquetas();

    },

    guardarResguardo: function () {
        
       var dependencia; 
       var idSistema = resguardos.cmbSistema.val();
       var nombreAutoriza = $('#autoriza').val();
       var nombreUsuario = $('#nombre').val();
       var departamento = $('#departamento').val();
       var usuario = $('#usuario').val();
       var correoFrom = $('#correo').val();
        var usuarioI = $('#sesionU').val();

       dependencia = resguardos.cmbDependencia.val();
       
       if(dependencia===null){
           
        dependencia=resguardos.dome;
           
       }
        

        var datos = {
           // etiquetas: etiquetas,
            idSistemaResguardo  : idSistema,
            nombreUsuario       : nombreUsuario,
            flexValueDependencia: dependencia,
            departamentoUsuario : departamento,
            usuario             : usuario,
            usuarioI            : usuarioI,
            nombreAutoriza      : nombreAutoriza,
            correoFrom          : correoFrom,
            correoTo            : "luiseendelacruz@gmail.com",
            roles               : resguardos.tblRoles.bootstrapTable('getData')
            
        };


        //resguardos.cmbSistema.text()
        bootbox.confirm({
            message: '¿Desea el Resguardo del sistema:<b>'+resguardos.cmbSistema.children("option:selected").text()+'</b>?',
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
                        url: 'sGeneraResguardo',
                        data: JSON.stringify(datos),
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        responseType: 'json',
  
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

    },
    
    	cargaRoles : function() {
            var idSistema = resguardos.cmbSistema.val();            
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
                        resguardos.cmbTxtRol.empty();  
                        $("#btnAgregarRol").show();
                        if(resultado.mensaje){
                                              $.each(resultado.datos, function(i, item) {
							resguardos.cmbTxtRol.append('<option value="' + $.trim(item.rol.idRol) + '|' + $.trim(item.rol.rol) + '|' + $.trim(item.rol.descripcion) + '" >' + $.trim(item.rol.rol) + '</option>');
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
                        resguardos.cmbTxtRol.empty();
                        resguardos.cmbTxtRol.append('<option value="">No Existen Roles Para El Sistema Seleccionado</option>');
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
        
        cargaFrmRol: function () {
                    
	/*$.ajax({
	    type: 'GET',
	    url: general.base_url+'/nuevoRol',
	    //data: datos,
	    contentType: 'application/html; charset=utf-8',
	   /* beforeSend: function (xhr) {
		general.block();
	    },
	    success: function (resultado) {
		try {
		    resguardos.modalRol = bootbox.dialog({
			title: 'Guardar Rol',
			onEscape: true,
			animate: true,
			size: 'smmall',
			message: resultado,
			buttons: {
			    cancel: {
				label: 'Cancelar',
				className: 'btn-default'
			    },
			    save: {
				label: 'Guardar',
				className: 'btn-success',
				callback: function () {
				    resguardos.frmRol.submit();
				    return false;
				}
			    }
			}
		    });

		    resguardos.modalRol.on('shown.bs.modal', function () {
			$('.bootbox-close-button').focus();

			setTimeout(function () {
			    $('.bootbox-close-button').focusout();
			}, 100);
                            
			//Inicialización 
			resguardos.frmRol = $('#frmRol');

			//Funcionalidad
			resguardos.frmRol.formValidation({excluded: [':disabled', ':hidden', ':not(:visible)'], live: 'enabled', locale: 'es_ES'})
				.on('success.form.fv', function (e) {
				    e.preventDefault();
                            
                            var form = resguardos.frmRol.serializeArray();


                           // res + $.trim(item.id) + '|' + $.trim(item.rol) + '|' + $.trim(item.descripcion) + '" >' + $.trim(item.rol) + '</option>');
                                       resguardos.agregarRol("0"+'|'+form[0]['value']+"|"+form[1]['value']);
					resguardos.modalRol.modal('hide');
			
				});
                                 
	
		    });
		} catch (e) {
		    setTimeout(function () {
			general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error al cargar la página de rol: ' + e + '.', 'danger', true);
		    }, 500);
		}
	    },
	    error: function () {
		general.unblock();
		setTimeout(function () {
		    general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error en la petición al servidor al cargar la página de rol.', 'danger', true);
		}, 500);
	    },
	    complete: function () {
		
	    }
	});*/
    },
    
     muestraEtiquetas: function () {
       
         idSistema = resguardos.cmbSistema.val(); 
        
        
         
        var datos = {
            idSistema: idSistema
        };


    
                    $.ajax({
                        type: 'POST',
                        url: 'sResguardoPlantilla',
                        data:datos,
                         contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        dataType: 'json',
                        responseType: 'json',
//            beforeSend: function (xhr) {
//             general.block();
//            },    
                        success: function (resultado) {
                            
                            try {
                                  
                                if(resultado.datos){                                    
                                    
                                    resguardos.leyenda.summernote({
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
                        resguardos.leyenda.summernote('undo');
                    }
                }
            }
        }).on('summernote.change', function (customEvent, contents, $editable) {
            resguardos.rFormulario.formValidation('revalidateField', resguardos.leyenda.attr('name'));
        }).end();
        
                                   resguardos.leyenda.summernote('code',resultado.leyenda);
                                   $('#leyenda').summernote('disable');
                                    
                                   $('#cuerpo').summernote('code',resultado.cuerpo);
                                   $('#cuerpo').summernote('disable');
                                   
                                   $('#apertura').summernote('code',resultado.apertura);
                                   $('#apertura').summernote('disable');
                                   
                                   $('#encabezado').summernote('code',resultado.cabezal1);
                                   $('#encabezado').summernote('disable');
                                   
                                   $('#mensaje').summernote('code',resultado.mensaje);
                                   $('#mensaje').summernote('disable');
                                   
                              
                                    general.notify('<strong>Exito</strong><br />', 'La plantilla se cargo correctamente.', 'success', true);
                                 
                                    
                                }else{   
                               
                                general.notify('<strong>Exito</strong><br />', 'No existe plantilla registrada para el sistema selecionado.', 'warning', true);
                             
                              setTimeout(function () {
                                window.location.href = general.base_url+"/simulador.jsp"; 
                                 }, 3000);
                            
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
    
        resetForm: function () {
        /*$('#leyenda').summernote('reset');
        $('#cuerpo').summernote('reset');
        $('#apertura').summernote('reset');
        $('#mensaje').summernote('reset');
        $("#sistema").select2("val", null);
        $("#usuario").val("");
        $("#dependencia").select2("val", null);
        $("#nombre").val("");
        $("#departamento").val("");
        $("#correo").val("");*/


        window.location.href = '/mosere/resguardo/generar';

    },
    
    
    
    agregarRol: function (datos) {
        
                 
	     var datosRol = datos.split('|');
             var bandera = true;
              var registros = resguardos.tblRoles.bootstrapTable('getData');
             if(datos.length>0){
		if (resguardos.tblRoles.bootstrapTable('getRowByUniqueId',parseInt(datosRol[0]) ) === null||parseInt(datosRol[0])===0) {
                    
                   
                    
                    	for(var x in registros) {
                           
				if ($.trim(registros[x].rol) === datosRol[1]) {
                                     console.log(registros[x].rol+datosRol[1]);                                        
                                     general.notify('<strong>Mensaje del sistema</strong><br />', 'El rol seleccionado ya se ha agregado previamente.', 'warning', true);
				     bandera = false;
                                     break;
				}
                                else{
                                    
                                }

			
			}
                    if(bandera){
			resguardos.tblRoles.bootstrapTable('insertRow', {
				index: datosRol[0],
				row: {
					rol: datosRol[1],
					descripcion: datosRol[2]
				}
			});
                    }
			resguardos.cmbTxtRol.val('x').trigger('change');
		} else {
			general.notify('<strong>Mensaje del sistema</strong><br />', 'El rol seleccionado ya se ha agregado previamente.', 'warning', true);
		}
            
        }else {
			general.notify('<strong>Mensaje del sistema</strong><br />', 'No se agrego ningún rol.', 'warning', true);
		}
        
	},
        
    	quitarRol: function (idIn) {
		var id = $.base64.decode(idIn);
		var datos = resguardos.tblRoles.bootstrapTable('getRowByUniqueId', id);
	        console.log(datos);

		if (datos !== null) {
			resguardos.tblRoles.bootstrapTable('removeByUniqueId', id);
			
	
		} else {
			general.notify('<strong>Mensaje del sistema</strong><br />', 'El rol seleccionado no se ha agregado previamente.', 'warning', true);
		}
	},
    	rolesFormatter: function (value, row, index) {
		return [
			'&nbsp;<a class="btn btn-danger btn-lg btn-xs" role="button" href="javascript:resguardos.quitarRol(\'' + $.base64.encode(row.rol) + '\');" data-toggle="tooltip" data-placement="top" title="Borrar Rol"><i class="glyphicon glyphicon-trash"></i></a>'
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

resguardos.init();