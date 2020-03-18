require('dotenv').config({ path: './.env.build' })

module.exports = {
  webpack: config => {
    config.node = {
      fs: 'empty'
    }
    return config
  },
  env: {
    MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'development',
    MYSQL_USER: process.env.MYSQL_USER || 'admin',
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'password',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret_key',
    JWT_DURATION: process.env.JWT_DURATION || '24h',
    SALT_ROUNDS: process.env.SALT_ROUNDS || 5
  }
}
