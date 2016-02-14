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
      function ( $stateProvider,   $urlRouterProider ) {
        $stateProvider
          .state('laporan', {
            url: '/laporan',
            views: {v
              // So this one is targeting the unnamed view within the parent state's template.
              '': {
                templateUrl: 'views/layout.html'
              },
              // This shows off how you could populate *any* view within *any* ancestor state.
              // Oopulating the ui-view="aside@"
              'aside': {
                templateUrl: 'modules/laporan/views/submenu.html'
              }
            }
          })
          //Copy dari sini
          .state('laporan.main', {
            url: '/laporan',
            templateUrl: 'modules/laporan/views/main.html'
          })
          //Akhir Copy
          
          .state('teller.reversetrx', {
            url: '/reversetrx',
            templateUrl: 'modules/laporan/views/deposito.html'
          })

          .state('teller.cetakbuku',{
          	url: '/cetakbuku',
          	templateUrl: 'modules/laporan/views/nasabah.html'
          })	  

          .state('teller.cetakvalidasi',{
          	url: '/cetakvalidasi',
          	templateUrl: 'modules/laporan/views/penyaluran.html'
          })	  

          .state('teller.cetakid',{
          	url: '/cetakid',
          	templateUrl: 'modules/laporan/views/tabungan.html'
          })	  
      }
    ]
  );