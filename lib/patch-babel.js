function patchBabel() {
  this.patchInFile('babel.config.js', {
    after: 'presets',
    insert: "plugins: ['react-native-reanimated/plugin'],",
    ignoreIfContains: 'react-native-reanimated',
  });
}

export {
  patchBabel,
};
