import { join } from 'path';
import changes from './changes';
import getDependencies from './package';
import { success, info } from './log';
import { exists, readJson } from './fs';

const PATH    = './angular.json';
const KEY     = '@angular-devkit/build-ng-packagr';

export default function ( cwd: string ): void {
  const dependencies = getDependencies( cwd );
  if ( !dependencies || !dependencies.hasOwnProperty( KEY ) ) {
    return;
  }
  const path          = join( cwd, PATH );
  if ( !exists( path ) ) {
    return;
  }
  console.log();
  success( 'found Angular library' );
  const angularJson   = readJson( path );
  if ( !angularJson || !angularJson.projects ) {
    return;
  }
  Object.keys( angularJson.projects ).forEach( ( project: string ) => {
    const config      = angularJson.projects[project];
    if ( !config || !config.root ) {
      return;
    }
    console.log();
    info( `> run rot-pkg project: ${project}` );
    changes( join( cwd, config.root ) );
  } );
}
