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


        if(validateName(name)){
          addToLocalStorage(name);
          document.addEventListener("deviceready", function () {
            $cordovaGoogleAnalytics.trackEvent('Profile', 'Save', 'Success');
          });
        }else{
          alert('Please type a name before saving');
          document.addEventListener("deviceready", function () {
            $cordovaGoogleAnalytics.trackEvent('Profile', 'Save', 'Failure');
          });
        }


    }

    validateName = function(name){

      if(name.length < 1){
        return false;
      }

      return true;

    }

    getLocalStorage = function(){
        var name = localStorage.getItem('name');
        $scope.username = name;
    }

    addToLocalStorage = function(name){
        localStorage.setItem("name", name);
    }

}])
