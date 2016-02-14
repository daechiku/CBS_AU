'use strict';

/**
 * Config for the pages router
 * config.router.setup.js
 */
angular.module('app')
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ( $stateProvider,   $urlRouterProvider ) {
        $stateProvider
          .state('setup', {
            url: '/setup',
            views: {
              // So this one is targeting the unnamed view within the parent state's template.
              '': {
                templateUrl: 'views/layout.html'
              },
              // This shows off how you could populate *any* view within *any* ancestor state.
              // Oopulating the ui-view="aside@"
              'aside': {
                templateUrl: 'modules/setup/views/submenu.html'
              }
            }
          })
          //Copy dari sini
          .state('setup.main', {
            url: '/main',
            templateUrl: 'modules/setup/views/main.html'
          })
          //Akhir Copy
   <!-- ==========Submenu Umum -------------------------------- -->                     
          .state('setup.kantor', {
            url: '/kantor',
            templateUrl: 'modules/setup/views/kantor.html'
          })
          .state('setup.terminal', {
            url: '/terminal',
            templateUrl: 'modules/setup/views/terminal.html'
          })
          .state('setup.pengguna', {
            url: '/pengguna',
            templateUrl: 'modules/setup/views/pengguna.html'
          })
          .state('setup.sandiref', {
            url: '/sandiref',
            templateUrl: 'modules/setup/views/sandiref.html'
          })
          .state('setup.gl', {
            url: '/gl',
            templateUrl: 'modules/setup/views/gl.html'
          })
          .state('setup.transaksi', {
            url: '/transaksi',
            templateUrl: 'modules/setup/views/transaksi.html'
          })
          
          .state('setup.sp_tabungan', {
            url: '/sp_tabungan',
            templateUrl: 'modules/setup/views/sp_tabungan.html'
          })
          .state('setup.sp_deposito', {
            url: '/sp_deposito',
            templateUrl: 'modules/setup/views/sp_deposito.html'
          })
          .state('setup.sp_pyd', {
            url: '/sp_pyd',
            templateUrl: 'modules/setup/views/sp_pyd.html'
          })
          .state('setup.koll', {
            url: '/koll',
            templateUrl: 'modules/setup/views/koll.html'
          })          
          .state('setup.formatprint', {
            url: '/formatprint',
            templateUrl: 'modules/setup/views/formatprint.html'
          })
       	 .state('setup.validasi', {
            url: '/validasi',
            templateUrl: 'modules/setup/views/validasi.html'
          })
          .state('setup.nisbah_tab', {
            url: '/nisbah_tab',
            templateUrl: 'modules/setup/views/nisbah_tab.html'
          })
          .state('setup.nisbah_dep', {
            url: '/nisbah_dep',
            templateUrl: 'modules/setup/views/nisbah_dep.html'
          })
     }
    ]
  );