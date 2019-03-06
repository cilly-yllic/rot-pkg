export interface Dependencies {
  [key: string]: string;
}

export interface Modules {
  [key: string]: string[] | string;
}

export interface NodeModules {
  [key: string]: {
    version: string;
    resolved: string;
  };
}
