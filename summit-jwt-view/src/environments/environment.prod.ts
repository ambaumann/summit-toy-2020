import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'dev',
  clientId: 'angular-spa2'
};

export const environment = {
  production: true,
  assets: {
    dotaImages:
      'https://cdn-keycloak-angular.herokuapp.com/assets/images/dota-heroes/'
  },
  apis: { dota: 'http://localhost:3000' },
  keycloak: keycloakConfig
};
