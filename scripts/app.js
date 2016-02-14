'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
String.prototype.splice = function(idx, rem, s) {
    return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
};
angular
  .module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.utils',
    'mgcrea.ngStrap',
    'pascalprecht.translate',
    'oc.lazyLoad',
    'ui.load',
    'ui.jp',
    'angular-loading-bar',
    'angular-jwt'
    //,'myEnter'
  ])
  .directive('addClassToHeaderOnHover', function(){
        return function(scope, element, attrs){
            var classname = element.attr('add-class-to-header-on-hover');
            element.mouseenter(function(){
                var idx = element.index() + 1;
                var $htd = element.parents('table').find('thead td:nth-child(' + idx + ')');
                $htd.addClass(classname);
            });

            element.mouseleave(function(){
                var $htd = element.parents('table').find('thead td');
                $htd.removeClass(classname);
            });
        }
    })
.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keyup", function (event) {
            if(event.which === 13) {
            	/*
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });
                */
                event.preventDefault();
            }
        });
    };
})
.directive('currencyInput', function() {
    return {
        restrict: 'A',
        scope: {
            field: '='
        },
        replace: false,
        require: 'ngModel',
        template: '<span><input type="text" ng-model="field"></input>{{field}}</span>',
        link: function(scope, element, attrs) {
            
            $(element).bind('keyup', function(e) {
                var input = element.find('input');
                var inputVal = input.val();

                //clearing left side zeros
                while (scope.field.charAt(0) == '0') {
                    scope.field = scope.field.substr(1);
                }

                scope.field = scope.field.replace(/[^\d.\',']/g, '');

                var point = scope.field.indexOf(".");
                if (point >= 0) {
                    scope.field = scope.field.slice(0, point + 3);
                }

                var decimalSplit = scope.field.split(".");
                var intPart = decimalSplit[0];
                var decPart = decimalSplit[1];

                intPart = intPart.replace(/[^\d]/g, '');
                if (intPart.length > 3) {
                    var intDiv = Math.floor(intPart.length / 3);
                    while (intDiv > 0) {
                        var lastComma = intPart.indexOf(",");
                        if (lastComma < 0) {
                            lastComma = intPart.length;
                        }

                        if (lastComma - 3 > 0) {
                            intPart = intPart.splice(lastComma - 3, 0, ",");
                        }
                        intDiv--;
                    }
                }

                if (decPart === undefined) {
                    decPart = "";
                }
                else {
                    decPart = "." + decPart;
                }
                var res = intPart + decPart;

                scope.$apply(function() {scope.field = res});

            });

        }
    };
})
.directive('eventFocus', function(focus) {
    return function(scope, elem, attr) {
      elem.on(attr.eventFocus, function() {
        focus(attr.eventFocusId);
      });

      // Removes bound events in the element itself
      // when the scope is destroyed
      scope.$on('$destroy', function() {
        elem.off(attr.eventFocus);
      });
    };
})
.factory('focus', function($timeout, $window) {
    return function(id) {
      // timeout makes sure that it is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.focus();
      }, 600);
    };
})
;