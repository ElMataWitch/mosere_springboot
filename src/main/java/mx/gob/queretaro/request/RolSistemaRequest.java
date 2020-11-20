package mx.gob.queretaro.request;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RolSistemaRequest implements Serializable{

	private static final long serialVersionUID = -8552727287501141867L;
	private Short id;
	@NotNull
	private Short idRol;
	@NotNull
	private Short idSistema;
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
