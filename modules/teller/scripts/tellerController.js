 	(function () {

    'use strict';

 

    angular.module('app').controller('tellerController', controller);

    controller.$inject = [

    '$http', '$scope', '$alert', '$state', '$stateParams', '$location', '$modal','$parse','$filter',

    'actionServices','config', 'jwtHelper','focus'];

    

    function controller(

    $http, $scope, $alert, $state, $stateParams, $location, $modal, $parse,$filter,

    actionServices,config,jwtHelper,focus){

        

    	var vm           = this,

            user         = jwtHelper.decodeToken(window.localStorage.tokenKey),

            parentAction = _.merge(vm, actionServices),

            params       = {};

            

        vm      = _.merge(parentAction, {});    

    	vm.f    = {};

        vm.view = defindView();

        vm.execView($state, $stateParams);

        console.log(user);

	    function defindView(){	    	

	       return {

        	 	teller: function (){
                    console.log(user);
                    focus('kdtrn');
        	 		$scope.f = {};
    	    		console.log("main function");
                    params.filter = ['modul="T"'];
                    getData();	

                    
                    //SETUP MODAL
                    var formTeller = $modal({scope: $scope,  template: 'modules/teller/views/trxteller1.html',html:true,title: 'Transaksi Terik/Setor', show:false});                    
                    var kdtrntidakada = $modal({scope: $scope, template: 'kdtrntdkada',html:true,title: 'Produk Tidak Ada', show:false});

                    //ON MODAL HIDE
                    $scope.$on('modal.hide',function(){
                        focus('kdtrn');
                        $scope.pesanErrNo = 0;
                        $scope.pesanErr = "";
                        $scope.f.norek = '';
                        $scope.f.noreknama = '';
                        $scope.f.reklawan = '';
                        $scope.datanorek = undefined;
                    });                    

                    //PILIH TIPE TELLER SESUAI JENIS TRN DI TABLE   
                    $scope.showformTeller = function(data){
                        if(data.jnstrn == 1){
                            $scope.teller = 1;
                            $scope.judul = 'Transaksi Terik/Setor';
                        }else if(data.jnstrn == 2){
                            $scope.teller = 2;
                            $scope.judul = 'Transaksi Rekening Default';
                        }else{
                            $scope.teller = 3;
                            $scope.judul = 'Transaksi Teller Over-Booking';
                        }
                        formTeller.$promise.then(formTeller.show);
                        focus('norek');
                    	
					}   

                    //AMBIL ACTION ENTER DI FIELD KODETRN
                    $scope.showFormOnEnter = function(kdtrx){
                        if(!kdtrx){
                            return;
                        }
                        if(kdtrx.length == 0){
                            return;
                        }

                    	var produk = null;

                    	for (var i = 0; i < vm.datas.numrows; i++){

						  if (vm.datas.data[i].kdtrn == kdtrx){

						  	$scope.f = vm.datas.data[i];

						  	produk = 1; 

						  }

						}  

						if(produk == 1){

                    		$scope.showformTeller($scope.f);

                    	}else{

                    		kdtrntidakada.$promise.then(kdtrntidakada.show);

                    	} 

                    };


                    //ACTION DOUBLE CLIK DI NAMA/KETERANGAN TABLE
                    $scope.showFormOnDbClick = function(data){
                        $scope.f = {};
                    	//console.log(data);

                    	$scope.f = data; 

                    	$scope.showformTeller($scope.f);

                    };

                    //AMBIL DATA KETIKA INPUT NOREK DI F.NOREK
                    $scope.getNamaNasabah = function(norek,tujuan,data){
                        $scope.pesanErrNo = 0;
                        if(!norek) return;
                        var j = norek.substring(0,1);
                        var the_string = tujuan;
                        var model = $parse(the_string);
                        var the_string2 = data;
                        var model2 = $parse(the_string2);
                        
                        var hsl = '';
                        var hsl2 = '';

                        var tipetrn = [];
                        tipetrn[0] = 'kas';
                        tipetrn[1] = 'vwrektab';
                        tipetrn[2] = 'vwrekdep'
                        tipetrn[3] = '';
                        tipetrn[4] = 'vwpyd'
                        tipetrn[5] = 'mgl'


                        if(j != $scope.f.jnskr){
                            console.log($scope.f.jnskr);
                            model.assign($scope, "TRANSAKSI DITOLAK");
                            $scope.pesanErrNo = 4;
                            return;
                        }

                        if(norek){
                            $http.post(config.apiUrl + '/'+tipetrn[j]+'/getNama',{norek:norek},{
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                                }
                            }).
                            success(function(data, status, headers, config) {
                                console.log(data);
                                if(data.status=='success'){
                                    //$scope.f.noreknama = data.data.nama;
                                    hsl = data.data.nama;
                                    hsl2 = data.data;
                                } else {
                                    //$scope.f.noreknama = data.pesan;
                                    hsl = data.pesan
                                }
                                model.assign($scope, hsl);
                                model2.assign($scope, hsl2);

                                var i = $scope.cekKonfirmasi();
                                $scope.pesanErrNo = i;
                                $scope.pesanErr = $scope.ketKonformasi(i);
                            }).
                            error(function(data, status, headers, config) {

                            });


                        }
                    };


                    ///--------------------BLOK KONFIRMASI-----------------------//
                    $scope.cekKonfirmasi = function(){
                        if($scope.teller == 1){
                            if($scope.datanorek.baru == 'Y' && config.toNum($scope.f.nominal) < config.toNum($scope.datanorek.setor_awal)){
                                return 2;
                            }else if($scope.f.nominal*1 < $scope.datanorek.setor_brg*1){
                                return 3
                            }else if($scope.datanorek.stsrec != 'A'){
                                return 4
                            }else if($scope.datanorek.stsblok == 'R'){
                                return 5
                            }else{
                                return 1
                            }
                        }
                    };
                    $scope.ketKonformasi = function(j){
                        var ket = [];
                        ket[0] = "";
                        ket[1] = "";
                        ket[2] = "Nominal Setor Minimal Rp "+ $scope.datanorek.setor_awal;
                        ket[3] = "Nominal Setor Minimal Rp "+ $scope.datanorek.setor_brg;
                        ket[4] = "No.Rekening Tidak Aktif!";
                        ket[5] = "No.Rekening Terblokir"                        
                        return ket[j];
                    };


                    $scope.konfirmasi = function(){                        
                        var i = $scope.cekKonfirmasi();
                        $scope.pesanErrNo = i;
                        $scope.pesanErr = $scope.ketKonformasi(i);

                        console.log($scope.pesanErrNo);
                        if(i != 1){
                            return;
                        }else{
                            $scope.proses = 1;
                        }
                    };

                    ///--------------------END BLOK KONFIRMASI-----------------------//


                    //---------------------BLOK PROSES----------------------------//
                    $scope.setorTrx = function(){
                        //-------------------SETORAN ---------------------------//
                        var data = {

                            batch   : user.batch,
                            kdtrn   : $scope.f.kdtrn,
                            
                            debet   : user.sbbkas,
                            dbcab   : user.kdcab,
                            jnsdb   : $scope.f.jnsdb,
                            
                            kredit  : $scope.f.norek,                            
                            krcab   : $scope.datanorek.kdcab,
                            jnskr   : 1,//$scope.f.jnsdb,
                            
                            //dok     :                             //no.dokumen / no.seri slip (jika pake slip percetakan)
                            tgldok  : user.tgltrn,
                            nominal : config.toNum($scope.f.nominal) ,
                            kurs    : 1,
                            tglkurs : user.tgltrn,
                            ket     : $scope.f.ket,
                            prog    : 'teller',                            
                            
                            coadebet    : user.fsbbkas,
                            coakredit   : $scope.datanorek.sbbtab,
                            ststrn      : '1' ,//1:sukses 2:ReversBlmOtorisasi 3:Pending 4:ReversSudahOtorisasi
                            //trnkedr/trnkecr = gak perlu diisi
                            kdtrnbuku   : $scope.f.kdtrnbuku,
                            stscetak    : $scope.f.ctkbuku,
                            

                            inpterm    : terminal,
                            tgltrn      : user.tgltrn,
                            tglinp      : user.tgltrn,
                            kdcab   : user.kdcab,
                            inpuser : user.userid,

                        };
                        return data;
                    };

                    $scope.prosesTrx = function(){
                        var data = {};
                        switch(config.toNum($scope.f.kdtrn)) {                            
                            case 1000:
                            case 1010:
                                data = $scope.setorTrx();
                                break;
                            case 1100:
                            case 1101:
                                data = $scope.setorTrx();
                                data.debet = $scope.f.norek;
                                data.dbcab = $scope.datanorek.kdcab;
                                data.jnsdb = 1

                                data.kredit = user.sbbkas;
                                data.krcab  = user.kdcab
                                data.jnskr = $scope.f.jnsdb;

                                data.coadebet  = $scope.datanorek.sbbtab;
                                data.coakredit = user.fsbbkas;
                                break;
                        }
                        
                        var param = {
                            idawal:config.toNum(user.idawal)
                        };

                        //console.log("data field sebelum dikirim",data); 
                        //console.log("data param",param);
                        //return;
                        $http.post(config.apiUrl + '/transaksi/insertTrx',{field:data,params:param},{
                        //$http.post(config.apiUrl + '/user/signin',{field:data,params:param},{
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                            }
                        }).
                        success(function(datas, status, headers, config) {
                            console.log(datas);
                            $scope.f.notrn = datas.data.nogrp;

                        }).
                        error(function(datas, status, headers, config) {

                        });
                    }
                    $scope.prosesOff = function(){
                        $scope.proses = 0;
                        $scope.pesanErrNo = 0;
                    }
                    //---------------------BLOK PROSES----------------------------//

    			},
    	    };   

	    }

        

        function getData(){

            var filter = params.filter ? generateFilter(params.filter) : '';

            var parUrl = filter;

            //console.log('params', params, parUrl);

            

            actionServices.find('setuptrn?' + parUrl, {}, function(err, res){

                console.log('datas', err, res);

                console.log("terminal = "+terminal);

                if(!err){
                    vm.datas = res;

                    

                }

                else {

                    

                }    

            })

		}

        

        function generateFilter(flt){

            var r = "", split, condition;

            flt.forEach(function(f,k){

                split = f.split("|");

                condition = split[1] ? (split[1] == 'OR' ? 'filteror' : 'filter') : 'filter';

                r += condition + '['+k+']=' + split[0] + '&';    

            })

            return r.substring(0, r.length - 1);

        }

                                

    }   

})();



