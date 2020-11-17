package mx.gob.queretaro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import mx.gob.queretaro.service.IEtiquetaService;

@Controller
@RequestMapping("leyendas")
public class LeyendaController {

	private final IEtiquetaService etiquetaService;

	public LeyendaController(IEtiquetaService etiquetaService) {
		this.etiquetaService = etiquetaService;
	}

	@GetMapping("listado")
	public String listado(ModelMap model) {
		model.addAttribute("page", "leyendas");
		return "leyendas/listado";
	}


}
