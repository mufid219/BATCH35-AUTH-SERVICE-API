require('dotenv').config();

const appConfig = {
  port:    parseInt(process.env.PORT) || 3001,
  env:     process.env.NODE_ENV || 'development',
  isDev:   process.env.NODE_ENV !== 'production',
  api: {
    prefix: '/api',
  },
};

module.exports = appConfig;
