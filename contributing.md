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

#### Changing the Boilerplate

Any changes you make in the `boilerplate` directory will be reflected on a fresh app.

It's recommended to create and test the changes in a generated app, then transfer the changes to the boilerplate files.  Use `git` to help track your progress.  

#### Changing the Commands

"Commands" are used for generating things after the app has already been created, such as entities, components, or styles.

 - Commands are un by calling `ignite generate` and the command, sample commands include:
   - `ignite generate entity Foo`
   - `ignite generate screen FooScreen`
   - `ignite generate component FooComponent`
   - `ignite generate container FooContainer`
 
To develop and test commands, you will need to update the code in your app's local `node_modules`. Copy the folder directly:
 
 ```
 cp /full/path/to/your/ignite-jhipster ./node_modules/
 ```
This will be easier in the future, once Ignite supports symlinks for commands (TODO: open issue or figure this out) 
