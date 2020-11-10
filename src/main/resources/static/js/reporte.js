function pad(input, length, padding) { 
  var str = input + "";
  return (length <= str.length) ? str : pad(str+padding, length, padding);
}

function llenaReporte(jdatos) {
    
    var reg = jdatos.datos[0];
    var f = new Date();
    var hoy = (f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
    var myHtml = '<div id="dTablaCabeza">';
    myHtml += '<table style="width: 700px;">';
    myHtml += '<tr><th rowspan="2"><IMG width=150 height=64 SRC="img/difEstatalLogo.png"/></th>';
    myHtml += '<th><p align="center" id="cabeza">CENTRO DE REHABILITACIÓN INTEGRAL DE QUERÉTARO</p></th></tr>';
    myHtml += '<tr><th><p align="center">CERTIFICADO DE DISCAPACIDAD PARA PACIENTES</p></th></tr>';
    myHtml += '<tr><th></th><th style="text-align: center;"><u>DATOS DEL PACIENTE</u></th></tr>';
    myHtml += '<tr><td>&nbsp;</td></tr></table></div>';
    myHtml += '<div id="dCuerpo">';
    myHtml += '    <table style="width: 700px;">';
    myHtml += '<tr><td>FECHA DE IMPRESI&Oacute;N: &nbsp;&nbsp;</td><td colspan=3 id="tFecha" class="subrayado"><u>&nbsp;&nbsp;' + pad(hoy,40,'_') + '&nbsp;&nbsp;</u></td></tr>';
    myHtml += '<tr><td>FOLIO:</td><td id="tFolio"><u>&nbsp;&nbsp;(&nbsp;' + pad(reg.FOLIO,40,'_') + '&nbsp;)&nbsp;&nbsp;</u></td></tr>';
    myHtml += '<tr><td>RFC:</td><td id="tRFC"><u>&nbsp;&nbsp;' + pad(reg.RFC,40,'_') + '&nbsp;&nbsp;</u></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
    myHtml += '<td style="text-align: right">SEXO:&nbsp;&nbsp;&nbsp;&nbsp;</td><td id="tSexo"><u>&nbsp;&nbsp;' + pad(reg.SEXO,15,'_') + '&nbsp;&nbsp;</u></td></tr>';
    myHtml += '<tr><td>NOMBRE:</td><td colspan="4" id="tNombre"><u>&nbsp;&nbsp;' + pad(reg.NOMBRE,40,'_') + '&nbsp;&nbsp;</u></td></tr>';
    myHtml += '<tr><td>FECHA DE NACIMIENTO:</td><td id="tfNaci"><u>&nbsp;&nbsp;' + reg.CUMPLE + '&nbsp;&nbsp;</u></td><td></td>';
    myHtml += '<td style="text-align: right">TEL&Eacute;FONO:&nbsp;&nbsp;&nbsp;&nbsp;</td><td id="tTelefono"><u>&nbsp;&nbsp;' + reg.TELEFONO + '&nbsp;&nbsp;</u></td></tr>';
    myHtml += '<tr><td>DOMICILIO:</td><td id="tDomicilio" colspan="4"><u>&nbsp;&nbsp;' +
            dameDom(reg.NO_INT, reg.NO_EXT, reg.VIALIDAD, reg.COLONIA, reg.MUNI_NO_MUNICIPIO) +
            '&nbsp;&nbsp;</u></td></tr>';
    myHtml += '<tr><td>&nbsp;</td></tr>';
    myHtml += '<tr><td>TIPO DE SANGRE:</td><td id="tSangre"><u>&nbsp;&nbsp;' +
            tipo_sangre(reg.TIPO_SANGRE).toUpperCase() + '&nbsp;&nbsp;</u></td><td></td>';
    myHtml += '<td style="text-align: right">CARDIOPAT&Iacute;A:&nbsp;&nbsp;&nbsp;&nbsp;</td>';
    myHtml += '<td id="tCardio">(&nbsp;' + nombre_muni(reg.CARDIOPATIA) + '&nbsp;)</td></tr>';
    myHtml += '<tr><td></td><td></td><td></td>';
    myHtml += '    <td style="text-align: right">CIRUG&Iacute;A:&nbsp;&nbsp;&nbsp;&nbsp;</td>';
    myHtml += '<td id="tCirugia">(&nbsp;' + nombre_muni(reg.CIRUGIA) + '&nbsp;)</td></tr>';
    myHtml += '<tr><td></td><td></td><td></td>';
    myHtml += '<td style="text-align: right">TIPO:&nbsp;&nbsp;&nbsp;&nbsp;</td>';
    myHtml += '<td id="tTipoCirugia"><u>&nbsp;&nbsp;' + reg.TIPO_CIRUGIA + '&nbsp;&nbsp;</u></td></tr>';
    myHtml += '<tr><td>AL&Eacute;RGICO A:</td><td id="tAlergia"><u>&nbsp;&nbsp;' + reg.ALERGIA + '&nbsp;&nbsp;</u></td><td></td>';
    myHtml += '<td style="text-align: right">DIABETES:&nbsp;&nbsp;&nbsp;&nbsp;</td>';
    myHtml += '<td id="tDiabetes">(&nbsp;' + nombre_muni(reg.DIABETES) + '&nbsp;)</td></tr>';
    myHtml += '<tr><td>OTROS:</td><td id="tOtros"><u>&nbsp;&nbsp;' + reg.OTROS + '&nbsp;&nbsp;</u></td><td></td>';
    myHtml += '<td style="text-align: right">EPILEPSIA:&nbsp;&nbsp;&nbsp;&nbsp;</td>';
    myHtml += '<td id="tEpilepsia">(&nbsp;' + nombre_muni(reg.EPILEPSIA) + '&nbsp;)</td></tr>';
    myHtml += '<tr><td></td><td></td><td></td>';
    myHtml += '<td style="text-align: right">HIPERTENSI&Oacute;N ARTERIAL:&nbsp;&nbsp;&nbsp;&nbsp;</td>';
    myHtml += '<td id="tHipertension">(&nbsp;' + nombre_muni(reg.HIPERTENSION) + '&nbsp;)</td></tr>';
    myHtml += '<tr><td>DIAGN&Oacute;STICO:</td><td colspan="4" id="tDiagnostico"><u>&nbsp;&nbsp;' + reg.DIAGNOSTICO + '&nbsp;&nbsp;</u></td></tr>';
    myHtml += '<tr><td>OBSERVACIONES:</td><td colspan="4" id="tObservaciones"><u>&nbsp;&nbsp;' + reg.OBSERVACIONES + '&nbsp;&nbsp;</u></td></tr>';
    myHtml += '<tr><td>&nbsp;</td></tr>';
    myHtml += '</table></div>';
    myHtml += '<div id="dPropietario">';
    myHtml += '<table style="width: 700px;">';
    myHtml += '<tr><th colspan="5">';
    myHtml += '<u>LA DISCAPACIDAD DEL PACIENTE ES PERMANENTE, ES EXTIENDE EL PRESENTE ';
    myHtml += 'CERTIFICADO PARA TR&Aacute;MITE DE PLACAS DE DISCAPACIDAD, NO TIENE ';
    myHtml += 'VALIDEZ PARA ALGUNA GESTI&Oacute;N.</u>';
    myHtml += '</th></tr>';
    myHtml += '<tr><td>&nbsp;</td></tr>';
    myHtml += '<tr><td colspan="2">DATOS DEL VEH&Iacute;CULO:</td></tr>';
    myHtml += '<tr><td>MODggggELO:&nbsp;&nbsp;</td><td id="tModelo"><u>&nbsp;&nbsp;' + reg.VEHI_MODELO_SUBL + '&nbsp;&nbsp;</u></td>';
    myHtml += '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
    myHtml += '<td>NO. DE SERIE:&nbsp;&nbsp;</td><td id="tSerie"><u>&nbsp;&nbsp;' + reg.VEHI_NO_SERIE + '&nbsp;&nbsp;</u></td></tr>';
    myHtml += '<tr><td>&nbsp;</td></tr>';
    myHtml += '<tr><td colspan="2">DATOS DEL PROPIETARIO:</td></tr>';
    myHtml += '<tr><td>RFC:</td><td id="tRFCP"><u>&nbsp;&nbsp;' + reg.RFC_P + '&nbsp;&nbsp;</u></td>';
    myHtml += '<td></td>';
    myHtml += '<td>PARENTESCO:</td><td id="tParentesco"><u>&nbsp;&nbsp;' + reg.PARENTESCO + '&nbsp;&nbsp;</u></td></tr>';
    myHtml += '<tr><td>NOMBRE:</td><td colspan="4" id="tNombrep"><u>&nbsp;&nbsp;' + reg.NOMBRE_P + '&nbsp;&nbsp;</u></td></tr>';
    myHtml += '<tr><td>&nbsp;</td></tr>';
    myHtml += '<tr><td colspan="2" style="text-align: center;"><u id="uMedico">&nbsp;&nbsp;' + reg.MEDICO + '&nbsp;&nbsp;</u></td><td></td>';
    myHtml += '<td colspan="2" style="text-align: center;"><u id="uCedula">&nbsp;&nbsp;' + reg.CEDULA + '&nbsp;&nbsp;</u></td></tr>';
    myHtml += '<tr><td colspan="2" style="text-align: center;">M&Eacute;DICO QUE EXPIDE</td><td></td>';
    myHtml += '<td colspan="2" style="text-align: center;">C&Eacute;DULA PROFESIONAL</td></tr>';
    myHtml += '<tr><td>&nbsp;</td></tr>';
    myHtml += '<tr><th colspan="5">';
    myHtml += 'NOTA: PARA ESTAR EN POSIBILIDAD DE LLEVAR A CABO SU TR&Aacute;MITE, ';
    myHtml += 'FAVOR DE VERIFICAR QUE LOS DATOS DEL VEH&Iacute;CULO COINCIDAN';
    myHtml += 'CON LOS DATOS DEL CERTIFICADO';
    myHtml += '</th></tr></table></div>';
    $("#dTablas").html(myHtml);
    $("td").each(function() {
        if ($(this).html() == "null")
            $(this).html("");
    });
    window.open('generaPDf');
   
}
function dameDom(ni, ne, via, col, mun) {
    if (ni === "null")
        ni = "";
    else
        ni = "-" + ni;
    var domi = via + " " + ne + ni + col + ", " + nombre_muni(mun);
    return domi;
}


function tInfoReporte() {
    

    $('#dTablas').load('dameCertificado', function (){
        
    });
    
//    
//    $.ajax({
//        beforeSend: function() {
//            $("#divImgCargando").show();
//        },
//        cache: false,
//        complete: function() {
//            $("#divImgCargando").hide();
//        },
//        // Definir codificación para el envío de datos
//        // contentType: "application/x-www-form-urlencoded; charset=utf-8",
//        // Indicar que esperamos un código JSON como respuesta
//        // dataType: "json",
//        // Manejador de errores cuando ocurra uno al hacer la petición
//        error: function ajaxError(peticion, tipoError, excepcion) {
//            $("#divImgCargando").hide();
//            if (tipoError == "timeout") {
//                alert("No se tiene respuesta con el servidor.\nFavor de intentarlo más "
//                        + "tarde.");
//            } else if (peticion.status == 500) {
//                alert("Error en el servidor al ejecutar el servicio.\nFavor de "
//                        + "intentarlo más tarde.");
//            } else if (peticion.status == 404) {
//                alert("No se encontro el servicio solictado.\nFavor de verificar.");
//            } else if (tipoError == "parsererror") {
//                alert("Error en la respuesta enviada del servidor.\nFavor de intentarlo "
//                        + "más tarde.");
//            } else {
//                alert("Ocurrio un error al ejecutar el servicio.\nFavor de intentarlo "
//                        + "más tarde.");
//            }
//        },
//        //scriptCharset: "utf-8",
//        success: function(data) {
//
//            // Validar que es un objeto
////            if (!json) {
////                $("#divImgCargando").hide();
////                alert("No hay registros con esa seleccion.");
////                return;
////            }
////            if (!json.datos || !json.datos.length || (!json.datos.length < 0)) {
////                $("#divImgCargando").hide();
////                alert("No hay Informacion con esa seleccion.");
////                return;
////            }
//
//            //llenaReporte(json);
//            $("#dTablas").html(data);
//        },
//        // Le damos 30 segundos a la petición para recibir una respuesta
//        timeout: 30000,
//        // Hacemos una petición de tipo "GET"
//        type: "GET",
//        // La URL que vamos a consultar
//        url: "dameCertificado"
//    });

}//tInfoReporte

tInfoReporte();