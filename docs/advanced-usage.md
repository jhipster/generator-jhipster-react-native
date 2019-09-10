## Advanced Usage

#### CLI Flags

You can pass flags for each of the options.

| Flag                     | Possible Values                | Action                                         |
| ------------------------ | ------------------------------ | ---------------------------------------------- |
| `--jh-dir`               | backend, ../backend            | The JHipster app's directory                   |
| `--jdl`                  | app.jdl                        | Pass a JDL file in place of an app directory   |
| `--detox`                | true, false                    | Enables Detox E2E tests                        |
| `--skip-git`             |                                | Skips git init                                 |
| `--skip-commit-hook`     |                                | Skips `lint-staged` initialization             |
| `--react-native-version` | 0.60.0                         | Install specific React Native version          |
| `--yarn                ` |                                | Uses yarn in place of npm when generating      |

#### JDL App Generation

You can pass a JDL file containing an application config (and optionally entities) to the command line to generate an app:

    ignite new JhipsterApp -b --jdl=jwt-mono.jdl --detox=true --skip-git

This will generate the full React Native project and import any entities present in the JDL.

**Note:** Ignite JHipster only supports JDL files containing a single application config.
