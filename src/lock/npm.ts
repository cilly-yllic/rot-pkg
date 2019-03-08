import { join } from 'path';
import { exists, readJson } from '../fs';
import { success, warning } from '../log';
import { Modules } from '../interface';

const PATH = './package-lock.json';

export default function ( cwd: string ): Modules | undefined {
  const path = join( cwd, PATH );
  if ( !exists( path ) ) {
    warning( `cannot find ${path} file` );
    return undefined;
  }

  success( `read ${path} file` );

  const json          = readJson( path );
  if ( !json ) {
    return {};
  }
  const dependencies  = json.dependencies;
  return Object.keys( dependencies ).reduce( ( acc, key ) => {
    acc[key] = {
      resolved: dependencies[key].resolved || dependencies[key].version,
      version: dependencies[key].version,
    };
    return acc;
  }, {} );
}
