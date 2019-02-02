import * as execa from 'execa';

import { Map } from '../interface';
import { success, warning } from './log';

const PATH    = './yarn.lock';

export default function ( cwd: string, updated: Map.Updated ): Map.LockUpdated {
  if ( execa.shellSync( `test -f ${PATH}`, { cwd, reject: false } ).failed ) {
    warning( 'cannot find yarn.lock file' );
    return {};
  }

  success( 'found yarn.lock file' );

  const lock            = execa.shellSync( `cat ${PATH}`, { cwd, reject: false } ).stdout;
  const dependencies    = lock.split( /\n\n/ );

  return Object.keys( updated ).reduce( ( state, pkg ) => {
    const find          = dependencies.find( dependency => dependency.search( new RegExp( `^"${pkg}` ) ) >= 0 );
    if ( !find ) {
      return state;
    }
    const version       = find.match( /\n\s*version\s+?"([^"]+)"/, '$1' );
    if ( !version ) {
      return state;
    }
    state[pkg]          = { ...updated[pkg] || {} };
    state[pkg].after    = version[1];
    return state;
  }, {} );
}
