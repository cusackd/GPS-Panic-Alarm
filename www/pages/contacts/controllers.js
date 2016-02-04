var contactControllers = angular.module('contactControllers', []);

// Main panic button controller
contactControllers.controller('AddContactsCtrl', ['$scope', function($scope){

  // New Contacts Scope
  $scope.name = "";
  $scope.number = "";

  // Set Empty Contacts Scope
  $scope.contactDetails = [];

  $scope.removeContactClick = function(i){
    removeContact(i);
    addToLocalStorage();
  }

  removeContact = function(i){

    $scope.contactDetails.splice(i, 1);

  }

  // Run on Add Contact Button click
  $scope.addContactClick = function(){
    // Validate
    var validName = validateName();
    var validNumber = validateNumber();
    // Process

    if(validName === false || validNumber === false){
      alert('You must fill both fields');
      return;
    }

    addToScope();
    addToLocalStorage();
    clearNewContact();
  }

  // First function to run on controller
  init = function(){
    getLocalStorage();
    console.log($scope.contactDetails);
  }

  // Get localStorage
  getLocalStorage = function(){

    // Parse the contacts to JSON as they have been saved to localStorage as a string
    var contacts = JSON.parse(localStorage.getItem('contacts'));

    // Check if any values in local storage
    if(contacts !== null){
      // Push to scope
      $scope.contactDetails.push.apply($scope.contactDetails, contacts);
    }

  }

  // Add Contacts to localStorage
  addToLocalStorage = function(){
    // stringify contacts before setting them in localStorage
    var stringyContacts = angular.toJson($scope.contactDetails);
    localStorage.setItem('contacts', stringyContacts);

  }

  addToScope = function(){

    // Add New Contact to the scope
    $scope.contactDetails.push({name: $scope.name, number: $scope.number});

  }

  // Clear the new contact
  clearNewContact = function(){

    $scope.name = "";
    $scope.number = "";

  }

  validateName = function(){
    if($scope.name == ""){
      return false;
    }
  }

  validateNumber = function(){
    if($scope.number == ""){
      return false;
    }
  }

  init();

}])
