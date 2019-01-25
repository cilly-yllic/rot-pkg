# Rot Pkg

## Installation

```bash
$ npm i -D rot-pkg
```

## What is this

This package check difference of package.json and you already installed.

Then you probably need to do `npm i`

## with [husky](https://github.com/typicode/husky) might help you

```bash
$ npm i -D husky
``` 

```json
{
  "hooks": {
    "post-merge": "rot-pkg"
  }
}
```


## After run rot-pkg and only when you need to do `npm i` 

```
----- uninstalled -----
 some-package-name

----- installed -----
 some-package-name

----- updated -----
 some-package-name
 
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!! Please Update your npm packages 'npm i' !!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
```