package mx.gob.queretaro.service;

import java.util.List;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.RolSistema;
import mx.gob.queretaro.request.RolSistemaRequest;

public interface IRolSistemaService {
	List<RolSistema> obtenerRolSistemas() throws InternalException;

	List<RolSistema> obtenerRolesPorSistema(Short idSistema) throws InternalException;

	RolSistema guardarRolSistema(RolSistemaRequest rolSistemaRequest) throws InternalException;

	RolSistema actualizarRolSistema(RolSistemaRequest rolSistemaRequest) throws InternalException;

}
