function patchUriScheme() {
    const appConfig = this.fs.readJSON('app.json');
    appConfig.expo.scheme = this.context.reactNativeAppName.toLowerCase();
    this.fs.writeJSON('app.json', appConfig);
}

module.exports = {
    patchUriScheme,
};
