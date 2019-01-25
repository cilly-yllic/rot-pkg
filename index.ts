import * as execa from 'execa';
import * as path from 'path';

const PACKAGE_PATH = './package.json';
const PACKAGE_LOCK_PATH = './package-lock.json';

export default function run() {
  const cwd             = path.join( __dirname, '../..');
  if (
      execa.shellSync( `test -f ${PACKAGE_PATH}`, { cwd, reject: false } ).failed ||
      execa.shellSync( `test -f ${PACKAGE_LOCK_PATH}`, { cwd, reject: false } ).failed
  ) {
    console.log( 'cannot find package.json or package-lock.json' );
    return;
  }
  const packageList     = execa.shellSync( 'npm list --depth=0', { cwd, reject: false }).stdout;

  let uninstalled       = '';
  let installed         = '';

  const npmVersions = packageList.replace( /UNMET PEER DEPENDENCY/g, '' ).split( '\n' ).reduce( ( state, line, index ) => {
    if ( index === 0 || !line || !line.trim() ) {
      return state;
    }
    const removedPrivate = line.replace( /\s\(.+\)/, '' );
    const pkg           = removedPrivate.replace( /(.+)\sextraneous$/, '$1' ).split( /\s/ ).pop();
    const key           = pkg.replace( /(.+)@.+/, '$1' );
    if ( removedPrivate.search( /.+\sextraneous$/ ) >= 0 ) {
      uninstalled       = `${uninstalled} ${key}\n`;
      return state;
    }
    let version         = '';
    if ( line.search( /[^\(]*\(.+\)[^\)]*/ ) >= 0 ) {
      version           = line.replace( /[^\(]*\((.+)\)[^\)]*/, '$1' );
    } else {
      version           = pkg.replace( /.+@(.+)$/, '$1' );
    }
    if ( line.search( /UNMET DEPENDENCY/ ) >= 0 ) {
      installed         = `${installed} ${key}: ${version}\n`;
      return state;
    }
    state[key]          = version;
    return state;
  }, {} );

  const packageJson     = JSON.parse( execa.shellSync( `cat ${PACKAGE_PATH}`, { cwd, reject: false }).stdout );
  const packageLockJson = JSON.parse( execa.shellSync( `cat ${PACKAGE_LOCK_PATH}`, { cwd, reject: false }).stdout ).dependencies;

  const dependencies    = Object.keys( { ...packageJson.dependencies, ...packageJson.devDependencies } ).reduce( ( state, key ) => {
    state[key]          = packageLockJson[key] ? packageLockJson[key].version : undefined;
    return state;
  }, {} );

  let updated           = '';

  Object.keys( dependencies ).forEach( dependency => {
    const version       = dependencies[dependency];
    if ( !npmVersions.hasOwnProperty( dependency ) || version === npmVersions[dependency] ) {
      return;
    }
    updated             = `${updated} ${dependency}: ${version} --> ${npmVersions[dependency]}\n`;
  } );

  if ( uninstalled || installed || updated ) {

    console.log('----- uninstalled -----');
    console.log( uninstalled );
    console.log( '----- installed -----' );
    console.log( installed );
    console.log( '----- updated -----' );
    console.log( updated );

    const COLOR_GREEN="\\033[0;32m";
    const COLOR_OFF="\\033[0;39m";

    execa.shellSync( `echo "${COLOR_GREEN}!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!${COLOR_OFF}"`, { cwd, stdio: 'inherit' });
    execa.shellSync( `echo "${COLOR_GREEN}!!! Please Update your npm packages 'npm i' !!!${COLOR_OFF}"`, { cwd, stdio: 'inherit' });
    execa.shellSync( `echo "${COLOR_GREEN}!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!${COLOR_OFF}"`, { cwd, stdio: 'inherit' });
  }
}