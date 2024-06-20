# Contribution Guide

Welcome to scripts! This guide will help you understand the purpose of the scripts in this repository and how to contribute to them.

## Table of Contents

- [Contribution Guide](#contribution-guide)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Scripts](#scripts)
    - [revert_files.sh](#revert_filessh)
    - [update_files.sh](#update_filessh)
    - [update_versions.sh](#update_versionssh)
  - [Usage](#usage)
    - [Running Scripts](#running-scripts)
    - [Script Descriptions](#script-descriptions)
      - [revert_files.sh](#revert_filessh-1)
      - [update_files.sh](#update_filessh-1)
      - [update_versions.sh](#update_versionssh-1)
  - [Contributing](#contributing)
    - [Adding New Scripts](#adding-new-scripts)
    - [Modifying Existing Scripts](#modifying-existing-scripts)
    - [Testing Changes](#testing-changes)
  - [Contact](#contact)

## Overview

This repository uses Turborepo to manage multiple packages. We have several scripts to help maintain package configurations, versions, and build processes. This guide will explain how these scripts work and how you can contribute to them.

## Scripts

### revert_files.sh

This script reverts the `package.json` files of specified packages to their original states by updating the `main` field and removing other fields (`module`, `types`, `exports`, `browser`, `style`, `typings`).

**Functionality:**

- Reverts the `main` field to its original value.
- Removes `module`, `types`, `exports`, `browser`, `style`, and `typings` fields from `package.json`.

### update_files.sh

This script updates the `package.json` files with new paths for the `main`, `module`, `types`, `exports`, `browser`, `style`, and `typings` fields.

**Functionality:**

- Adds or updates fields such as `main`, `module`, `types`, `exports`, `browser`, `style`, and `typings` with specified values.

### update_versions.sh

This script updates the version of the root `package.json` and all packages within the `packages` directory. It also updates internal dependencies to match the new version.

**Functionality:**

- Updates the `version` field in the root `package.json`.
- Updates the `version` field in each package’s `package.json`.
- Updates internal dependencies to the new version.

## Usage

### Running Scripts

To run any of the provided scripts, use the following commands:

- **Revert Files:**

  ```bash
  yarn revert-files
  ```

- **Update Files:**

  ```bash
  yarn update-files
  ```

- **Update Versions:**

  ```bash
  yarn update-versions
  ```

- **Publish Packages:**
  ```bash
  yarn publish-packages
  ```

### Script Descriptions

#### revert_files.sh

This script reverts changes made to the `package.json` files in the `packages` directory. It ensures that the `main` field is set to its original path and removes other specified fields.

#### update_files.sh

This script updates the paths in `package.json` files for the `main`, `module`, `types`, `exports`, `browser`, `style`, and `typings` fields as per the new build structure.

#### update_versions.sh

This script prompts the user for a new version number and updates the `version` field in the root `package.json` and all `package.json` files in the `packages` directory. It also updates internal dependencies to match the new version.

## Contributing

We welcome contributions to improve and enhance these scripts. Please follow the guidelines below to contribute effectively.

### Adding New Scripts

1. Create a new script in the `scripts` directory.
2. Ensure your script is executable:
   ```bash
   chmod +x scripts/your_script.sh
   ```
3. Add a description of your script in this README under the Scripts section.
4. Update the `scripts` section in `package.json` if necessary.

### Modifying Existing Scripts

1. Make your changes to the script.
2. Test your changes locally.
3. Update the corresponding description in this README if necessary.

### Testing Changes

1. Run the modified script to ensure it works as expected.
2. Check the output for errors or unexpected behavior.
3. If your script updates files, verify the changes in the affected files.

## Contact

If you have any questions or need further assistance, please contact the repository maintainers.
