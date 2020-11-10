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
@Getter
@Setter
public class DependenciaRequest implements Serializable {

	private static final long serialVersionUID = 5105113195556197142L;

	private Short id;

	@NotNull
	@NotEmpty(message = "El descripción de la dependencia no debe ser vacio")
	@Size(min = 4, max = 60)
	//@Pattern(regexp = "^^[a-zA-z]+$", message = "Debe contener solo letras")
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
