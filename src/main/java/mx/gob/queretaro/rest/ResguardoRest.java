package mx.gob.queretaro.rest;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.ResourceUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.Rol;
import mx.gob.queretaro.request.ResguardoRequest;
import mx.gob.queretaro.service.IResguardoService;
import mx.gob.queretaro.service.IRolService;
import mx.gob.queretaro.service.IUsuarioMosereService;
import mx.gob.queretaro.service.impl.JasperReportervice;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@RestController
@RequestMapping("api/resguardo")
public class ResguardoRest {

	private final JasperReportervice jasperReportervice;
	private final IUsuarioMosereService usuarioMosereService;
	private final IRolService rolService;
	private final IResguardoService resguardoService;

	@Autowired
	public ResguardoRest(JasperReportervice jasperReportervice, IUsuarioMosereService usuarioMosereService,
			IRolService rolService, IResguardoService resguardoService) {
		this.jasperReportervice = jasperReportervice;
		this.usuarioMosereService = usuarioMosereService;
		this.rolService = rolService;
		this.resguardoService = resguardoService;
	}

	@GetMapping(path = "obtenerRegResguardos", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String,Object> obtenerRegResguardos(){
		Map<String,Object> resultado = new HashMap();
		try {
			resultado.put("estado", "exito");
			resultado.put("datos",resguardoService.obtenerResguardos());
		} catch (InternalException ex) {
			resultado.put("estado", "error");
			resultado.put("datos",ex.getMessage());
		}
		return resultado;
	}

	@GetMapping(path = "generarResguardo/{reportFormat}", produces = MediaType.APPLICATION_JSON_VALUE)
	public String generarResguardo(@PathVariable("reportFormat") String reportFormat) throws JRException, InternalException, FileNotFoundException {
		return jasperReportervice.exportReport(reportFormat );
	}

	@GetMapping(path="visualizarResguardo")
	@ResponseBody
	public void getRpt1(HttpServletResponse response, ResguardoRequest resguardoRequest)//, @Valid @RequestBody ResguardoRequest resguardoRequest
			throws JRException, IOException, InternalException {
		JRBeanCollectionDataSource dataSource;
		System.out.println(resguardoRequest.getIdRoles());

		// para almacenar los roles
		if(!resguardoRequest.getIdRoles().equals("") && !resguardoRequest.getIdRoles().isEmpty()) {
			List<Rol> roles = new ArrayList<>();

			String[] rolesDivididos = resguardoRequest.getIdRoles().split(",");

			for (String element : rolesDivididos) {
				//System.out.println(element);
				Rol r = rolService.obtenerRolPorId(Short.valueOf(element));
				roles.add(r);
			}
			/*
			for (Rol rol: roles) {
				System.out.println(rol.getRol()+" "+rol.getDescripcion());
			}*/
			dataSource = new JRBeanCollectionDataSource(roles);
		}else {
			//para que genere solo 1 registro y no se dupliquen cosas en el jasper
			List<ResguardoRequest> datos = new ArrayList<>();
			datos.add(resguardoRequest);
			dataSource = new JRBeanCollectionDataSource(datos);
		}


		//Hora
		String strDateFormatHora = "hh: mm: ss a";
		String strDateFormatFecha = "dd-MMM-YYYY";
		String strDateFormatFechaLarga = "d 'de' MMMM 'del' yyyy";
		SimpleDateFormat objSDFHora = new SimpleDateFormat(strDateFormatHora);
		SimpleDateFormat objSDFFecha = new SimpleDateFormat(strDateFormatFecha);
		SimpleDateFormat objSDFFechaLarga = new SimpleDateFormat(strDateFormatFechaLarga);

		File file = null;
		//sin compilar !resguardoRequest.getSistemaName().equals("CATASTRO") ||
		System.out.println(resguardoRequest.getSistemaName());
		if(!resguardoRequest.getSistemaName().equals("SISTEMA DE RECAUDACIÓN (SR)") && !resguardoRequest.getSistemaName().equals("CATASTRO")) {
			file = ResourceUtils.getFile("src/main/resources/plantillaGenerica.jrxml");
		}else {
			file = ResourceUtils.getFile("src/main/resources/plantilla"+resguardoRequest.getSistemaName()+".jrxml");
		}
		JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());

		HashMap<String, Object> parametros = new HashMap<>();
		parametros.put("dependencia", resguardoRequest.getDependenciaName());
		parametros.put("departamento", resguardoRequest.getDepartamento());
		parametros.put("encabezado", resguardoRequest.getEncabezado());
		parametros.put("folio", resguardoRequest.getSistemaName().substring(0,3) + "-1234");
		parametros.put("leyenda", resguardoRequest.getLeyenda());
		parametros.put("apertura", resguardoRequest.getApertura());
		parametros.put("cuerpo", resguardoRequest.getCuerpo());
		parametros.put("usuario", resguardoRequest.getUsuario());
		parametros.put("nombreUsuario", resguardoRequest.getNombre().trim());
		parametros.put("fecha", objSDFHora.format(new Date()));
		parametros.put("fechaLarga", objSDFFechaLarga.format(new Date()));
		parametros.put("hora", objSDFFecha.format(new Date()));

		parametros.put("sistema", resguardoRequest.getSistemaName());
		parametros.put("autoriza", resguardoRequest.getAutoriza());


		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parametros, dataSource);
		byte[] pdfBytes = JasperExportManager.exportReportToPdf(jasperPrint);

		//x-pdf descarga directa

		//response.setContentType("application/x-pdf");
		//response.setHeader("Content-disposition", "inline; filename=helloWorldReport.pdf");


		response.setContentType("application/pdf");
		response.setHeader("Content-Disposition", "inline;filename=" +resguardoRequest.getUsuario().trim() + "Resguardo.pdf");
		response.getOutputStream().write(pdfBytes);
		response.flushBuffer();
		/*
		response.setContentType("application/pdf");
		response.setContentLength(pdfBytes.length);
		ServletOutputStream outputstream = response.getOutputStream();
		outputstream.write(pdfBytes, 0, pdfBytes.length);
		outputstream.flush();
		outputstream.close();
		 */
	}


	@PostMapping(path="guardar" , produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Map<String, Object> guardar(HttpServletResponse response, @RequestBody ResguardoRequest resguardoRequest,BindingResult errores)
			throws JRException, IOException, InternalException {
		//resguardoRequest.setFolio(resguardoRequest.getSistemaName().substring(0,3) + "-1234");

		Map<String, Object> resultado = new HashMap<>();
		try {
			if(!errores.hasErrors()) {
				resultado.put("estado", "exito");
				resultado.put("datos", resguardoService.guardarResguardo(resguardoRequest));
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

