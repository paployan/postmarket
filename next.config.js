const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

const nextTranslate = require('next-translate');
const i18nConfig = require('./i18n.json');

module.exports = (phase) => {
  const nextTranslateInstance = nextTranslate(i18nConfig);

  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  const env = {
    API_URL: (() => {
      if (isDev) return 'http://localhost:8000/api'
      if (isProd) {
        return 'https://api.postmarket.am'
      }
      if (isStaging) return 'https://api.postmarket.am'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    SERVER_URL: isDev ? 'http://localhost:3000' : 'https://api.postmarket.am',
    APP_URL: isDev ? 'http://localhost:8000' : 'https://api.postmarket.am',
  };

  return {
    env,
    ...nextTranslateInstance,
  };
};
