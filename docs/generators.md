## Generators

### Entity

```sh
jhipster --blueprints react-native entity <name>
```

- Prompts for the path to the entity's config (`.jhipster` folder in your app)
- Generates all files needed for fetching and displaying the entity
- Includes the API endpoints, redux/saga config, and the user interface

### Import JDL

```sh
jhipster --blueprints react-native jdl <jdl-filename>
```

- Import several entities at once using JDL
- Runs the entity generator for each entity present in the JDL
- Can also generate a full application with entities, if the JDL contains application config
