(function () {
    'use strict';
    angular.module('app').controller('nasabahController', controller);
    controller.$inject = ['$http', '$scope', '$alert', '$state', '$stateParams', '$location', '$modal','actionServices','$sce','jwtHelper','config'];
    function controller($http, $scope, $alert, $state, $stateParams, $location, $modal, actionServices,$sce,jwtHelper,config){
        function pad(ctn, n) { return new Array(n).join('0').slice(ctn.length-1) + ctn; }
        
        var vm = this;                
        var user = jwtHelper.decodeToken(window.localStorage.tokenKey); console.log('user', user);
    	$scope.menu = $location.path();
    	$scope.f = {}
    	 $scope.view = {
	    	cif_master: function (){	    		
	    		$scope.x = {};
	    		$scope.lbrCol = config.lbrCol;
	    		var formAdvancedSearch = $modal({scope: $scope, template: 'form-advanced-search',html:true,title: 'ADVANCED SEARCH', show:false});
	    		$scope.showAdvancedSearch = function(){
					formAdvancedSearch.$promise.then(formAdvancedSearch.show);
				}
				
	    		
	    		$scope.model = 'nasabah';
	    		$scope.title = "DATA MASTER NASABAH";
	    		
	    		var modalConfig = $modal({scope: $scope, template: 'form-data-user',html:true,title: 'FORM DATA', show:false});
		    	$scope.showModal = function(){
		    		$scope.f = {}
		    		$scope.x = {}
					modalConfig.$promise.then(modalConfig.show);
                    
                    getProv();
				}
				$scope.edit = function(row){
					console.log(row);
					$scope.f = row;
					modalConfig.$promise.then(modalConfig.show);
				}
				
		    	$scope.createOrUpdateProcess = function(){
		    	    
                    var idCab = user.kdcab; //'03';
                    var jenisNo = 'N'
                    actionServices.find('nomaster?filter[]=jenis="'+jenisNo+'" AND kdcab="'+idCab+'"', {}, function(err, res){
                        console.log('datas', err, res);
                        if(!err){
                            var dataNo = res.data[0];
                            
                            $scope.f.tgllhr  = $scope.f.tgllhr ? moment($scope.f.tgllhr).format('YYYY-MM-DD') : ''; 
                            $scope.f.tglbuka = moment().format('YYYY-MM-DD');
                            $scope.f.nocif   = idCab + pad(dataNo.nomor, 6);
                            delete $scope.f.prov;
                                  
                            console.log($scope.f);
        		    		$scope.itemId = $scope.f.uid;
        		    		$scope.createOrUpdate($scope.model,function(err, respon){
        		    		    console.log('respon nasabah ', respon);
                                if(!err){
                                    $scope.f = {};
                                    $scope.f.nomor = parseInt(dataNo.nomor) + 1;
                                    $scope.itemId  = dataNo.uid;
                                    $scope.createOrUpdate('nomaster',function(err, res){
                                        console.log('respon no master ', res);
                                    });    
                                }
        		    		},modalConfig);   
                        }
                        else {
                            
                        }    
                    })
				}
				
				//crud 
			     
				 $scope.setWhere = function(oWhere){
			    	
			        if(oWhere.kategori =='ALL'){
			            delete $scope.where.kategori;
			    	} 
			        else if(typeof oWhere.kategori !=='undefined'){
			            $scope.where.kategori = oWhere.kategori;
			        }
			        $scope.currentPage = 1
			        $scope.skip = ($scope.currentPage - 1) * $scope.limit;
			        //$scope.where = oWhere;
			        //$scope.orWhere = {};
			        $scope.list();
			    }
			    $scope.advwhere = ($scope.where) ? $scope.where : {};
			    $scope.setAdvSearch = function(oWhere){
			    	if(oWhere.kategori =='ALL'){
			            delete oWhere.kategori;
			    	} 
				    for(var key in oWhere) {
			    	    if(key ==='lk'){
			    	    	for(var l in oWhere[key]) {
			    	    		oWhere[l] =oWhere[key][l]+ ';lk'
			    	    		delete oWhere[key]
			    	    	}
			    	    }
			            if(oWhere[key] ==='') delete oWhere[key]
				    }
				    console.log('oWhere',oWhere)
			    	$scope.where ={}
			    	$scope.where = oWhere;
			    	$scope.list();
			    }
			   
			    
			    $scope.doSearch = function(keyword) {
			    	console.log('$scope.x',$scope.x);
			        if($scope.x) {
				        var src = {}
				        if($scope.x.nocif){
				            src['nocif'] = "nocif LIKE '%"+$scope.x.nocif + "%'";
				        }
				         if($scope.x.nama){
				            src['nama'] = "nama LIKE '%"+$scope.x.nama + "%'";
				        }
				       
				        
				        $scope.where = src;
			        }
			        else $scope.where = false;
			        $scope.list();
			        $scope.showPrint = true;
			        formAdvancedSearch.hide();
			    }
			
			    
			    //LOAD DATA
		     	$scope.currentPage = 1
			    $scope.where = {}
			    $scope.sortBy = 'uid'
			    $scope.sortOrder = 'desc'
			    $scope.skip = 0;
			    $scope.limit = 50;
			    $scope.objectRel = ''
			    $scope.list($scope.where);
			    //crud end
			    /*
			    $("table").colResizable({
			    	fixed:false
			    });
			    */
			},
			
	    };  
	    
	    var _parentAction = _.merge($scope, actionServices);
         
        $scope = _.merge(_parentAction, {
            
        });

        $scope.execView($state, $stateParams);
        
        var h = document.body.clientHeight,
            hHeader     = 48,
            hSubHeader  = 28,
            hTitle      = 45,
            hTHead      = 24,
            hFooter     = 47,
            hAllPadding = 55;
        
        var hContentTable = h - hHeader - hSubHeader - hTitle - hTHead - hFooter - hAllPadding;
        console.log('h', h, hContentTable);
        document.getElementById('contentArea').setAttribute("style","height:"+hContentTable+"px");
        
        $scope.getOption = getOption;
        
        function getProv(){
            if(!$scope.listProv){
            actionServices.find('mprov', {}, function(err, resProv){
                console.log('mprov', err, resProv);
                if(!err){ $scope.listProv = resProv.data; }
                else { alert('Terjadi kesalahan'); }
            }); 
            }
        }
        
        $scope.listKab = {};
        $scope.listKec = {};
        $scope.listKel = {};
        function getOption(m, d){
            console.log('get ', m, d);
            var paramOpt, idParam;
            switch(m) {
                case 'mkab':
                    $scope.f.kota = '';
                    $scope.f.kec = '';
                    $scope.f.kel = '';
                    if(!$scope.listKab[d]){
                        $scope.loadKab = true;
                        paramOpt = _.filter($scope.listProv, {Nama:d})[0]; 
                        idParam  = paramOpt.idprov; 
                        actionServices.find(m + '?filter[]=idprov='+idParam, {}, function(err, resKab){
                            console.log('mkab', err, resKab);
                            $scope.loadKab = false;
                            if(!err){ $scope.listKab[d] = resKab.data; }
                            else { alert('Terjadi kesalahan'); }
                        }); 
                        //console.log('idParam', paramOpt, idParam);
                    }
                    break;
                    
                case 'mkec':
                    $scope.f.kec = '';
                    $scope.f.kel = '';
                    if(!$scope.listKec[d]){
                        $scope.loadKec = true;
                        paramOpt = _.filter($scope.listKab[$scope.f.prov], {Nama:d})[0]; 
                        idParam  = paramOpt.idkab; 
                        actionServices.find(m + '?filter[]=idkab='+idParam, {}, function(err, resKec){
                            console.log('mkec', err, resKec);
                            $scope.loadKec = false;
                            if(!err){ $scope.listKec[d] = resKec.data; }
                            else { alert('Terjadi kesalahan'); }    
                        });
                    }
                    break;
                case 'mkel':
                    if(!$scope.listKel[d]){
                        $scope.loadKel = true;
                        paramOpt = _.filter($scope.listKec[$scope.f.kota], {Nama:d})[0]; 
                        idParam  = paramOpt.idkec; 
                        actionServices.find(m + '?filter[]=idkec='+idParam, {}, function(err, resKel){
                            console.log('mkel', err, resKel);
                            $scope.loadKel = false;
                            if(!err){ $scope.listKel[d] = resKel.data; }
                            else { alert('Terjadi kesalahan'); }    
                        });
                    }
                    break;
            }
        }                                
    }   
})();
