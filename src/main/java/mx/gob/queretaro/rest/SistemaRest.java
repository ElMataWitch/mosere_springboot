package mx.gob.queretaro.rest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.service.ISistemaService;

@RestController
@RequestMapping("api/sistemas")
public class SistemaRest {

	private final ISistemaService sistemaService;

	@Autowired
	public SistemaRest(ISistemaService sistemaService) {
		this.sistemaService = sistemaService;
	}

	@GetMapping(path = "obtenerSistemas", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String,Object> obtenerSistemas(){
		Map<String,Object> resultado = new HashMap();
		try {
			resultado.put("estado", "exito");
			resultado.put("datos",sistemaService.obtenerSistemas());
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
			resultado.put("datos", sistemaService.obtenerPorId(id));
		} catch (InternalException ex) {
			resultado.put("estado", "error");
			resultado.put("datos", ex.getMessage());
		}
		return resultado;
	}
}
