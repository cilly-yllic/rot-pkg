import { join } from 'path';
import { exists, readTxt } from '../fs';
import { success, warning } from '../log';
import { Modules } from '../interface';

const PATH = './yarn.lock';

export default function ( cwd: string ): Modules | undefined {
  const path            = join( cwd, PATH );
  if ( !exists( path ) ) {
    warning( `cannot find ${path} file` );
    return undefined;
  }

  success( `read ${path} file` );

  const lock            = readTxt( path ) || '';
  const dependencies    = lock.replace( /^#.*/gm, '' ).split( /\n\n/ ).filter( v => !!v );
  return dependencies.reduce( ( acc, current ) => {

    const firstLine     = current.split( /\n|,/ ).shift();
    if ( !firstLine ) {
      return acc;
    }
    const module        = firstLine.match( /^"?(.+)@/ );
    const version       = current.match( /\n\s*version\s+?"([^"]+)"/ );
    if ( !module || !version ) {
      return acc;
    }
    const moduleName    = module[1];
    if ( !acc[ moduleName ] ) {
      acc[ moduleName ] = [];
    }
    acc[ moduleName ].push( version[1] );
    return acc;
  }, {} );
}
