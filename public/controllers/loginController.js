var myApp = angular.module('myApp', []);
myApp.controller('LoginCtrl', ['$scope', '$http', function($scope, $http) 
{
	console.log("Hellow from controller");
	$scope.Login = function() {
		console.log($scope.contact.username);
		// $http.put('/auth', $scope.contact).success(function(response){
		// 	console.log(response);
		// 	render(response);
		// });

$http.get('/Locations').success(function(response){
			console.log("I got the data i requested");
	});
}
}]);