var path = require('path')
module.exports = setup
module.exports.consumes = ['auth', 'orm', 'ui']

function setup(plugin, imports, register) {
  var auth = imports.auth
    , orm = imports.orm

  imports.ui.registerModule(path.join(__dirname, 'client.js'))

  auth.registerAuthenticationProvider('guest', function*(name) {
    if(!name) {
      name = 'anonymous'
    }
    user = yield orm.collections.user.findOrCreate({type: 'guest', name: name}, {type: 'guest', name: name, foreignId: 1})
    return user
  })

  auth.registerAuthorizationProvider(function*(user, action, data) {
    console.log('Authorization for', action, data)
    return true
  })
  register()
}
