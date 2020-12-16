package mx.gob.queretaro.rest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.service.IRolService;

@RestController
@RequestMapping("api/rol")
public class RolRest {

	private final IRolService rolService;

	@Autowired
	public RolRest(IRolService rolService) {
		this.rolService = rolService;
	}

	@GetMapping(path = "obtenerRoles", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String,Object> obtenerRoles(){
		Map<String,Object> resultado = new HashMap();
		try {
			resultado.put("estado", "exito");
			resultado.put("datos",rolService.obtenerRoles());
		} catch (InternalException ex) {
			resultado.put("estado", "error");
			resultado.put("datos",ex.getMessage());
		}
		return resultado;
	}

	@GetMapping(path = "obtenerRolPorId/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String, Object> obtenerNombreRol(@PathVariable("id") Short id){
		Map<String, Object> resultado = new HashMap<>();
		try {
			resultado.put("estado", "exito");
			resultado.put("datos", rolService.obtenerRolPorId(id));
		} catch (InternalException ex) {
			resultado.put("estado", "error");
			resultado.put("datos", ex.getMessage());
		}
		return resultado;
	}

	@DeleteMapping(path = "eliminarRol/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String, Object> eliminarRol(@PathVariable("id") Short id){
		Map<String, Object> resultado = new HashMap<>();
		try {
			rolService.eliminarRol(id);
			resultado.put("estado", "exito");
			resultado.put("datos", "Se borro con éxito");
		} catch (InternalException ex) {
			resultado.put("estado", "error");
			resultado.put("datos", ex.getMessage());
		}
		return resultado;
	}

}
