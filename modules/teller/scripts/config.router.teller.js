'use strict';

/**
 * Config for the pages router
 * config.router.teller.js
 */
angular.module('app')
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ( $stateProvider,   $urlRouterProvider ) {
        $stateProvider
          .state('teller', {
            url: '/teller',
            views: {
              // So this one is targeting the unnamed view within the parent state's template.
              '': {
                templateUrl: 'views/layout.html'
              },
              // This shows off how you could populate *any* view within *any* ancestor state.
              // Oopulating the ui-view="aside@"
              'aside': {
                templateUrl: 'modules/teller/views/submenu.html'
              }
            }
          })
          //Copy dari sini
          .state('teller.main', {
            url: '/teller',
            templateUrl: 'modules/teller/views/main.html',
            controller:'tellerController as vm',
            resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load(['modules/teller/scripts/tellerController.js']);
                }]
            }
          })
          //Akhir Copy
          
          .state('teller.reversetrx', {
            url: '/reversetrx',
            templateUrl: 'modules/teller/views/reversetrx.html'
          })

          .state('teller.cetakbuku',{
          	url: '/cetakbuku',
          	templateUrl: 'modules/teller/views/cetakbuku.html'
          })	  
           .state('teller.cekulangtransaksi',{
          	url: '/cekulangtransaksi',
          	templateUrl: 'modules/teller/views/cekulangtransaksi.html'
          })	  

          .state('teller.cetakvalidasi',{
          	url: '/cetakvalidasi',
          	templateUrl: 'modules/teller/views/cetakvalidasi.html'
          })	  

          .state('teller.cetakid',{
          	url: '/cetakid',
          	templateUrl: 'modules/teller/views/cetakid.html'
          })	  

          .state('teller.jurnaltrx',{
          	url: '/jurnaltrx',
          	templateUrl: 'modules/teller/views/jurnaltrx.html'
          })	  

          .state('teller.cashcount', {
            url: '/cashcount',
            templateUrl: 'modules/teller/views/cashcount.html'
          })
        	.state('teller.trxteller1', {
            url: '/trxteller1',
            templateUrl: 'modules/teller/views/trxteller1.html',
            controller:'tellerController as vm',
            resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load(['modules/teller/scripts/tellerController.js']);
                }]
            }
          })
          .state('teller.trxteller2', {
            url: '/trxteller2',
            templateUrl: 'modules/teller/views/trxteller2.html',
            controller:'tellerController as vm',
            resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load(['modules/teller/scripts/tellerController.js']);
                }]
            }
          })
          .state('teller.trxteller3', {
            url: '/trxteller3',
            templateUrl: 'modules/teller/views/trxteller3.html',
            controller:'tellerController as vm',
            resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load(['modules/teller/scripts/tellerController.js']);
                }]
            }
          })
      }
    ]
  );