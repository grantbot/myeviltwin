'use strict';

angular.module('myeviltwinlikesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user',
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl'
      });
  });