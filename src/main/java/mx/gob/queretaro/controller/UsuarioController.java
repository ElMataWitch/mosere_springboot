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
import mx.gob.queretaro.request.UsuarioMosereRequest;
import mx.gob.queretaro.service.IUsuarioMosereService;

@Controller
@RequestMapping("usuarios")
public class UsuarioController {

	private final IUsuarioMosereService usuarioMosereService;

	@Autowired
	public UsuarioController(IUsuarioMosereService usuarioMosereService) {
		this.usuarioMosereService = usuarioMosereService;
	}

	@GetMapping("listado")
	public String usuarios(ModelMap model) {
		model.addAttribute("page", "usuarios");
		return "usuarios/listado";
	}

	@PostMapping("guardar")
	public String save(ModelMap model, @Valid UsuarioMosereRequest usuarioMosereRequest,
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

				return "usuarios/listado";
			} else {

				usuarioMosereService.guardarUsuario(usuarioMosereRequest);
				return "usuarios/exito";
			}

		} catch (InternalException ex) {
			model.addAttribute("error", ex.getMessage());
			return "usuarios/listado";
		}


	}

	@PostMapping("actualizar")
	public String update(ModelMap model, @Valid UsuarioMosereRequest usuarioMosereRequest,
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

				return "usuarios/listado";
			} else {
				usuarioMosereService.actualizarUsuarioMosere(usuarioMosereRequest);
				return "usuarios/exito";
			}
		} catch (InternalException ex) {
			model.addAttribute("error", ex.getMessage());
			return "usuarios/listado";
		}
	}

}
