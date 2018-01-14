### Generators

##### JHipster Entity Generator
 - Entity - `ignite generate entity <name>`
    - Prompts for the path to the entity's config (`.jhipster` folder in your app)
    - Generates all files needed for fetching and displaying the entity.
    - Includes the API endpoints, redux/saga config, and the user interface
 
##### Ignite Generators
This generator adds Ignite's usual generators to the mix as well.  We have access to:
 - Container - `ignite generate container <name>`
 - Component - `ignite generate component <name>`
 - Listview - `ignite generate listview <name>`
 - Redux - `ignite generate redux <name>`
 - Saga - `ignite generate saga <name>`
 - Screen - `ignite generate screen <name>`
 
### Plugins

Ignite also enables the generated project to add custom plugins.  The benefit of using a plugin is that it installs and links 
third party libraries automatically when adding to a project, you just need to run one command.  You can add a plugin with 
`ignite add plugin-name`.  

Examples of plugins include vector-icons, maps, i18n, firebase, and more.  You can find the [full list
of plugins](https://github.com/infinitered/ignite/blob/master/PLUGINS.md) in the main Ignite repository

Check out [Ignite's documentation](https://github.com/infinitered/ignite/tree/master/docs) for more details. 
