package mx.gob.queretaro.service;

import java.util.List;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.UsuarioMosere;
import mx.gob.queretaro.request.UsuarioMosereRequest;

public interface IUsuarioMosereService {

	List<UsuarioMosere> obtenerUsuarios() throws InternalException;

	UsuarioMosere obtenerPorId(Short id) throws InternalException;

	UsuarioMosere guardarUsuario(UsuarioMosereRequest usuarioMosereRequest) throws InternalException;

	UsuarioMosere actualizarUsuarioMosere(UsuarioMosereRequest usuarioMosereRequest) throws InternalException;

}
