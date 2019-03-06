export const isJson       = (json ): boolean => {
  if ( typeof json !== 'string' ) {
    return false;
  }
  try {
    JSON.parse( json );
  } catch ( err ) {
    return false;
  }
  return true;
};

export const isScoped  = ( dir: string ): boolean => !!dir && dir.search( /^@/ ) !== - 1;

export const noChanges = ( { uninstalled, installed, updated } ): boolean => !Object.keys( uninstalled ).length && !Object.keys( installed ).length && !Object.keys( updated ).length;
