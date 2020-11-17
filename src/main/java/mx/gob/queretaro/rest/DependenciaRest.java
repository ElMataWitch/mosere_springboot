package mx.gob.queretaro.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.request.DependenciaRequest;
import mx.gob.queretaro.service.IDependenciaService;

@RestController
@RequestMapping("api/dependencias")
public class DependenciaRest {

	private final IDependenciaService dependenciaService;

	@Autowired
	public DependenciaRest(IDependenciaService dependenciaService) {
		this.dependenciaService = dependenciaService;
	}

	@GetMapping(path = "obtenerDependencias", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String,Object> obtenerDependencias(){
		Map<String,Object> resultado = new HashMap();
		try {
			resultado.put("estado", "exito");
			resultado.put("datos",dependenciaService.obtenerSistemas());
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
			resultado.put("datos", dependenciaService.obtenerPorId(id));
		} catch (InternalException ex) {
			resultado.put("estado", "error");
			resultado.put("datos", ex.getMessage());
		}
		return resultado;
	}

	@PostMapping(path = "guardar", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String, Object> guardar(@Valid @RequestBody DependenciaRequest dependenciaRequest, BindingResult errores){
		Map<String, Object> resultado = new HashMap<>();
		try {
			if(!errores.hasErrors()) {
				resultado.put("estado", "exito");
				resultado.put("datos", dependenciaService.guardarDependencia(dependenciaRequest));
			}else {
				List<String> mensaje = new ArrayList<>();

				for (FieldError error : errores.getFieldErrors()) {
					String campo = error.getField().trim() + " "
							+ error.getDefaultMessage().trim().replace("null", "nulo") + ".";

					mensaje.add(campo);
				}
				resultado.put("estado", "exito");
				resultado.put("datos", mensaje);
			}
		} catch (InternalException ex) {
			resultado.put("estado", "error");
			resultado.put("datos", ex.getMessage());
		}
		return resultado;
	}

	@PutMapping(path = "actualizar", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String, Object> actualizar(@Valid @RequestBody DependenciaRequest dependenciaRequest, BindingResult errores){
		Map<String, Object> resultado = new HashMap<>();
		try {
			if(!errores.hasErrors()) {
				resultado.put("estado", "exito");
				resultado.put("datos", dependenciaService.actualizarDependencia(dependenciaRequest));
			}else {
				List<String> mensaje = new ArrayList<>();

				for (FieldError error : errores.getFieldErrors()) {
					String campo = error.getField().trim() + " "
							+ error.getDefaultMessage().trim().replace("null", "nulo") + ".";

					mensaje.add(campo);
				}
				resultado.put("estado", "exito");
				resultado.put("datos", mensaje);
			}
		} catch (InternalException ex) {
			resultado.put("estado", "error");
			resultado.put("datos", ex.getMessage());
		}
		return resultado;
	}
}
