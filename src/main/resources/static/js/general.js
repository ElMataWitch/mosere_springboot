/* global bootbox */

//Declaración de Objeto
var general = {
    tooltip: null,
    contenidoCuerpo: null,
    base_url: null,
    validate_session: null,
    init: function () {
	//Inicilización de propiedades del objeto
	//this.base_url = window.location.protocol + '//' + window.location.host + window.location.pathname.substring(0, window.location.pathname.indexOf('/', 2));
	this.base_url = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split('/')[1];
	this.tooltip = $('[data-toggle="tooltip"]');
	//this.validate_session = setInterval(this.session, (1 * 60 * 1000)); //Timoutperiod, Minutes, Milli seconds Revisa Sesión

	if ($('#contenidoCuerpo')) {
	    this.contenidoCuerpo = $('#contenidoCuerpo');
	}

	//Funcionalidad
	/*this.tooltip.tooltip({
	    container: 'body'
	});*/

	//bootstrapTable resetView
	$('body').on('expanded.pushMenu collapsed.pushMenu', function () {
	    $(".table").each(function (index) {
		if (typeof ($(this)[0].id) !== 'undefined' && $.trim($(this)[0].id) !== '') {
		    var idTable = $.trim($(this)[0].id);

		    setTimeout(function () {
			$('#' + idTable).bootstrapTable('resetView');
		    }, 350);
		}
	    });
	});
    },
    notify: function (title, message, type, progress) {
	var showProgressbar = (progress !== undefined) ? progress : false;

	$.notify({
	    title: title,
	    icon: 'glyphicon glyphicon-warning-sign',
	    message: message
	},
		{
		    newest_on_top: true,
		    pos: 'top-right',
		    element: 'body',
		    delay: 6000,
		    animate: {
			enter: 'animated fadeInRight',
			exit: 'animated fadeOutRight'
		    },
		    placement: {
			from: 'top'
		    },
		    showProgressbar: showProgressbar,
		    type: type,
		    z_index: 9999
		});
    },
    block: function () {
	$.blockUI({
	    message: '<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:100%"><b>Espera por favor….</b></div>',
	    baseZ: 99999,
	    css: {
		border: 'none',
		padding: '15px',
		backgroundColor: '#000',
		'-webkit-border-radius': '10px',
		'-moz-border-radius': '10px',
		opacity: .5,
		color: '#fff'
	    }
	});
    },
    unblock: function () {
	$.unblockUI();
    },
    session: function () {
	var flag = (($.trim($(location).attr('href')) !== $.trim(general.base_url + '/index.html')) && ($.trim($(location).attr('href')) !== $.trim(general.base_url + '/')) && ($.trim($(location).attr('href')) !== $.trim(general.base_url)));

	if (flag) {
	    $.ajax({
		type: 'GET',
		url: general.base_url + '/isLogin',
		contentType: 'application/json; charset=utf-8',

		success: function (resultado) {
		    try {
			if (resultado.estatus === 'success') {
			    if (!resultado.datos) {
				clearInterval(general.validate_session);
				bootbox.hideAll();
				bootbox.alert({
				    size: 'small',
				    message: '<b>¡La sesión ha terminado! Iníciala nuevamente.</b>',
				    callback: function () {
					window.location.href = general.base_url + '/logout.html';
				    }
				});
			    }
			}
		    } catch (e) {
			general.notify('<strong>Ocurrió un error!</strong><br />', 'Ocurrió un error en la verificación de la sesión.', 'danger', true);
		    }
		},
		error: function () {
		    general.notify('<strong>Ocurrió un error!</strong><br />', 'Ocurrió un error en la petición al servidor en la verificación de la sesión.', 'danger', true);
		}
	    });
	} else {
	    clearInterval(general.validate_session);
	}
    },
    cargarContenido: function (pagina) {
	general.contenidoCuerpo.html('');
	$.ajax({
	    type: 'GET',
	    url: pagina,
	    contentType: 'application/html; charset=utf-8',
	    success: function (result) {
		general.contenidoCuerpo.html(result);
	    },
	    error: function (xhr, ajaxOptions, thrownError) {
		if (xhr.status === 403) {
		    general.contenidoCuerpo.load('403.html');
		} else if (xhr.status === 404) {
		    general.contenidoCuerpo.load('404.html');
		}
	    }
	});
    },
    cargarContenidoParametros: function (pagina, parametros) {
	general.contenidoCuerpo.html('');
	$.ajax({
	    type: 'GET',
	    url: pagina,
	    data: parametros,
	    contentType: 'application/html; charset=utf-8',
	    success: function (result) {
		general.contenidoCuerpo.html(result);
	    },
	    error: function (xhr, ajaxOptions, thrownError) {
		if (xhr.status === 403) {
		    general.contenidoCuerpo.load('403.html');
		} else if (xhr.status === 404) {
		    general.contenidoCuerpo.load('404.html');
		}
	    }
	});
    },
    limpiarContenido: function () {
	general.contenidoCuerpo.html('');
    },
    obtenerParametro: function (name, url) {
	if (!url) {
	    url = window.location.href;
	}

	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);

	if (!results)
	    return null;
	if (!results[2])
	    return '';

	return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    formatoMoneda: function (numero) {
	return general.formatoNumero2Decimales(numero).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    },
    formatoMonedaSF: function (numero) {
	numero = parseFloat(numero);
	//  alert(numero);
	return numero.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    },
    formatoNumero2Decimales: function (numero) {
	if (this.esNumero($.trim(numero))) {
	    if ($.trim(numero).indexOf('.') !== -1) {
		var digitos = $.trim(numero).split('.');

		numero = (digitos[1].length > 1) ? $.trim(numero).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] : $.trim(numero).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] + '0';
	    } else {
		numero = numero + '.00';
	    }

	    return numero;
	} else {
	    return '0.00';
	}
    },
    esNumero: function (numero) {
	return !isNaN(parseFloat(numero)) && isFinite(numero);
    },
    descargaDocumento: function (url) {
	general.block();

	$.fileDownload(url, {
	    successCallback: function (url) {
		general.unblock();
	    },
	    failCallback: function (responseHtml, url) {
		general.unblock();
		general.notify('<strong>Ocurrió un error</strong><br />', 'Ocurrió un error al recuperar el archivo: ' + responseHtml, 'danger', true);
	    }
	});
    }
};

//Se inicializa el objeto
general.init();