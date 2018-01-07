(function () {
    "use strict";
    /* global angular, console */
    angular.module('ShoppingListCheckOff', [])
        .controller('ShoppingListBuyController', ShoppingListBuyController)
        .controller('ShoppingListBoughtController', ShoppingListBoughtController)
        .service('ShoppingListService', ShoppingListService);

    //SHOPPING LIST BUY CONTROLLER
    ShoppingListBuyController.$inject = ['$scope','ShoppingListService'];

    function ShoppingListBuyController($scope,ShoppingListService) {

        var buyList = this;

        $scope.message = "";

        $scope.$watch(
            function(){ return ShoppingListService.getBuyMessage()},

            function(newVal) {
                $scope.message = newVal;
            }
        )

        buyList.items = ShoppingListService.getList();
        buyList.updateList = function (index) {
            ShoppingListService.updateList(index);
        }
    }

    //SHOPPING LIST BOUGHT CONTROLLER
    ShoppingListBoughtController.$inject = ['$scope','ShoppingListService'];

    function ShoppingListBoughtController($scope,ShoppingListService) {

        var boughtList = this;

        $scope.message = "Nothing bought yet";

        $scope.$watch(
            function(){ return ShoppingListService.getBoughtMessage()},

            function(newVal) {
                $scope.message = newVal;
            }
        )


        boughtList.boughtItems = ShoppingListService.getBoughtList();

    }

    //SHOPPING LIST SERVICE
    function ShoppingListService() {
        var listService = this;

        var boughtItems = [];
        var items = [{
            name: "Cookies",
            quantity: "24"
        }, {
            name: "Sandwhiches",
            quantity: "5"
        }, {
            name: "Pizzas",
            quantity: "2"
        }, {
            name: "Sodas",
            quantity: "24"
        }, {
            name: "Plates",
            quantity: "50"
        }];

        //GET TO BUY LIST
        listService.getList = function () {
            return items;
        }

        //GET BOUGHT LIST
        listService.getBoughtList = function () {
            return boughtItems;
        }

        //UPDATE THE LIST
        listService.updateList = function (index) {
            console.log("update");
            var arrayValue = items[index];

            listService.addItem(arrayValue);
            listService.removeItem(index);
        }


        //ADD ITEM TO BOUGHT LIST
        listService.addItem = function (arrayValue) {
            boughtItems.push(arrayValue);
            console.log(JSON.stringify(boughtItems));
        }

        //REMOVE ITEM FROM BUY LIST
        listService.removeItem = function (index) {
            items.splice(index, 1);
            console.log(JSON.stringify(items));
        }

        //UPDATE THE BUY LIST MESSAGE
        listService.getBuyMessage = function () {
            var message;
            if (items.length == 0) {
                message = "Everything is bought!";
            } else {
                message = "";
            }
            return message;
        }

        //UPDATE THE BOUGHT LIST MESSAGE
        listService.getBoughtMessage = function () {
                       console.log("boughtItems.length: " + boughtItems.length);
            var message;
             if (boughtItems.length > 0) {
                 message = "";
             } else {
                 message = "Nothing bought yet";
             }
            return message;
        }

    }
})();
