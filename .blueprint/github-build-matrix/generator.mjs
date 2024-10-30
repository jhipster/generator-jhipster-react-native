import BaseGenerator from 'generator-jhipster/generators/base';
import { convertToGitHubMatrix, getGithubOutputFile, getGithubSamplesGroup, setGithubTaskOutput } from 'generator-jhipster/testing';

export default class extends BaseGenerator {
  /** @type {string} */
  samplesFolder;

  constructor(args, opts, features) {
    super(args, opts, { ...features, queueCommandTasks: true, jhipsterBootstrap: false });
  }

  get [BaseGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      async buildMatrix() {
        const { samplesFolder } = this;
        const { samples, warnings } = await getGithubSamplesGroup(this.templatePath('../../generate-sample/templates/'), samplesFolder);
        if (warnings.length > 0) {
          this.info(warnings.join('\n'));
        }
        const matrix = JSON.stringify(convertToGitHubMatrix(samples));
        const githubOutputFile = getGithubOutputFile(matrix);
        this.log.info('matrix', matrix);
        if (githubOutputFile) {
          setGithubTaskOutput('matrix', matrix);
        }
      },
    });
  }
}
