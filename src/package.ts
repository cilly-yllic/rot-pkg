import * as execa from 'execa';
import { Dependencies } from '../interface';

const PATH    = './package.json';

export default function ( cwd: string ): Dependencies | undefined {
  if ( execa.shellSync( `test -f ${PATH}`, { cwd, reject: false } ).failed ) {
    return undefined;
  }
  const json  = JSON.parse( execa.shellSync( `cat ${PATH}`, { cwd, reject: false }).stdout );
  return { ...json.dependencies || {}, ...json.devDependencies || {} }
}