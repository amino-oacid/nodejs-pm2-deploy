const dotenvConfig = require('dotenv').config;

dotenvConfig({ path: '.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_PATH, DEPLOY_REPO, NGINX_STATIC_PATH
} = process.env;

module.exports = {
  apps: [{
    name: 'frontend',
  }],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'post-deploy': 'cd frontend && npm i && export NODE_OPTIONS=--openssl-legacy-provider && npm run build && sudo mkdir -p ' + (NGINX_STATIC_PATH || '/var/www/html') + ' && sudo cp -r build/* ' + (NGINX_STATIC_PATH || '/var/www/html') + '/ && sudo chown -R www-data:www-data ' + (NGINX_STATIC_PATH || '/var/www/html') + ' && sudo chmod -R 755 ' + (NGINX_STATIC_PATH || '/var/www/html'), 
    },
  },
};