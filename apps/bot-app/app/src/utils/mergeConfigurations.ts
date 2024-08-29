import { botConfigObj } from '@samagra-x/stencil-config-manager'
import axios from 'axios'

//@ts-ignore
const deepMerge = (target, ...sources): any => {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepMerge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return deepMerge(target, ...sources)
}

const isObject = (item: any) => {
  return item && typeof item === 'object' && !Array.isArray(item)
}

const fetchOverrideConfig = async () => {

  return {}
}

const mergeConfiguration = async () => {
  let overrideConfig: any = {}
  try {
    // const response = await axios.get('URL_TO_FETCH_OVERRIDE_CONFIG');
    overrideConfig = await fetchOverrideConfig()

    //overrideConfig = response.data;
  } catch (error) {
    console.error('Error fetching override configuration:', error)
    // Optionally handle error, such as falling back to default configs
  }

  const mergedConfig = await deepMerge({}, botConfigObj, overrideConfig)

  return mergedConfig
}
export default mergeConfiguration
