package mx.gob.queretaro.request;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UsuarioMosereRequest implements Serializable{

	private static final long serialVersionUID = -3653191400754272092L;
	private Short id;
	@NotNull
	@NotEmpty(message = "El nombre del usuario no debe ser vacio")
	@Size(min = 4, max = 20)
	@Pattern(regexp = "^^[a-zA-z]+$", message = "Debe contener solo letras")
	private String usuario;
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
