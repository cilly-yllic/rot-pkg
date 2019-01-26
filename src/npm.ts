import * as execa from 'execa';

import { Dependencies, Map } from '../interface';

interface Result {
  uninstalled: Map.Uninstalled;
  installed: Map.Installed;
  updated: Map.Updated;
}

export default function ( cwd: string, packageDependencies: Dependencies ): Result {
  const uninstalled: Map.Uninstalled  = {};
  const installed: Map.Installed      = {};
  const updated: Map.Updated          = {};

  const packageList       = execa.shellSync( 'npm list --depth=0', { cwd, reject: false }).stdout;
  const dependencyKeys    = Object.keys( packageDependencies );

  const packageVersions = packageList.split( '\n' ).reduce( ( state: string[], line, index ) => {
    if ( index === 0 || !line || !line.trim() ) {
      return state;
    }
    if ( line.search( /UNMET PEER DEPENDENCY/ ) >= 0 ) {
      return state;
    }
    const removedPrivate  = line.replace( /\s\(.+\)/, '' );
    const matchedPkg      = removedPrivate.match( /\s([^\s]+@[^\s]+)/ );
    if ( !matchedPkg ) {
      return state;
    }
    const pkg             = matchedPkg[1];
    const matchedKey      = pkg.match( /(.+)@.+/ );
    if ( !matchedKey ) {
      return state;
    }
    const key             = matchedKey[1];

    let matchVersion      = null;

    if ( line.search( /[^\(]*\(.+\)[^\)]*/ ) >= 0 ) {
      matchVersion        = line.match( /[^\(]*\((.+)\)[^\)]*/ );
    } else {
      matchVersion        = pkg.match( /.+@(.+)$/ );
    }
    if ( !matchVersion ) {
      return state;
    }
    const version         = matchVersion[1];
    state.push( key );
    if ( removedPrivate.search( /.+\sextraneous$/ ) >= 0 ) {
      uninstalled[key]    = version;
      return state;
    }
    if ( removedPrivate.search( /.+\sinvalid$/ ) >= 0 ) {
      updated[key]        = { before: version };
      return state;
    }
    if ( line.search( /UNMET DEPENDENCY/ ) >= 0 ) {
      installed[key]      = version;
      return state;
    }
    return state
  }, [] );
  dependencyKeys.forEach( dependency => {
    if ( packageVersions.some( key => key === dependency ) ) {
      return;
    }
    installed[dependency] = packageDependencies[dependency];
  } );
  return { uninstalled, updated, installed };
}