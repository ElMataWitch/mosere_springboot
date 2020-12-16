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
@Table(name = "RE_SISTEMAS")
@NamedQuery(name = "Sistema.findAll", query = "SELECT s FROM Sistema s ORDER BY s.idSistema ASC")
public class Sistema implements Serializable {

	private static final long serialVersionUID = 315135644772810843L;
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RE_SISTEMAS_SEQ")
	@SequenceGenerator(name = "RE_SISTEMAS_SEQ", sequenceName = "RE_SISTEMAS_SEQ", allocationSize = 1)
	@Column(name = "ID", unique = true, nullable = false)
	private Short idSistema;
	@Column(name = "NOMBRE", nullable = false, length = 200)
	private String nombre;
	@Column(name = "ENVIA_CORREO", nullable = false, length = 20)
	private String enviaCorreo;
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
	@Column(name = "DESCRIPCION", nullable = true, length = 100)
	private String descripcion;

	// Enlace FK Etiqueta
	@OneToMany(mappedBy = "sistema")
	private List<Etiqueta> etiquetas;

	// Enlace FK RolesSistema
	@OneToMany(mappedBy="sistema")
	private List<RolSistema> rolSistemas;

	// Enlace FK Resguardos
	@OneToMany(mappedBy = "sistema")
	private List<Resguardos> resguardos;

	public Sistema() {
	}

	public Sistema(Short idSistema) {
		this.idSistema = idSistema;
	}

	// findbyId
	public Sistema(Short idSistema, String nombre) {
		this.idSistema = idSistema;
		this.nombre = nombre;
	}

	// update
	public Sistema(Short idSistema, String nombre, String enviaCorreo, String estatus, String usuarioEditor,
			Date fechaEdicion, String descripcion) {
		this.idSistema = idSistema;
		this.nombre = nombre;
		this.enviaCorreo = enviaCorreo;
		this.estatus = estatus;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
		this.descripcion = descripcion;
	}

	// insert
	public Sistema(String nombre, String enviaCorreo, String estatus, String usuarioCaptura, Date fechaCaptura) {
		this.nombre = nombre;
		this.enviaCorreo = enviaCorreo;
		this.estatus = estatus;
		this.usuarioCaptura = usuarioCaptura;
		this.fechaCaptura = fechaCaptura;
	}

	public Sistema(Short idSistema, String nombre, String enviaCorreo, String estatus, String usuarioCaptura,
			Date fechaCaptura, String usuarioEditor, Date fechaEdicion, String descripcion) {
		this.idSistema = idSistema;
		this.nombre = nombre;
		this.enviaCorreo = enviaCorreo;
		this.estatus = estatus;
		this.usuarioCaptura = usuarioCaptura;
		this.fechaCaptura = fechaCaptura;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
		this.descripcion = descripcion;
	}

	public Short getIdSistema() {
		return idSistema;
	}

	public void setIdSistema(Short idSistema) {
		this.idSistema = idSistema;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getEnviaCorreo() {
		return enviaCorreo;
	}

	public void setEnviaCorreo(String enviaCorreo) {
		this.enviaCorreo = enviaCorreo;
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

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}


}
