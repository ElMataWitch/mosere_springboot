package mx.gob.queretaro.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.Rol;
import mx.gob.queretaro.repository.IRolRepository;
import mx.gob.queretaro.service.IRolService;

@Service
@Transactional
@Slf4j
public class RolServiceImpl implements IRolService {

	private final IRolRepository rolRepository;

	@Autowired
	public RolServiceImpl(IRolRepository rolRepository) {
		this.rolRepository = rolRepository;
	}

	@Override
	public List<Rol> obtenerRoles() throws InternalException {
		try {
			return rolRepository.obtenerTodos();
		} catch (Exception ex) {
			log.error("Ocurrio un eror al obtener los roles", ex);
			throw new InternalException("Ocurrio un eror al obtener los roles");
		}
	}

	@Override
	public Rol obtenerRolPorId(Short id) throws InternalException {
		if (null != id ) {
			try {
				return rolRepository.obtenerRolPorId(id);
			} catch (Exception ex) {
				log.error(String.format("Ocurrio un error al obtener el rol con el id : %s", id), ex);
				throw new InternalException(String.format("Ocurrio un error al obtener el rol con el id : %s", id));
			}
		} else {
			throw new InternalException("El id del rol no debe ser nulo o vacio.");
		}
	}

	@Override
	public void eliminarRol(Short id) throws InternalException {
		if(null != id ) {
			try {
				Rol rol = rolRepository.findById(id).orElse(null);
				if(null != rol) {
					rolRepository.eliminarRol(id);
				}else {
					throw new InternalException("El id del rol no existe en base de datos");
				}
			} catch (InternalException ex) {
				throw ex;
			} catch (Exception ex) {
				log.error(String.format("Ocurrio un error al borrar el rol con el id : %d", id),ex);
				throw new InternalException(String.format("Ocurrio un error al borrar el rol con el id : %d", id));
			}
		}else {
			throw new InternalException("El id del rol no debe ser nulos o vacios");
		}
	}

}
