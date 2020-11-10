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
@Table(name = "RE_USUARIOS_MOSERE")
@NamedQuery(name = "UsuarioMosere.findAll", query = "SELECT u FROM UsuarioMosere u ORDER BY u.idUsuarioMosere ASC")
public class UsuarioMosere implements Serializable {

	private static final long serialVersionUID = 3111481588546670912L;
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RE_USUARIOS_SEQ")
	@SequenceGenerator(name = "RE_USUARIOS_SEQ", sequenceName = "RE_USUARIOS_SEQ", allocationSize = 1)
	@Column(name = "ID", unique = true, nullable = false)
	private Short idUsuarioMosere;
	@Column(name = "USUARIO", nullable = false, length = 20)
	private String usuario;
	@Column(name = "ESTATUS", nullable = false, length = 2)
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

	public UsuarioMosere() {
	}

	public UsuarioMosere(Short idUsuarioMosere, String usuario) {
		this.idUsuarioMosere = idUsuarioMosere;
		this.usuario = usuario;
	}

	// update
	public UsuarioMosere(Short idUsuarioMosere, String usuario, String estatus, String usuarioEditor,
			Date fechaEdicion) {
		super();
		this.idUsuarioMosere = idUsuarioMosere;
		this.usuario = usuario;
		this.estatus = estatus;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
	}

	// registro & consulta
	public UsuarioMosere(Short idUsuarioMosere, String usuario, String estatus, String usuarioCaptura,
			Date fechaCaptura, String usuarioEditor, Date fechaEdicion) {
		this.idUsuarioMosere = idUsuarioMosere;
		this.usuario = usuario;
		this.estatus = estatus;
		this.usuarioCaptura = usuarioCaptura;
		this.fechaCaptura = fechaCaptura;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
	}

	public Short getIdUsuarioMosere() {
		return idUsuarioMosere;
	}

	public void setIdUsuarioMosere(Short idUsuarioMosere) {
		this.idUsuarioMosere = idUsuarioMosere;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
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
