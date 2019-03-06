import chalk from 'chalk';
import { noChanges } from './utils';

export const error      = ( value: string ): void => console.log( chalk.bold.red( value ) );
export const warning    = ( value: string ): void => console.log( chalk.bold.yellow( value ) );
export const success    = ( value: string ): void => console.log( chalk.bold.green( value ) );
export const info       = ( value: string ): void => console.log( chalk.bold.blue( value ) );

export const result     = ( changes, type, path: string ): void => {

  if ( noChanges( changes ) ) {
    console.log();
    success( `your ${type} package is latest` );
    return;
  }
  const uninstalledKeys = Object.keys( changes.uninstalled );
  const installedKeys   = Object.keys( changes.installed );
  const updatedKeys     = Object.keys( changes.updated );

  if ( uninstalledKeys.length ) {
    console.log();
    warning('----- uninstalled -----');
    uninstalledKeys.forEach( key => info( `${key} : ${changes.uninstalled[key]}` ) );
  }

  if ( installedKeys.length ) {
    console.log();
    warning( '----- installed -----' );
    installedKeys.forEach( key => info( `${key} : ${changes.installed[key]}` ) );
  }

  if ( updatedKeys.length ) {
    console.log();
    console.log( '----- package updated -----' );
    updatedKeys.forEach( key => info( `${key} : ${changes.updated[key].before} --> ${changes.updated[key].after}` ) );
  }

  console.log();
  console.log();
  console.log( 'dir:', path );
  error( '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' );
  error( `!!! Please Update your packages \'${type} install\' !!!` );
  error( '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' );
};
