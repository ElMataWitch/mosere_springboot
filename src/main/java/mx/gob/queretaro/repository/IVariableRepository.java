package mx.gob.queretaro.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mx.gob.queretaro.model.Variable;

public interface IVariableRepository extends JpaRepository<Variable, Short>{

}
