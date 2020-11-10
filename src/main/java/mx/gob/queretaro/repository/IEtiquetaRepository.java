package mx.gob.queretaro.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mx.gob.queretaro.model.Etiqueta;
import mx.gob.queretaro.model.Sistema;

public interface IEtiquetaRepository extends JpaRepository<Etiqueta,Short>{

	@Query("SELECT NEW Etiqueta(e.idEtiqueta, e.sistema, "
			+ "e.posicion, e.descripcion, "
			+ "e.estatus, e.usuarioCaptura, "
			+ "e.fechaCaptura, e.usuarioEditor, "
			+ "e.fechaEdicion) "
			+ "FROM Etiqueta e "
			+ "WHERE e.idEtiqueta = :id")
	Etiqueta obtenerPorId(@Param("id") Short id);

	@Query("SELECT NEW Etiqueta(e.idEtiqueta, e.sistema, "
			+ "e.posicion, e.descripcion, "
			+ "e.estatus, e.usuarioCaptura, "
			+ "e.fechaCaptura, e.usuarioEditor, "
			+ "e.fechaEdicion) "
			+ "FROM Etiqueta e "
			+ "ORDER BY e.idEtiqueta ASC")
	List<Etiqueta> obtenerTodos();

	@Query("SELECT DISTINCT(e.posicion) "
			+ "FROM Etiqueta e "
			+ "order by e.posicion")
	List<String> obtenerPosicionEtiqueta();

	@Modifying
	@Query("UPDATE Etiqueta e SET "
			+ "e.sistema = :sistema, "
			+ "e.estatus = :estatus, "
			+ "e.posicion = :posicion, "
			+ "e.descripcion = :descripcion, "
			+ "e.usuarioEditor = :usuarioEditor, "
			+ "e.fechaEdicion = :fechaEdicion "
			+ "WHERE e.idEtiqueta = :id")
	Integer actualizarEtiqueta(
			@Param("sistema") Sistema sistema,
			@Param("estatus") String estatus,
			@Param("posicion") String posicion,
			@Param("descripcion") String descripcion,
			@Param("usuarioEditor") String usuarioEditor,
			@Param("fechaEdicion") Date fechaEdicion,
			@Param("id") Short id
			);
}
