var m = require('mithril')


var Shop = module.exports = {}

Shop.fetch = function () {
  return m.request({ method: 'GET', url: 'http://pet-shop.api.mks.io/shops/1' });
}

Shop.fetchPets = function () {
  return m.request({ method: 'GET', url: 'http://pet-shop.api.mks.io/shops/1/pets' });
}

Shop.signUp = function(username, password) {
   //console.log('signUp:', username, password)
   return m.request({ method: 'POST',
                      url: "http://pet-shop.api.mks.io/signup",
                      data: {"username": username, "password": password}
                    })
}

Shop.signIn = function(username,password) {
  //console.log('signIn:', username, password)

  return m.request({method: 'POST',
                    url: 'http://pet-shop.api.mks.io/signin',
                    data: { "username": username, "password": password}
                  });
}

Shop.likePet = function (petId, apiToken) {
  return m.request({
    method: 'POST',
    url: 'http://pet-shop.api.mks.io/shops/1/pets/' + petId + '/like',
    data: { apiToken: apiToken }
  })
}
