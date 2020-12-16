package mx.gob.queretaro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import mx.gob.queretaro.model.Resguardos;

public interface IResguardoRepository extends JpaRepository<Resguardos, Short>{

	/*
	@Query("SELECT NEW Resguardo("
			+ "r.idResguardo, "
			+ "r.anio, "
			+ "r.folio, "
			+ "r.usuario, "
			+ "r.nombreUsuario, "
			+ "r.dependencia, "
			+ "r.departamento, "
			+ "r.jefeInmediato, "
			+ "r.correo, "
			+ "r.enviado, "
			+ "r.recibido, "
			+ "r.fechaEmision, "
			+ "r.fechaRecibido, "
			+ "r.estatus, "
			+ "r.usuarioCaptura, "
			+ "r.fechaCaptura, "
			+ "r.usuarioEditor, "
			+ "r.fechaEdicion"
			+ ") "
			+ "FROM Resguardo r "
			+ "WHERE r.estatus = 'AC' "
			+ "ORDER BY r.idResguardo ASC")
	List<Resguardo> obtenerTodos();
	 */

	@Query("SELECT NEW Resguardos("
			+ "r.idResguardo, "
			+ "r.sistema, "
			+ "r.anio, "
			+ "r.folio, "
			+ "r.enviado, "
			+ "r.recibido, "
			+ "r.fechaEmision, "
			+ "r.fechaRecibido, "
			+ "r.estatus, "
			+ "r.usuarioCaptura, "
			+ "r.fechaCaptura, "
			+ "r.usuarioEditor, "
			+ "r.fechaEdicion, "
			+ "r.sustitucion, "
			+ "r.correoDestino, "
			+ "r.observaciones, "
			+ "r.usuario, "
			+ "r.dependencia, "
			+ "r.departamento, "
			+ "r.jefeInmediato, "
			+ "r.nombreUsuario"
			+ ") "
			+ "FROM Resguardos r "
			+ "WHERE r.estatus = 'AC' "
			+ "ORDER BY r.idResguardo ASC")
	List<Resguardos> obtenerTodos();


}
