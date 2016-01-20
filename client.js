module.exports = setup
module.exports.consumes = ['ui','session']

function setup(plugin, imports, register) {
 var ui = imports.ui
   , session = imports.session

  session.registerAuthenticationProvider('guest', {
    ask: function() {
      ui.store.dispatch(session.action_login('Guest: '+prompt('Enter your guest user name')))
    }
  , description: 'Login as a guest with a user name of your choice'
  })

 register()
}
