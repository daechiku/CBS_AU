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

                    //model = 'vwmglkasbank',

                    //params.mainFilter = [];

                    //getData();

                                                            

                    vm.model = 'vwmglkasbank';
                    model = vm.model;
                    vm.list();
                    var allData = vm.datas;
                    
                    $scope.ygMutasi = function(datas){
                        if($scope.ym){
                           var a = [];
                            datas.forEach(function(b,index){
                                var c = {};
                                if(b.nomdebet != 0 || b.nomkredit != 0){                                
                                    a.push(b);
                                }
                            });
                            vm.datas = a;
                       }else{
                            vm.list();
                       }
                    };

                    

                    heightOtherComponent.hFilter = 46;

                    heightOtherComponent.hAllPadding = 55;	

    			},

                trx_laporantrx: function(){

    				params.filter = [];

    				getData();

                    

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

            $scope.allData = vm.list(); //getData();

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

