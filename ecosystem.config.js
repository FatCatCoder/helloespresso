module.exports = {
    apps : [{
      name: 'server',
      script: './index.js',
      wait_ready: true,
      shutdown_with_message: true,
      listen_timeout: 10000,
      env: {
        "NODE_ENV":"production",
        "HOST":"https://helloespresso.coffee",
        "PORT":"5000",
        "SECRET":"wbqEqu9Ir7njjiOMaQ/Y6UIE4pAs2BfYgUscbTNkvvYyHGsl/Icnvph8aRBn8sC+NH3Yt8zX2bY05nGNsA4OMg==",
        "ADMIN_SECRET":"TCb1OKWnQMp8hKz/H6Kf1RfbTMc0osWWZpAJ76A1ddKWxfQCXQWrnwKDVigyEF5cgqynlfO+YywBXvUJJjKaSw==",
        "PWD_RESET_SECRET":"KLbprC03VK5Ad4W3MxwIWt5jn7ZBxlfV17s9reQAWJUeZ3JV1u7y3EYIivBeeUpkNkvVonpntVRLhmYqAOxJYg==",
        "PG_USER":"helloespresso",
        "PG_PASSWORD":"queyctufterdoph;",
        "PG_HOST":"localhost",
        "PG_PORT":"5432",
        "PG_DATABASE":"helloespresso",
        "EMAIL_ADDRESS":"helloespresso.coffee@gmail.com",
        "EMAIL_PASSWORD":"!3QeAdZc!",
        "EMAIL_SERVICE":"gmail",
        "EMAIL_NAME":"helloespresso.coffee@gmail.com",
        "URL":"https://helloespresso.coffee"
      }
    }]
  }
