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

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    itemsToBuy.push(item);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  };

  service.removeItem = function (itemIndex){
    itemsBought.push(itemsToBuy[itemIndex]);
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

  list1.addItem = function () {
    ShoppingListCheckOffService.addItem(list1.itemName, list1.itemQuantity);
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
}

})();