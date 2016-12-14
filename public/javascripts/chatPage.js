(function (angular){

   var chatPageModule = angular.module('chatPage', ["ngBootbox"])
   
   chatPageModule.controller("chatPageController", ["$scope", "$rootScope", "$ngBootbox", "$window", "$http",
		function($scope, $rootScope, $ngBootbox, $window, $http){
			
			$scope.repInit = function(repName){
				if(repName){
					$http.post("/", {})
						.then(function (result) {
						  //success

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
			
			$scope.currTime = function(){
				return new Date().getHours()+":"+new Date().getMinutes();
			}
			//$scope.currHour = $scope.currDate.getHours();
			//$scope.currMinute = $scope.currDate.getMinutes();
			
			var socket = io.connect();
			
			$scope.findPartner = function(){
				socket.emit('findPartner', { name: $scope.user, role: $scope.role});
			}
			
			$scope.sendMessage = function(){
				socket.emit('sendMsg', {name: $scope.user, msg: $scope.chatMsg.text});
				$scope.chatMsg.text = "";
			}
			
			socket.on('newMsg', function(data){
				$window.chatWall.append("["+$scope.currTime()+"]"+" "+data.name + ": " + data.msg + "\n");
				//$window.chatWall.append("\n\r");
				//$window.chatWall.append("<br>" + $scope.user + ": " + msg + "</br>" + "\n");
				//$window.chatWall.append("<br />");
			});
			
			socket.on('foundUser', function(data){
				//document.getElementById('alertBtn').click();
				$ngBootbox.alert("You Are Now Connected To A "+ data +"!");
			});
			
		}
   ]);
	
})(window.angular)