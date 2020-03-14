module.exports = {
  webpack: config => {
    config.node = {
      fs: 'empty'
    }
    return config
  },
  env: {
    MYSQL_HOST: 'mysql-instance.cj4em7brj4cv.us-east-2.rds.amazonaws.com',
    MYSQL_DATABASE: 'development',
    MYSQL_USER: 'admin',
    MYSQL_PASSWORD: '$uper$ecret',
    JWT_SECRET_KEY: 'KINSOKUJIKOU',
    JWT_DURATION: '24h',
    SALT_ROUNDS: 10
  }
}
