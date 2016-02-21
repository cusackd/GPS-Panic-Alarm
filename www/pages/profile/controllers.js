var profileControllers = angular.module('profileControllers', [])

.controller('ProfileCtrl', ['$scope', '$cordovaGoogleAnalytics', function($scope, $cordovaGoogleAnalytics){

    $scope.username = "";

    $scope.init = function(){
        getLocalStorage();
        document.addEventListener("deviceready", function () {
            $cordovaGoogleAnalytics.trackView('Profile Screen');
        });
    }

    $scope.saveDetails = function(){
        var name = this.username;
        console.log(name);
        addToLocalStorage(name);

        $cordovaGoogleAnalytics.trackEvent('Profile', 'Save', 'Username');
    }

    getLocalStorage = function(){
        var name = localStorage.getItem('name');
        $scope.username = name;
    }

    addToLocalStorage = function(name){
        localStorage.setItem("name", name);
    }

}])
