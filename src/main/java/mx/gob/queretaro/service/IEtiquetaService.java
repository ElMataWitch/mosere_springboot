package mx.gob.queretaro.service;

import java.util.List;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.Etiqueta;
import mx.gob.queretaro.request.EtiquetaRequest;

public interface IEtiquetaService {

	List<Etiqueta> obtenerEtiquetas() throws InternalException;

	List<String> obtenerPosicionesEtiquetas() throws InternalException;

	Etiqueta obtenerPorId(Short id) throws InternalException;

	Etiqueta guardarEtiqueta(EtiquetaRequest etiquetaRequest) throws InternalException;

	Etiqueta actualizarEtiqueta(EtiquetaRequest etiquetaRequest) throws InternalException;
}
