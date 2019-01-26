import * as execa from 'execa';
import * as path from 'path';

import getNpm from './src/npm';
import getPackageLockUpdated from './src/package-lock';
import getYarnLockUpdated from './src/yarn-lock';

export default function run( cwd: string = path.join( __dirname, '../..' ) ) {

  console.log( '> run rot-pkg' );
  const { updated, uninstalled, installed } = getNpm( cwd );
  const uninstalledKeys             = Object.keys( uninstalled );
  const installedKeys               = Object.keys( installed );

  const packageLockUpdated          = getPackageLockUpdated( cwd, updated );
  const yarnLockUpdated             = getYarnLockUpdated( cwd, updated );

  const packageLockJasonUpdatedKeys = Object.keys( packageLockUpdated );
  const yarnLockUpdatedKeys         = Object.keys( yarnLockUpdated );

  if ( !uninstalledKeys.length && !installedKeys.length && !packageLockJasonUpdatedKeys.length && !yarnLockUpdatedKeys.length ) {
    console.log( 'your package.json is latest' );
    console.log( '> done rot-pkg' );
    return;
  }

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

  console.log();
  console.log();

  const COLOR_GREEN="\\033[0;32m";
  const COLOR_OFF="\\033[0;39m";

  execa.shellSync( `echo "${COLOR_GREEN}!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!${COLOR_OFF}"`, { cwd, stdio: 'inherit' } );
  execa.shellSync( `echo "${COLOR_GREEN}!!! Please Update your npm packages 'npm i' !!!${COLOR_OFF}"`, { cwd, stdio: 'inherit' } );
  execa.shellSync( `echo "${COLOR_GREEN}!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!${COLOR_OFF}"`, { cwd, stdio: 'inherit' } );
  console.log( '> done rot-pkg' );
}