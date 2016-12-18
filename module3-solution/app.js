(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/")
.directive('foundItems', ShoppingListDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;

  ctrl.items = [];
  ctrl.searchValue = "";
  ctrl.nothingIsFound = false;

  ctrl.getMatchedMenuItems = function() {
    ctrl.nothingIsFound = false;
    if(!ctrl.searchValue){
      console.log("Empty box!");
      ctrl.nothingIsFound = true;
      ctrl.items = [];
      return;
    }

    var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchValue);
    promise.then(function (response) {
      if (response.length == 0) ctrl.nothingIsFound = true;
      ctrl.items = response;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }

  ctrl.removeItem = function(index) {
    ctrl.items.splice(index, 1);
  }
}


function ShoppingListDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      //myTitle: '@title',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {

  return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).
    then(function (result) {
      var foundItems = [];

      var menu_items = result.data.menu_items;
      for (var i = 0, len = menu_items.length; i < len; i++) {
        if (menu_items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1 ) {
          foundItems.push(menu_items[i]);
        }
      }

      console.log("Filtered");
      console.log(foundItems);
      return foundItems;
    });

  }
}
})();
