package mx.gob.queretaro.rest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.service.IUsuarioMosereService;

@RestController
@RequestMapping("api/usuarios")
public class UsuarioMosereRest {

	private final IUsuarioMosereService usuarioMosereService;

	public UsuarioMosereRest(IUsuarioMosereService usuarioMosereService) {
		this.usuarioMosereService = usuarioMosereService;
	}

	@GetMapping(path = "obtenerUsuarios", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String,Object> obtenerUsuarios(){
		Map<String,Object> resultado = new HashMap();
		try {
			resultado.put("estado", "exito");
			resultado.put("datos",usuarioMosereService.obtenerUsuarios());
		} catch (InternalException ex) {
			resultado.put("estado", "error");
			resultado.put("datos",ex.getMessage());
		}

		return resultado;
	}

	@GetMapping(path = "obtenerPorId/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String, Object> obtenerPorId(@PathVariable("id") Short id){
		Map<String, Object> resultado = new HashMap<>();
		try {
			resultado.put("estado", "exito");
			resultado.put("datos", usuarioMosereService.obtenerPorId(id));
		} catch (InternalException ex) {
			resultado.put("estado", "error");
			resultado.put("datos", ex.getMessage());
		}
		return resultado;
	}


}
