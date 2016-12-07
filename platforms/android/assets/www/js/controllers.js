angular.module('starter.controllers', [])




  .controller('loginController', function($scope,$http) {

    $scope.logar = function(){

      $http.post("http://192.168.100.5:8080/autenticar", $scope.usuario).then(
        function (response) {
          window.alert("Logado ");

        }, function erro(response) {

          window.alert("Erro ");
        });
    }


  })


  .controller('usuario-controller', function($scope, $http, $state) {

    $scope.cadastrar = function () {

      if($scope.usuario.id === null){

        $http.post("/adm/usuario", $scope.usuario).then(
          function (response) {
            $scope.usuario = {};
          }, function erro(response) {
          });
      }else{
        $http.put("/adm/usuario", $scope.usuario).then(
          function (response) {
            $scope.usuario = {};
          }, function (response) {
          });
      }
    };


  });

