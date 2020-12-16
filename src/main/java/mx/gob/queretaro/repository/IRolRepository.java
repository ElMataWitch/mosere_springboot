package mx.gob.queretaro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mx.gob.queretaro.model.Rol;

public interface IRolRepository extends JpaRepository<Rol, Short>{

	@Query("SELECT NEW Rol(r.idRol, r.rol) "
			+ "FROM Rol r "
			+ "WHERE r.estatus = 'AC'"
			+ "ORDER BY r.idRol ASC")
	List<Rol> obtenerTodos();

	@Query("SELECT NEW Rol(r.idRol, r.rol, r.descripcion) "
			+ "FROM Rol r "
			+ "WHERE r.idRol = :id ")
	Rol obtenerRolPorId(@Param("id") Short id);

	@Modifying
	@Query("Delete FROM Rol r WHERE r.idRol = :id")
	Integer eliminarRol(@Param("id") Short id);
}
