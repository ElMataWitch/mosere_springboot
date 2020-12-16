package mx.gob.queretaro.service;

import java.util.List;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.Resguardos;
import mx.gob.queretaro.request.ResguardoRequest;

public interface IResguardoService {
	List<Resguardos> obtenerResguardos() throws InternalException;


	Resguardos guardarResguardo(ResguardoRequest resguardoRequest) throws InternalException;

}
