package mx.gob.queretaro;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, proxyTargetClass = true)
public class WebSecurityConfiguration  extends WebSecurityConfigurerAdapter{

	//Autorización ---- urls o recursos --- pagina Login
	@Override
	protected void configure(HttpSecurity http) throws Exception{
		http.authorizeRequests()
		.antMatchers("/","/index*","*/css/**","/js/**","/img/**","/webjars/**").permitAll() //SIN AUTENTIFICACION
		.antMatchers("/api/**").permitAll() //sin autentificacion
		.antMatchers("/home*").hasAnyRole("ADMIN","USER") //CON AUTENTIFICACION
		.antMatchers("/usuarios/**","/sistemas/**","/leyendas/**","/dependencias/**","/simulador/**","/resguardo/**").hasAnyRole("ADMIN") //CON AUTENTIFICACION Y SOLO ROL ADMIN
		.and()
		.formLogin() // Login
		.loginProcessingUrl("/login") // j_security_check
		.loginPage("/index").usernameParameter("txtUsuario").passwordParameter("txtPassword") //j_username j_password
		.defaultSuccessUrl("/home")
		.failureUrl("/index?error=true")
		.permitAll()
		.and()
		.logout()
		.logoutRequestMatcher(new AntPathRequestMatcher("/logout")) // j_logout
		.logoutSuccessUrl("/index?logout=true")
		.invalidateHttpSession(true) // borrar sesiones
		.permitAll()
		.and()
		.csrf()
		.disable();

	}


	//Autentificación
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception{
		auth
		.inMemoryAuthentication()
		.passwordEncoder(passwordEncoder())
		.withUser("mosere").password(passwordEncoder().encode("1234")).roles("USER")
		.and()
		.withUser("admin").password(passwordEncoder().encode("admin")).roles("USER","ADMIN")
		.and()
		.withUser("emw").password(passwordEncoder().encode("1234")).roles("USER","ADMIN")
		;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
