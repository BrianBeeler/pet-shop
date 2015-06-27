var m = require('mithril')
var Shop = require('../models/shop')


var PetShopWindow = module.exports = {}


PetShopWindow.controller = function () {

  var ctrl = this

  // Sends get request, results of request set to ctr.shop
  ctrl.shop = m.prop(null)
  Shop.fetch().then(ctrl.shop)

  // Similar to above, but pets
  ctrl.pets = m.prop(null)
  Shop.fetchPets().then(ctrl.pets)

  // Properties to be used later
  ctrl.apiKey   = m.prop(null);
  ctrl.userName = m.prop(null);
  ctrl.password = m.prop(null);

  // Sends a post request for sign-in
  ctrl.signIn = function(username,password) {
    Shop.signIn(username,password);
  }

  // Sends a post request for sign up
  ctrl.signUp = function(username, password){
    Shop.signup(username, password);
  }

}

PetShopWindow.view = function (ctrl) {
  // if logged in create like button, if not, create blank div
  if (ctrl.apiKey()){
     likeButton = m('button')
  };

  // Fetches pet information, renders it
  var elementArray = ctrl.pets().map(function(pet,i) {
    return m('.pet',{},"Name: " + pet.name,[
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

  var userNameInputElement = m('input[type=text]', ctrl.userName );
  var passwordInputElement = m('input', { type: "text",  id: "passText"});

  if (!ctrl.apiKey()) {

    elementArray.unshift(
      m('button', { onclick: function() {
        ctrl.signIn(userNameInputElement.value, passwordInputElement.value);
                         }
                    }, 'Sign In'));

    elementArray.unshift(
      m('button', { onclick: function() {
        ctrl.signUp(userNameInputElement.value, passwordInputElement.value);
    }}, 'Sign Up'));
    elementArray.unshift(passwordInputElement);
    elementArray.unshift(userNameInputElement);
  }

  elementArray.unshift(m('h1', "Welcome to " + ctrl.shop().name));
  //if (!ctrl.apiKey()){
  //   elementArray.unshift(m('button','Sign Up'));
  //   elementArray.unshift(m('button','Sign In'))
  // }

  return m('.pet-shop', elementArray);
}

