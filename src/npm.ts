import * as execa from 'execa';

export default function ( cwd ) {
  const uninstalled       = {};
  const installed         = {};
  const updated           = {};

  const packageList       = execa.shellSync( 'npm list --depth=0', { cwd, reject: false }).stdout;

  packageList.split( '\n' ).forEach( ( line, index ) => {
    if ( index === 0 || !line || !line.trim() ) {
      return;
    }
    if ( line.search( /UNMET PEER DEPENDENCY/ ) >= 0 ) {
      return;
    }
    const removedPrivate  = line.replace( /\s\(.+\)/, '' );
    const matchedPkg      = removedPrivate.match( /\s([^\s]+@[^\s]+)/ );
    if ( !matchedPkg ) {
      return;
    }
    const pkg             = matchedPkg[1];
    const matchedKey      = pkg.match( /(.+)@.+/ );
    if ( !matchedKey ) {
      return;
    }
    const key             = matchedKey[1];

    let matchVersion      = null;

    if ( line.search( /[^\(]*\(.+\)[^\)]*/ ) >= 0 ) {
      matchVersion        = line.match( /[^\(]*\((.+)\)[^\)]*/ );
    } else {
      matchVersion        = pkg.match( /.+@(.+)$/ );
    }

    if ( !matchVersion ) {
      return;
    }
    const version         = matchVersion[1];
    if ( removedPrivate.search( /.+\sextraneous$/ ) >= 0 ) {
      uninstalled[key]    = version;
      return;
    }
    if ( removedPrivate.search( /.+\sinvalid$/ ) >= 0 ) {
      updated[key]        = { before: version };
      return;
    }
    if ( line.search( /UNMET DEPENDENCY/ ) >= 0 ) {
      installed[key]      = version;
      return;
    }
  } );

  return { updated, uninstalled, installed };
}