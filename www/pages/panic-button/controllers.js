var panicControllers = angular.module('panicControllers', []);

// Main panic button controller
panicControllers.controller('PanicButtonCtrl', ['$scope', '$state','$ionicLoading', function($scope, $state, $ionicLoading){

  $scope.contactDetails = [];
  $scope.hasContact = true;
  $scope.buttonActivate = false;
  $scope.geo = {latitude: 0, longitude: 0};
  $scope.name = "David";

  // Run on Panic Button click
  $scope.panicButtonClick = function(){
    $scope.buttonActivate = true;
    // alert($scope.buttonActivate);
    console.log('Panic Button Pressed');
    getLocalStorage();
    smsSetup();

  }

  finishedSendingAlarm = function(){
    $ionicLoading.hide();
  }

  sendingPanicAlarm = function(){
    $ionicLoading.show({
      template: 'Sending Panic Alarm...'
    });
  }

  $scope.init = function(){
    getGeoLocation();
    getLocalStorage();

    if($scope.contactDetails.length < 1){
      $scope.hasContact = false;
    }

  }

  $scope.addContacts = function(){
    $state.go('app.contacts');
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

    // Parse the contacts to JSON as they have been saved to localStorage as a string
    var contacts = JSON.parse(localStorage.getItem('contacts'));

    // Check if any values in local storage
    if(contacts !== null){
      // console.log(contacts);
      // Push to scope
      $scope.contactDetails.push.apply($scope.contactDetails, contacts);
    }

  }

  smsSetup = function() {
    console.log($scope.contactDetails);
    angular.forEach($scope.contactDetails, function(value, key){
      console.log(value);
      sendSMS(value.number)
    });
    $scope.buttonActivate = false;

  }

  sendSMS = function(number){
        // alert('Sending SMS to ' + name);
        var number = number;
        // var message = 'Test Message';
        var message = $scope.name + " has pressed a mobile panic button. Please make contact immediately as their could be an emergency. Click for " + $scope.name + "'s location http://www.google.com/maps/?q=" + $scope.geo.latitude + "," + $scope.geo.longitude;

        //CONFIGURATION
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: ''  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };

        var success = function () { console.log('Message sent successfully'); };
        var error = function (e) { console.log('Message Failed:' + e); };
        sms.send(number, message, options, success, error);
  }

}])
