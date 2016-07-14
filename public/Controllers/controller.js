var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope', '$http', function($scope, $http){


var refresh = function(){

	$http.get('/contactList').success(function(response){

		//console.log("I got the data I requested");

		$scope.contactList = response;

	});
};

refresh();

	//console.log("Hello world from Controller");

	$scope.addContact = function(){

		console.log($scope.contact);

		$http.post('/contactList', $scope.contact).success(function(response){

			console.log(response);
			refresh();

		});

	}

	$scope.remove = function(id){

		console.log(id);
		$http.delete('/contactList/' + id).success(function(response){

			refresh();

		});

	}

	$scope.edit = function(id){

		editx = id;

		console.log(id);
		$http.get('/contactList/' + id).success(function(response){

			$scope.contact = response;

		});

	}

	$scope.update  = function(){

		console.log($scope.contact._id);


		$http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function(response){

			refresh();

		})

	};

	$scope.clear = function(){

		$scope.contact = "";

	};

	$scope.findContact = function(){

		//console.log($scope.fContact.name);
		if($scope.fContact.name!=null)
		{

			$http.get('/fContactList/' + $scope.fContact.name).success(function(response){

				console.log(response);
				$scope.fContactListName = response.name;
				$scope.fContactListEmail = response.email;
				$scope.fContactListNumber = response.number;
			
			});
		}

		else
		{
			$http.get('/fContactList/' + $scope.fContact.email).success(function(response){

				console.log(response);
				$scope.fContactListName = response.name;
				$scope.fContactListEmail = response.email;
				$scope.fContactListNumber = response.number;
			
			});
		}

	};

}]);