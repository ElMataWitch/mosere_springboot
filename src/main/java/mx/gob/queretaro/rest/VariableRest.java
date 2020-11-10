package mx.gob.queretaro.rest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.service.IVariableService;

@RestController
@RequestMapping("api/variables")
public class VariableRest {

	private final IVariableService variableService;

	@Autowired
	public VariableRest(IVariableService variableService) {
		this.variableService = variableService;
	}

	@GetMapping(path = "obtenerVariables", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String,Object> obtenerVariables(){
		Map<String,Object> resultado = new HashMap();
		try {
			resultado.put("estado", "exito");
			resultado.put("datos",variableService.obtenerVariables());
		} catch (InternalException ex) {
			resultado.put("estado", "error");
			resultado.put("datos",ex.getMessage());
		}
		return resultado;
	}
}
