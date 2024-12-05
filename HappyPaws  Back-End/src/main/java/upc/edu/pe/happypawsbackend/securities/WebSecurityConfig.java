package upc.edu.pe.happypawsbackend.securities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private UserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver exceptionResolver;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req -> req
                        .requestMatchers(antMatcher("/login")).permitAll()
                        .requestMatchers(antMatcher("/registrar")).permitAll()
                        .requestMatchers(antMatcher("/rol")).permitAll()
                        .requestMatchers(antMatcher("/user/id/{username}")).permitAll()
                        .requestMatchers(antMatcher("/usuarios")).permitAll()
                        .requestMatchers(antMatcher("/usuarios/activos")).permitAll()
                        .requestMatchers(antMatcher("/usuarios/{id}")).permitAll()
                        .requestMatchers(antMatcher("/albergues")).permitAll()
                        .requestMatchers(antMatcher("/albergues/abiertoahora")).permitAll()
                        .requestMatchers(antMatcher("/albergues/alberguexcantidad")).permitAll()
                        .requestMatchers(antMatcher("/albergues/{id}")).permitAll()
                        .requestMatchers(antMatcher("/roles")).permitAll()
                        .requestMatchers(antMatcher("/roles/rolxuser")).permitAll()
                        .requestMatchers(antMatcher("/roles/{id}")).permitAll()
                        .requestMatchers(antMatcher("/notificaciones")).permitAll()
                        .requestMatchers(antMatcher("/notificaciones/notificacionxfecha/{fecha}")).permitAll()
                        .requestMatchers(antMatcher("/notificaciones/{id}")).permitAll()
                        .requestMatchers(antMatcher("/mascotas")).permitAll()
                        .requestMatchers(antMatcher("/mascotas/mascotaxraza")).permitAll()
                        .requestMatchers(antMatcher("/mascotas/mascotaxadopcion")).permitAll()
                        .requestMatchers(antMatcher("/mascotas/{id}")).permitAll()
                        .requestMatchers(antMatcher("/donaciones")).permitAll()
                        .requestMatchers(antMatcher("/donaciones/buscarxmonto")).permitAll()
                        .requestMatchers(antMatcher("/donaciones/donacionxnombre")).permitAll()
                        .requestMatchers(antMatcher("/donaciones/{id}")).permitAll()
                        .requestMatchers(antMatcher("/comprobantes")).permitAll()
                        .requestMatchers(antMatcher("/comprobantes/{id}")).permitAll()
                        .requestMatchers(antMatcher("/comentarios")).permitAll()
                        .requestMatchers(antMatcher("/comentarios/{id}")).permitAll()
                        .requestMatchers(antMatcher("/citas")).permitAll()
                        .requestMatchers(antMatcher("/citas/buscarxpendiente")).permitAll()
                        .requestMatchers(antMatcher("/citas/{id}")).permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults())
                .formLogin(AbstractHttpConfigurer::disable)
                .exceptionHandling(e -> e.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                .sessionManagement(Customizer.withDefaults());
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }
}

