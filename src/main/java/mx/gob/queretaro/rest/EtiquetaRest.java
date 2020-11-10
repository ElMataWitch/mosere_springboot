package mx.gob.queretaro.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

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
import mx.gob.queretaro.request.EtiquetaRequest;
import mx.gob.queretaro.service.IEtiquetaService;

@RestController
@RequestMapping("api/etiquetas")
public class EtiquetaRest {

	private final IEtiquetaService etiquetaService;

	public EtiquetaRest(IEtiquetaService etiquetaService) {
		this.etiquetaService = etiquetaService;
	}

	@GetMapping(path = "obtenerEtiquetas", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String,Object> obtenerEtiquetas(){
		Map<String,Object> resultado = new HashMap();
		try {
			resultado.put("estado", "exito");
			resultado.put("datos",etiquetaService.obtenerEtiquetas());
		} catch (InternalException ex) {
			resultado.put("estado", "error");
			resultado.put("datos",ex.getMessage());
		}
		return resultado;
	}

	@GetMapping(path = "obtenerPosicionEtiquetas", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String,Object> obtenerPosicionEtiquetas(){
		Map<String,Object> resultado = new HashMap();
		try {
			resultado.put("estado", "exito");
			resultado.put("datos",etiquetaService.obtenerPosicionesEtiquetas());
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
			resultado.put("datos", etiquetaService.obtenerPorId(id));
		} catch (InternalException ex) {
			resultado.put("estado", "error");
			resultado.put("datos", ex.getMessage());
		}
		return resultado;
	}

	@PostMapping(path = "guardar", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String, Object> guardar(@Valid @RequestBody EtiquetaRequest etiquetaRequest, BindingResult errores){
		Map<String, Object> resultado = new HashMap<>();
		try {
			if(!errores.hasErrors()) {
				resultado.put("estado", "exito");
				resultado.put("datos", etiquetaService.guardarEtiqueta(etiquetaRequest));
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
	public Map<String, Object> actualizar(@Valid @RequestBody EtiquetaRequest etiquetaRequest, BindingResult errores){
		Map<String, Object> resultado = new HashMap<>();
		try {
			if(!errores.hasErrors()) {
				resultado.put("estado", "exito");
				resultado.put("datos", etiquetaService.actualizarEtiqueta(etiquetaRequest));
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
