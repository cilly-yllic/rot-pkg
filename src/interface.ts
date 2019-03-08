export interface Dependencies {
  [key: string]: string;
}

export interface Modules {
  [key: string]: {
    version: string | string [];
    resolved: string | string[];
  };
}

export interface NodeModules {
  [key: string]: {
    version: string;
    resolved: string;
  };
}
