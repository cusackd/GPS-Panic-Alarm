// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'panicControllers', 'contactControllers', 'profileControllers', 'ngCordova'])

.run(function($ionicPlatform, $cordovaGoogleAnalytics) {
  $ionicPlatform.ready(function() {

    document.addEventListener("deviceready", function () {
        // $cordovaGoogleAnalytics.debugMode();
        $cordovaGoogleAnalytics.startTrackerWithId('UA-65463621-3');
        $cordovaGoogleAnalytics.trackView('App Start');
        $cordovaGoogleAnalytics.trackEvent('App', 'Init', 'Start');
    });
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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.panicbutton', {
    cache: false,
    url: '/panic-button',
    views: {
      'menuContent': {
        templateUrl: 'pages/panic-button/index.html'
      }
    }
  })

  .state('app.contacts', {
    url: '/contacts',
    views: {
      'menuContent': {
        templateUrl: 'pages/contacts/index.html'
      }
    }
  })

  .state('app.help', {
    url: '/help',
    views: {
      'menuContent': {
        templateUrl: 'pages/help/index.html'
      }
    }
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'pages/profile/index.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/panic-button');
});
