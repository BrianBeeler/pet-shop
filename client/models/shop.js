var m = require('mithril')


var Shop = module.exports = {}

Shop.fetch = function () {
  return m.request({ method: 'GET', url: 'http://pet-shop.api.mks.io/shops/1' });
}

Shop.fetchPets = function () {
  return m.request({ method: 'GET', url: 'http://pet-shop.api.mks.io/shops/1/pets' });
}

// Shop.signUp = function(username, password) {
//   return m.request({ method: 'POST', url: })
// }

// Shop.logIn = function(username, password){
//   return m.request({ method: 'POST'})
// }
Shop.signIn = function(username,password) {
  return m.request({method: 'POST', url: 'http://pet-shop.api.mks.io/signin', data: {
    username: username,
    password: password
  }});
}
