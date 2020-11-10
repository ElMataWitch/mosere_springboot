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
@Table(name = "RE_DEPENDENCIA")
@NamedQuery(name = "Dependencia.findAll", query = "SELECT d FROM Dependencia d ORDER BY d.idDependencia ASC")
public class Dependencia implements Serializable {

	private static final long serialVersionUID = 8642173117275234310L;
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RE_DEPENDENCIA_SEQ")
	@SequenceGenerator(name = "RE_DEPENDENCIA_SEQ", sequenceName = "RE_DEPENDENCIA_SEQ", allocationSize = 1)
	@Column(name = "ID", unique = true, nullable = false)
	private Short idDependencia;
	@Column(name = "DESCRIPCION", nullable = false, length = 60)
	private String descripcion;
	@Column(name = "ESTATUS", nullable = false, length = 5)
	private String estatus;
	@Column(name = "USUARIO_I", nullable = false, length = 20)
	private String usuarioCaptura;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_I", nullable = false)
	private Date fechaCaptura;
	@Column(name = "USUARIO_U", nullable = false, length = 60)
	private String usuarioEditor;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_U", nullable = false)
	private Date fechaEdicion;

	public Dependencia() {
	}

	public Dependencia(Short idDependencia, String descripcion) {
		this.idDependencia = idDependencia;
		this.descripcion = descripcion;
	}

	// insert
	public Dependencia(String descripcion, String estatus, String usuarioCaptura, Date fechaCaptura) {
		this.descripcion = descripcion;
		this.estatus = estatus;
		this.usuarioCaptura = usuarioCaptura;
		this.fechaCaptura = fechaCaptura;
	}

	// update
	public Dependencia(Short idDependencia, String descripcion, String estatus, String usuarioEditor,
			Date fechaEdicion) {
		super();
		this.idDependencia = idDependencia;
		this.descripcion = descripcion;
		this.estatus = estatus;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
	}

	// select
	public Dependencia(Short idDependencia, String descripcion, String estatus, String usuarioCaptura,
			Date fechaCaptura, String usuarioEditor, Date fechaEdicion) {
		this.idDependencia = idDependencia;
		this.descripcion = descripcion;
		this.estatus = estatus;
		this.usuarioCaptura = usuarioCaptura;
		this.fechaCaptura = fechaCaptura;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
	}

	public Short getIdDependencia() {
		return idDependencia;
	}

	public void setIdDependencia(Short idDependencia) {
		this.idDependencia = idDependencia;
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

}
