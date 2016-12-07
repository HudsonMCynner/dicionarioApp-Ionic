// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider,$httpProvider) {
    $httpProvider.interceptors.push("tokenInterceptor");
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html'
      })




      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'loginController'
          }
        }
      })

      .state('app.addPalavra', {
        url: '/cad-palavra',
        views: {
          'menuContent': {
            templateUrl: 'templates/addpalavra.html'

          }
        }
      })

      .state('app.usuariosCadastrados', {
        url: '/lista-usuarios',
        views: {
          'menuContent': {
            templateUrl: 'templates/usuarios-cadastrados.html',
            controller: 'lista-usuarios'

          }
        }
      })

      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'home-controller'

          }
        }
      })

      .state('app.cadUsuario', {
        url: '/cad-usuario',
        views: {
          'menuContent': {
            templateUrl: 'templates/cadUsuario.html',
            controller: 'usuario-controller'

          }
        }
      });



    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  })

  .factory('dataShare',function($rootScope,$timeout){

    var service = {};

    service.data = false;

    service.setData = function(data){
      this.data = data;

      $timeout(function(){
        $rootScope.$broadcast('data_shared');
      },100);
    };

    service.getData = function(){
      return this.data;
    };

    return service;
  })

  .factory("tokenInterceptor",function ($q) {

  return {
    'request': function (config) {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem("userToken");

      return config;
    },
    'responseError': function (rejection) {
      if (rejection.status == 401) {

        window.location.replace("/login");
      }
      return $q.reject(rejection);
    }
  }
});
