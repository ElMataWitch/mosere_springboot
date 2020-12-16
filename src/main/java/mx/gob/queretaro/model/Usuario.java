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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "RE_USUARIOS")
@NamedQuery(name = "Usuario.findAll", query = "SELECT u FROM Usuario u ORDER BY u.idUsuario ASC")
public class Usuario implements Serializable {

	private static final long serialVersionUID = -8553423812105574495L;
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RE_USUARIOS_SEQ")
	@SequenceGenerator(name = "RE_USUARIOS_SEQ", sequenceName = "RE_USUARIOS_SEQ", allocationSize = 1)
	@Column(name = "ID", unique = true, nullable = false)
	private Short idUsuario;
	@Column(name = "USUARIO", nullable = false, length = 20)
	private String usuario;
	@Column(name = "NOMBRE_USUARIO", nullable = false, length = 200)
	private String nombreUsuario;

	// FK
	@JsonIgnore
	// @JsonIgnoreProperties(value = { "variables", "hibernateLazyInitializer",
	// "handler" }, allowSetters = true)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "DEPENDENCIA", nullable = false)
	private Dependencia dependencia;

	@Column(name = "DEPARTAMENTO", nullable = false, length = 200)
	private String departamento;
	@Column(name = "JEFE_INMEDIATO", nullable = false, length = 200)
	private String jefeInmediato;
	@Column(name = "CORREO", nullable = false, length = 200)
	private String correo;
	@Column(name = "ESTATUS", nullable = false, length = 5)
	private String estatus;
	@Column(name = "USUARIO_I", nullable = false, length = 20)
	private String usuarioCaptura;

	@Column(name = "USUARIO_U", nullable = true, length = 20)
	private String usuarioEditor;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_U", nullable = true)
	private Date fechaEdicion;

	@Column(name = "SUSTITUCION", nullable = true)
	private Short sustitucion;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_I", nullable = false)
	private Date fechaCaptura;

	/*
	// FK enlace Resguardos
	@OneToMany(mappedBy = "usuario")
	private List<Resguardos> resguardos;
	 */

	public Usuario() {

	}

	public Usuario(Short idUsuario, String usuario, String nombreUsuario, Dependencia dependencia, String departamento,
			String jefeInmediato, String correo, String estatus, String usuarioCaptura, String usuarioEditor,
			Date fechaEdicion, Short sustitucion, Date fechaCaptura) {
		this.idUsuario = idUsuario;
		this.usuario = usuario;
		this.nombreUsuario = nombreUsuario;
		this.dependencia = dependencia;
		this.departamento = departamento;
		this.jefeInmediato = jefeInmediato;
		this.correo = correo;
		this.estatus = estatus;
		this.usuarioCaptura = usuarioCaptura;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
		this.sustitucion = sustitucion;
		this.fechaCaptura = fechaCaptura;
	}

	public Short getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Short idUsuario) {
		this.idUsuario = idUsuario;
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

	public Dependencia getDependencia() {
		return dependencia;
	}

	public void setDependencia(Dependencia dependencia) {
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

	public Short getSustitucion() {
		return sustitucion;
	}

	public void setSustitucion(Short sustitucion) {
		this.sustitucion = sustitucion;
	}

	public Date getFechaCaptura() {
		return fechaCaptura;
	}

	public void setFechaCaptura(Date fechaCaptura) {
		this.fechaCaptura = fechaCaptura;
	}


}
