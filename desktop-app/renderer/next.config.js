module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer'
    }

    return config
  },
  images: {
    loader: 'akamai',
    path: 'public/images'
  }
  // output: 'export'
}
