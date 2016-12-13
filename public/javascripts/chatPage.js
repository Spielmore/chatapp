(function (angular){

   var chatPageModule = angular.module('chatPage', [])
   
   chatPageModule.controller("chatPageController", ["$scope", "$window", "$http",
		function($scope, $window, $http){
			
			$scope.repInit = function(repName){
				if(repName){
					$http.post("/api/RepInit", {})
						.then(function (result) {
						  //success
						  $window.location.href = "/chatPage";
						}, function (err) {
						  //failure
						  console.log("Failed to initialize Customer Rep");
						}); 
				}
				
			}
			
		}
   ]);
	
})(window.angular)