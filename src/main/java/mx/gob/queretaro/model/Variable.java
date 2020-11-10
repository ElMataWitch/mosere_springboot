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
@Table(name = "RE_VARIABLES")
@NamedQuery(name = "Variable.findAll", query = "SELECT v FROM Variable v ORDER BY v.idVariable ASC")
public class Variable implements Serializable {

	private static final long serialVersionUID = -2603148727942333142L;
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RE_VARIABLES_SEQ")
	@SequenceGenerator(name = "RE_VARIABLES_SEQ", sequenceName = "RE_VARIABLES_SEQ", allocationSize = 1)
	@Column(name = "ID", unique = true, nullable = false)
	private Short idVariable;
	@Column(name = "NOMBRE", nullable = false, length = 50)
	private String nombre;
	@Column(name = "DESCRIPCION", nullable = false, length = 250)
	private String descripcion;

	// FK
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idEtiqueta", nullable = false)
	private Etiqueta etiqueta;

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

	public Variable() {
	}

	public Variable(Short idVariable, String nombre, String descripcion, Etiqueta etiqueta, String estatus,
			String usuarioCaptura, Date fechaCaptura, String usuarioEditor, Date fechaEdicion) {
		this.idVariable = idVariable;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.etiqueta = etiqueta;
		this.estatus = estatus;
		this.usuarioCaptura = usuarioCaptura;
		this.fechaCaptura = fechaCaptura;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
	}


	public Short getIdVariable() {
		return idVariable;
	}

	public void setIdVariable(Short idVariable) {
		this.idVariable = idVariable;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Etiqueta getEtiqueta() {
		return etiqueta;
	}

	public void setEtiqueta(Etiqueta etiqueta) {
		this.etiqueta = etiqueta;
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
