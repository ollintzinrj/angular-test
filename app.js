(function (){
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
;


//Servicio: agregar, mostrar y eliminar
function ShoppingListCheckOffService(){
  var service = this;

  var itemsToBuy = [];
  var itemsBought = [];

  var completedToBuy = true;
  var messageToBuy = "Everything is bought!";

  var completedBought = true;
  var messageBought = "Nothing bought yet.";

  service.messageBetweenControllers = function(){
    var response = {
      completedToBuy: completedToBuy,
      messageToBuy: messageToBuy,
      completedBought: completedBought,
      messageBought: messageBought,
    }
    return response;
  };

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    itemsToBuy.push(item);
    
    completedToBuy = false
  };

  service.getItemsToBuy = function () {
    if(itemsToBuy.length == 0)
    {
      messageToBuy = "Everything is bought!";
      completedToBuy = true;
    }

    return itemsToBuy;
  };

  service.getItemsBought = function () {
    if(itemsBought.length == 0)
    {
      messageBought = "Nothing bought yet.";
      completedBought = true;
    }

    return itemsBought;
  };

  service.removeItem = function (itemIndex){
    itemsBought.push(itemsToBuy[itemIndex]);
    completedBought = false;
    
    itemsToBuy.splice(itemIndex, 1);
  };
}


//Controlador1: agregar, mostrar y eliminar
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  
  var list1 = this;
  list1.itemName = "";
  list1.itemQuantity = "";

  list1.items = ShoppingListCheckOffService.getItemsToBuy();

  var btwn = ShoppingListCheckOffService.messageBetweenControllers();
  console.log(btwn);
  list1.completed = btwn.completedToBuy;
  list1.message = btwn.messageToBuy;

  list1.addItem = function () {
    ShoppingListCheckOffService.addItem(list1.itemName, list1.itemQuantity);
    
    btwn = ShoppingListCheckOffService.messageBetweenControllers();
    list1.completed = btwn.completedToBuy;
  };

  list1.removeItem = function (index) {
    ShoppingListCheckOffService.removeItem(index);
  };
}

//Controlador2: mostrar
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){

  var list2 = this;
  list2.itemName = "";
  list2.itemQuantity = "";

  list2.items = ShoppingListCheckOffService.getItemsBought();

  var btwn = ShoppingListCheckOffService.messageBetweenControllers();
  list2.completed = btwn.completedBought;
  list2.message = list2.messageBought;
}

})();