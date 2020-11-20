package mx.gob.queretaro.service;

import java.util.List;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.Rol;

public interface IRolService {
	List<Rol> obtenerRoles() throws InternalException;
}
