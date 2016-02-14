'use strict';

/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the pages router
 * config.router.laporan.js
 */
angular.module('app')
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ( $stateProvider,   $urlRouterProvider ) {
        $stateProvider
          .state('laporan', {
            url: '/laporan',
            views: {
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
            url: '/main',
            templateUrl: 'modules/laporan/views/main.html'
          })
          //Akhir Copy
          .state('laporan.trx_kas_bank', {
            url: '/trx_kas_bank',
            templateUrl: 'modules/laporan/views/trx_kas_bank.html',
            controller:'laptrxController as vm',
            resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load(['modules/laporan/scripts/laptrxController.js']);
                }]
            }
          })          
          .state('laporan.trx_neraca_percobaan', {
            url: '/trx_neraca_percobaan',
            templateUrl: 'modules/laporan/views/trx_neraca_percobaan.html'
          })
          .state('laporan.trx_laporantrx', {
            url: '/trx_laporantrx',
            templateUrl: 'modules/laporan/views/trx_laporantrx.html',
            controller:'laptrxController as vm',
            resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load(['modules/laporan/scripts/laptrxController.js']);
                }]
            }
          })
          .state('laporan.trx_rekaptrx', {
            url: '/trx_rekaptrx',
            templateUrl: 'modules/laporan/views/trx_rekaptrx.html'
          })
          .state('laporan.trx_fas_nasabah', {
            url: '/trx_fas_nasabah',
            templateUrl: 'modules/laporan/views/trx_fas_nasabah.html'
          })
          .state('laporan.trx_pembukaanproduk', {
            url: '/trx_pembukaanproduk',
            templateUrl: 'modules/laporan/views/trx_pembukaanproduk.html'
          })
		//SubMenu Laporan - Tabungan
          .state('laporan.tab_bermutasi', {
            url: '/tab_bermutasi',
            templateUrl: 'modules/laporan/views/tab_bermutasi.html'
          })
   
          .state('laporan.tab_sejarahtrx', {
            url: '/tab_sejarahtrx',
            templateUrl: 'modules/laporan/views/tab_sejarahtrx.html'
          })
          .state('laporan.tab_listsaldo', {
            url: '/tab_listsaldo',
            templateUrl: 'modules/laporan/views/tab_listsaldo.html'
          })
          .state('laporan.tab_saldoharian', {
            url: '/tab_saldoharian',
            templateUrl: 'modules/laporan/views/tab_saldoharian.html'
          })
          .state('laporan.tab_saldoperproduk', {
            url: '/tab_saldoperproduk',
            templateUrl: 'modules/laporan/views/tab_saldoperproduk.html'
          })
          .state('laporan.tab_pasif', {
            url: '/tab_pasif',
            templateUrl: 'modules/laporan/views/tab_pasif.html'
          })
          .state('laporan.tab_blokir', {
            url: '/tab_blokir',
            templateUrl: 'modules/laporan/views/tab_blokir.html'
          })
          .state('laporan.tab_premiasuransi', {
            url: '/tab_premiasuransi',
            templateUrl: 'modules/laporan/views/tab_premiasuransi.html'
          })
          .state('laporan.tab_rekaptabungan', {
            url: '/tab_rekaptabungan',
            templateUrl: 'modules/laporan/views/tab_rekaptabungan.html'
          })
		//SubMenu Laporan - Deposito
          .state('laporan.dep_listdeposito', {
            url: '/dep_listdeposito',
            templateUrl: 'modules/laporan/views/dep_listdeposito.html'
          })
          .state('laporan.dep_listbaghas', {
            url: '/dep_listbaghas',
            templateUrl: 'modules/laporan/views/dep_listbaghas.html'
          })
          .state('laporan.dep_buka', {
            url: '/dep_buka',
            templateUrl: 'modules/laporan/views/dep_buka.html'
          })
          .state('laporan.dep_jtempo', {
            url: '/dep_jtempo',
            templateUrl: 'modules/laporan/views/dep_jtempo.html'
          })          
          .state('laporan.dep_rekap', {
            url: '/dep_rekap',
            templateUrl: 'modules/laporan/views/dep_rekap.html'
          })
          .state('laporan.dep_maturity', {
            url: '/dep_maturity',
            templateUrl: 'modules/laporan/views/dep_maturity.html'
          })
          .state('laporan.dep_terbesar', {
            url: '/dep_terbesar',
            templateUrl: 'modules/laporan/views/dep_terbesar.html'
          })
//--------Laporan Pembiayaan---------------
          .state('laporan.pyd_kartu_angsuran', {
            url: '/pyd_kartu_angsuran',
            templateUrl: 'modules/laporan/views/pyd_kartu_angsuran.html'
          })
          .state('laporan.pyd_info_debitur', {
            url: '/pyd_info_debitur',
            templateUrl: 'modules/laporan/views/pyd_info_debitur.html'
          })
          
          .state('laporan.pyd_list_saldo', {
            url: '/pyd_list_saldo',
            templateUrl: 'modules/laporan/views/pyd_list_saldo.html'
          })
          .state('laporan.pyd_tunggakan', {
            url: '/pyd_tunggakan',
            templateUrl: 'modules/laporan/views/pyd_tunggakan.html'
          })
          .state('laporan.pyd_pencairan', {
            url: '/pyd_pencairan',
            templateUrl: 'modules/laporan/views/pyd_pencairan.html'
          })
          .state('laporan.pyd_lunas', {
            url: '/pyd_lunas',
            templateUrl: 'modules/laporan/views/pyd_lunas.html'
          })
//--------Laporan General Ledger---------------
          .state('laporan.gl_mutasigl', {
            url: '/gl_mutasigl',
            templateUrl: 'modules/laporan/views/gl_mutasigl.html'
          })
          .state('laporan.gl_neraca_rl', {
            url: '/gl_neraca_rl',
            templateUrl: 'modules/laporan/views/gl_neraca_rl.html'
          })
					.state('laporan.gl_rl_berjalan', {
            url: '/gl_rl_berjalan',
            templateUrl: 'modules/laporan/views/gl_rl_berjalan.html'
          })
          .state('laporan.gl_komparasi', {
            url: '/gl_komparasi',
            templateUrl: 'modules/laporan/views/gl_komparasi.html'
          })
          .state('laporan.gl_estimasi_baghas', {
            url: '/gl_estimasi_baghas',
            templateUrl: 'modules/laporan/views/gl_estimasi_baghas.html'
          })
          .state('laporan.gl_list_dpk_pyd', {
            url: '/gl_list_dpk_pyd',
            templateUrl: 'modules/laporan/views/gl_list_dpk_pyd.html'
          })
					.state('laporan.gl_pengurang_baghas', {
            url: '/gl_pengurang_baghas',
            templateUrl: 'modules/laporan/views/gl_pengurang_baghas.html'
          })
          .state('laporan.gl_real_baghas', {
            url: '/gl_real_baghas',
            templateUrl: 'modules/laporan/views/gl_real_baghas.html'
          }) 
//--------Laporan Manajemen---------------          
          .state('laporan.mnj_rasio', {
            url: '/mnj_rasio',
            templateUrl: 'modules/laporan/views/mnj_rasio.html'
          })
          .state('laporan.mnj_perkembangan', {
            url: '/mnj_perkembangan',
            templateUrl: 'modules/laporan/views/mnj_perkembangan.html'
          })
          .state('laporan.mnj_target', {
            url: '/mnj_target',
            templateUrl: 'modules/laporan/views/mnj_target.html'
          })
     }
    ]
  );