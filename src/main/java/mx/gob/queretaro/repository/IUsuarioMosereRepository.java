package mx.gob.queretaro.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mx.gob.queretaro.model.UsuarioMosere;

public interface IUsuarioMosereRepository extends JpaRepository<UsuarioMosere, Short>{

	@Query("SELECT NEW UsuarioMosere(u.idUsuarioMosere, u.usuario) "
			+ "FROM UsuarioMosere u "
			+ "WHERE u.idUsuarioMosere = :id")
	UsuarioMosere obtenerPorId(@Param("id") Short id);

	@Modifying
	@Query("UPDATE UsuarioMosere u SET "
			+ "u.usuario = :usuario, "
			+ "u.estatus = :estatus, "
			+ "u.usuarioEditor = :usuarioEditor, "
			+ "u.fechaEdicion = :fechaEdicion "
			+ "WHERE u.idUsuarioMosere = :id")
	Integer actualizarUsuarioMosere(
			@Param("usuario") String usuario,
			@Param("estatus") String estatus,
			@Param("usuarioEditor") String usuarioEditor,
			@Param("fechaEdicion") Date fechaEdicion,
			@Param("id") Short id
			);
}
