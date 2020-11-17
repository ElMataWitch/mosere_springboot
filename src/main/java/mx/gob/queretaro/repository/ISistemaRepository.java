package mx.gob.queretaro.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mx.gob.queretaro.model.Sistema;

public interface ISistemaRepository extends JpaRepository<Sistema, Short> {
	@Query("SELECT NEW Sistema(s.idSistema, s.nombre) "
			+ "FROM Sistema s "
			+ "WHERE s.idSistema = :id")
	Sistema obtenerPorId(@Param("id") Short id);

	@Query("SELECT NEW Sistema(s.idSistema, s.nombre) "
			+ "FROM Sistema s "
			+ "ORDER BY s.idSistema ASC")
	List<Sistema> obtenerIdNombre();

	@Modifying
	@Query("UPDATE Sistema s SET "
			+ "s.nombre = :nombre, "
			+ "s.enviaCorreo = :enviaCorreo, "
			+ "s.estatus = :estatus, "
			+ "s.usuarioEditor = :usuarioEditor, "
			+ "s.fechaEdicion = :fechaEdicion, "
			+ "s.descripcion = :descripcion "
			+ "WHERE s.idSistema = :id")
	Integer actualizarSistema(
			@Param("nombre") String nombre,
			@Param("enviaCorreo") String enviaCorreo,
			@Param("estatus") String estatus,
			@Param("usuarioEditor") String usuarioEditor,
			@Param("fechaEdicion") Date fechaEdicion,
			@Param("descripcion") String descripcion,
			@Param("id") Short id
			);
}
