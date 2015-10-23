var todoApp = angular.module('todoApp', ['ui.bootstrap']);


    todoApp.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'home.html',
                controller  : 'mainController'
            })
            .when('/about', {
                templateUrl : 'about.html'
            })
            .when('/features', {
                templateUrl : 'features.html'
            })
            .when('/references', {
                templateUrl : 'references.html'
            });
    });

  angular.module('orderByExample', [])
    .controller('ExampleController', ['$scope', function($scope) {
      
    }]);

function NavBarCtrl($scope) {
    $scope.isCollapsed = true;
}
function mainController($scope, $http) {
    $scope.formData = {};

    $scope.predicate = 'time';
    $scope.reverse = true;
    
      $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
      };

    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}

