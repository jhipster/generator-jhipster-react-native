# JHipster React Native - UNDER DEVELOPMENT

[![NPM version](https://badge.fury.io/js/generator-jhipster-react-native.svg)](https://npmjs.org/package/generator-jhipster-react-native)
[![iOS-E2E](https://github.com/ruddell/jhipster-react-native/workflows/iOS-E2E/badge.svg?branch=main)](https://github.com/ruddell/jhipster-react-native/actions?query=workflow%3AiOS-E2E)
[![Android-E2E](https://github.com/ruddell/jhipster-react-native/workflows/Android-E2E/badge.svg?branch=main)](https://github.com/ruddell/jhipster-react-native/actions?query=workflow%3AAndroid-E2E)
[![Generator](https://github.com/ruddell/jhipster-react-native/workflows/Generator/badge.svg?branch=main)](https://github.com/ruddell/jhipster-react-native/actions?query=workflow%3AGenerator)
[![App](https://github.com/ruddell/jhipster-react-native/workflows/App/badge.svg?branch=main)](https://github.com/ruddell/jhipster-react-native/actions?query=workflow%3AApp)

> React Native Blueprint for existing JHipster Apps - UNDER DEVELOPMENT

# Introduction

This is a [JHipster](https://www.jhipster.tech/) blueprint, that is meant to be used with an existing JHipster backend.

# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) blueprint, we expect you have JHipster and its related tools already installed:

-   [Installing JHipster](https://www.jhipster.tech/installation/)

# Installation

## With NPM/Yarn

To install this blueprint:

```bash
npm install -g generator-jhipster-react-native

yarn global add generator-jhipster-react-native
```

To update this blueprint:

```bash
npm update -g generator-jhipster-react-native

yarn global upgrade generator-jhipster-react-native
```

# Usage

To use this blueprint, run the below command

```bash
jhipster --blueprints react-native
```

## Running local Blueprint version for development

During development of blueprint, please note the below steps. They are very important.

1. Link your blueprint globally

Note: If you do not want to link the blueprint(step 3) to each project being created, use NPM instead of Yarn as yeoman doesn't seem to fetch globally linked Yarn modules. On the other hand, this means you have to use NPM in all the below steps as well.

```bash
cd jhipster-react-native
npm link
```

2. Link a development version of JHipster to your blueprint (optional: required only if you want to use a non-released JHipster version, like the master branch or your own custom fork)

You could also use Yarn for this if you prefer

```bash
cd generator-jhipster
npm link

cd jhipster-react-native
npm link generator-jhipster
```

3. Create a new folder for the app to be generated and link JHipster and your blueprint there

```bash
mkdir my-app && cd my-app

npm link generator-jhipster-react-native
npm link generator-jhipster (Optional: Needed only if you are using a non-released JHipster version)

jhipster -d --blueprints react-native

```

# License

Apache-2.0 © [Jon Ruddell](https://jruddell.com/)
