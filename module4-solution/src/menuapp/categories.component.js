(function () {
'use strict';

angular.module('MenuApp')
.component('categoriesList', {
  templateUrl: 'src/shoppinglist/categories.template.html',
  bindings: {
    categories: '<'
  }
});

})(); 
