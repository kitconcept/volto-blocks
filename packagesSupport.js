#!/usr/bin/env node
/* eslint no-console: 0 */
/**
 * fixes mrs.developer.json to work with the current branch
 * @module packagesSupport
 */
const program = require('commander');
const fs = require('fs');

function amendMRSDeveloperJSON({ addon, branch }) {
  const mrsDeveloperJSON = JSON.parse(
    fs.readFileSync('mrs.developer.json', 'utf8'),
  );

  mrsDeveloperJSON[addon].branch = branch;

  fs.writeFileSync(
    'mrs.developer.json',
    `${JSON.stringify(mrsDeveloperJSON, null, 4)}`,
  );
}

// This is the equivalent of `if __name__ == '__main__'` in Python :)
if (require.main === module) {
  program
    .option('-a, --addon <addon>', 'the main addon repo')
    .option('-b, --branch <branch>', 'set the repo branch')
    .action((options) => {
      amendMRSDeveloperJSON({
        addon: options.addon,
        branch: options.branch,
      });
    });
  program.parse(process.argv);
}
