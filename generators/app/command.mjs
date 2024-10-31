import { asCommand } from 'generator-jhipster';

export default asCommand({
  options: {
    reactNativeDir: {
      desc: 'Directory of JHipster application',
      type: String,
      scope: 'blueprint',
    },
  },
});
