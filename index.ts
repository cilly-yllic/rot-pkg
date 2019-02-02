import * as path from 'path';

import getChanges from './src/changes';
import noChanges from './src/no-changes';
import { result, success, error, info } from './src/log';
import getAngularLibraryUpdated from './src/angular-lirary';

export default function ( cwd: string = path.join( __dirname, '../..' ) ): void {

  info( '> run rot-pkg' );
  const changes                     = getChanges( cwd );
  if ( changes === undefined ) {
    return;
  }

  const angularLibraryUpdates       = getAngularLibraryUpdated( cwd, changes.packageDependencies );

  if ( noChanges( changes ) && !angularLibraryUpdates.length ) {
    success( 'your package.json is latest' );
    info( '> done rot-pkg' );
    return;
  }

  result( changes );

  if ( angularLibraryUpdates.length ) {
    angularLibraryUpdates.forEach( library => {
      console.log();
      info( `----- project: ${library.project} -----` );
      result( library );
    } );
  }

  console.log();
  console.log();

  error( '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' );
  error( '!!! Please Update your npm packages \'npm i\' !!!' );
  error( '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' );
  info( '> done rot-pkg' );
}
