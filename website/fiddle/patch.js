console.log('Patching applaunchpad core js');

const replace = require('replace-in-file');
const options = {
  files: 'node_modules/@applaunchpad-project/core/applaunchpad.js',
  from: 'import(e)',
  to: 'import(/* webpackIgnore: true */ e)'
};

try {
  const results = replace.sync(options);
  console.log('Replacement results:', results);
} catch (error) {
  console.error('Error occurred:', error);
}
