import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'dev',
  clientId: 'angular-spa2'
};

export const environment = {
  production: true,
  apis: { voteService: 'http://localhost:8081' },
  keycloak: keycloakConfig
};
