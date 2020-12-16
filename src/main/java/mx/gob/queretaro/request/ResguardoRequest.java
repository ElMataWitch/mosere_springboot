package mx.gob.queretaro.request;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ResguardoRequest implements Serializable{

	private static final long serialVersionUID = 944274803738818988L;

	private Short idResguardo;
	//@NotNull
	private Short anio;

	private Short dependenciaId;
	//1
	@NotNull
	private String dependenciaName;
	//2
	@NotNull
	private String departamento;
	//3
	@NotNull
	private String encabezado;
	//4
	private String folio;
	//5
	@NotNull
	private String leyenda;
	//6
	@NotNull
	private String apertura;
	//7
	@NotNull
	private String cuerpo;

	@NotNull
	private String mensaje;

	//8 $P{cuerpo}
	//@NotNull


	private String idRoles;

	private String rol;
	private String descripcion;

	//9
	@NotNull
	private String usuario;

	//10
	@NotNull
	private String nombre;

	@NotNull
	private String sistemaName;

	@NotNull
	private Short idSistema;

	@NotNull
	private String autoriza;


	private String correo;
	private String enviado;
	private String recibido;
	@DateTimeFormat(pattern = "yyyy-mm-dd")
	private Date fechaEmision;
	@DateTimeFormat(pattern = "yyyy-mm-dd")
	private Date fechaRecibido;
	//@NotNull
	private String estatus;
	//@NotNull
	private String usuarioCaptura;
	@DateTimeFormat(pattern = "yyyy-mm-dd")
	private Date fechaCaptura;
	private String usuarioEditor;
	@DateTimeFormat(pattern = "yyyy-mm-dd")
	private Date fechaEdicion;




}
