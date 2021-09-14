module.exports = {
    apps : [{
      name: 'server',
      script: './index.js',
      wait_ready: true,
      shutdown_with_message: true,
      listen_timeout: 10000
    }]
  }