import localConfig from '../../app.config.json';
import axios from 'axios';
import router from 'next/router';

//@ts-ignore
const deepMerge = (target, ...sources): any => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
};

const isObject = (item: any) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

const fetchOverrideConfig = async () => {
  return {};
};
const fetchFeatureFlags = async () => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `/api/flags?userType=${router.query.userType}`,
      headers: {
        accept: 'application/json',
      },
    };
    const flags = await axios.request(config);
    console.log('featureFlags:', flags?.data?.flags, router.query.userType);
    return flags?.data?.flags;
  } catch (err) {
    console.error(err);
  }
  return {};
};

const mergeConfiguration = async () => {
  let overrideConfig: any = {};
  let featureFlags: any = {};
  try {
    // const response = await axios.get('URL_TO_FETCH_OVERRIDE_CONFIG');
    overrideConfig = await fetchOverrideConfig();
    console.log('overrideConfig:', overrideConfig);
    featureFlags = await fetchFeatureFlags();

    //overrideConfig = response.data;
  } catch (error) {
    console.error('Error fetching override configuration:', error);
    // Optionally handle error, such as falling back to default configs
  }

  const mergedConfig = await deepMerge({}, localConfig, overrideConfig, featureFlags);

  const updatedConfig = convertUrlsInObject(mergedConfig);

  console.log('updated config: ', updatedConfig);

  return updatedConfig;
};

function convertUrlsInObject(obj: any): any {
  if (typeof obj === 'string') {
    return convertToHttps(obj);
  } else if (Array.isArray(obj)) {
    return obj.map(convertUrlsInObject);
  } else if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc: any, key) => {
      acc[key] = convertUrlsInObject(obj[key]);
      return acc;
    }, {});
  }
  return obj;
}

function convertToHttps(url: any) {
  if (url.startsWith('http://') && url.includes(':443')) {
    return url.replace('http://', 'https://').replace(':443', '');
  }
  return url;
}
export default mergeConfiguration;
