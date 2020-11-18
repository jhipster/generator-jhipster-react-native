const utils = require('generator-jhipster/generators/utils');

function mergeReactNativePackageJson() {
    const done = this.async();
    // get react-native generated package.json (using fse here to avoid file-not-found from yo's fs)
    const rnPackageJson = this.fs.readJSON('package.json');
    // get templated package.json
    const _this = this;
    this.debug('Templating package.json.ejs...');
    utils.renderContent('package.json.ejs', _this, _this, {}, templatedPackageJsonAsString => {
        const mergedPackageJson = JSON.parse(templatedPackageJsonAsString);
        // merge these sections, with a precedence to the our templated version
        const keys = ['scripts', 'dependencies', 'devDependencies'];
        // loop through the keys
        keys.forEach(packageJsonSectionKey => {
            // get the section of the package.json from the react-native package
            const packageJsonSection = rnPackageJson[packageJsonSectionKey];
            this.debug(`Updating package.json section: ${packageJsonSectionKey}`);
            // loop through the keys in the package.json section
            Object.keys(packageJsonSection).forEach(key => {
                this.debug(`Checking for: ${packageJsonSectionKey}.${key}`);
                // if the templated package.json does not have the key, add it to the merged package.json
                // if the templated package.json has the key, it means we overwrote that section in the template
                if (!Object.prototype.hasOwnProperty.call(mergedPackageJson[packageJsonSectionKey], key)) {
                    this.debug(`Adding ${key}: ${packageJsonSection[key]} to ${packageJsonSectionKey} from RN package.json`);
                    mergedPackageJson[packageJsonSectionKey][key] = packageJsonSection[key];
                }
            });
        });

        this.fs.writeJSON('package.json', mergedPackageJson);
        this.debug("package.json merged with React Native's package.json");
        done();
    });
}
module.exports = {
    mergeReactNativePackageJson,
};
