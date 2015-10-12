var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) 
{
    console.log("Hello World from controller");

var refresh = function() {
		$http.get('/getloc').success(function(response){
			console.log("I got the data i requested");
			$scope.cafeList = response;
			$scope.contact = "";
		});
	};
	refresh();
	
$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/addCafe', $scope.contact).success(function(response){
			console.log(response);
			refresh();
			});
		};

$scope.deleteContact = function(id){
	console.log("Trying to delete " + id);
	$http.delete('/getloc/' + id).success(function(response){
			refresh();
		});
	};

$scope.edit = function(id){
	console.log(id);
	$http.get('/getloc/' + id).success(function(response){
		$scope.contact = response;
		});
	};

$scope.update = function(){
	console.log($scope.contact._id);
	$http.put('/getloc/' + $scope.contact._id, $scope.contact).success(function(response){
		refresh();
		});
	};

$scope.deselect = function(){
	$scope.contact = "";
};
    
}]);


