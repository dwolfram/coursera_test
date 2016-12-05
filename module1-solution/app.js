(function () {
  'use strict'

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', function ($scope) {
    $scope.message = "";
    $scope.checkLunch = function () {
      if (!$scope.lunchText || $scope.lunchText.trim() == '') {
        $scope.message = "Please enter data first"
      } else {
        var lunchLength = $scope.lunchText.split(',').length;
        if (lunchLength <= 3) $scope.message = "Enjoy!";
        if (lunchLength > 3) $scope.message = "Too much!";
      }
    }

  })
})();
