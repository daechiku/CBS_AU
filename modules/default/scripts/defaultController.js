(function () {
    'use strict';
 
    angular.module('app').controller('defaultController', controller);
    controller.$inject = ['$http', '$scope', '$alert', '$state', '$stateParams', '$location', '$modal','actionServices','config', 'jwtHelper'];
    function controller($http, $scope, $alert, $state, $stateParams, $location, $modal, actionServices,config,jwtHelper){
    	var user = jwtHelper.decodeToken(window.localStorage.tokenKey);
    	console.log(user);
    	$scope.f = {}
    	 $scope.view = {
	    	keterangan: function (){
	    		console.log("keterangan");	
			},
			
	    };  
	    
	    var _parentAction = _.merge($scope, actionServices);
         
        $scope = _.merge(_parentAction, {
            
        });

        $scope.execView($state, $stateParams);   
                                
    }   
})();
