export interface Dependencies {
  [key: string]: string;
}

export declare namespace Map {
  interface Uninstalled {
    [key: string]: string
  }

  interface Updated {
    [key: string]: {
      before: string;
    };
  }

  interface LockUpdated {
    [key: string]: {
      before: string;
      after: string;
    };
  }

  interface Installed {
    [key: string]: string;
  }
}

export interface Changes {
  packageDependencies: Dependencies;
  uninstalled: Map.Uninstalled;
  installed: Map.Installed;
  packageLockUpdated: Map.LockUpdated;
  yarnLockUpdated: Map.LockUpdated;
}

export interface ProjectChanges {
  project: string;
  uninstalled: Map.Uninstalled;
  installed: Map.Installed;
  packageLockUpdated: Map.LockUpdated;
  yarnLockUpdated: Map.LockUpdated;
}

export type ProjectsChanges = ProjectChanges[];