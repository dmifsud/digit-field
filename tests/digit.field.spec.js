describe('digit-field',function(){



  beforeEach(module('digit-field'));
  //beforeEach(module('ngMock'));

    var htmlDirective,
        scope,
        elem,
        compiled,
        $$timeout;


  describe('focusOnLoad', function(){

    beforeEach(function () {

      htmlDirective = "<digit-field ng-model=\"yourModel\"></digit-field>";

      inject(function ($compile, $rootScope,$timeout) {
          $$timeout = $timeout;
          scope = $rootScope.$new();
          scope.yourModel = 0;
          elem = angular.element(htmlDirective); //convert html directive to jqLite element
          compiled = $compile(elem); //compile the element into a processed view
          compiled(scope); //run the compiled view
          scope.$digest(); //call digest on scope (refresh)
      });

    });

    it('should create three input fields', function(){
      expect(angular.element(elem).find('input[type="text"]').length).toBe(3);
    });

    it('should have placeholder assigned on first input', function(){
      expect(angular.element(elem).find('.floatmask-bottom').attr('placeholder')).toBe("0.00");
    });

    it('should update actual model when updating model with 0.01', function(){
      scope.$$childTail.model = "1";
      scope.$apply();
      expect(angular.element(elem).find('.floatmask-bottom').attr('placeholder')).toEqual('0.01');
      expect(scope.yourModel).toEqual(0.01);
    });

    it('should update actual model when updating model with 0.10', function(){
      scope.$$childTail.model = "10";
      scope.$apply();
      expect(angular.element(elem).find('.floatmask-bottom').attr('placeholder')).toEqual('0.10');
      expect(scope.yourModel).toEqual(0.10);
    });

    it('should update actual model when updating model with 1.00', function(){
      scope.$$childTail.model = "100";
      scope.$apply();
      expect(angular.element(elem).find('.floatmask-bottom').attr('placeholder')).toEqual('1.00');
      expect(scope.yourModel).toEqual(1);
    });

  });

});
