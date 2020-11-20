package mx.gob.queretaro.service.impl;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.Rol;
import mx.gob.queretaro.model.RolSistema;
import mx.gob.queretaro.model.Sistema;
import mx.gob.queretaro.repository.IRolSistemaRepository;
import mx.gob.queretaro.request.RolSistemaRequest;
import mx.gob.queretaro.service.IRolSistemaService;

@Service
@Transactional
@Slf4j
public class RolSistemaServiceImpl  implements IRolSistemaService{

	private final IRolSistemaRepository rolSistemaRepository;

	@Autowired
	public RolSistemaServiceImpl(IRolSistemaRepository rolSistemaRepository) {
		this.rolSistemaRepository = rolSistemaRepository;
	}

	@Override
	public List<RolSistema> obtenerRolSistemas() throws InternalException {
		try {
			return rolSistemaRepository.obtenerTodos();
		} catch (Exception ex) {
			log.error("Ocurrio un eror al obtener los roles", ex);
			throw new InternalException("Ocurrio un eror al obtener los roles");
		}
	}

	@Override
	public List<RolSistema> obtenerRolesPorSistema(Short idSistema) throws InternalException {
		if (null != idSistema) {
			try {
				Sistema sistema = new Sistema();
				sistema.setIdSistema(idSistema);
				return rolSistemaRepository.obtenerRolesPorSistema(sistema);
			} catch (Exception ex) {
				log.error(String.format("Ocurrio un error al obtener los roles con el id de sistema : %d", idSistema), ex);
				throw new InternalException(String.format("Ocurrio un error al obtener los roles con el id de sistema : %d", idSistema));
			}
		} else {
			throw new InternalException("El id del sistema no debe ser nulo o vacio.");
		}
	}

	@Override
	public RolSistema guardarRolSistema(RolSistemaRequest rolSistemaRequest) throws InternalException {
		if(null != rolSistemaRequest && null != rolSistemaRequest.getEstatus() && !rolSistemaRequest.getEstatus().trim().isEmpty()) {
			try {
				RolSistema rolSistema = new RolSistema();
				rolSistema.setRol(new Rol(rolSistemaRequest.getIdRol()));
				rolSistema.setSistema(new Sistema(rolSistemaRequest.getIdSistema()));
				rolSistema.setEstatus(rolSistemaRequest.getEstatus());
				rolSistema.setUsuarioCaptura(rolSistemaRequest.getUsuarioCaptura());
				rolSistema.setFechaCaptura(new Date());

				return rolSistemaRepository.save(rolSistema);
			} catch (Exception ex) {
				log.error("Ocurrio un error al guardar el rol asignado al sistema", ex);
				throw new InternalException("Ocurrio un error al guardar el rol asignado al sistema");
			}
		}else {
			throw new InternalException("Los campos no debe ser nulos o vacios");
		}
	}

	@Override
	public RolSistema actualizarRolSistema(RolSistemaRequest rolSistemaRequest) throws InternalException {
		if(null != rolSistemaRequest && null != rolSistemaRequest.getEstatus() && !rolSistemaRequest.getEstatus().trim().isEmpty()) {
			try {
				rolSistemaRepository.actualizarRolSistema(
						new Rol(rolSistemaRequest.getIdRol()),
						new Sistema(rolSistemaRequest.getIdSistema()),
						rolSistemaRequest.getEstatus(),
						rolSistemaRequest.getUsuarioEditor(),
						new Date(),
						rolSistemaRequest.getId());

				return rolSistemaRepository.findById(rolSistemaRequest.getId()).orElse(null);
			} catch (Exception ex) {
				log.error("Ocurrio un error al actualizar el rol con el sistema", ex);
				throw new InternalException("Ocurrio un error al actualizar el rol con el sistema");
			}
		}else {
			throw new InternalException("Los campos no debe ser nulos o vacios");
		}
	}

}
