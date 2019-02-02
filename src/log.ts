import { Map } from '../interface';

export interface Log {
  uninstalled: Map.Uninstalled;
  installed: Map.Installed;
  packageLockUpdated: Map.LockUpdated;
  yarnLockUpdated: Map.LockUpdated;
}

import chalk from 'chalk';

export const error    = ( value: string ): void => console.log( chalk.bold.red( value ) );
export const warning  = ( value: string ): void => console.log( chalk.bold.yellow( value ) );
export const success  = ( value: string ): void => console.log( chalk.bold.green( value ) );
export const info     = ( value: string ): void => console.log( chalk.bold.blue( value ) );

export const result   = ( { uninstalled, installed, packageLockUpdated, yarnLockUpdated }: Log ): void => {
  const uninstalledKeys             = Object.keys( uninstalled );
  const installedKeys               = Object.keys( installed );

  const packageLockJasonUpdatedKeys = Object.keys( packageLockUpdated );
  const yarnLockUpdatedKeys         = Object.keys( yarnLockUpdated );

  if ( uninstalledKeys.length ) {
    console.log();
    warning('----- uninstalled -----');
    uninstalledKeys.forEach( key => info( `${key} : ${uninstalled[key]}` ) );
  }

  if ( installedKeys.length ) {
    console.log();
    warning( '----- installed -----' );
    installedKeys.forEach( key => info( `${key} : ${installed[key]}` ) );
  }

  if ( packageLockJasonUpdatedKeys.length ) {
    console.log();
    console.log( '----- package updated -----' );
    packageLockJasonUpdatedKeys.forEach( key => info( `${key} : ${packageLockUpdated[key].before} --> ${packageLockUpdated[key].after}` ) );
  }

  if ( yarnLockUpdatedKeys.length ) {
    console.log();
    warning( '----- yarn updated -----' );
    yarnLockUpdatedKeys.forEach( key => info( `${key} : ${yarnLockUpdated[key].before} --> ${yarnLockUpdated[key].after}` ) );
  }
}
