package mx.gob.queretaro.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "RE_RESGUARDOS")
@NamedQuery(name = "Resguardos.findAll", query = "SELECT r FROM Resguardos r ORDER BY r.idResguardo ASC")
public class Resguardos implements Serializable {

	private static final long serialVersionUID = 4040724029761638226L;
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RE_RESGUARDOS_SEQ")
	@SequenceGenerator(name = "RE_RESGUARDOS_SEQ", sequenceName = "RE_RESGUARDOS_SEQ", allocationSize = 1)
	@Column(name = "ID", unique = true, nullable = false)
	private Short idResguardo;

	// Fk
	// bi-directional many-to-one association to ReSistema
	// @JsonIgnore
	@JsonIgnoreProperties(value = { "resguardos", "hibernateLazyInitializer", "handler" }, allowSetters = true)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID_SISTEMA", nullable = false)
	private Sistema sistema;

	@Column(name = "ANIO", nullable = false)
	private Short anio;
	@Column(name = "FOLIO", nullable = true, length = 20)
	private String folio;

	/*
	 * // FK // bi-directional many-to-one association to ReUsuario //@JsonIgnore
	 *
	 * @JsonIgnoreProperties(value = { "resguardos", "hibernateLazyInitializer",
	 * "handler" }, allowSetters = true)
	 *
	 * @ManyToOne(fetch = FetchType.LAZY)
	 *
	 * @JoinColumn(name = "ID_USUARIO", nullable = false) private Usuario usuario;
	 */

	@Column(name = "ENVIADO", nullable = true, length = 10)
	private String enviado;
	@Column(name = "RECIBIDO", nullable = true, length = 20)
	private String recibido;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_EMISION", nullable = true)
	private Date fechaEmision;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_RECIBIDO", nullable = true)
	private Date fechaRecibido;
	@Column(name = "ESTATUS", nullable = false, length = 5)
	private String estatus;
	@Column(name = "USUARIO_I", nullable = false, length = 20)
	private String usuarioCaptura;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_I", nullable = true)
	private Date fechaCaptura;
	@Column(name = "USUARIO_U", nullable = true, length = 20)
	private String usuarioEditor;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_U", nullable = true)
	private Date fechaEdicion;

	@Column(name = "SUSTITUCION", nullable = true, length = 20)
	private String sustitucion;
	@Column(name = "CORREOFROM", nullable = false, length = 50)
	private String correoDestino;
	@Column(name = "OBSERVACIONES", nullable = false, length = 200)
	private String observaciones;

	@Column(name = "USUARIO", nullable = false, length = 200)
	private String usuario;
	@Column(name = "DEPENDENCIA", nullable = false, length = 200)
	private String dependencia;
	@Column(name = "DEPARTAMENTO", nullable = false, length = 200)
	private String departamento;
	@Column(name = "JEFE_INMEDIATO", nullable = false, length = 200)
	private String jefeInmediato;
	@Column(name = "NOMBRE_USUARIO", nullable = false, length = 200)
	private String nombreUsuario;

	public Resguardos() {
	}

	public Resguardos(Short idResguardo, Sistema sistema, Short anio, String folio, String enviado, String recibido,
			Date fechaEmision, Date fechaRecibido, String estatus, String usuarioCaptura, Date fechaCaptura,
			String usuarioEditor, Date fechaEdicion, String sustitucion, String correoDestino, String observaciones,
			String usuario, String dependencia, String departamento, String jefeInmediato, String nombreUsuario) {
		super();
		this.idResguardo = idResguardo;
		this.sistema = sistema;
		this.anio = anio;
		this.folio = folio;
		this.enviado = enviado;
		this.recibido = recibido;
		this.fechaEmision = fechaEmision;
		this.fechaRecibido = fechaRecibido;
		this.estatus = estatus;
		this.usuarioCaptura = usuarioCaptura;
		this.fechaCaptura = fechaCaptura;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
		this.sustitucion = sustitucion;
		this.correoDestino = correoDestino;
		this.observaciones = observaciones;
		this.usuario = usuario;
		this.dependencia = dependencia;
		this.departamento = departamento;
		this.jefeInmediato = jefeInmediato;
		this.nombreUsuario = nombreUsuario;
	}

	public Short getIdResguardo() {
		return idResguardo;
	}

	public void setIdResguardo(Short idResguardo) {
		this.idResguardo = idResguardo;
	}

	public Sistema getSistema() {
		return sistema;
	}

	public void setSistema(Sistema sistema) {
		this.sistema = sistema;
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

	public String getSustitucion() {
		return sustitucion;
	}

	public void setSustitucion(String sustitucion) {
		this.sustitucion = sustitucion;
	}

	public String getCorreoDestino() {
		return correoDestino;
	}

	public void setCorreoDestino(String correoDestino) {
		this.correoDestino = correoDestino;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
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

	public String getNombreUsuario() {
		return nombreUsuario;
	}

	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}

}
