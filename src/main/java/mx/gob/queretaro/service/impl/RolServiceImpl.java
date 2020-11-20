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

}
