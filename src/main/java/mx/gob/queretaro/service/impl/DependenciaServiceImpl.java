package mx.gob.queretaro.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.Dependencia;
import mx.gob.queretaro.repository.IDependenciaRepository;
import mx.gob.queretaro.request.DependenciaRequest;
import mx.gob.queretaro.service.IDependenciaService;

@Service
@Transactional
@Slf4j
public class DependenciaServiceImpl implements IDependenciaService {

	private final IDependenciaRepository dependenciaRepository;

	@Autowired
	public DependenciaServiceImpl(IDependenciaRepository dependenciaRepository) {
		this.dependenciaRepository = dependenciaRepository;
	}

	@Override
	public List<Dependencia> obtenerSistemas() throws InternalException {
		try {
			return dependenciaRepository.findAll();
		} catch (Exception ex) {
			log.error("Ocurrio un eror al obtener las dependencias", ex);
			throw new InternalException("Ocurrio un eror al obtener las dependencias");
		}
	}

	@Override
	public Dependencia obtenerPorId(Short id) throws InternalException {
		if (null != id) {
			try {
				return dependenciaRepository.obtenerPorId(id);
			} catch (Exception ex) {
				log.error(String.format("Ocurrio un error al obtener la dependencia con el id : %d", id), ex);
				throw new InternalException(String.format("Ocurrio un error al obtener la dependencia con el id : %d", id));
			}
		} else {
			throw new InternalException("El id de la dependencia no debe ser nulo o vacio.");
		}
	}

	@Override
	public Dependencia guardarDependencia(DependenciaRequest dependenciaRequest) throws InternalException {
		if (null != dependenciaRequest && null != dependenciaRequest.getDescripcion()
				&& !dependenciaRequest.getDescripcion().trim().isEmpty()) {
			try {
				Dependencia dependencia = new Dependencia();
				dependencia.setDescripcion(dependenciaRequest.getDescripcion());
				dependencia.setEstatus(dependenciaRequest.getEstatus());
				dependencia.setUsuarioCaptura(dependenciaRequest.getUsuarioCaptura());
				dependencia.setFechaCaptura(new Date());
				// dependencia.setUsuarioEditor(usuarioEditor);
				// dependencia.setFechaEdicion(fechaEdicion);

				return dependenciaRepository.save(dependencia);

			} catch (Exception ex) {
				log.error("Ocurrio un error al guardar la dependencia", ex);
				throw new InternalException("Ocurrio un error al guardar la depenedencia");
			}
		} else {
			throw new InternalException("La descripción del sistema y demas campos no debe ser nulos o vacios");
		}
	}

	@Override
	public Dependencia actualizarDependencia(DependenciaRequest dependenciaRequest) throws InternalException {
		if(null != dependenciaRequest && null != dependenciaRequest.getDescripcion() && !dependenciaRequest.getDescripcion().trim().isEmpty()) {
			try {
				dependenciaRepository.actualizarDependencia(
						dependenciaRequest.getDescripcion(),
						dependenciaRequest.getEstatus(),
						dependenciaRequest.getUsuarioEditor(),
						new Date(),
						dependenciaRequest.getId());

				return dependenciaRepository.findById(dependenciaRequest.getId()).orElse(null);
			} catch (Exception ex) {
				log.error("Ocurrio un error al actualizar la dependencia", ex);
				throw new InternalException("Ocurrio un error al actualizar la dependencia");
			}
		}else {
			throw new InternalException("La descripción de la dependencia y demas campos no debe ser nulos o vacios");
		}
	}

}
