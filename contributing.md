# Contributing

### Git Repository Setup

Fork the reporistory and clone it to your workspace.  Then add this repository as the upstream repository:

```
git remote add upstream https://github.com/ruddell/ignite-jhipster.git
```
To use your local copy of `ignite-jhipster` instead of the version published on NPM, run the following command one directory up from `ignite-jhipster`.  

```
export IGNITE_PLUGIN_PATH=$(pwd) 
```

For example, if  you cloned into `/home/ruddell/ignite-jhipster`, run that command in `/home/ruddell`.  After running, any command in the same terminal will use the local `ignite-jhipster`

### Generating an App

Generating an app using the `ignite-jhipster` boilerplate is the same as normal:


```
ignite new SampleApp --boilerplate ignite-jhipster
```

### Making Changes to the Generator

 - Any changes you make in the `boilerplate` directory will be reflected on a fresh app.

It's recommended to create and test the changes in a generated app, then transfer the changes to the boilerplate files.  Use git to track your progress.  
   
 - Changes to the `commands` folder can be tested by running the command `ignite generate commandName`.
 
Commands are used for generating things after the app has already been created such as components or styles.  The entity generator will eventually be a a command.