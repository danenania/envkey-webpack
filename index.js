var webpack = require('webpack'),
    envkey = require('envkey/loader')

module.exports = EnvkeyWebpackPlugin

function EnvkeyWebpackPlugin(opts) {
  var env = envkey.load(opts),
      defineParams = {}

  if (!opts.permitted || !opts.permitted.length){
    throw new Error("'permitted' key required to specifiy vars whitelisted for client.")
  }

  if (opts.define){
    for (k in opts.define){
      defineParams[k] = JSON.stringify(opts.define[k])
    }
  }

  if (opts.permitted.indexOf("NODE_ENV") > -1){
    defineParams.NODE_ENV = JSON.stringify(process.env.NODE_ENV)
  }

  defineParams = Object.keys(env).reduce(function (envConfig, key) {
    envConfig["process.env." + key] = JSON.stringify(env[key])
    return envConfig
  }, defineParams)

  return new webpack.DefinePlugin(defineParams)
}
