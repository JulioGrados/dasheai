const withCSS = require('@zeit/next-css')
const path = require('path')

module.exports = withCSS({
  /* config options here */
  webpack: (config, { isServer }) => {
    config.resolve.alias['redux-path'] = path.resolve(__dirname, 'src/redux')
    config.resolve.alias['views-path'] = path.resolve(__dirname, 'src/views')
    config.resolve.alias['components-path'] = path.resolve(
      __dirname,
      'src/components'
    )
    config.resolve.alias['containers-path'] = path.resolve(
      __dirname,
      'src/containers'
    )
    config.resolve.alias['layouts-path'] = path.resolve(
      __dirname,
      'src/layouts'
    )
    if (!isServer) {
      config.node = {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
      }
    }

    return config
  }
})
