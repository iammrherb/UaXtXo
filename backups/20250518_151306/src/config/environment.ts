// Environment configuration
interface EnvironmentConfig {
  env: string;
  apiUrl: string;
  version: string;
  basename: string;
}

const environment: EnvironmentConfig = {
  env: process.env.REACT_APP_ENV || 'development',
  apiUrl: process.env.REACT_APP_API_URL || '',
  version: process.env.REACT_APP_VERSION || '0.1.0',
  basename: process.env.NODE_ENV === 'production' ? '/UaXtXo' : '/',
};

export default environment;
