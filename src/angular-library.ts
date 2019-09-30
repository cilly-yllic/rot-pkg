import { join } from 'path';
import changes from './changes';
import getDependencies from './package';
import {Type} from "./lock";
import { success, info } from './log';
import { exists, readJson } from './fs';

const PATH    = './angular.json';
const KEY     = '@angular-devkit/build-ng-packagr';

export default function ( cwd: string, type: Type ): object {
  const dependencies = getDependencies( cwd );
  if ( !dependencies || !dependencies.hasOwnProperty( KEY ) ) {
    return {};
  }
  const path          = join( cwd, PATH );
  if ( !exists( path ) ) {
    return {};
  }
  console.log();
  success( 'found Angular library' );
  const angularJson   = readJson( path );
  if ( !angularJson || !angularJson.projects ) {
    return {};
  }
  return Object.keys( angularJson.projects ).map( ( project: string ) => {
    const config      = angularJson.projects[project];
    if ( !config || !config.root ) {
      return {};
    }
    console.log();
    info( `> run rot-pkg project: ${project}` );
    return changes( join( cwd, config.root ), type );
  } );
}
