(function (angular){

   var mainPageModule = angular.module('mainPage', [])
   
   mainPageModule.controller("mainPageController", ["$scope", "$rootScope", "$window", "$http",
		function($scope, $rootScope, $window, $http){
			
			$scope.custInput = {};
			$scope.repInput = {};
			
			$scope.repInit = function(repName){
				if(repName){
					$http.post("/api/RepInit", {repName: repName})
						.then(function (result) {
						  //success

						  //$window.location.href = "/chatPage";
						}, function (err) {
						  //failure
						  console.log("Failed to initialize Customer Rep");
						}); 
				}
				
			}
			
			$scope.custInit = function(custName){
				if(custName){
					$http.post("/api/CustInit", {custmName: custName}) 
						.then(function (result) {
						  //success

						  //$window.location.href = "/chatPage";
						}, function (err) {
						  //failure
						  console.log("Failed to initialize Customer");
						}); 
				}
				
			}
			
		}
   ]);
	
})(window.angular)