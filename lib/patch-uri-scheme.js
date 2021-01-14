function patchUriScheme() {
    const appConfig = this.fs.readJSON('app.json');
    appConfig.expo.scheme = this.context.reactNativeAppName.toLowerCase();
    appConfig.expo.extra = {};
    this.fs.writeJSON('app.json', appConfig);
}

module.exports = {
    patchUriScheme,
};
