const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));
const dir = args.d;

dir
  ? fs.rm(dir, { recursive: true, force: true }, () => {
      console.info(`Removed ${dir}`);
    })
  : console.info('No dir supplied.');
