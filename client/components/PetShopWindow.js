var m = require('mithril')
var Shop = require('../models/shop')


var PetShopWindow = module.exports = {}

PetShopWindow.controller = function () {
  var ctrl = this
  ctrl.shop = m.prop(null)
  Shop.fetch().then(ctrl.shop)
  ctrl.pets = m.prop(null)
  Shop.fetchPets().then(ctrl.pets)

  ctrl.apiKey = m.prop(null);


  // ctrl.login = function(username, password){
  ctrl.signIn = function(username,password) {
    Shop.signIn(username,password);
  }
  //   Shop.login(username, password);
  // }

  // ctrl.signup = function(username, password){
  //   Shop.signup(username, password);
  // }
}

PetShopWindow.view = function (ctrl) {
  // var likeButton = m();  // if logged in create like button, if not, create blank div
  // if (ctrl.apiKey()){
  //   likeButton = m('button')
  // }

  var elementArray = ctrl.pets().map(function(pet,i) {
    return m('.pet',{
      "margin-bottom": "100px"

    },"Name: "+ pet.name,[
      m('.petSpecies', "Species: "+ pet.species),
      m('.likes', "Likes: "+ pet.likes.length),
      //likeButton,
      m('img', {
        src: pet.imageUrl,
        height: "500px",
        width : "500px"
      })
    ])
  })

  if (!ctrl.apiKey()) {

    elementArray.unshift(m('button', 'Sign In', { onclick: function() {
      ctrl.signIn();
    }}))
    elementArray.unshift(m('input', { type: "text",  id: "passText"}))
    elementArray.unshift(m('input', { type: "text", id: "userText"}))
  }

  elementArray.unshift(m('h1', "Welcome to " + ctrl.shop().name));
  //if (!ctrl.apiKey()){
  //   elementArray.unshift(m('button','Sign Up'));
  //   elementArray.unshift(m('button','Sign In'))
  // }

  return m('.pet-shop', elementArray);
}

