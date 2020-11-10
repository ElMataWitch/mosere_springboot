package mx.gob.queretaro.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.Variable;
import mx.gob.queretaro.repository.IVariableRepository;
import mx.gob.queretaro.service.IVariableService;

@Service
@Transactional
@Slf4j
public class VariableServiceImpl implements IVariableService{

	private final IVariableRepository variableService;

	@Autowired
	public VariableServiceImpl(IVariableRepository variableService) {
		this.variableService = variableService;
	}

	@Override
	public List<Variable> obtenerVariables() throws InternalException {
		try {
			return variableService.findAll();
		} catch (Exception ex) {
			log.error("Ocurrio un eror al obtener las variables", ex);
			throw new InternalException("Ocurrio un eror al obtener las variables");
		}
	}

}
