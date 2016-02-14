'use strict';

/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
angular.module('app')
  .run(
    [           '$rootScope', '$state', '$stateParams','AuthService', 'AUTH_EVENTS',
      function ( $rootScope,   $state,   $stateParams, AuthService, AUTH_EVENTS) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
			
			///*
		    if ('data' in next && 'authorizedRoles' in next.data) {
		      var authorizedRoles = next.data.authorizedRoles;
		      if (!AuthService.isAuthorized(authorizedRoles)) {
		        event.preventDefault();
		        $state.go($state.current, {}, {reload: true});
		        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
		      }
		    }
		
		    if (!AuthService.isAuthenticated()) {
		      if(next.url !== '/signin') {
		      	if(next.url != '/' && next.url !='/signin'){
		          console.log(next.url)
		      		event.preventDefault();
		        	$state.go('signin');
		      	}
		      }
		      //*/
		    }
		  });
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ( $stateProvider,   $urlRouterProvider ) {
        $urlRouterProvider
          .otherwise('/app/dashboard');
        $stateProvider
          .state('app', {
            abstract: true,
            url: '/app',
            views: {
              '': {
                templateUrl: 'views/layout.html'
              },
              'aside': {
                templateUrl: 'views/partials/aside.nav.uikit.html'
              }
            }
          })
            .state('app.dashboard', {
              url: '/dashboard',
              templateUrl: 'views/pages/dashboard.html',
              resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load(['scripts/controllers/chart.js','scripts/controllers/vectormap.js']);
                }]
              }
            })
          .state('mail', {
            url: '/mail',
            views: {
              '': {
                templateUrl: 'views/layout.html'
              },
              'aside': {
                templateUrl: 'views/partials/aside.nav.mail.html'
              }
            }
          })
            .state('mail.inbox', {
              url: '/inbox',
              templateUrl: 'views/pages/mail.html'
            })
      }
    ]
  );