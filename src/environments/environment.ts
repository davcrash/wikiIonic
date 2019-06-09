// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000/',
  userNameApi: '065399b83e51bac411059d12ec42a2d4',
  userPasswordApi: '22d1c2e80fbcec3a7aff5d3436709e94',
  encryptMethodApi: 'HS512',
  secretWordApi: 'my-secret-password',
  clientStorageType: 'LOCAL' // LOCAL - SESSION
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
