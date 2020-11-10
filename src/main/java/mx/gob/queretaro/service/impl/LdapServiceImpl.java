package mx.gob.queretaro.service.impl;

import org.apache.http.HttpEntity;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import mx.gob.queretaro.exception.InternalException;
import mx.gob.queretaro.service.ILdapService;

@Service
@Transactional
@Slf4j
public class LdapServiceImpl implements ILdapService {
	@Override

	public String consultaLdap(String user) throws InternalException {
		String data = "";
		try {
			CredentialsProvider provider = new BasicCredentialsProvider();
			UsernamePasswordCredentials credentials = new UsernamePasswordCredentials("sraldap", "jula7809");
			provider.setCredentials(AuthScope.ANY, credentials);
			CloseableHttpClient client = HttpClientBuilder.create().setDefaultCredentialsProvider(provider).build();
			CloseableHttpResponse resp = client.execute(new HttpGet("http://10.16.8.114:18080/GEQWS/api/ldap/" + user));
			int statusCode = resp.getStatusLine().getStatusCode();
			if (statusCode == 200) {
				HttpEntity entity = resp.getEntity();
				data = EntityUtils.toString(entity, "UTF-8").trim();
			}
			resp.close();
			client.close();
		} catch (Exception ex) {
			log.error("Ocurrio un eror al obtener la informacion del usuario", ex);
			throw new InternalException("Ocurrio un eror al obtener la informacion del usuario");
		}
		return data;
	}
}
