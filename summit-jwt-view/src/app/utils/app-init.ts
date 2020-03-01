
import { KeycloakService } from 'keycloak-angular';

import { environment } from '../../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const { keycloakConfig } = environment;
      try {
        await keycloak.init({
          config: keycloakConfig,
          initOptions: {
            // still trying to figure why I have to use implicit flow
            // getting cors issues without
            flow: 'standard',
            onLoad: 'login-required',
            checkLoginIframe: false,
            enableLogging: true
          },
          bearerExcludedUrls: []
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
