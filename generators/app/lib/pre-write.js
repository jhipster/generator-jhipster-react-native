const fs = require('fs-extra');
// prettierrc and yo-resolve files are created manually so they apply to the generation process
function createEarlyFiles() {
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
    fs.writeFile('.prettierrc.js', prettierRc);
    const yoResolve = `.* force
**/* force`;
    fs.writeFile('.yo-resolve', yoResolve);
}

function removeYoResolve() {
    fs.remove('.yo-resolve');
}
module.exports = {
    createEarlyFiles,
    removeYoResolve,
};
