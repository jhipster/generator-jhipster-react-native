## Advanced Usage

#### CLI Flags

You can pass flags for each of the options.

| Flag                     | Possible Values                | Action                                         |
| ------------------------ | ------------------------------ | ---------------------------------------------- |
| `--jh-dir`               | backend, ../backend            | The JHipster app's directory                   |
| `--e2e`                  | true, false                    | Enables Detox E2E tests                        |
| `--skip-git`             |                                | Skips git init                                 |
| `--skip-lint`            |                                | Skips `standard` initialization (linting)      |
| `--react-native-version` | 0.60.0                         | Install specific React Native version          |

#### JDL App Generation

You can pass a JDL file containing an application config (and optionally entities) to the command line to generate an app:

    ignite new JwtApp -b --jdl=jwt-mono.jdl --e2e=true --skip-git

This will generate the full React Native project and import any entities present in the JDL.
