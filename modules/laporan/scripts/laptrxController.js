(function () {

    'use strict';

 

    angular.module('app').controller('laptrxController', controller);

    controller.$inject = [

    '$http', '$scope', '$alert', '$state', '$stateParams', '$location', '$modal',

    'actionServices','config','jwtHelper','focus'];

    

    function controller(

    $http, $scope, $alert, $state, $stateParams, $location, $modal, 

    actionServices,config,jwtHelper,focus){

        

    	var vm           = this,

            model        = 'vwtrx',

            user         = jwtHelper.decodeToken(window.localStorage.tokenKey),

            parentAction = _.merge(vm, actionServices),

            params       = {},

            heightOtherComponent = initHeight();

            

            vm           = _.merge(parentAction, {});    

        	vm.f         = {};

            vm.doSearch  = doSearch;
            //vm.ygMutasi  = ygMutasi;

            vm.view      = defindView();

            vm.execView($state, $stateParams);

            generateHeightContent(heightOtherComponent);

            

	    function defindView(){

	       return {

        	 	trx_kas_bank: function (){

                    focus('sKdcab');  
                    vm.model = 'vwmglkasbank';                    
                    model = vm.model;
                    
                    vm.list().then(function(){
                        $scope.allDatas = vm.datas;
                    });

                    $scope.ygMutasi = function(){
                        if(document.getElementById('ym').checked == true){
                            $scope.allDatas = _.filter(vm.datas,function(o) { return o.nomdebet != 0 || o.nomkredit != 0; });
                        }else{
                            $scope.allDatas = vm.datas;
                        }
                    };

                    

                    heightOtherComponent.hFilter = 46;

                    heightOtherComponent.hAllPadding = 55;	

    			},

                trx_laporantrx: function(){                    
                    $scope.f = {};
                    vm.model = 'vwtrx';
                    vm.s = {};
                    
                    $scope.tampil = function(){
                        var src = {};
                        if($scope.f.ststrn) src[0] = "ststrn = "+$scope.f.ststrn;                   
                    };

                    $scope.doSearch2 =  function (){                        
                        vm.where = {};
                        var src = {}
                        for(var k in vm.s){
                            console.log(k, vm.s[k]);
                            if(vm.s[k]){
                                if(k == 'ststrn' && vm.s[k] == 1){
                                    src['ststrn'] = "ststrn  < 4";
                                }else{
                                    src[k] = k+'="'+vm.s[k]+'"';
                                }
                            }
                            vm.where = src;
                        }
                        //console.log(src);
                        //return;
                        vm.list().then(function(){
                            $scope.allDatas = vm.datas;
                        });
                    }
                    $scope.detiltrn = function(data){
                        console.log("detil transaksi",data);
                    }

                    heightOtherComponent.hFilter = 80;

                    heightOtherComponent.hAllPadding = 95;

    			}

    	    };   

	    }
        

        function getData(){

            var filter = generateFilter();

            var parUrl = filter;

            

            vm.loadingGetData = true;

            actionServices.find(model + '?' + parUrl, {}, function(err, res){

                console.log('datas', err, res);

                vm.loadingGetData = false;

                if(!err){

                    vm.datas = res;

                }

                else { alert('Terjadi kesalahan'); }    

            })

		}

        

        function generateFilter(){

            console.log(params.mainFilter, params.filter);

            var mainFilter  = params.mainFilter || [];

            var otherFilter = params.filter || []; 

            var flt = mainFilter.concat(otherFilter); console.log(flt);

            var r   = "", split, condition;

            if(flt.length == 0) return '';

            

            flt.forEach(function(f,k){

                split = f.split("|");

                condition = split[1] ? (split[1] == 'OR' ? 'filteror' : 'filter') : 'filter';

                r += condition + '['+k+']=' + split[0] + '&';    

            })

            return r.substring(0, r.length - 1);

        }

        

        function doSearch(){
            document.getElementById('ym').checked = false;
            console.log('do search..')

            // params.filter = [];

            var src = {}

            for(var k in vm.s){

                console.log(k, vm.s[k]);

                if(vm.s[k]){

                    //var v = k == 'tgltrn' ? moment(vm.s[k]).format('YYYY-MM-DD') : vm.s[k]; params.filter.push(k+'="'+v+'"');

                    src[k] = k+'="'+vm.s[k]+'"';

                }

                vm.where = src;

            }

            //vm.list(); //getData();
            vm.list().then(function(){
                $scope.allDatas = vm.datas;
            });

        }

        function initHeight(){

            return {

                hHeader     : 48,

                hSubHeader  : 28,

                hTitle      : 30,

                hTHead      : 24,

                hFooter     : 47

            }

        }

        function generateHeightContent(heightOtherComponent){

            var h = document.body.clientHeight;

            var heightAllOtherComponent = 0;

            for(var key in heightOtherComponent){ heightAllOtherComponent += heightOtherComponent[key]; }

            var hContentTable = h - heightAllOtherComponent;

            console.log('h', h, heightAllOtherComponent,  hContentTable, heightOtherComponent);

            document.getElementById('contentArea').setAttribute("style","height:"+hContentTable+"px");

        }

                                

    }   

})();

