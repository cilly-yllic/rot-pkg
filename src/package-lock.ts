import * as execa from 'execa';

import { Map } from '../interface';

const PATH    = './package-lock.json';

export default function ( cwd: string, updated: Map.Updated ): Map.LockUpdated {
  if ( execa.shellSync( `test -f ${PATH}`, { cwd, reject: false } ).failed ) {
    console.log( 'cannot find package-lock.json file' );
    return {};
  }

  console.log( 'found package-lock.json file' );

  const lock  = JSON.parse( execa.shellSync( `cat ${PATH}`, { cwd, reject: false } ).stdout ).dependencies;

  return Object.keys( updated ).reduce( ( state, pkg ) => {
    if ( !lock[pkg] ) {
      return state;
    }
    state[pkg]          = { ...updated[pkg] || {} };
    state[pkg].after    = lock[pkg].version;
    return state;
  }, {} );
}