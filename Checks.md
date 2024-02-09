### Project Template Requirements

To ensure consistency and quality in our development process, the following requirements are mandatory for any project template:

- **CI/CD Setup:** Every template must integrate Continuous Integration and Continuous Deployment (CI/CD) to streamline and automate our development workflows.

- **Conventional Commits:** We adopt Conventional Commits to facilitate automated semantic versioning and changelog generation. Commit messages should adhere to this specification.

- **Husky Integration:** Utilize Husky to enhance our Git hooks by enforcing the following actions:
  - Execute tests upon committing changes.
  - Automatically update the package version when commits are pushed to the main branch.
  - Ensure code quality by running ESLint and Prettier.
  - **Additional Husky configurations may be required depending on the project's specific needs.

- **Testing Frameworks:** Implement Cypress and React Testing Library for end-to-end and component testing, respectively. Every page should be covered by relevant tests.

- **Code Style and Quality:** Projects must be configured with [Samagra UI Configs](https://www.npmjs.com/package/samagra-ui-configs) to apply standardized ESLint and Prettier rules.

- **Naming Convention and Folder Structure:** Adhere to our guide (to be updated) for consistent naming conventions and organizational practices.

- **Design System Limitation:** Use Material UI as the primary design system. Exceptions are made for bots, which may also incorporate Chat-UI.

### Developer Checklist

- Ensure there are no linting warnings.
- All tests must pass before proceeding with a pull request.
- Use Conventional Commits for all commit messages, ensuring they convey the changes effectively.
- For new features or work, create a separate branch, then raise a Pull Request (PR) towards the development branch, including all team members for review.
- PR Merging Authority: Only Abhishek, Chakshu, or Karn are authorized to merge code into the main branch. GitHub rules will be configured to enforce this policy.
- PR Approval Requirement: A minimum of two approvals is necessary for a PR to be eligible for merging.
- Feature Testing: Accompany new features with corresponding test cases to maintain and ensure code quality.

**Note:** This document will be updated with additional points. Contributions and suggestions for improvements are welcome.
