(function () {
    'use strict';
    angular.module('app').controller('authCtrl', controller);
    controller.$inject = ['$http', '$scope',  '$state', '$stateParams', '$location',  'AuthService','actionServices'];
    function controller($http, $scope,  $state, $stateParams, $location, AuthService,actionServices){
    	$scope.user = {};
    	console.log($scope.user);
    	if(AuthService.isAuthenticated()){
    		$state.go('teller.main', {}, {reload: true});
    	}
    	$scope.view = {
	    	signin: function (){
	    		console.log("tes");
	    		$scope.noterminal = 0;
	    		$scope.doLogIn = function() {
			        //console.log("doing log in"), $state.go("dashboard");
			        AuthService.login($scope.user.username, $scope.user.password, function(respon){
			        	console.log(respon);
			        	if(respon=='success'){
			        		$state.go('teller.main', {}, {reload: true});
			        	} else {
			        		console.log("GAGAL");
			        	}
			        	
			        });
			    }
			    $scope.cekTerminal = function(){
			    	if($scope.user.terminal != ''){
			    		//with(document.applets[0]) {
							$scope.user.terminal = document.applets[0].hsname();
							terminal = 	$scope.user.terminal;
							$scope.noterminal = 1;
							console.log("Nama Terminal : " + terminal);
						//}
			    	}else{
			    		setTimeout("$scope.cekTerminal()",3000);
			    	}	
			    }
			    //$scope.cekTerminal();			
			    $scope.user.terminal = "testing";
			}, 
			logout: function(){
				AuthService.logout();
		   		$state.go('signin');
			},
            signup: function(){

            }
	    };

	    var _parentAction = _.merge($scope, actionServices);

        $scope = _.merge(_parentAction, {

        });

        $scope.execView($state, $stateParams);
    }
})();
