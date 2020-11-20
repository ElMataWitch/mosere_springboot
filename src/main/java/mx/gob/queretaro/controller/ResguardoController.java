package mx.gob.queretaro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("resguardo")
public class ResguardoController {

	@GetMapping("generar")
	public String home(ModelMap model) {
		model.addAttribute("page","resguardos");
		return "resguardo/generar";
	}
}
