var m = require('mithril')
var Shop = require('../models/shop')


var PetShopWindow = module.exports = {}

PetShopWindow.controller = function () {
  var ctrl = this
  ctrl.shop = m.prop(null)
  Shop.fetch().then(ctrl.shop)
  ctrl.pets = m.prop(null)
  Shop.fetchPets().then(ctrl.pets)

  ctrl.userInput   = m.prop(null);
  ctrl.passInput   = m.prop(null);
  ctrl.apiKey = m.prop(null);

  ctrl.signIn = function(username,password) {

  var userData = Shop.signIn(username,password);
  console.log(userData)
  }
  ctrl.signUp = function(username, password){

   var userData = Shop.signUp(username, password);
  }

}

PetShopWindow.view = function (ctrl) {
  // var likeButton = m();  // if logged in create like button, if not, create blank div
  // if (ctrl.apiKey()){
  //   likeButton = m('button')
  // }

  var elementArray = ctrl.pets().map(function(pet,i) {
    return m('.pet',{"margin-bottom": "100px"}, "Name: "+ pet.name,[
      m('.petSpecies', "Species: "+ pet.species),
      m('.likes', "Likes: "+ pet.likes.length),
      m('img', {
        src: pet.imageUrl,
        height: "500px",
        width : "500px"
      })
    ])
  })

   if (!ctrl.apiKey()){
     elementArray.unshift(m('button','Sign Up', {
       onclick: ctrl.signUp(ctrl.userInput(),ctrl.passInput())
     }));
     elementArray.unshift(m('button','Sign In', {
       onclick: ctrl.signIn(ctrl.userInput(),ctrl.passInput())

     }))

  }

  if (!ctrl.apiKey()) {
    elementArray.unshift(m('input', {
                                       type: "text",
                                       id: "passText",
                                       value: ctrl.userInput(),
                                       //oninput: m.withAttr('value', ctrl.userInput)
                                     }))
    elementArray.unshift(m('input', {
                                       type: "text",
                                       id: "userText",
                                       value: ctrl.passInput(),
                                       oninput: m.withAttr('value', ctrl.passInput)
                                    }))
  }

  elementArray.unshift(m('h1', "Welcome to " + ctrl.shop().name));

  return m('.pet-shop', elementArray);
}


