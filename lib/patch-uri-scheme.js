function patchUriScheme() {
    const appConfig = this.fs.readJSON('app.json');
    appConfig.expo.scheme = this.context.reactNativeAppName.toLowerCase();
    appConfig.expo.extra = { detox: false };
    this.fs.writeJSON('app.json', appConfig);
}

module.exports = {
    patchUriScheme,
};
