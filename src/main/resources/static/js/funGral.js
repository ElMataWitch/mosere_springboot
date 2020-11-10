//valida que la clase o campo traiga información o el número de caracteres correcto
function validaDatoEnCampo(tipo, mide, sim, campo) {
    if (tipo === "obj") {
        if (sim == "=") {
            if ($(campo).val().length == mide)
                return true;
            else
                return false;
        }
        else {
            if ($(campo).val().length > 0) {
                return true;
            } else
                return false;
        }//=
    } else {//es clase
        var dato = true;
        var cad ="";
        $(campo).each(function() {
            cad =$(this).val();
            if (cad.length <= 0) {
                if($(this).attr("id")!=="tEmail")
                dato = false;
            }
        });
        return dato;
    }
}

function buscaParametro(name)
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
}