import { join } from 'path';

import { info } from './src/log';
import { Type } from './src/lock';
import angularLibrary from './src/angular-library';
import changes from './src/changes';


export default function ( cwd: string = join( __dirname, '../..' ), type: Type = 'npm' ): object {
  info( '> run rot-pkg' );
  const pkgResults = changes( cwd, type );
  const angularResults = angularLibrary( cwd, type );
  info( '> done rot-pkg' );
  return {
    packages: pkgResults,
    angular: angularResults,
  };
}
