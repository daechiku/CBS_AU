'use strict';

/**
 * Config for the pages router
 * config.router.backoffice.js
 */
angular.module('app')
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ( $stateProvider,   $urlRouterProvider ) {
        $stateProvider
          .state('backoffice', {
            url: '/backoffice',
            views: {
              // So this one is targeting the unnamed view within the parent state's template.
              '': {
                templateUrl: 'views/layout.html'
              },
              // This shows off how you could populate *any* view within *any* ancestor state.
              // Oopulating the ui-view="aside@"
              'aside': {
                templateUrl: 'modules/backoffice/views/submenu.html'
              }
            }
          })
          //Copy dari sini
          .state('backoffice.main', {
            url: '/main',
            templateUrl: 'modules/backoffice/views/main.html',
            controller:'nasabahController as vm',
              resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load(['modules/backoffice/scripts/nasabahController.js']);
                }]
             }
          })
          //Akhir Copy
<!-- ==========Submenu CIF -------------------------------- -->                     
          .state('backoffice.cif_express', {
            url: '/cif_express',
            templateUrl: 'modules/backoffice/views/cif_express.html'
          })
          .state('backoffice.cif_master', {
            url: '/cif_master',
            templateUrl: 'modules/backoffice/views/cif_master.html',
            controller:'nasabahController as vm',
	        resolve: {
	            deps: ['$ocLazyLoad',
	              function( $ocLazyLoad ){
	                return $ocLazyLoad.load(['modules/backoffice/scripts/nasabahController.js']);
	            }]
	         }
          })
          .state('backoffice.cif_notice', {
            url: '/cif_notice',
            templateUrl: 'modules/backoffice/views/cif_notice.html'
          })
          .state('backoffice.cif_blokir', {
            url: '/cif_blokir',
            templateUrl: 'modules/backoffice/views/cif_blokir.html'
          })
<!-- ==========Submenu Tabungan -------------------------------- -->           
          .state('backoffice.tab_master', {
            url: '/tab_master',
            templateUrl: 'modules/backoffice/views/tab_master.html',
            controller:'tabunganController',
            resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load(['modules/backoffice/scripts/tabunganController.js']);
                }]
             }
          })
          .state('backoffice.tab_cetakid', {
            url: '/tab_cetakid',
            templateUrl: 'modules/backoffice/views/tab_cetakid.html'
          })
          .state('backoffice.tab_cetakmutasi', {
            url: '/tab_cetakmutasi',
            templateUrl: 'modules/backoffice/views/tab_cetakmutasi.html'
          })
          .state('backoffice.tab_rektup', {
            url: '/tab_rektup',
            templateUrl: 'modules/backoffice/views/tab_rektup.html'
          })
<!-- ==========Submenu Deposito -------------------------------- -->           
          .state('backoffice.dep_bilyet', {
            url: '/dep_bilyet',
            templateUrl: 'modules/backoffice/views/dep_bilyet.html'
          })
          .state('backoffice.dep_master', {
            url: '/dep_master',
            templateUrl: 'modules/backoffice/views/dep_master.html'
          })
           .state('backoffice.dep_cetakbilyet', {
            url: '/dep_cetakbilyet',
            templateUrl: 'modules/backoffice/views/dep_cetakbilyet.html'
          })
           .state('backoffice.dep_pencairan', {
            url: '/dep_pencairan',
            templateUrl: 'modules/backoffice/views/dep_pencairan.html'
          })
<!-- ==========Submenu Jaminan -------------------------------- -->           
           .state('backoffice.jam_master', {
            url: '/jam_master',
            templateUrl: 'modules/backoffice/views/jam_master.html'
          })
           .state('backoffice.jam_tukar', {
            url: '/jam_tukar',
            templateUrl: 'modules/backoffice/views/jam_tukar.html'
          })
           .state('backoffice.jam_appraisal', {
            url: '/jam_appraisal',
            templateUrl: 'modules/backoffice/views/jam_appraisal.html'
          })
<!-- =========Penyaluran ===================== -->          
           .state('backoffice.pyd_master', {
            url: '/pyd_master',
            templateUrl: 'modules/backoffice/views/pyd_master.html'
          })
           .state('backoffice.pyd_express', {
            url: '/pyd_express',
            templateUrl: 'modules/backoffice/views/pyd_express.html'
          })
           .state('backoffice.pyd_jdwangsur', {
            url: '/pyd_jdwangsur',
            templateUrl: 'modules/backoffice/views/pyd_jdwangsur.html'
          })
          
          .state('backoffice.pyd_rescheduling', {
            url: '/pyd_rescheduling',
            templateUrl: 'modules/backoffice/views/pyd_rescheduling.html'
          })
<!-- =========Transaksi Umum ===================== -->
          .state('backoffice.trx_umum', {
            url: '/trx_umum',
            templateUrl: 'modules/backoffice/views/trx_umum.html'
          })
          .state('backoffice.trx_multi', {
            url: '/trx_multi',
            templateUrl: 'modules/backoffice/views/trx_multi.html'
          })
          .state('backoffice.trx_reverse', {
            url: '/trx_reverse',
            templateUrl: 'modules/backoffice/views/trx_reverse.html'
          })
          .state('backoffice.trx_oto', {
            url: '/trx_oto',
            templateUrl: 'modules/backoffice/views/trx_oto.html'
          })
          .state('backoffice.trx_upload', {
            url: '/trx_upload',
            templateUrl: 'modules/backoffice/views/trx_upload.html'
          })
          .state('backoffice.trx_yad', {
            url: '/trx_yad',
            templateUrl: 'modules/backoffice/views/trx_yad.html'
          })
          .state('backoffice.trx_backdated', {
            url: '/trx_backdated',
            templateUrl: 'modules/backoffice/views/trx_backdated.html'
          })
<!-- =========Transaksi Khusus ===================== -->
          .state('backoffice.trxh_bonustab', {
            url: '/trxh_bonustab',
            templateUrl: 'modules/backoffice/views/trxh_bonustab.html'
          })
          .state('backoffice.trxh_aset', {
            url: '/trxh_aset',
            templateUrl: 'modules/backoffice/views/trxh_aset.html'
          })
          .state('backoffice.trxh_cairdep', {
            url: '/trxh_cairdep',
            templateUrl: 'modules/backoffice/views/trxh_cairdep.html'
          })
          .state('backoffice.trxh_cairpyd', {
            url: '/trxh_cairpyd',
            templateUrl: 'modules/backoffice/views/trxh_cairpyd.html'
          })
          .state('backoffice.trxh_angsuran', {
            url: '/trxh_angsuran',
            templateUrl: 'modules/backoffice/views/trxh_angsuran.html'
          })
          .state('backoffice.closing', {
            url: '/closing',
            templateUrl: 'modules/backoffice/views/closing.html'
          })          
     }
    ]
  );