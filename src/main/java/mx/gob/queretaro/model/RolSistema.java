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
@Table(name = "RE_ROLES_SISTEMA")
@NamedQuery(name = "RolSistema.findAll", query = "SELECT r FROM RolSistema r ORDER BY r.idRolSistema ASC")
public class RolSistema implements Serializable {

	private static final long serialVersionUID = -7579279082335112724L;
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RE_ROLESISTEMA_SEQ")
	@SequenceGenerator(name = "RE_ROLESISTEMA_SEQ", sequenceName = "RE_ROLESISTEMA_SEQ", allocationSize = 1)
	@Column(name = "ID", unique = true, nullable = false)
	private Short idRolSistema;

	// foranea sistema y rol

	// @JsonIgnore
	@JsonIgnoreProperties(value = { "rolSistemas", "hibernateLazyInitializer", "handler" }, allowSetters = true)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idRol", nullable = false)
	private Rol rol;

	// @JsonIgnore
	@JsonIgnoreProperties(value = { "rolSistemas", "hibernateLazyInitializer", "handler" }, allowSetters = true)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idSistema", nullable = false)
	private Sistema sistema;

	@Column(name = "ESTATUS", nullable = false, length = 5)
	private String estatus;
	@Column(name = "USUARIO_I", nullable = false, length = 200)
	private String usuarioCaptura;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_I", nullable = false)
	private Date fechaCaptura;
	@Column(name = "USUARIO_U", nullable = true, length = 200)
	private String usuarioEditor;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_U", nullable = true)
	private Date fechaEdicion;

	public RolSistema() {
	}

	public RolSistema(Rol rol) {

		this.rol = rol;
	}

	public RolSistema(Short idRolSistema, String estatus, String usuarioCaptura, Date fechaCaptura,
			String usuarioEditor, Date fechaEdicion) {
		this.idRolSistema = idRolSistema;
		this.estatus = estatus;
		this.usuarioCaptura = usuarioCaptura;
		this.fechaCaptura = fechaCaptura;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
	}

	public RolSistema(Short idRolSistema, Rol rol, Sistema sistema, String estatus, String usuarioCaptura,
			Date fechaCaptura, String usuarioEditor, Date fechaEdicion) {
		this.idRolSistema = idRolSistema;
		this.rol = rol;
		this.sistema = sistema;
		this.estatus = estatus;
		this.usuarioCaptura = usuarioCaptura;
		this.fechaCaptura = fechaCaptura;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
	}

	public Short getIdRolSistema() {
		return idRolSistema;
	}

	public void setIdRolSistema(Short idRolSistema) {
		this.idRolSistema = idRolSistema;
	}

	public Rol getRol() {
		return rol;
	}

	public void setRol(Rol rol) {
		this.rol = rol;
	}

	public Sistema getSistema() {
		return sistema;
	}

	public void setSistema(Sistema sistema) {
		this.sistema = sistema;
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
