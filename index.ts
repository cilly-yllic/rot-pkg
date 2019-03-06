import { join } from 'path';

import { info } from './src/log';
import angularLibrary from './src/angular-library';
import changes from './src/changes';


export default function ( cwd: string = join( __dirname, '../..' ) ): void {
  info( '> run rot-pkg' );
  changes( cwd );
  angularLibrary( cwd );
  info( '> done rot-pkg' );
}
