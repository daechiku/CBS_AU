'use strict';

/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the pages router
 */
angular.module('app')
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ( $stateProvider,   $urlRouterProvider ) {
        $stateProvider
          .state('siswa', {
            url: '/siswa',
            views: {
              // So this one is targeting the unnamed view within the parent state's template.
              '': {
                templateUrl: 'views/layout.html'
              },
              // This shows off how you could populate *any* view within *any* ancestor state.
              // Oopulating the ui-view="aside@"
              'aside': {
                templateUrl: 'modules/default/views/submenu.html'
              }
            }
          })
          .state('default.keterangan', {
              url: '/keterangan', 
              templateUrl: 'modules/siswa/views/keterangan.html',
              controller:'defaultController',
              resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load(['modules/siswa/scripts/defaultController.js']);
                }]
              }
            })
           
        
      } //end function
    ]
  );