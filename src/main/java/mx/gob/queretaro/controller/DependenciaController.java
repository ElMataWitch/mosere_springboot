package mx.gob.queretaro.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.request.DependenciaRequest;
import mx.gob.queretaro.service.IDependenciaService;

@Controller
@RequestMapping("dependencias")
public class DependenciaController {

	private final IDependenciaService dependenciaService;

	@Autowired
	public DependenciaController(IDependenciaService dependenciaService) {
		this.dependenciaService = dependenciaService;
	}

	@GetMapping("listado")
	public String usuarios(ModelMap model) {
		model.addAttribute("page", "dependencias");
		return "dependencias/listado";
	}

	@PostMapping("guardar")
	public String save(ModelMap model, @Valid DependenciaRequest dependenciaRequest,
			BindingResult result) {

		try {
			if (result.hasErrors()) {
				StringBuilder mensaje = new StringBuilder();

				for (FieldError error : result.getFieldErrors()) {
					String campo = error.getField().trim() + " " + error.getDefaultMessage().trim().
							replace("null", "nulo") + ".";

					if (mensaje.toString().trim().isEmpty()) {
						mensaje.append(campo);
					} else {
						mensaje.append("-").append(campo);
					}
				}

				model.addAttribute("error", mensaje.toString());

				return "dependencias/listado";
			} else {

				dependenciaService.guardarDependencia(dependenciaRequest);
				return "dependencias/exito";
			}

		} catch (InternalException ex) {
			model.addAttribute("error", ex.getMessage());
			return "dependencias/listado";
		}


	}

	@PostMapping("actualizar")
	public String update(ModelMap model, @Valid DependenciaRequest dependenciaRequest,
			BindingResult result) {

		try {
			if (result.hasErrors()) {
				StringBuilder mensaje = new StringBuilder();

				for (FieldError error : result.getFieldErrors()) {
					String campo = error.getField().trim() + " " + error.getDefaultMessage().trim().
							replace("null", "nulo") + ".";

					if (mensaje.toString().trim().isEmpty()) {
						mensaje.append(campo);
					} else {
						mensaje.append("//n").append(campo);
					}
				}

				model.addAttribute("error", mensaje.toString());

				return "dependencias/listado";
			} else {
				dependenciaService.actualizarDependencia(dependenciaRequest);
				return "dependencias/exito";
			}
		} catch (InternalException ex) {
			model.addAttribute("error", ex.getMessage());
			return "dependencias/crear";
		}
	}

}
