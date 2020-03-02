package com.example.ssouse.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.authentication.session.NullAuthenticatedSessionStrategy;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, jsr250Enabled = true, securedEnabled = true)
@ConditionalOnProperty(prefix = "rest.security", value = "enabled", havingValue = "true")
@Import({SecurityProperties.class})
public class SecurityConfigurer extends WebSecurityConfigurerAdapter
{

  @Autowired
  private SecurityProperties securityProperties;

  @Override
  protected void configure(HttpSecurity http) throws Exception
  {
    // @formatter:off
    http
      .cors()
      .configurationSource(corsConfigurationSource())

      .and()
      .headers()
      .frameOptions()
      .disable()

      .and()
      .sessionManagement()
      .sessionAuthenticationStrategy(new NullAuthenticatedSessionStrategy())
      .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

      .and()
      // todo: need to look this up
      //.csrf()
      //.disable()

      .authorizeRequests()
      .antMatchers(securityProperties.getApiMatcher())
      .authenticated()

      .and()
      .oauth2ResourceServer()
      .jwt()
        .jwtAuthenticationConverter(grantedAuthoritiesExtractorConverter())
        .decoder(jwtDecoder());
    // @formatter:on
  }

  @Bean
  Converter<Jwt, AbstractAuthenticationToken> grantedAuthoritiesExtractorConverter()
  {
    JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
    jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesExtractor());
    return jwtAuthenticationConverter;
  }

  @Bean
  GrantedAuthoritiesExtractor grantedAuthoritiesExtractor()
  {
    return new GrantedAuthoritiesExtractor();
  }

  @Bean
  JwtDecoder jwtDecoder()
  {
    return JwtDecoders.fromIssuerLocation(securityProperties.getIssuerUri());
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    if (null != securityProperties.getCorsConfiguration()) {
      source.registerCorsConfiguration("/**", securityProperties.getCorsConfiguration());
    }
    return source;
  }
}
