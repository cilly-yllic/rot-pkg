import getLock, { Type } from './lock';
import getNodeModules from './node-modules';
import { result } from './log';
import { NodeModules } from './interface';

const getStrings  = ( value: string | string[] ): string[] => Array.isArray( value ) ? value : [ value ];

const getChanges  = ( path: string, nodeModules: NodeModules, type: Type ): void => {
  const lockFileModules = getLock( path, type );

  if ( lockFileModules === undefined ) {
    return;
  }

  const installed       = {};
  const uninstalled     = {};
  const updated         = {};

  Object.keys( lockFileModules ).forEach( key => {
    const logVersion    = getStrings( lockFileModules[key].version ).join( ', ' );
    if ( !nodeModules[key] ) {
      installed[key] = logVersion;
      return;
    }
    const versions      = type === 'npm' ? getStrings( lockFileModules[key].resolved ) : getStrings( lockFileModules[key].version )
    const moduleVersion = type === 'npm' && nodeModules[key].resolved ? nodeModules[key].resolved : nodeModules[key].version;

    if ( versions.some( version => version === moduleVersion ) ) {
      return;
    }
    updated[key]        = { before: nodeModules[key].version, after: logVersion };
  } );
  Object.keys( nodeModules ).forEach( key => {
    if ( !!lockFileModules[key] ) {
      return;
    }
    uninstalled[key]    = nodeModules[key].version;
  } );

  result( { installed, uninstalled, updated }, type, path );
};

export default function ( path: string ): void {
  const nodeModules = getNodeModules( path );
  getChanges( path, nodeModules, 'npm' );
  getChanges( path, nodeModules, 'yarn' );
}
