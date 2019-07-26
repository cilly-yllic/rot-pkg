import { join } from 'path';
import { readJson, getDirs } from './fs';
import { isScoped } from './utils';
import { NodeModules } from './interface';

const getPackageJson    = ( path: string ) => readJson( `${path}/package.json` );

const getScopedPackages = ( path: string, file: string ): NodeModules => {

  const scopedPath      = join( path, file );
  const scopedPackages  = getDirs( scopedPath );
  if ( !scopedPackages ) {
    return {};
  }
  return scopedPackages.reduce( ( acc, scopedModulePath ) => {
    const json          = getPackageJson( join( scopedPath, scopedModulePath ) );
    if ( !json ) {
      return acc;
    }
    const scopeModuleKey = `${file}/${scopedModulePath}`;
    acc[ scopeModuleKey ] = {
      version: `${json.version || ''}`,
      resolved: `${json._resolved || ''}`
    };
    return acc;
  }, {} );
};

export default function ( cwd: string ): NodeModules {
  const modulePath  = join( cwd, './node_modules');
  const files       = getDirs( modulePath );
  if ( !files ) {
    return {};
  }
  return files.reduce( ( acc: NodeModules, file: string ): NodeModules => {
    if ( file.match( /^\./ ) ) {
      return acc;
    }
    if ( isScoped( file ) ) {
      return { ...acc, ...getScopedPackages( modulePath, file ) }
    }
    const json = getPackageJson( join( modulePath, file ) );
    if ( !json ) {
      return acc;
    }
    acc[ file ]     = {
      version: `${json.version || ''}`,
      resolved: `${json._resolved || ''}`
    };
    return acc;
  }, {} );
}
