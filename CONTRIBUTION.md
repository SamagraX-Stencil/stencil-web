 ## Introduction

`Stencil UI` is a robust, open-source development UI library designed to revolutionize the creation of scalable and secure Web applications. Stencil UI is the a set of molecules which turns makes easier to use the common UI components into  production-ready code in a few minutes. We make our applications development easier with it, ensuring consistency, predictability, and adherence to the highest standards with code that’s built to scale.

Our user-friendly interface fosters seamless integration with APIs, data models, databases, authentication, and authorization. Built on a flexible, plugin-based architecture, Amplication allows effortless customization of the code and offers a diverse range of integrations.

With a strong focus on collaboration, Stencil UI streamlines team-oriented development, making it an ideal choice for groups of all sizes, from startups to large enterprises. Our UI Library enables you to concentrate on your business logic, while we handle the heavy lifting on the UI Side.

Experience the fastest way to develop  WEB Applications applications with Amplication.
## Table of Contents
- [Screenshot](#screenshot)
- [Demo](#demo)
- [Install](#install)
  - [As NPM package](#as-npm-package)
  - [Using a CDN](#using-a-cdn)
  - [Peer Dependencies](#peer-dependencies)
- [Usage](#usage) 
- [Development](#development)
- [License](#license)
- [Resources](#Resources)
- [Contributors](#contributors)


## Some Important Terminologies
### Molecules
A molecule is a compound component made up of various atoms. It represents a more intricate UI element designed to fulfill a specific function within an application's interface. For example, a JSON to Table or an OTP (One-Time Password) Input Molecule, each composed of multiple atoms to provide a comprehensive and functional unit.

All molecules currently supported can be viewed on this  [website](https://stencil-ui-templates.vercel.app/)
 

## Usage 

To get started with Stencil-UI, the hosted version of the product can be used to check what all the avaiable molecules. You can get started immediately at [stencil-ui-templates](https://stencil-ui-templates.vercel.app/).   The [website]( https://stencil-ui-templates.vercel.app) provides an overview of the application, additional information on the product and guides can be found in the [docs](https://stencil-docs.vercel.app/).

## Development
Pre-requisites
 
To be able to start development on StencilUI, make sure that you have the following prerequisites installed:

###
- Node.js
- Git
 
Running Stencil UI
 

> **Note**
> It is also possible to start development with GitHub Codespaces, when navigating to `< > Code`, select `Codespaces` instead of `Local`. Click on either the `+`-sign or the `Create codespace on master`-button.

Stencil UI uses a mono repo architecture - powered by <a href="https://turbo.build/repo">Turbo Repo</a> - where multiple applications and libraries exist in a single repository. To setup a local development environment the following steps can be followed:

**BEFORE** you run the following steps make sure:
1. You have typescript installed locally on you machine ```npm install -g typescript```
2. You are using a supported node version (check `engines` `node` in the [package.json](./package.json))
3. You are using a supported npm version (check `engines` `npm` in the [package.json](./package.json))
 


1. Clone the repository and install dependencies:
```shell
git clone  https://github.com/SamagraX-Stencil/stencil-web && cd stencil-web && npm install or yarn install
```

2. Run the setup script, which takes care of installing dependencies, building packages, and setting up the workspace:
```shell
npm run setup:dev
```

3. Option 1: Running the required infrastructure - view infrastructure component logs


```shell
npm run docker:dev
```
3. Option 2: Running the required infrastructure - run the infrastructure components in background
```shell
npm run docker:dev -- -d
```

4. Apply database migrations
```shell
npm run db:migrate:deploy
```

5. To start developing, run one or more of the applications available under `serve:[application]` scripts of the package.json.

```shell
# running the server component
npm run serve:server

# running the client component
npm run serve:client

# running the data-service-generator component
npm run serve:dsg

# running the git-sync-manager component
npm run serve:git

# running the plugin-api component
npm run serve:plugins
```

> **Note**
> In order to run the Amplication client properly, both the client and server need to be started by the `npm run serve:[application]` command, as well as an additional component for development on a specific component.

The development environment should now be set up. Additional information on the different application components can be found under packages/`[application]`/README.md file. Happy hacking! 👾
</details>

## Resources

- **[Website](https://stencil-ui-templates.vercel.app/)** overview of the product.
- **[Docs](https://stencil-docs.vercel.app/)** for comprehensive documentation.
- **[Discord](https: )** for support and discussions with the community and the team.
 
## Contributing

The Stencil-UI code is open-source. We are committed to a transparent development process and highly appreciate any contributions. Whether you are helping us fix bugs, proposing new features, improving our documentation or spreading the word - we would love to have you as a part of the Samagra community.  

- Bug Report: If you see an error message or encounter an issue while using Amplication, please create a [bug report]( https://github.com/SamagraX-Stencil/stencil-web/issues/new).

- Feature Request: If you have an idea or if there is a capability that is missing and would make development easier and more robust, please submit a [feature request]( https://github.com/SamagraX-Stencil/stencil-web/issues/new).

- Documentation Request: If you're reading the Stencil-UI docs and feel like you're missing something, please submit a [documentation request](https://github.com/SamagraX-Stencil/stencil-web/issues/new).

Not sure where to start? Join our discord and we will help you get started!
 

## License

A large part of this project is licensed under the [Apache 2.0](./LICENSE) license. The only exception are the components under the `ee` (enterprise edition) directory, these are licensed under the [Amplication Enterprise Edition](./ee/LICENSE) license.
