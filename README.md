# Stencil Ui

Welcome to the Stencil Ui repository! This repository is designed to help streamline your development workflow by managing multiple projects within a single repository. Below you'll find instructions on how to set up, use, and maintain this monorepo.

## Table of Contents

1. [Introduction](#introduction)
2. [Structure](#structure)
3. [Getting Started](#getting-started)
4. [Scripts](#scripts)
5. [Contributing](#contributing)
6. [License](#license)

## Introduction

This monorepo is set up to manage multiple projects and packages efficiently. By consolidating projects into a single repository, we can share common configurations, scripts, and dependencies, making the development process more streamlined and cohesive.

## Structure

The repository is organized as follows:

```
stencil-ui/
stencil-ui/
├── packages/
│   ├── molecules/
│   ├── pages/
│   ├── config-manager/
│   ├── hooks/
│   └── provider/
├── apps/
│   ├── all-molecule-example/
│   └── bot-app/
├── node_modules/
├── package.json
├── turbo.json
└── README.md


```

- `packages/`: Contains shared libraries and modules.
- `apps/`: Contains the different applications.
- `node_modules/`: Automatically generated directory containing installed dependencies.
- `package.json`: Contains metadata about the project and dependencies.
- `turbo.json`: Configuration file for Turborepo.
- `README.md`: This file.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Lerna](https://lerna.js.org/) (if using Lerna)
- [Turborepo](https://turborepo.org/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/my-monorepo.git
   cd my-monorepo
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. To start the local development
   ```bash
   turbo dev
   ```

## Scripts

Common scripts you can use in this monorepo are defined in the root `package.json`. Here are a few examples:

- `build`: Builds all packages and applications.

  ```bash
  npm run build
  # or
  yarn build
  ```

- `test`: Runs tests for all packages and applications.

  ```bash
  npm test
  # or
  yarn test
  ```

- `lint`: Lints all packages and applications.

  ```bash
  npm run lint
  # or
  yarn lint
  ```

Additional scripts specific to individual packages or applications can be found in their respective directories.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

Please ensure your code adheres to the project's coding standards and passes all tests before submitting a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using My Monorepo! If you have any questions or feedback, feel free to open an issue.
