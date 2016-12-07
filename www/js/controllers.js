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


  .controller('usuario-controller', function($scope, $http, $state,dataShare, $location) {
    $scope.listar = function(){
      $location.path("/#lista-usuarios");
    };
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


  })

  .controller('lista-usuarios', function($scope, $http, $state,dataShare) {
    $scope.deleteItem = function (usuario) {
      $scope.usuarios.splice($scope.usuarios.indexOf(usuario), 1);};


    $scope.usuarios = [
      { nome: "Fabiane" },
      { nome: "Hudson" },
      { nome: "Willian" },
      { nome: "Elisiane" },
      { nome: "Lidiane" },
      { nome: "Virmerson" },
      { nome: "Maria" },
      { nome: "José" },
      { nome: "Jão" },
      { nome: "Lucas" },
      { nome: "Marcos" }
    ];


  })

  .controller('home-controller', function($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.editar = function(outra) {
      //alert('Edit Item: ' + item.id);
      //$('.titulo-palavra').html(item.id);
      $scope.tituloEditado = outra.titulo;
      $scope.palavraEdit = outra;
      $scope.modal.show();
    };

    $scope.alterarPalavra = function() {
      alert('Palavra alterada com sucesso!');
      //alert('Erro ao tentar alterar palavra!');
      $scope.modal.hide();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.deleteItem = function (palavra) {
      if(confirm('Certeza que deseja Excluir?')){
        $scope.palavras.splice($scope.palavras.indexOf(palavra), 1);
      }
    };
    $scope.palavras = [
      { titulo: 'Banana', significado: 'Fruta 1', descricao: ' Descricao 1' },
      { titulo: 'Laranja', significado: 'Fruta 2', descricao: ' Descricao 2' },
      { titulo: 'Pera', significado: 'Fruta 3', descricao: 'Descricoa 3' },
      { titulo: 'Uva', significado: 'Fruta 4', descricao: 'Descricao 4' },
      { titulo: 'Mamão', significado: 'Fruta 5', descricao: 'Descricao 5' },
    ];
  });

