package mx.gob.queretaro.service;

import java.util.List;

import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.Variable;

public interface IVariableService {

	List<Variable> obtenerVariables() throws InternalException;
}
