import chalk from 'chalk';
import shelljs from 'shelljs';

/**
 * Get App Folders
 * @param input path to join to destination path
 * @returns {Array} array of string representing app folders
 */
function getAppFolder(input) {
  const destinationPath = this.destinationPath(input);
  const appsFolders = [];

  if (shelljs.test('-f', `${destinationPath}/.yo-rc.json`)) {
    try {
      const fileData = this.fs.readJSON(`${destinationPath}/.yo-rc.json`);
      if (fileData['generator-jhipster'].baseName !== undefined) {
        appsFolders.push(destinationPath);
      }
    } catch (err) {
      this.log(chalk.red(`The .yo-rc.json in ${destinationPath} can't be read!`));
      this.debug('Error:', err);
    }
  }

  return appsFolders;
}

export { getAppFolder };
