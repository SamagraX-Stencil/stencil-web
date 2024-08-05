# Kisai Bot

Kisai Bot is an advanced chatbot designed to assist farmers with various tasks farming techniques and problems. This application is based on [Stencil UI](https://github.com/SamagraX-Stencil/stencil-web) and it's components.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup](#setup)
- [Usage](#usage)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

## Project Structure

```
kisai-bot/
├── src/
│   ├── components/
│   │   ├── navbar
│   │       ├── index.tsx
│   │   ├── sidebar
│   │       ├── index.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── index.js
│   │   ├── login.js
│   │   └── ...
│   ├── styles/
│   │   ├── golbals.css
│   │
│   ├── utils/
│   │   ├── telemetry.ts
│   │   ├── location.ts
│   │   └── ...
│   └── ...
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
├── Dockerfile
├── app.config.json
└── ...
```

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- git

### Installation

1.  Clone the repository:

```bash
git clone https://github.com/BharatSahAIyak/kisai-bot.git
cd kisai-bot
```

2. Install dependencies:

```bash
 yarn install
```

3. Running Server

```bash
 yarn dev
```

## Usage

After setting up and running the application, you can access it at http://localhost:3000 (or the port specified in your environment variables). Follow the on-screen instructions to interact with the Kisai Bot.
![image](https://github.com/user-attachments/assets/b2583cd2-5180-47fc-b2e2-2fedfb229dae)

## Figma Link

The Figma Design Link for the Kisai-Bot ( [Figma Link](https://www.figma.com/design/RdtZTj500mtpGL97sLau9T/KSAI-Flow?node-id=166-2362&t=hI0KiIi4F2gBdH8y-0) ) where we regularly update the design and add new features.

## Contribution Guidelines

We welcome contributions to enhance the Kisai Bot. You can solve the issues that are currently present or raise an issue.

Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch with a descriptive name for your feature or fix.
3.  Make your changes and commit them to your new branch.
4.  Ensure your code passes all tests and adheres to the project's coding standards.
5.  Commit your changes with a clear and concise commit message.
6.  Push your changes to your forked repository.
7.  Create a pull request to the main repository, describing your changes and the purpose of the contribution.

## Reporting Issues

If you encounter any issues or have suggestions for improvements, please create an issue in the repository. Provide as much detail as possible to help us understand and address the issue.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
