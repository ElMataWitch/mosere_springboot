package mx.gob.queretaro.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.model.UsuarioMosere;
import mx.gob.queretaro.repository.IUsuarioMosereRepository;
import mx.gob.queretaro.request.UsuarioMosereRequest;
import mx.gob.queretaro.service.IUsuarioMosereService;

@Service
@Transactional
@Slf4j
public class UsuarioMosereServiceImpl implements IUsuarioMosereService{

	private final IUsuarioMosereRepository usuarioMosereRepository;

	@Autowired
	public UsuarioMosereServiceImpl(IUsuarioMosereRepository usuarioMosereRepository) {
		this.usuarioMosereRepository = usuarioMosereRepository;
	}

	@Override
	public List<UsuarioMosere> obtenerUsuarios() throws InternalException {
		try {
			return usuarioMosereRepository.findAll();
		} catch (Exception ex) {
			log.error("Ocurrio un eror al obtener los usuarios", ex);
			throw new InternalException("Ocurrio un eror al obtener los usuarios");
		}
	}

	@Override
	public UsuarioMosere obtenerPorId(Short id) throws InternalException {
		if(null != id ) {
			try {
				return usuarioMosereRepository.obtenerPorId(id);
			} catch (Exception ex) {
				log.error(String.format("Ocurrio un error al obtener el usuario con el id : %d", id),ex);
				throw new InternalException(String.format("Ocurrio un error al obtener el usuario con el id : %d", id));
			}
		}else {
			throw new InternalException("El id del usuario no debe ser nulos o vacios");
		}
	}

	@Override
	public UsuarioMosere guardarUsuario(UsuarioMosereRequest usuarioMosereRequest) throws InternalException {
		if(null != usuarioMosereRequest && null != usuarioMosereRequest.getUsuario() && !usuarioMosereRequest.getUsuario().trim().isEmpty()) {
			try {
				UsuarioMosere usuario = new UsuarioMosere();
				usuario.setUsuario(usuarioMosereRequest.getUsuario().trim());
				usuario.setEstatus(usuarioMosereRequest.getEstatus());
				usuario.setUsuarioCaptura(usuarioMosereRequest.getUsuarioCaptura());
				usuario.setFechaCaptura(new Date());
				//				usuario.setUsuarioEditor(null);
				//				usuario.setFechaEdicion(null);

				return usuarioMosereRepository.save(usuario);

			} catch (Exception ex) {
				log.error("Ocurrio un error al guardar el Usuario", ex);
				throw new InternalException("Ocurrio un error al guardar el Usuario");
			}
		}else {
			throw new InternalException("El nombre del usuario y demas campos no debe ser nulos o vacios");
		}
	}

	@Override
	public UsuarioMosere actualizarUsuarioMosere(UsuarioMosereRequest usuarioMosereRequest) throws InternalException {
		if(null != usuarioMosereRequest && null != usuarioMosereRequest.getUsuario() && !usuarioMosereRequest.getUsuario().trim().isEmpty()) {
			try {
				usuarioMosereRepository.actualizarUsuarioMosere(
						usuarioMosereRequest.getUsuario().trim(),
						usuarioMosereRequest.getEstatus(),
						usuarioMosereRequest.getUsuarioEditor(),
						new Date(),
						usuarioMosereRequest.getId());

				return usuarioMosereRepository.findById(usuarioMosereRequest.getId()).orElse(null);
			} catch (Exception ex) {
				log.error("Ocurrio un error al actualizar el Usuario", ex);
				throw new InternalException("Ocurrio un error al actualizar el Usuario");
			}
		}else {
			throw new InternalException("El nombre del usuario y demas campos no debe ser nulos o vacios");
		}
	}

}
