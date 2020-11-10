package mx.gob.queretaro.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "RE_ETIQUETAS")
@NamedQuery(name = "Etiqueta.findAll", query = "SELECT e FROM Etiqueta e ORDER BY e.idEtiqueta ASC")
public class Etiqueta implements Serializable {

	private static final long serialVersionUID = 1994119240803959568L;
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RE_ETIQUETAS_SEQ")
	@SequenceGenerator(name = "RE_ETIQUETAS_SEQ", sequenceName = "RE_ETIQUETAS_SEQ", allocationSize = 1)
	@Column(name = "ID", unique = true, nullable = false)
	private Short idEtiqueta;

	// Enlace FK Variable
	//@JsonIgnoreProperties(value = {"variables", "hibernateLazyInitializer", "handler"}, allowSetters = true)
	@OneToMany(mappedBy = "etiqueta")
	private List<Variable> variables;

	// FK
	//@JsonIgnore
	@JsonIgnoreProperties(value = {"variables", "hibernateLazyInitializer", "handler"}, allowSetters = true)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idSistema", nullable = false)
	private Sistema sistema;

	@Column(name = "POSICION", nullable = false, length = 20)
	private String posicion;
	@Column(name = "DESCRIPCION", nullable = false, length = 2800)
	private String descripcion;
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

	public Etiqueta() {
	}

	public Etiqueta(Short idEtiqueta, String descripcion) {
		this.idEtiqueta = idEtiqueta;
		this.descripcion = descripcion;
	}


	public Etiqueta(Short idEtiqueta, Sistema sistema, String posicion, String descripcion, String estatus,
			String usuarioCaptura, Date fechaCaptura, String usuarioEditor, Date fechaEdicion) {
		this.idEtiqueta = idEtiqueta;
		this.sistema = sistema;
		this.posicion = posicion;
		this.descripcion = descripcion;
		this.estatus = estatus;
		this.usuarioCaptura = usuarioCaptura;
		this.fechaCaptura = fechaCaptura;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
	}

	//insert
	public Etiqueta(String posicion, String descripcion, String estatus, String usuarioCaptura,
			Date fechaCaptura) {
		this.posicion = posicion;
		this.descripcion = descripcion;
		this.estatus = estatus;
		this.usuarioCaptura = usuarioCaptura;
		this.fechaCaptura = fechaCaptura;
	}
	// update
	public Etiqueta(Short idEtiqueta, String posicion, String descripcion, String estatus,
			String usuarioEditor, Date fechaEdicion) {
		this.idEtiqueta = idEtiqueta;
		this.posicion = posicion;
		this.descripcion = descripcion;
		this.estatus = estatus;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
	}

	// select
	public Etiqueta(Short idEtiqueta, String posicion, String descripcion,
			String estatus, String usuarioCaptura, Date fechaCaptura, String usuarioEditor, Date fechaEdicion) {
		this.idEtiqueta = idEtiqueta;
		this.posicion = posicion;
		this.descripcion = descripcion;
		this.estatus = estatus;
		this.usuarioCaptura = usuarioCaptura;
		this.fechaCaptura = fechaCaptura;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
	}

	public Short getIdEtiqueta() {
		return idEtiqueta;
	}

	public void setIdEtiqueta(Short idEtiqueta) {
		this.idEtiqueta = idEtiqueta;
	}

	public List<Variable> getVariables() {
		return variables;
	}

	public void setVariables(List<Variable> variables) {
		this.variables = variables;
	}

	public Sistema getSistema() {
		return sistema;
	}

	public void setSistema(Sistema sistema) {
		this.sistema = sistema;
	}

	public String getPosicion() {
		return posicion;
	}

	public void setPosicion(String posicion) {
		this.posicion = posicion;
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
