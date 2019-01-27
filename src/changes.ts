import getNpm from './npm';
import getPackageDependencies from './package';
import getPackageLockUpdated from './package-lock';
import getYarnLockUpdated from './yarn-lock';

import { Changes } from '../interface';

export default function ( cwd: string ): Changes | void {
  const packageDependencies         = getPackageDependencies( cwd );
  if ( packageDependencies === undefined ) {
    console.log( 'cannot find package.json file' );
    return;
  }
  const { uninstalled, updated, installed } = getNpm( cwd, packageDependencies );
  const packageLockUpdated          = getPackageLockUpdated( cwd, updated );
  const yarnLockUpdated             = getYarnLockUpdated( cwd, updated );

  return { packageDependencies, uninstalled, installed, packageLockUpdated, yarnLockUpdated };
}