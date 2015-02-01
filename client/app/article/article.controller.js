'use strict';

angular.module('myeviltwinlikesApp')
  .controller('ArticleCtrl', function ($scope, $http) {
    $scope.article;
    $scope.message = 'Hello';
    $scope.submitArticle = function (form) {
      $scope.article = '';
      console.log(form.article.$modelValue);
      $http.post('api/articles', {url: form.article.$modelValue})
        .success(function(success) {
          alert('Succes!');
        })
        .error(function(error) {
            alert('Error!');
        })
    }
  });
