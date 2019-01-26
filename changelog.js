const changelog = require('conventional-changelog');
const fs        = require('fs');

changelog({
  preset: 'angular',
  releaseCount: 0
})
  .pipe(fs.createWriteStream('./CHANGELOG.md'));