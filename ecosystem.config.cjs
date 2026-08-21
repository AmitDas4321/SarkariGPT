require('dotenv').config();

module.exports = {
  apps: [
    {
      name: process.env.APP_NAME || 'SarkariGPT',
      script: 'dist/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};