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
import mx.gob.queretaro.request.UsuarioMosereRequest;
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

	@PostMapping(path = "guardar", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String, Object> guardar(@Valid @RequestBody UsuarioMosereRequest usuarioMosereRequest, BindingResult errores){
		Map<String, Object> resultado = new HashMap<>();
		try {
			if(!errores.hasErrors()) {
				resultado.put("estado", "exito");
				resultado.put("datos", usuarioMosereService.guardarUsuario(usuarioMosereRequest));
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
	public Map<String, Object> actualizar(@Valid @RequestBody UsuarioMosereRequest usuarioMosereRequest, BindingResult errores){
		Map<String, Object> resultado = new HashMap<>();
		try {
			if(!errores.hasErrors()) {
				resultado.put("estado", "exito");
				resultado.put("datos", usuarioMosereService.actualizarUsuarioMosere(usuarioMosereRequest));
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
