package mx.gob.queretaro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import mx.gob.queretaro.model.Rol;

public interface IRolRepository extends JpaRepository<Rol, Short>{

	@Query("SELECT NEW Rol(r.idRol, r.rol) "
			+ "FROM Rol r "
			+ "ORDER BY r.idRol ASC")
	List<Rol> obtenerTodos();

}
