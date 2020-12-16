package mx.gob.queretaro.request;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ResguardoRequestSave implements Serializable {

	private static final long serialVersionUID = 944274803738818988L;

	private Short idResguardo;

	private Short anio;

	private String folio;

	private String usuario;

	private String nombre;

	private String dependenciaName;

	private String departamento;

	private String autoriza;

	private String correo;
	private String enviado;
	private String recibido;

	@DateTimeFormat(pattern = "yyyy-mm-dd")
	private Date fechaEmision;
	@DateTimeFormat(pattern = "yyyy-mm-dd")
	private Date fechaRecibido;

	private String estatus;

	private String usuarioCaptura;
	@DateTimeFormat(pattern = "yyyy-mm-dd")
	private Date fechaCaptura;
	private String usuarioEditor;
	@DateTimeFormat(pattern = "yyyy-mm-dd")
	private Date fechaEdicion;

}
