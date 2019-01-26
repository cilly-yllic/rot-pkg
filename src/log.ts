import { Map } from '../interface';

export interface Log {
  uninstalled: Map.Uninstalled;
  installed: Map.Installed;
  packageLockUpdated: Map.LockUpdated;
  yarnLockUpdated: Map.LockUpdated;
}

export default function ( { uninstalled, installed, packageLockUpdated, yarnLockUpdated }: Log ): void {
  const uninstalledKeys             = Object.keys( uninstalled );
  const installedKeys               = Object.keys( installed );

  const packageLockJasonUpdatedKeys = Object.keys( packageLockUpdated );
  const yarnLockUpdatedKeys         = Object.keys( yarnLockUpdated );

  if ( uninstalledKeys.length ) {
    console.log();
    console.log('----- uninstalled -----');
    uninstalledKeys.forEach( key => console.log( key, uninstalled[key] ) );
  }

  if ( installedKeys.length ) {
    console.log();
    console.log( '----- installed -----' );
    installedKeys.forEach( key => console.log( key, installed[key] ) );
  }

  if ( packageLockJasonUpdatedKeys.length ) {
    console.log();
    console.log( '----- package updated -----' );
    packageLockJasonUpdatedKeys.forEach( key => console.log( key, packageLockUpdated[key].before, '-->', packageLockUpdated[key].after ) );
  }

  if ( yarnLockUpdatedKeys.length ) {
    console.log();
    console.log( '----- yarn updated -----' );
    yarnLockUpdatedKeys.forEach( key => console.log( key, yarnLockUpdated[key].before, '-->', yarnLockUpdated[key].after ) );
  }
}