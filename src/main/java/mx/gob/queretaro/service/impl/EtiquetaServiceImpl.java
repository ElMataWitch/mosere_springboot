package mx.gob.queretaro.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.Etiqueta;
import mx.gob.queretaro.model.Sistema;
import mx.gob.queretaro.repository.IEtiquetaRepository;
import mx.gob.queretaro.request.EtiquetaRequest;
import mx.gob.queretaro.service.IEtiquetaService;

@Service
@Transactional
@Slf4j
public class EtiquetaServiceImpl implements IEtiquetaService{

	public final IEtiquetaRepository etiquetaRepository;

	@Autowired
	public EtiquetaServiceImpl(IEtiquetaRepository etiquetaRepository) {
		this.etiquetaRepository = etiquetaRepository;
	}

	@Override
	public List<Etiqueta> obtenerEtiquetas() throws InternalException {
		try {
			return etiquetaRepository.obtenerTodos();
		} catch (Exception ex) {
			log.error("Ocurrio un eror al obtener las etiquetas", ex);
			throw new InternalException("Ocurrio un eror al obtener las etiquetas");
		}
	}

	@Override
	public List<String> obtenerPosicionesEtiquetas() throws InternalException {
		try {
			return etiquetaRepository.obtenerPosicionEtiqueta();
		} catch (Exception ex) {
			log.error("Ocurrio un eror al obtener la posicion de las etiquetas", ex);
			throw new InternalException("Ocurrio un eror al obtener la posicion de las etiquetas");
		}
	}

	@Override
	public Etiqueta obtenerPorId(Short id) throws InternalException {
		if (null != id) {
			try {
				return etiquetaRepository.obtenerPorId(id);
			} catch (Exception ex) {
				log.error(String.format("Ocurrio un error al obtener la etiqueta con el id : %d", id), ex);
				throw new InternalException(String.format("Ocurrio un error al obtener la etiqueta con el id : %d", id));
			}
		} else {
			throw new InternalException("El id de la dependencia no debe ser nulo o vacio.");
		}
	}

	@Override
	public Etiqueta guardarEtiqueta(EtiquetaRequest etiquetaRequest) throws InternalException {
		if(null != etiquetaRequest && null != etiquetaRequest.getDescripcion() && !etiquetaRequest.getDescripcion().trim().isEmpty()) {
			try {
				Etiqueta etiqueta = new Etiqueta();
				etiqueta.setSistema(new Sistema(etiquetaRequest.getIdSistema()));
				etiqueta.setPosicion(etiquetaRequest.getPosicion());
				etiqueta.setDescripcion(etiquetaRequest.getDescripcion());
				etiqueta.setEstatus(etiquetaRequest.getEstatus());
				etiqueta.setUsuarioCaptura(etiquetaRequest.getUsuarioCaptura());
				etiqueta.setFechaCaptura(new Date());

				return etiquetaRepository.save(etiqueta);
			} catch (Exception ex) {
				log.error("Ocurrio un error al guardar la etiqueta", ex);
				throw new InternalException("Ocurrio un error al guardar la etiqueta");
			}
		}else {
			throw new InternalException("La descripción de la etiqueta y demas campos no debe ser nulos o vacios");
		}
	}

	@Override
	public Etiqueta actualizarEtiqueta(EtiquetaRequest etiquetaRequest) throws InternalException {
		if(null != etiquetaRequest && null != etiquetaRequest.getDescripcion() && !etiquetaRequest.getDescripcion().trim().isEmpty()) {
			try {
				etiquetaRepository.actualizarEtiqueta(
						new Sistema(etiquetaRequest.getIdSistema()),
						etiquetaRequest.getEstatus(),
						etiquetaRequest.getPosicion(),
						etiquetaRequest.getDescripcion(),
						etiquetaRequest.getUsuarioEditor(),
						new Date(),
						etiquetaRequest.getId());

				return etiquetaRepository.findById(etiquetaRequest.getId()).orElse(null);
			} catch (Exception ex) {
				log.error("Ocurrio un error al actualizar la etiqueta", ex);
				throw new InternalException("Ocurrio un error al actualizar la etiqueta");
			}
		}else {
			throw new InternalException("La descripción de la etiqueta y demas campos no debe ser nulos o vacios");
		}
	}



}
