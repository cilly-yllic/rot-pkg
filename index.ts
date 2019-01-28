import * as execa from 'execa';
import * as path from 'path';

import getChanges from './src/changes';
import noChanges from './src/no-changes';
import log from './src/log';
import getAngularLibraryUpdated from './src/angular-lirary';

export default function ( cwd: string = path.join( __dirname, '../..' ) ): void {

  console.log( '> run rot-pkg' );
  const changes                     = getChanges( cwd );
  if ( changes === undefined ) {
    return;
  }

  const angularLibraryUpdates       = getAngularLibraryUpdated( cwd, changes.packageDependencies );

  if ( noChanges( changes ) && !angularLibraryUpdates.length ) {
    console.log( 'your package.json is latest' );
    console.log( '> done rot-pkg' );
    return;
  }

  log( changes );

  if ( angularLibraryUpdates.length ) {
    angularLibraryUpdates.forEach( library => {
      console.log();
      console.log( `----- project: ${library.project} -----` );
      log( library );
    } );
  }

  console.log();
  console.log();

  const COLOR_GREEN="\\033[0;32m";
  const COLOR_OFF="\\033[0;39m";

  execa.shellSync( `echo "${COLOR_GREEN}!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!${COLOR_OFF}"`, { cwd, stdio: 'inherit' } );
  execa.shellSync( `echo "${COLOR_GREEN}!!! Please Update your npm packages 'npm i' !!!${COLOR_OFF}"`, { cwd, stdio: 'inherit' } );
  execa.shellSync( `echo "${COLOR_GREEN}!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!${COLOR_OFF}"`, { cwd, stdio: 'inherit' } );
  console.log( '> done rot-pkg' );
}