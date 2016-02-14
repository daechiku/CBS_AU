angular.module('app')
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
})
.constant('config', {
  apiUrl: 'v2/api',
  template: '/',
  tahunPelajaran: '2015-2016',
  notAuthorized: 'auth-not-authorized',
  pesan : {
  	errorsystem : "Ada kesalah sistem, silahkan hubungi administrator"
  },
  toNum:function(nom){
    var a = nom.replace(/,/g,'');
    return a*1;
  },
});