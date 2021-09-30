interface Configuration {
  versionId: string;
  apiKey: string;
  baseUri: string;
}

declare global {
  interface Window {
    configuration: Configuration;
  }
}

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  window.configuration = require('./local.config.json');
}

export default window.configuration;
