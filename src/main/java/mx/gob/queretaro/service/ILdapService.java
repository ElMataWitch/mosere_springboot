package mx.gob.queretaro.service;

import mx.gob.queretaro.exception.InternalException;

public interface ILdapService {

	String consultaLdap(String user) throws InternalException;

	String consultaUsuario(String user) throws InternalException;

	String consultaDependencia(String dependencia) throws InternalException;

}
