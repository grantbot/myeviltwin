'use strict';

angular.module('myeviltwinlikesApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.awesomeThings = [];
    $scope.filtered;

    $http.get('/api/users').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;

      var filtered = awesomeThings.filter(function(user) {
        if ($scope.currentUser.affiliation === 'Democrat') {
          return user.affiliation === 'Republican';
        } else {
          return user.affiliation === 'Democrat';
        }
      })
      $scope.filtered = filtered;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });
