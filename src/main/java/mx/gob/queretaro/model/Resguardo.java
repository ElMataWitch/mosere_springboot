package mx.gob.queretaro.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "RE_RESGUARDO")
@NamedQuery(name = "Resguardo.findAll", query = "SELECT r FROM Resguardo r ORDER BY r.idResguardo ASC")
public class Resguardo implements Serializable{

	private static final long serialVersionUID = -2488129567839434703L;
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RE_RESGUARDO_SEQ")
	@SequenceGenerator(name = "RE_RESGUARDO_SEQ", sequenceName = "RE_RESGUARDO_SEQ", allocationSize = 1)
	@Column(name = "ID_RESGUARDO", unique = true, nullable = false)
	private Short idResguardo;
	@Column(name = "ANIO", nullable = false, length = 4)
	private Short anio;
	@Column(name = "FOLIO", nullable = true, length = 50)
	private String folio;
	@Column(name = "USUARIO", nullable = false, length = 50)
	private String usuario;
	@Column(name = "NOMBRE_USUARIO", nullable = false, length = 200)
	private String nombreUsuario;
	@Column(name = "DEPENDENCIA", nullable = false, length = 200)
	private String dependencia;
	@Column(name = "DEPARTAMENTO", nullable = false, length = 200)
	private String departamento;
	@Column(name = "JEFE_INMEDIATO", nullable = true, length = 200)
	private String jefeInmediato;
	@Column(name = "CORREO", nullable = true, length = 200)
	private String correo;
	@Column(name = "ENVIADO", nullable = true, length = 20)
	private String enviado;
	@Column(name = "RECIBIDO", nullable = true, length = 20)
	private String recibido;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_EMISION", nullable = false)
	private Date fechaEmision;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_RECIBIDO", nullable = false)
	private Date fechaRecibido;
	@Column(name = "ESTATUS", nullable = false, length = 5)
	private String estatus;
	@Column(name = "USUARIO_I", nullable = false, length = 20)
	private String usuarioCaptura;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_I", nullable = false)
	private Date fechaCaptura;
	@Column(name = "USUARIO_U", nullable = true, length = 20)
	private String usuarioEditor;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_U", nullable = true)
	private Date fechaEdicion;

	public Resguardo() {

	}

	//select
	public Resguardo(Short idResguardo, Short anio, String folio, String usuario, String nombreUsuario,
			String dependencia, String departamento, String jefeInmediato, String correo, String enviado,
			String recibido, Date fechaEmision, Date fechaRecibido, String estatus, String usuarioCaptura,
			Date fechaCaptura, String usuarioEditor, Date fechaEdicion) {
		this.idResguardo = idResguardo;
		this.anio = anio;
		this.folio = folio;
		this.usuario = usuario;
		this.nombreUsuario = nombreUsuario;
		this.dependencia = dependencia;
		this.departamento = departamento;
		this.jefeInmediato = jefeInmediato;
		this.correo = correo;
		this.enviado = enviado;
		this.recibido = recibido;
		this.fechaEmision = fechaEmision;
		this.fechaRecibido = fechaRecibido;
		this.estatus = estatus;
		this.usuarioCaptura = usuarioCaptura;
		this.fechaCaptura = fechaCaptura;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
	}

	public Short getIdResguardo() {
		return idResguardo;
	}

	public void setIdResguardo(Short idResguardo) {
		this.idResguardo = idResguardo;
	}

	public Short getAnio() {
		return anio;
	}

	public void setAnio(Short anio) {
		this.anio = anio;
	}

	public String getFolio() {
		return folio;
	}

	public void setFolio(String folio) {
		this.folio = folio;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getNombreUsuario() {
		return nombreUsuario;
	}

	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}

	public String getDependencia() {
		return dependencia;
	}

	public void setDependencia(String dependencia) {
		this.dependencia = dependencia;
	}

	public String getDepartamento() {
		return departamento;
	}

	public void setDepartamento(String departamento) {
		this.departamento = departamento;
	}

	public String getJefeInmediato() {
		return jefeInmediato;
	}

	public void setJefeInmediato(String jefeInmediato) {
		this.jefeInmediato = jefeInmediato;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getEnviado() {
		return enviado;
	}

	public void setEnviado(String enviado) {
		this.enviado = enviado;
	}

	public String getRecibido() {
		return recibido;
	}

	public void setRecibido(String recibido) {
		this.recibido = recibido;
	}

	public Date getFechaEmision() {
		return fechaEmision;
	}

	public void setFechaEmision(Date fechaEmision) {
		this.fechaEmision = fechaEmision;
	}

	public Date getFechaRecibido() {
		return fechaRecibido;
	}

	public void setFechaRecibido(Date fechaRecibido) {
		this.fechaRecibido = fechaRecibido;
	}

	public String getEstatus() {
		return estatus;
	}

	public void setEstatus(String estatus) {
		this.estatus = estatus;
	}

	public String getUsuarioCaptura() {
		return usuarioCaptura;
	}

	public void setUsuarioCaptura(String usuarioCaptura) {
		this.usuarioCaptura = usuarioCaptura;
	}

	public Date getFechaCaptura() {
		return fechaCaptura;
	}

	public void setFechaCaptura(Date fechaCaptura) {
		this.fechaCaptura = fechaCaptura;
	}

	public String getUsuarioEditor() {
		return usuarioEditor;
	}

	public void setUsuarioEditor(String usuarioEditor) {
		this.usuarioEditor = usuarioEditor;
	}

	public Date getFechaEdicion() {
		return fechaEdicion;
	}

	public void setFechaEdicion(Date fechaEdicion) {
		this.fechaEdicion = fechaEdicion;
	}

}
