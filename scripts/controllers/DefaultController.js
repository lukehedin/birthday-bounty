birthdayBountyApp.controller('DefaultController', function($scope, BirthdayBountyFactory) {
  //DefaultController is used for header and footer functionality, as well as anything else generic
  $scope.root = BirthdayBountyFactory;

  //Only being used for random tags. Needed?
  var taglines = $scope.root.taglines;
  $scope.tagline = taglines[Math.floor(Math.random()*taglines.length)];

  //Plunder is full of stuff you're interested in, displayed in header
  var existingPlunder = localStorage.getItem("myplunder") || "";
  var stringPlunderArray = existingPlunder.split(",");

  stringPlunderArray.forEach(function(stringPlunder){
      $scope.root.myPlunder.push(parseInt(stringPlunder));
  });

  $scope.isMap = function(){
    return window.location.hash.startsWith('#/map');
  };
});