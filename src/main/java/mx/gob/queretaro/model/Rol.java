package mx.gob.queretaro.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "RE_ROLES")
@NamedQuery(name = "Rol.findAll", query = "SELECT r FROM Rol r ORDER BY r.idRol ASC")
public class Rol implements Serializable {

	private static final long serialVersionUID = -2399186170779622026L;
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RE_ROLES_SEQ")
	@SequenceGenerator(name = "RE_ROLES_SEQ", sequenceName = "RE_ROLES_SEQ", allocationSize = 1)
	@Column(name = "ID", unique = true, nullable = false)
	private Short idRol;
	@Column(name = "ROL", nullable = false, length = 100)
	private String rol;
	@Column(name = "DESCRIPCION", nullable = false, length = 200)
	private String descripcion;
	@Column(name = "ESTATUS", nullable = false, length = 5)
	private String estatus;
	@Column(name = "USUARIO_I", nullable = false, length = 200)
	private String usuarioCaptura;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_I", nullable = false)
	private Date fechaCaptura;
	@Column(name = "USUARIO_U", nullable = false, length = 200)
	private String usuarioEditor;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_U", nullable = false)
	private Date fechaEdicion;

	// Enlace FK RolesSistema
	@OneToMany(mappedBy = "rol")
	private List<RolSistema> rolSistemas;

	public Rol() {

	}

	public Rol(Short idRol, String rol, String descripcion) {
		this.idRol = idRol;
		this.rol = rol;
		this.descripcion = descripcion;
	}

	public Rol(String rol) {
		this.rol = rol;
	}

	public Rol(Short idRol) {
		this.idRol = idRol;
	}

	public Rol(Short idRol, String rol) {
		this.idRol = idRol;
		this.rol = rol;
	}

	public Short getIdRol() {
		return idRol;
	}

	public void setIdRol(Short idRol) {
		this.idRol = idRol;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
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

	public List<RolSistema> getRolSistemas() {
		return rolSistemas;
	}

	public void setRolSistemas(List<RolSistema> rolSistemas) {
		this.rolSistemas = rolSistemas;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
