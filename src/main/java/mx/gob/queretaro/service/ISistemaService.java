package mx.gob.queretaro.service;

import java.util.List;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.Sistema;
import mx.gob.queretaro.request.SistemaRequest;

public interface ISistemaService {

	List<Sistema> obtenerSistemas() throws InternalException;

	List<Sistema> obtenerIdNombre() throws InternalException;

	Sistema obtenerPorId(Short id) throws InternalException;

	Sistema guardarSistema(SistemaRequest sistemaRequest) throws InternalException;

	Sistema actualizarSistema(SistemaRequest sistemaRequest) throws InternalException;

}
