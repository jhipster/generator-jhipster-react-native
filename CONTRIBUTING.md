# Contributing

## Git Repository Setup

Fork the repository and clone it to your workspace. Then add this repository as the upstream repository:

```sh
git remote add upstream https://github.com/ruddell/ignite-jhipster.git
```

### Generating an App

Generating an app using your local `ignite-jhipster` boilerplate is similar to normal. Pass the boilerplate directory as a flag like:

```sh
ignite new SampleApp -b /full/path/to/your/ignite-jhipster
```

**Note:** There is [an issue with relative paths](https://github.com/infinitered/ignite-ir-boilerplate/issues/107), please use a full path

### Making Changes to the Generator

#### Changing the Boilerplate

You can run `ignite generate upgrade` to re-run the templating phase of the boilerplate. This will add any changes made to the
`boilerplate` directory. These changes will also be reflected on a new app.

It's recommended to create and test the changes in a generated app, then transfer the changes to the boilerplate files. Use `git` to help track your progress.

#### Changing the Entity Generator

"Commands" are used for generating things after the app has already been created, such as entities, components, or styles.

- Commands are run by calling `ignite generate` and the command, sample commands include:
  - `ignite generate entity Foo`
  - `ignite generate upgrade`

To develop and test commands, you will need to link the code in your app's local `node_modules`.

```sh
# in your ignite-jhipster clone's folder
npm link
# in your generated app folder
npm link ignite-jhipster
```

After linking `ignite-jhipster`, running any of the `generate` commands will use your local clone's code.
