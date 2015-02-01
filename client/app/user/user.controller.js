'use strict';

angular.module('myeviltwinlikesApp')
  .controller('UserCtrl', function ($scope, $stateParams) {
    console.log($stateParams);
    $scope.message = 'Hello';
  });
