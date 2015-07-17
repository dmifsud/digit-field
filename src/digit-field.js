angular.module('templates', []);
angular.module('digit-field',['templates'])
.directive('digitField', function($filter){
  'use strict';
    return {
      restrict: 'E',
      templateUrl: 'digit-field.html',
      require: 'ngModel',
      scope: {
        actualModel: '=ngModel'
      },
      link: function(scope, element, attr){
        // if (attr.class){
        //
        // }

        //Init
        //----------------------------------------------------------------------
        scope.placeholder = '0.00';


        //Watches
        //----------------------------------------------------------------------

        scope.$watch('model', function(val, old){

          if (angular.isDefined(val) && val !== old){

            scope.actualModel = parseInt(val || 0)/100;
            scope.placeholder = $filter('number')(scope.actualModel, 2);


            if (val !== null && val.length > 2){
              scope.result = $filter('number')(scope.actualModel, 2);
            }else{
              scope.result = val || undefined;
            }

          }

        });

      }
    };
});
