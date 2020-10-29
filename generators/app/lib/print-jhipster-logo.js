const chalk = require('chalk');

const packagejs = require('../../../package.json');

const printJHipsterLogo = context => {
    context.log('\n');
    context.log(`${chalk.cyan('                         ██╗ ██╗  ██╗')}${chalk.green('        ')}${chalk.red('██████╗  ███╗   ██╗  ')}`);
    context.log(`${chalk.cyan('                         ██║ ██║  ██║')}${chalk.green('        ')}${chalk.red('██╔══██╗ ████╗  ██║  ')}`);
    context.log(`${chalk.cyan('                         ██║ ███████║')}${chalk.green(' █████╗ ')}${chalk.red('██████╔╝ ██╔██╗ ██║  ')}`);
    context.log(`${chalk.cyan('                   ██╗   ██║ ██╔══██║')}${chalk.green(' ╚════╝ ')}${chalk.red('██╔══██╗ ██║╚██╗██║  ')}`);
    context.log(`${chalk.cyan('                   ╚██████╔╝ ██║  ██║')}${chalk.green('        ')}${chalk.red('██║  ██║ ██║ ╚████║  ')}`);
    context.log(`${chalk.cyan('                    ╚═════╝  ╚═╝  ╚═╝')}${chalk.green('        ')}${chalk.red('╚═╝  ╚═╝ ╚═╝  ╚═══╝  ')}\n`);
    context.log(chalk.white.bold('                            https://www.jhipster.tech\n'));
    context.log(chalk.white('Welcome to JHipster React Native ') + chalk.yellow(`v${packagejs.version}`));
    context.log(chalk.white(`Application files will be generated in folder: ${chalk.yellow(process.cwd())}`));
    context.log(
        chalk.green(' _______________________________________________________________________________________________________________\n')
    );
    context.log(
        chalk.white(
            `  Documentation for creating an application is at ${chalk.yellow(
                'https://github.com/ruddell/jhipster-react-native/docs/creating-an-app/'
            )}`
        )
    );
    context.log(
        chalk.white(
            `  If you find JHipster React Native useful, consider sponsoring the project at ${chalk.yellow(
                'https://opencollective.com/generator-jhipster'
            )}`
        )
    );
    context.log(
        chalk.green(' _______________________________________________________________________________________________________________\n')
    );
};

module.exports = { printJHipsterLogo };
