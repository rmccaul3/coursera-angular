(function () {
    "use strict";
    /* global angular */
    angular.module('myApp', [])
        .controller('MyController', MyController);
    MyController.$inject = ['$scope'];

    function MyController($scope) {
        $scope.items = "";
        $scope.listedItems;

        $scope.countItems = function () {
            var itemsArray = $scope.items.split(",");
            console.log(checkArray(itemsArray));
            if (checkArray(itemsArray) == true) {
                $scope.message = getMessage(itemsArray.length);
                clearItems($scope.items);
                console.log("Array check == true");
            } else {
                $scope.message = "Sorry, we do NOT consider and empty items!"
                console.log("Array check == false");
            }

        }

        function getMessage(x) {
            console.log("getMessage");
            var message;
            if (x == null) {
                message = "Please enter data first.";
                console.log(x);
            } else if (x <= 3) {
                message = "Enjoy!";
                console.log(x);
            } else {
                message = "Too much!";
                console.log(x);
            }
            return message;
        }

        function clearItems(y) {
            $scope.listedItems = y
            $scope.items = "";
        }

        function checkArray(itemsArray) {
            for (var i = 0; i < itemsArray.length; i++) {
                if (itemsArray[i] === "")
                    return false;
            }
            return true;
        }
    }
})();
