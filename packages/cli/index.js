import axios from 'axios'
import fs from 'fs-extra'
import path from 'path'

async function fetchComponentsList(
  owner,
  repo,
  branch = 'main',
  componentType
) {
  const indexJsonUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/src/molecules/index.json`

  try {
    const response = await axios.get(indexJsonUrl)
    const components = response.data[componentType]
    return components
  } catch (error) {
    console.error('Failed to fetch components list:', error)
    return []
  }
}

async function fetchFilePaths(owner, repo, componentPath, branch = 'main') {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${componentPath}?ref=${branch}`
  try {
    const response = await axios.get(apiUrl)
    return response.data
      .filter((item) => item.type === 'file')
      .map((file) => ({ name: file.name, download_url: file.download_url }))
  } catch (error) {
    console.error(`Failed to fetch file paths for ${componentPath}:`, error)
    return []
  }
}

async function copyComponent(
  owner,
  repo,
  componentName,
  destination,
  branch = 'main'
) {
  const componentFiles = await fetchFilePaths(
    owner,
    repo,
    `src/molecules/${componentName}`,
    branch
  )

  const destinationPath = path.join(destination, componentName)
  await fs.ensureDir(destinationPath) // Ensure the destination directory exists

  for (const file of componentFiles) {
    const filePath = path.join(destinationPath, file.name)
    console.log(`Copying ${file.name} to ${filePath}...`)

    const response = await axios.get(file.download_url, {
      responseType: 'arraybuffer',
    })
    await fs.writeFile(filePath, response.data)
    console.log(`${file.name} copied successfully.`)
  }
}

export { fetchComponentsList, copyComponent }
