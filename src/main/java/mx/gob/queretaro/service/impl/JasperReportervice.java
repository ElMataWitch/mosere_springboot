package mx.gob.queretaro.service.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.UsuarioMosere;
import mx.gob.queretaro.service.IUsuarioMosereService;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class JasperReportervice {

	private final IUsuarioMosereService usuarioMosereService;
	//public static final String RESGUARDO = "usuarios.jasper";

	@Autowired
	public JasperReportervice(IUsuarioMosereService usuarioMosereService) {
		this.usuarioMosereService = usuarioMosereService;
	}

	public String exportReport(String reportFormat) throws InternalException, JRException, FileNotFoundException{

		String urlAlmacenamiento = "C:\\Users\\zelda\\OneDrive\\Escritorio";

		List<UsuarioMosere> usuarios = usuarioMosereService.obtenerUsuarios();

		File file = ResourceUtils.getFile("UsuariosMosere.jrxml");
		JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());

		HashMap<String, Object> parametros = new HashMap<>();
		parametros.put("createdBy", "EMW");

		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(usuarios);

		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parametros, dataSource);
		if (reportFormat.equalsIgnoreCase("html")) {
			JasperExportManager.exportReportToHtmlFile(jasperPrint, urlAlmacenamiento + "\\resguardo.html");
		}
		if (reportFormat.equalsIgnoreCase("pdf")) {
			JasperExportManager.exportReportToPdfFile(jasperPrint, urlAlmacenamiento + "\\resguardo.pdf");


		}

		return "Resguardo Generado en : " + urlAlmacenamiento;

	}
}
