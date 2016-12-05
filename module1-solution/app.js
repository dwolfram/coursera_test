(function () {
  'use strict'

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', function ($scope) {
    $scope.message = "";
    $scope.checkLunch = function () {
      var lunchLength = $scope.lunchText.split(',').length;
      if (lunchLength <= 3) $scope.message = "Enjoy!";
      if (lunchLength > 3) $scope.message = "Too much!";
    }

  })
})();
