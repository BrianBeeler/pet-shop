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
  ctrl.apiKey      = m.prop(null);
  ctrl.errorMessage= m.prop(null);
  ctrl.userData   = m.prop(null);
  ctrl.likedPets  = m.prop({});


  ctrl.like = function(id) {
    var liked = ctrl.likedPets();
    for (var i in liked) {
      if (i===id) {
        return
      }
    }
    liked[id]="Already Liked!"
    ctrl.likedPets(liked);

    Shop.likePet(id, ctrl.apiKey() ).then(function(){
      Shop.fetchPets();
    })
  };

  ctrl.signIn = function(username,password) {

  var userData = Shop.signIn(username,password).then(
    function(successData) {
      ctrl.apiKey(successData.apiToken)
      ctrl.errorMessage(null)
    },
    function(errorData)   { ctrl.errorMessage("Sign In error: "+errorData.error) });
  }

  ctrl.signUp = function(username, password){

   var userData = Shop.signUp(username, password).then(
    function() {
      ctrl.signIn(username,password)
      ctrl.errorMessage(null)
    },
    function(errorData) {
      console.log(errorData)
      ctrl.errorMessage(errorData.error+":  "+errorData.reason)
    })
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
      m('button',{
                    onclick: function() {
                      var petId = i;
                      ctrl.like(petId+1)
                    }
                 }, "Like!"),
      m('span', "Likes: "+ pet.likes.length),
      m('span',"  "+(ctrl.likedPets()[i+1] || "")),
      m('div'),
      m('img',   {
        display: "block",
        src: pet.imageUrl,
        height: "500px",
        width : "500px"
      })
    ])
  })
   if (ctrl.apiKey()) {
      elementArray.unshift(m('button', {
        onclick: function() {
          ctrl.apiKey(null);
        }
      },"Sign Out"))

   }

   if (ctrl.errorMessage()) {
      elementArray.unshift(m('p[class="error"]') , ctrl.errorMessage());
   }

   if (!ctrl.apiKey()) {
     elementArray.unshift(m('button', {
       onclick: function() {
         ctrl.signUp(ctrl.userInput(),ctrl.passInput())
       }
                                         },'Sign Up' ));

     elementArray.unshift(m('button', {
       onclick: function() {
         ctrl.signIn(ctrl.userInput(),ctrl.passInput())
       }
                                         },'Sign In' ));
  }

  if (!ctrl.apiKey()) {

    elementArray.unshift(m('input', {
                                       type: "text",
                                       id: "passText",
                                       placeholder: "Password",
                                       value: ctrl.passInput(),
                                       oninput: m.withAttr('value', ctrl.passInput)
                                     }))
    elementArray.unshift(m('input', {
                                       type: "text",
                                       id: "userText",
                                       placeholder: "Username",
                                       value: ctrl.userInput(),
                                       oninput: m.withAttr('value', ctrl.userInput)
                                    }))
  }

  elementArray.unshift(m('h1', "Welcome to " + ctrl.shop().name));

  return m('.pet-shop', elementArray);
}



