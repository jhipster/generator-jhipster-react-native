# Contributing

### Git Repository Setup

Fork the reporistory and clone it to your workspace.  Then add this repository as the upstream repository:

```
git remote add upstream https://github.com/ruddell/ignite-jhipster.git
```

### Generating an App

Generating an app using your local `ignite-jhipster` boilerplate is similar to normal, just pass the directory as a flag like:


```
ignite new SampleApp -b /full/path/to/your/ignite-jhipster
```

**Note:** There is [an issue with relative paths](https://github.com/infinitered/ignite-ir-boilerplate/issues/107), please use a full path 

### Making Changes to the Generator

 - Any changes you make in the `boilerplate` directory will be reflected on a fresh app.

It's recommended to create and test the changes in a generated app, then transfer the changes to the boilerplate files.  Use git to track your progress.  
   
 - Changes to the `commands` folder can be tested by running the command `ignite generate commandName commandArguments`.
 
Commands are used for generating things after the app has already been created such as components or styles.
