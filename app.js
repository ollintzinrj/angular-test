(function (){
  'use strict'; 

  //declaracion de la app
  angular.module('LunchCheckApp', [])

  //declaracion de controlador
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope)
  {
    //variables necesarias
    $scope.list = "";
    $scope.message = "";
    $scope.colorText = "black";
    $scope.colorTextarea = "1px solid grey;";

    //funcion de retorno
    $scope.check = function(){
      var total = 0; 

      if($scope.list == ''){
        $scope.message = "Empty! " +total + " items. Write the items first.";
        $scope.colorText = "red";
        $scope.colorTextarea = "1px solid red;";
      }
      else{
        total = cuenta_items($scope.list.split(","));

        if (total <= 3){
          $scope.message = "Enjoy! " +total + " items";
          $scope.colorText = "green";
          $scope.colorTextarea = "1px solid green;";
        }

        else{
          if(total > 3)
          $scope.message = "Too Much! " +total + " items";
          $scope.colorText = "green";
          $scope.colorTextarea = "1px solid green;";
        }
      }
    };

    //funcion de calculo
    function cuenta_items(lista_items) {
      var total_items = 0;

      for (var i = lista_items.length - 1; i >= 0; i--) {
        if(lista_items[i] != '')
          total_items = total_items + 1;
      }
      return total_items;
    }

  }

})();