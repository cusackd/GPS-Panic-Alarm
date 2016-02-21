var panicControllers = angular.module('panicControllers', [])

// Main panic button controller
.controller('PanicButtonCtrl', ['$scope', '$state','$ionicLoading', '$timeout', '$cordovaGoogleAnalytics', function($scope, $state, $ionicLoading, $timeout, $cordovaGoogleAnalytics){

    $scope.contactDetails = [];
    $scope.sending = false;
    $scope.hasContact = true;
    $scope.hasName = true;
    $scope.geo = {latitude: 0, longitude: 0};
    $scope.name = "";

    // Run on Panic Button click
    $scope.panicButtonClick = function(){

        $scope.sending = true;

        smsSetup(function(){
            var that = this;
            $timeout(function () {
                $scope.sending = false;
            }, 2000);
        });

    }

    $scope.init = function(){

        document.addEventListener("deviceready", function () {
            $cordovaGoogleAnalytics.trackView('Panic Screen');
        });

        getGeoLocation();

        getLocalStorage();

        getName();

        if($scope.contactDetails.length < 1){
            $scope.hasContact = false;
        }
        // debugger
        if($scope.name.length < 1){
            console.log(12345);
            $scope.hasName = false;
        }

    }

    $scope.addContacts = function(){
        $state.go('app.contacts');
    }

    $scope.addName = function(){
        $state.go('app.profile');
    }

    getName = function(){
        $scope.name = localStorage.getItem('name');
    }

    getGeoLocation = function(){
        navigator.geolocation.getCurrentPosition(function(position){
            $scope.geo = position.coords;
        }, function(){
            console.log('Nothing');
        });

    }

    // Get localStorage
    getLocalStorage = function(){
        console.log('Hello');

        $scope.contactDetails = [];

        // Parse the contacts to JSON as they have been saved to localStorage as a string
        var contacts = JSON.parse(localStorage.getItem('contacts'));

        // Check if any values in local storage
        if(contacts !== null){
            $scope.contactDetails = contacts;
        }
        console.log($scope.contactDetails);

    }

    smsSetup = function(success) {
        console.log($scope.contactDetails);
        navigator.geolocation.getCurrentPosition(function(position){
            $scope.geo = position.coords;
            angular.forEach($scope.contactDetails, function(value, key){
                console.log(value);
                sendSMS(value.number)
            });
            success(true);

        }, function(){
            console.log('Nothing');
        });


    }

    sendSMS = function(number){
        var number = number;
        var message = $scope.name + " has pressed a mobile panic button. Please make contact immediately as their could be an emergency. Click for " + $scope.name + "'s location http://www.google.com/maps/?q=" + $scope.geo.latitude + "," + $scope.geo.longitude;

        //CONFIGURATION
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: ''  // send SMS with the native android SMS messaging
            }
        };

        var success = function () { console.log('Message sent successfully'); };
        var error = function (e) { console.log('Message Failed:' + e); };
        sms.send(number, message, options, success, error);
    }

}])
