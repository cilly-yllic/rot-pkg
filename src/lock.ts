import getNpm from './lock/npm';
import getYarn from './lock/yarn';

import { Modules } from './interface';

export type Type = 'npm' | 'yarn';

export default function ( cwd: string, type: Type ): Modules | undefined {
  switch( type ) {
    case 'npm':
    default:
      return getNpm( cwd );
    case 'yarn':
      return getYarn( cwd );
  }
}
