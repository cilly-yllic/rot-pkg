import index from './index';
import * as path from 'path';

const [ ,cwd ] = process.argv;

index( path.join( cwd, '..' ) );