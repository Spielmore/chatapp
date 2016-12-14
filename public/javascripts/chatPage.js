(function (angular){

   var chatPageModule = angular.module('chatPage', [])
   
   chatPageModule.controller("chatPageController", ["$scope", "$rootScope", "$window", "$http",
		function($scope, $rootScope, $window, $http){
			
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
			
			console.log($window.user);
			console.log($window.role);
			$scope.user = $window.user;
			$scope.role = $window.role;
			
			$scope.chatMsg = {};
			//$scope.chatWall = $window.chatWall;
			$window.chatWall.append("\n");
			
			var socket = io.connect();
			
			$scope.findPartner = function(){
				socket.emit('findPartner', { name: $scope.user, role: $scope.role});
			}
			
			$scope.sendMessage = function(){
				socket.emit('sendMsg', {name: $scope.user, msg: $scope.chatMsg.text});
				$scope.chatMsg.text = "";
			}
			
			socket.on('newMsg', function(data){
				$window.chatWall.append(data.name + ": " + data.msg + "\n");//.append("<span></span>");
				//$window.chatWall.append("\n\r");
				//$window.chatWall.append("<br>" + $scope.user + ": " + msg + "</br>" + "\n");
				//$window.chatWall.append("<br />");
			});
			
		}
   ]);
	
})(window.angular)