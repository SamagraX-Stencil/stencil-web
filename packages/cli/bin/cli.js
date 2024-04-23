#!/usr/bin/env node
/* eslint-env node */
import dotenv from 'dotenv'
dotenv.config()

import('inquirer')
  .then((inquirerModule) => {
    import('../index.js').then(
      async ({ fetchComponentsList, copyComponent }) => {
        async function main() {
          try {
            const { componentType } = await inquirerModule.default.prompt([
              {
                type: 'list',
                name: 'componentType',
                message: 'Select what you want to import: pages or molecules:',
                choices: ['pages', 'molecules'],
              },
            ])
            if (componentType == '') {
              console.log('You have not selected any option')
              return
            }

            console.log(`Selected Component is ${componentType}`)

            const owner = process.env.GITHUB_OWNER // Replace with the actual GitHub username
            const repo = process.env.GITHUB_REPO // Replace with the actual GitHub repository name
            const branch = process.env.GITHUB_BRANCH // Assuming 'main' is your default branch
            // Correctly pass the owner and repo to the fetchComponentsList function

            const components = await fetchComponentsList(
              owner,
              repo,
              branch,
              componentType
            )
            if (components.length === 0) {
              console.log('No components found in the repository.')
              return
            }

            const answers = await inquirerModule.default.prompt([
              {
                type: 'checkbox',
                name: 'selectedComponents',
                message: 'Select components to copy:',
                choices: components,
              },
              {
                type: 'input',
                name: 'destination',
                message: 'Enter the destination path for the components:',
                default: './',
              },
            ])

            for (const componentName of answers.selectedComponents) {
              await copyComponent(
                owner,
                repo,
                componentName,
                answers.destination,
                branch,
                componentType
              )
              console.log(
                `${componentName} has been copied to ${answers.destination}`
              )
            }

            console.log(
              'All selected components have been copied successfully.'
            )
          } catch (error) {
            console.error('An error occurred:', error)
          }
        }

        main()
      }
    )
  })
  .catch((error) => console.error(`Failed to import modules: ${error}`))
