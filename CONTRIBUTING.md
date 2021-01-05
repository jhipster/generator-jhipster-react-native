# Contributing

## Git Repository Setup

Fork the repository and clone it to your workspace. Then add this repository as the upstream repository:

```sh
git remote add upstream https://github.com/ruddell/jhipster-react-native.git
```

## Running Local Blueprint for Development

During development of blueprint, please note the below steps. They are very important.

1. Link your blueprint globally

```bash
cd jhipster-react-native
npm link
```

2. Link a development version of JHipster to your blueprint (optional: required only if you want to use a non-released JHipster version, like the main branch or your own custom fork)

```bash
cd generator-jhipster
npm link

cd jhipster-react-native
npm link generator-jhipster
```

## Generating an App

Generating an app using your local `jhipster-react-native` blueprint is similar to normal.

```sh
jhipster --blueprints react-native
```

## Making Changes to the Generator

It's recommended to create and test the changes in a generated app, then transfer the changes to the boilerplate files. Use `git` to help track your progress.

When generating an app, make sure to link the blueprint after installing `node_modules`.

```sh
# in your generated app folder
npm link generator-jhipster-react-native
```

After linking `generator-jhipster-react-native`, running any of the subgenerators (such as `entity` or `import-jdl`) will use your local blueprint code.
