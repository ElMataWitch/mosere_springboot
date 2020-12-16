package mx.gob.queretaro.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.Resguardos;
import mx.gob.queretaro.model.Sistema;
import mx.gob.queretaro.repository.IResguardoRepository;
import mx.gob.queretaro.request.ResguardoRequest;
import mx.gob.queretaro.service.IResguardoService;

@Service
@Transactional
@Slf4j
public class ResguardoServiceImpl implements IResguardoService {

	private final IResguardoRepository resguardoRepository;

	@Autowired
	public ResguardoServiceImpl(IResguardoRepository resguardoRepository) {
		this.resguardoRepository = resguardoRepository;
	}

	@Override
	public List<Resguardos> obtenerResguardos() throws InternalException {
		try {
			return resguardoRepository.obtenerTodos();
		} catch (Exception ex) {
			log.error("Ocurrio un eror al obtener los sistemas", ex);
			throw new InternalException("Ocurrio un eror al obtener los sistemas");
		}
	}

	@Override
	public Resguardos guardarResguardo(ResguardoRequest resguardoRequest) throws InternalException {
		if (null != resguardoRequest && null != resguardoRequest.getUsuario()
				&& !resguardoRequest.getUsuario().trim().isEmpty()) {
			try {
				Resguardos resguardos = new Resguardos();
				resguardos.setSistema(new Sistema(resguardoRequest.getIdSistema()));
				resguardos.setAnio(resguardoRequest.getAnio());
				resguardos.setFolio(resguardoRequest.getFolio());

				//resguardos.setEnviado("ENVIADO");
				//resguardos.setRecibido("RECIBIDO");

				resguardos.setFechaEmision(new Date());
				//resguardos.setFechaRecibido(null);

				resguardos.setEstatus(resguardoRequest.getEstatus());
				resguardos.setUsuarioCaptura(resguardoRequest.getUsuarioCaptura());
				resguardos.setFechaCaptura(new Date());
				//resguardo.setUsuarioEditor(resguardoRequest.getUsuarioEditor());
				//resguardo.setFechaEdicion(new Date());

				//resguardos.setSustitucion("NO");
				resguardos.setCorreoDestino("destino");
				//resguardos.setObservaciones("Nada mal");

				resguardos.setUsuario(resguardoRequest.getUsuario());
				resguardos.setDependencia(resguardoRequest.getDependenciaName());
				resguardos.setDepartamento(resguardoRequest.getDepartamento());
				resguardos.setJefeInmediato(resguardoRequest.getAutoriza());
				resguardos.setNombreUsuario(resguardoRequest.getNombre());


				return resguardoRepository.save(resguardos);

			} catch (Exception ex) {
				log.error("Ocurrio un error al guardar el Sistema", ex);
				throw new InternalException("Ocurrio un error al guardar el Sistema");
			}
		} else {
			throw new InternalException("El nombre del Sistema y demas campos no debe ser nulos o vacios");
		}
	}



}
