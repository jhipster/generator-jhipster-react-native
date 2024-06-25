import { readFileSync } from 'fs';
import chalk from 'chalk';

const fileUrl = new URL('../package.json', import.meta.url);
const packagejs = JSON.parse(readFileSync(fileUrl));

const printJHipsterLogo = () => {
  console.log('\n');
  console.log(`${chalk.cyan('                         ██╗ ██╗  ██╗')}${chalk.green('        ')}${chalk.red('██████╗  ███╗   ██╗  ')}`);
  console.log(`${chalk.cyan('                         ██║ ██║  ██║')}${chalk.green('        ')}${chalk.red('██╔══██╗ ████╗  ██║  ')}`);
  console.log(`${chalk.cyan('                         ██║ ███████║')}${chalk.green(' █████╗ ')}${chalk.red('██████╔╝ ██╔██╗ ██║  ')}`);
  console.log(`${chalk.cyan('                   ██╗   ██║ ██╔══██║')}${chalk.green(' ╚════╝ ')}${chalk.red('██╔══██╗ ██║╚██╗██║  ')}`);
  console.log(`${chalk.cyan('                   ╚██████╔╝ ██║  ██║')}${chalk.green('        ')}${chalk.red('██║  ██║ ██║ ╚████║  ')}`);
  console.log(`${chalk.cyan('                    ╚═════╝  ╚═╝  ╚═╝')}${chalk.green('        ')}${chalk.red('╚═╝  ╚═╝ ╚═╝  ╚═══╝  ')}\n`);
  console.log(chalk.white.bold('                            https://www.jhipster.tech\n'));
  console.log(chalk.white('Welcome to JHipster React Native ') + chalk.yellow(`v${packagejs.version}`));
  console.log(chalk.white(`Application files will be generated in folder: ${chalk.yellow(process.cwd())}`));
  console.log(
    chalk.green(' _______________________________________________________________________________________________________________\n'),
  );
  console.log(
    chalk.white(
      `  Documentation for creating an application is at ${chalk.yellow(
        'https://github.com/jhipster/generator-jhipster-react-native/blob/main/README.md#getting-started',
      )}`,
    ),
  );
  console.log(
    chalk.white(
      `  If you find JHipster React Native useful, consider sponsoring the project at ${chalk.yellow(
        'https://opencollective.com/generator-jhipster',
      )}`,
    ),
  );
  console.log(
    chalk.green(' _______________________________________________________________________________________________________________\n'),
  );
};

export { printJHipsterLogo };
