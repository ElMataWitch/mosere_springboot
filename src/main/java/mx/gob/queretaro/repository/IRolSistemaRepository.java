package mx.gob.queretaro.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mx.gob.queretaro.model.Rol;
import mx.gob.queretaro.model.RolSistema;
import mx.gob.queretaro.model.Sistema;

public interface IRolSistemaRepository extends JpaRepository<RolSistema, Short>{

	@Query("SELECT NEW RolSistema(r.rol) "
			+ "FROM RolSistema r "
			+ "INNER JOIN r.rol ro ON ro.idRol = r.rol "
			+ "WHERE r.sistema = :sistema "
			+ "AND r.estatus = 'AC' "
			+ "ORDER BY ro.idRol ASC")
	List<RolSistema> obtenerRolesPorSistema(@Param("sistema") Sistema sistema);


	@Query("SELECT NEW RolSistema(r.idRolSistema, r.rol, "
			+ "r.sistema, r.estatus, "
			+ "r.usuarioCaptura, r.fechaCaptura, "
			+ "r.usuarioEditor, r.fechaEdicion) "
			+ "FROM RolSistema r "
			+ "WHERE r.estatus = 'AC' "
			+ "ORDER BY r.idRolSistema ASC")
	List<RolSistema> obtenerTodos();

	@Modifying
	@Query("UPDATE RolSistema r SET "
			+ "r.rol = :rol, "
			+ "r.sistema = :sistema, "
			+ "r.estatus = :estatus, "
			+ "r.usuarioEditor = :usuarioEditor, "
			+ "r.fechaEdicion = :fechaEdicion "
			+ "WHERE r.idRolSistema = :id")
	Integer actualizarRolSistema(
			@Param("rol") Rol rol,
			@Param("sistema") Sistema sistema,
			@Param("estatus") String estatus,
			@Param("usuarioEditor") String usuarioEditor,
			@Param("fechaEdicion") Date fechaEdicion,
			@Param("id") Short id
			);
}
