import BaseGenerator from 'generator-jhipster/generators/base';
import { convertToGitHubMatrix, getGithubOutputFile, getGithubSamplesGroup, setGithubTaskOutput } from 'generator-jhipster/testing';

export default class extends BaseGenerator {
  /** @type {string} */
  samplesFolder;
  /** @type {string} */
  matrix;

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
        const { include } = convertToGitHubMatrix(samples);
        this.matrix = JSON.stringify({
          include: include.map(i => ({
            ...i,
            ...(i.sample.includes('oauth2')
              ? { os: 'macos-13', 'default-environment': 'prod' }
              : { os: 'macos-15', 'default-environment': 'dev' }),
          })),
        });
        const githubOutputFile = getGithubOutputFile(this.matrix);
        this.log.info('matrix', this.matrix);
        if (githubOutputFile) {
          setGithubTaskOutput('matrix', this.matrix);
        }
      },
    });
  }
}
