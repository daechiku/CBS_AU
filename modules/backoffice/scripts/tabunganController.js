(function () {
'use strict';
	angular.module('app').controller('tabunganController', controller);
  	controller.$inject = ['$http', '$scope', '$alert', '$state', '$stateParams', '$location', '$modal','actionServices','config', 'jwtHelper'];
    function controller($http, $scope, $alert, $state, $stateParams, $location, $modal, actionServices,config,jwtHelper){
    	var user = jwtHelper.decodeToken(window.localStorage.tokenKey);
    	console.log(user);
    	$scope.f = {}
    	$scope.view = {
    		tab_master: function (){
	    		console.log("tab_master function");	
	    		$scope.getSetupTab = function(){
	    			$http.get(config.apiUrl+'/setuptab/'+$scope.f.kdprd)
	    				.success(function(respon){
	    					console.log(respon);
	    					$scope.dataSetupTab = respon.data;
	    				});
	    		}
				}
	    };  
	    
	    var _parentAction = _.merge($scope, actionServices);   
        $scope = _.merge(_parentAction, {
            
        });

        $scope.execView($state, $stateParams);   
                                
    }   
})();
