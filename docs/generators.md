## Generators

### Entity

```sh
ignite generate entity <name>
```

- Prompts for the path to the entity's config (`.jhipster` folder in your app)
- Generates all files needed for fetching and displaying the entity
- Includes the API endpoints, redux/saga config, and the user interface

### Import JDL

```sh
ignite generate import-jdl <jdl-filename>
```

- Import several entities at once using JDL
- Runs the entity generator for each entity present in the JDL

### Upgrade

```sh
ignite generate upgrade
```

- Upgrades your generated app to the latest template code. Make sure to upgrade `ignite-jhipster` in your `package.json` first.
- It's recommended to use `git` and branches to merge changes into your code.
  - The command below will keep all of your changes while merging any updates. If there are conflicts, you will need to manually merge the changes.
  - `git merge -s recursive -Xours <branch name>`
