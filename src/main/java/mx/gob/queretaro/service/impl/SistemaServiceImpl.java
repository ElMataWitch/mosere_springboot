package mx.gob.queretaro.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.Sistema;
import mx.gob.queretaro.repository.ISistemaRepository;
import mx.gob.queretaro.request.SistemaRequest;
import mx.gob.queretaro.service.ISistemaService;

@Service
@Transactional
@Slf4j
public class SistemaServiceImpl implements ISistemaService {

	private final ISistemaRepository sistemaRepository;

	@Autowired
	public SistemaServiceImpl(ISistemaRepository sistemaRepository) {
		this.sistemaRepository = sistemaRepository;
	}

	@Override
	public List<Sistema> obtenerSistemas() throws InternalException {
		try {
			return sistemaRepository.findAll();
		} catch (Exception ex) {
			log.error("Ocurrio un eror al obtener los sistemas", ex);
			throw new InternalException("Ocurrio un eror al obtener los sistemas");
		}
	}

	@Override
	public List<Sistema> obtenerIdNombre() throws InternalException {
		try {
			return sistemaRepository.obtenerIdNombre();
		} catch (Exception ex) {
			log.error("Ocurrio un eror al obtener los sistemas", ex);
			throw new InternalException("Ocurrio un eror al obtener los sistemas");
		}
	}

	@Override
	public Sistema obtenerPorId(Short id) throws InternalException {
		if (null != id) {
			try {
				return sistemaRepository.obtenerPorId(id);
			} catch (Exception ex) {
				log.error(String.format("Ocurrio un error al obtener el Sistema con el id : %d", id), ex);
				throw new InternalException(String.format("Ocurrio un error al obtener el Sistema con el id : %d", id));
			}
		} else {
			throw new InternalException("El id del Sistema no debe ser nulos o vacios");
		}
	}

	@Override
	public Sistema guardarSistema(SistemaRequest sistemaRequest) throws InternalException {
		if (null != sistemaRequest && null != sistemaRequest.getNombre()
				&& !sistemaRequest.getNombre().trim().isEmpty()) {
			try {
				Sistema sistema = new Sistema();
				sistema.setNombre(sistemaRequest.getNombre().trim());
				sistema.setEnviaCorreo(sistemaRequest.getEnviaCorreo());
				sistema.setEstatus(sistemaRequest.getEstatus());
				sistema.setUsuarioCaptura(sistemaRequest.getUsuarioCaptura());
				sistema.setFechaCaptura(new Date());
				// sistema.setUsuarioEditor(usuarioEditor);
				// sistema.setFechaEdicion(fechaEdicion);
				sistema.setDescripcion(sistemaRequest.getDescripcion());

				return sistemaRepository.save(sistema);

			} catch (Exception ex) {
				log.error("Ocurrio un error al guardar el Sistema", ex);
				throw new InternalException("Ocurrio un error al guardar el Sistema");
			}
		} else {
			throw new InternalException("El nombre del Sistema y demas campos no debe ser nulos o vacios");
		}
	}

	@Override
	public Sistema actualizarSistema(SistemaRequest sistemaRequest) throws InternalException {
		if(null != sistemaRequest && null != sistemaRequest.getNombre() && !sistemaRequest.getNombre().trim().isEmpty()) {
			try {
				sistemaRepository.actualizarSistema(
						sistemaRequest.getNombre(),
						sistemaRequest.getEnviaCorreo(),
						sistemaRequest.getEstatus(),
						sistemaRequest.getUsuarioEditor(),
						new Date(),
						sistemaRequest.getDescripcion(),
						sistemaRequest.getId());

				return sistemaRepository.findById(sistemaRequest.getId()).orElse(null);
			} catch (Exception ex) {
				log.error("Ocurrio un error al actualizar el Sistema", ex);
				throw new InternalException("Ocurrio un error al actualizar el Sistema");
			}
		}else {
			throw new InternalException("El nombre del Sistema y demas campos no debe ser nulos o vacios");
		}
	}



}
