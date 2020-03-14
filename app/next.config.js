const env = require('./env.js')

module.exports = {
  webpack: config => {
    config.node = {
      fs: 'empty'
    }
    return config
  },
  env
}
