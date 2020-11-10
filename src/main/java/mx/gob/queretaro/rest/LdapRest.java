package mx.gob.queretaro.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.service.ILdapService;
import mx.gob.queretaro.service.IUsuarioMosereService;

@RestController
@RequestMapping("api/ldapInfo")
public class LdapRest {

	private final ILdapService lapILdapService;
	private final IUsuarioMosereService iUsuarioMosereService;

	@Autowired
	public LdapRest(ILdapService lapILdapService,IUsuarioMosereService iUsuarioMosereService) {
		this.lapILdapService = lapILdapService;
		this.iUsuarioMosereService = iUsuarioMosereService;
	}

	@GetMapping(path = "infoUsuario/{user}", produces = MediaType.APPLICATION_JSON_VALUE)
	public String obtenerInfoUsuario(@PathVariable("user") String user){
		String resultado = "";
		try {
			resultado = lapILdapService.consultaLdap(user);
		} catch (InternalException ex) {
			resultado = "{\"mensaje\" : \"Hubo un problema al obtener los datos\", \"estatus\" : \"danger\", \"datos\" : null}";
		}
		return resultado;
	}

}
