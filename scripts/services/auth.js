angular.module('app')
.service('AuthService', function($q, $http, USER_ROLES,config) {
  var LOCAL_TOKEN_KEY = 'tokenKey';
  var username = '';
  var infouser = {};
  var isAuthenticated = false;
  var role = '';
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    username = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;

    if (username == 'admin') {
      role = USER_ROLES.admin;
    }
    if (username == 'user') {
      role = USER_ROLES.public;
    }

    // Set the token as header for your requests!
    $http.defaults.headers.common['Authorization'] = "Bearer "+token;
    //$http.defaults.headers.Authorization = "Bearer "+token;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    infouser = {};
    isAuthenticated = false;
    //$http.defaults.headers.common['X-Auth-Token'] = undefined;
    $http.defaults.headers.common['Authorization'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var login = function(name, pw, next) {
		  	$http.post(config.apiUrl + '/user/signin',{username:name,password:pw},{
		  		headers: {
		            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
		    	}
		  	}).
		  success(function(data, status, headers, config) {
		  	console.log("Notify : Login success");
		  	console.log(data);
		  	if(data.status=='success'){
			  		// Make a request and receive your auth token from your server
			        storeUserCredentials(data.token);
			        infouser = data;
			        //this.headers.Authorization = 'Bearer ' + data.token;
			        //update GCM
			       
		       //PushProcessingService.initialize();
		       next('success');
		  	} else {
		  	   next('error');
		  	}
		  }).
		  error(function(data, status, headers, config) {
		  	console.log("Notify : Login gagal");
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    next('error');
		  });
	/**
    return (function(resolve, reject) {
    	return $http.post(config.apiUrl + '/siswalogin/signin',{username:name,password:pw}).
		  success(function(data, status, headers, config) {
		  	console.log("Notify : Login success");
		  	console.log(data);
		  	if(data.status=='success'){
			  		// Make a request and receive your auth token from your server
			        storeUserCredentials(data.token);
			        infouser = data;
			        //this.headers.Authorization = 'Bearer ' + data.token;
			        //update GCM
			       
		       //PushProcessingService.initialize();
		       resolve('Login success.');
		  	} else {
		  	   reject('Login Failed.');
		  	}
		  }).
		  error(function(data, status, headers, config) {
		  	console.log("Notify : Login gagal");
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    reject('error http server.');
		  });
    }); */
  };

  var logout = function() {
    destroyUserCredentials();
  };

  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };

  loadUserCredentials();

  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    infouser: function() {return infouser;},
    role: function() {return role;}
  };
})
.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
