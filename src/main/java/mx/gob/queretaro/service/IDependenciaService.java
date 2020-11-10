package mx.gob.queretaro.service;

import java.util.List;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.Dependencia;
import mx.gob.queretaro.request.DependenciaRequest;

public interface IDependenciaService {

	List<Dependencia> obtenerSistemas() throws InternalException;

	Dependencia obtenerPorId(Short id) throws InternalException;

	Dependencia guardarDependencia(DependenciaRequest dependenciaRequest) throws InternalException;

	Dependencia actualizarDependencia(DependenciaRequest dependenciaRequest) throws InternalException;

}
