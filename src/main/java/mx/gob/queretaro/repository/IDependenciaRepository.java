package mx.gob.queretaro.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mx.gob.queretaro.model.Dependencia;

public interface IDependenciaRepository extends JpaRepository<Dependencia, Short>{

	@Query("SELECT NEW Dependencia("
			+ "d.idDependencia, "
			+ "d.descripcion,"
			+ "d.estatus,"
			+ "d.usuarioCaptura,"
			+ "d.fechaCaptura,"
			+ "d.usuarioEditor, "
			+ "d.fechaEdicion"
			+ ") "
			+ "FROM Dependencia d "
			+ "WHERE d.estatus = 'AC' "
			+ "ORDER BY d.idDependencia ASC")
	List<Dependencia> obtenerTodos();

	@Query("SELECT NEW Dependencia(d.idDependencia, d.descripcion) "
			+ "FROM Dependencia d "
			+ "WHERE d.idDependencia = :id ")
	Dependencia obtenerPorId(@Param("id") Short id);

	@Modifying
	@Query("UPDATE Dependencia d SET "
			+ "d.descripcion = :descripcion, "
			+ "d.estatus = :estatus, "
			+ "d.usuarioEditor = :usuarioEditor, "
			+ "d.fechaEdicion = :fechaEdicion "
			+ "WHERE d.idDependencia = :id")
	Integer actualizarDependencia(
			@Param("descripcion") String descripcion,
			@Param("estatus") String estatus,
			@Param("usuarioEditor") String usuarioEditor,
			@Param("fechaEdicion") Date fechaEdicion,
			@Param("id") Short id
			);
}
