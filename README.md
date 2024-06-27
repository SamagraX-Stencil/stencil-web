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
│   ├── chatui/
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
- [Yarn](https://yarnpkg.com/)
- [Turborepo](https://turborepo.org/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SamagraX-Stencil/stencil-web.git
   cd stencil-web
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. To start the local development

- first create build of all packages using

```
turbo build
```

- now start the project

```bash
turbo dev
```

- above command will start all bot-app/ and all-molecule-example/ on the 7001 and 3001 port respectively

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
