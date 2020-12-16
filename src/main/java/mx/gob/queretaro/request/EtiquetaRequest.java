package mx.gob.queretaro.request;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class EtiquetaRequest implements Serializable{

	private static final long serialVersionUID = -8637679027280997744L;

	private short id;
	@NotNull
	private short idSistema;
	@NotNull
	private String posicion;
	@NotNull
	@NotEmpty(message = "no debe ser vacio")
	@Size(min = 4, max = 4000)
	private String descripcion;
	@NotNull
	private String estatus;
	@NotNull
	private String usuarioCaptura;
	@DateTimeFormat(pattern = "yyyy-mm-dd")
	private Date fechaCaptura;
	private String usuarioEditor;
	@DateTimeFormat(pattern = "yyyy-mm-dd")
	private Date fechaEdicion;

}
