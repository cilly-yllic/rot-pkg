import { join } from 'path';
import { Dependencies } from './interface';
import { exists, readJson } from './fs';

const PATH    = './package.json';

export default function ( cwd: string ): Dependencies | undefined {
  const path = join( cwd, PATH );
  if ( !exists( path ) ) {
    return undefined;
  }
  const json  = readJson( path );
  return { ...json.dependencies || {}, ...json.devDependencies || {} }
}
