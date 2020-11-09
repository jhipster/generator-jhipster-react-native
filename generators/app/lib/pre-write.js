const fse = require('fs-extra');
// prettierrc and yo-resolve files are created manually so they apply to the generation process
function createEarlyFiles() {
    // if (this.existingProject) {
    //     return;
    // }
    const prettierRc = `module.exports = {
  bracketSpacing: false,
  jsxBracketSameLine: true,
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  printWidth: 140,
  tabWidth: 2,
  bracketSpacing: true,
  useTabs: false
};
`;
    fse.writeFile('.prettierrc.js', prettierRc);
    const yoResolve = `.* force
**/* force`;
    fse.writeFile('.yo-resolve', yoResolve);
}

function removeYoResolve() {
    // if (!this.existingProject) {
    //     fse.remove('.yo-resolve');
    // }
}
module.exports = {
    createEarlyFiles,
    removeYoResolve,
};
