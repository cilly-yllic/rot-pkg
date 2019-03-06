import { existsSync, readFileSync, lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { warning } from './log';
import { isJson } from './utils';

export const exists     = ( path: string ): boolean => existsSync( path );
export const readFile   = ( path: string ) => exists( path ) && readFileSync( path );
export const readTxt    = ( path: string ) => exists( path ) && readFileSync( path, 'utf8' );
export const readJson   = ( path: string ) => {
  const isNotJson = undefined;
  if ( path.search( /\/?.+.json$/ ) === - 1 ) {
    warning( `File: ${path} is not JSON file extension` );
    return isNotJson;
  }
  if ( !exists( path ) ) {
    warning( `File: ${path} does not exist` );
    return isNotJson;
  }
  const value     = readFile( path ).toString();
  if ( !value || !isJson( value ) ) {
    warning( `File: ${path} is not JSON` );
    return isNotJson;
  }
  return JSON.parse( value );
};

export const isDir      = ( path: string ): boolean => lstatSync( path ).isDirectory();
export const getDirs    = ( path: string ): string[] => readdirSync( path ).filter( dir => isDir( join( path, dir ) ) );
