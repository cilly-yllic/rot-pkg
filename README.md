# Rot Pkg

## Installation

```bash
$ npm i -D rot-pkg
```

## What is this

This package check difference of package.json and you already installed.

Then you probably need to do `npm i`

---

When you use this package, you don't have to say this anymore in your project.
 
> when you `git pull`, please `npm i`


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

## when you don't need `npm i` 
![2019-01-26 19 06 16](https://user-images.githubusercontent.com/16274232/51785842-69335800-219f-11e9-94b4-ac95e7931c78.png)

## when you need `npm i`
![2019-01-26 19 11 56](https://user-images.githubusercontent.com/16274232/51785843-6d5f7580-219f-11e9-9e22-5700935f199d.png)

## Package Type
- root package ( npm, yarn )
- Angular library packages

# Feat

- Unit test
