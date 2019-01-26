import * as execa from 'execa';

import getChanges from './changes';
import noChanges from './no-changes';
import { Dependencies, ProjectsChanges } from '../interface';

const PATH    = './angular.json';
const KEY     = '@angular-devkit/build-ng-packagr';

export default function ( cwd: string, packageDependencies: Dependencies ): ProjectsChanges {
  const empty = [];
  if ( !packageDependencies.hasOwnProperty( KEY ) ) {
    return empty;
  }
  if ( execa.shellSync( `test -f ${PATH}`, { cwd, reject: false } ).failed ) {
    return empty;
  }
  console.log();
  console.log( 'found Angular library' );
  const angularJson   = JSON.parse( execa.shellSync( `cat ${PATH}`, { cwd, reject: false } ).stdout );
  if ( !angularJson || !angularJson.projects ) {
    return empty;
  }
  return Object.keys( angularJson.projects ).reduce( ( state: ProjectsChanges, project: string ) => {
    const config      = angularJson.projects[project];
    if ( !config || !config.root ) {
      return state;
    }
    console.log();
    console.log( `> run rot-pkg project: ${project}` );
    const changes = getChanges( `${cwd}/${config.root}` );
    if ( changes === undefined ) {
      return state;
    }
    if ( noChanges( changes ) ) {
      return state;
    }
    const { uninstalled, installed, packageLockUpdated, yarnLockUpdated } = changes;
    state.push( { project, uninstalled, installed, packageLockUpdated, yarnLockUpdated } );
    return state
  }, [] );
}