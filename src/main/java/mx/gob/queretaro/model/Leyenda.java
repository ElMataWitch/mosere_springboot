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
@Table(name = "RE_LEYENDAS")
@NamedQuery(name = "Leyenda.findAll", query = "SELECT l FROM Leyenda l ORDER BY l.idLeyenda ASC")
public class Leyenda implements Serializable {

	private static final long serialVersionUID = -875007248328618142L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RE_LEYENDAS_SEQ")
	@SequenceGenerator(name = "RE_LEYENDAS_SEQ", sequenceName = "RE_LEYENDAS_SEQ", allocationSize = 1)
	@Column(name = "ID", unique = true, nullable = false)
	private Short idLeyenda;
	@Column(name = "DESCRIPCION", nullable = false, length = 1000)
	private String Descripcion;
	@Column(name = "ESTATUS", nullable = false, length = 5)
	private String estatus;
	@Column(name = "USUARIO_I", nullable = false, length = 1000)
	private String usuarioCaptura;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_I", nullable = false)
	private Date fechaCaptura;
	@Column(name = "USUARIO_U", nullable = false, length = 1000)
	private String usuarioEditor;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "FECHA_U", nullable = false)
	private Date fechaEdicion;

	public Leyenda() {
	}


	//Select
	public Leyenda(Short idLeyenda, String descripcion, String estatus, String usuarioCaptura, Date fechaCaptura,
			String usuarioEditor, Date fechaEdicion) {
		this.idLeyenda = idLeyenda;
		Descripcion = descripcion;
		this.estatus = estatus;
		this.usuarioCaptura = usuarioCaptura;
		this.fechaCaptura = fechaCaptura;
		this.usuarioEditor = usuarioEditor;
		this.fechaEdicion = fechaEdicion;
	}



	public Short getIdLeyenda() {
		return idLeyenda;
	}

	public void setIdLeyenda(Short idLeyenda) {
		this.idLeyenda = idLeyenda;
	}

	public String getDescripcion() {
		return Descripcion;
	}

	public void setDescripcion(String descripcion) {
		Descripcion = descripcion;
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
