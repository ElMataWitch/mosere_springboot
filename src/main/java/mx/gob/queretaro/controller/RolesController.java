package mx.gob.queretaro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("roles")
public class RolesController {

	@GetMapping("listado")
	public String listado(ModelMap model) {
		model.addAttribute("page", "roles");
		return "roles/listado";
	}
}
