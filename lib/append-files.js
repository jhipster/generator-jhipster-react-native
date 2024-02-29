function appendFiles() {
  this.editFile(
    '.gitignore',
    content => `${content}
# Misc
.env
ios/Index/DataStore
ios/Carthage
ios/Pods
/dist
.artifacts
e2e/Exponent.app
.yo-repository
`,
  );
}

// eslint-disable-next-line import/prefer-default-export
export { appendFiles };
