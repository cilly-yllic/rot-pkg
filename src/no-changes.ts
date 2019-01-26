import { Changes } from '../interface';

export default function run( { uninstalled, installed, packageLockUpdated, yarnLockUpdated }: Changes ): boolean {
  return !Object.keys( uninstalled ).length && !Object.keys( installed ).length && !Object.keys( packageLockUpdated ).length && !Object.keys( yarnLockUpdated ).length;
}