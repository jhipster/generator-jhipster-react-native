### Generators

##### Custom Generators
 - Entity - `ignite generate entity <name>`
    - Prompts for the path to the entity's config (`.jhipster` folder in your app)
    - Generates all files needed for fetching and displaying the entity
    - Includes the API endpoints, redux/saga config, and the user interface
 - Import JDL - `ignite generate import-jdl <jdl-filename>`
    - Import several entities at once using JDL
    - Runs the entity generator for each entity present in the JDL
 - Upgrade - `ignite generate upgrade`
    - Upgrades your generated app to the latest template code
    - Use a branch to merge just the updates into your code
 
### External Plugins

Ignite also enables the generated project to add custom plugins.  The benefit of using a plugin is that it installs and links 
third party libraries automatically when adding to a project, you just need to run one command.  You can add a plugin with 
`ignite add plugin-name`.  

Examples of plugins include maps, i18n, firebase, and more.  You can find the [full list
of plugins](https://github.com/infinitered/ignite/blob/master/PLUGINS.md) in the main Ignite repository.  Note that if
 you have an issue with one of the external plugins, please report it on that plugin's GitHub repository

Check out [Ignite's documentation](https://github.com/infinitered/ignite/tree/master/docs) for more details. 
