(function () {
'use strict';

console.log("Hello1");

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


function ShoppingListCheckOffService() {
  console.log("ShoppingListCheckOffService");

  var service = this;

  // List of shopping items
  var itemsAvailable = [];

  itemsAvailable.push({ name: "cookies", quantity: 10 });
  itemsAvailable.push({ name: "soft drink", quantity: 2 });
  itemsAvailable.push({ name: "pepto bismo", quantity: 1 });
  itemsAvailable.push({ name: "sausage roll", quantity: 4 });
  itemsAvailable.push({ name: "fermented shark", quantity: 3 });

  console.log(itemsAvailable);
  var boughtItems = [];

  service.buyItem = function (itemIndex) {
    var item = itemsAvailable[itemIndex];
    boughtItems.push(item);
    itemsAvailable.splice(itemIndex, 1);
  }

  service.getAvailableItems = function () {
    return itemsAvailable;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showList = this;
  showList.items = ShoppingListCheckOffService.getAvailableItems();

  showList.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }

  showList.empty = function () {
    return showList.items.length == 0;
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showList = this;
  showList.items = ShoppingListCheckOffService.getBoughtItems();

  showList.empty = function () {
    return showList.items.length == 0;
    //return showList.items.length == 0;
  }
}

})();
