function patchBabel() {
  this.patchInFile('babel.config.js', {
    after: 'presets',
    insert: "plugins: ['@babel/plugin-transform-export-namespace-from', 'react-native-reanimated/plugin'],",
    ignoreIfContains: 'react-native-reanimated',
  });
}

// eslint-disable-next-line import/prefer-default-export
export { patchBabel };
