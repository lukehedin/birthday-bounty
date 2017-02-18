app.controller('MainController', ['$scope', function($scope) {

  $scope.init = function(){

    //Are we using mobile?
    $scope.isMobile = function() {
      var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    //Load required static data
    $scope.bountyData = bountyData;
    $scope.bountyTypes = [{ 
        id: 4,
        ordinal: 1,
        iconPath: 'images/marker_activity.svg',
        name: 'activity'
      }, { 
        id: 2,
        ordinal: 2,
        iconPath: 'images/marker_food.svg',
        name: 'food'
      }, { 
        id: 5,
        ordinal: 3,
        iconPath: 'images/marker_voucher.svg',
        name: 'voucher'
      }, { 
        id: 3,
        ordinal: 4,
        iconPath: 'images/marker_drink.svg',
        name: 'drink'
      }, { 
        id: 1,
        ordinal: 5,
        iconPath: 'images/marker_sweets.svg',
        name: 'sweets'
      }];

    //init enums
    $scope.enums = {
      showMe: {
        All: 1,
        NotPlundered: 2,
        Plundered: 3
      },
      sorter: {
        ValueHighLow: 1,
        ValueLowHigh: 2,
        AvailEarlyLate: 3,
        AvailLateEarly: 4,
        OrgNameAZ: 5
      }
    }

    //init internal static vars
    $scope.monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    //init scope vars
    $scope.myPlunder = [];
    $scope.bountyMarkers = [];
    $scope.bountyMarkerTooltip = null;

    //TODO Pagination
    $scope.pageBegin = 0;
    $scope.pageTake = 10;
    $scope.totalPages = 0;

    //init options
    $scope.defaultFilters = {
        searchString: null,
        includeTypes: [1,2,3,4,5],
        minValue: 0,
        maxValue: 1000,
        showUnknownValue: true,
        dateStart: null,
        dateFinish: null,
        includeRegistrationReq: true,
        includeIdentificationReq: true,
        includeDigitalVoucherReq: true,
        includePaperVoucherReq: true,
        showMe: $scope.enums.showMe.All,
        sortBy: $scope.enums.sorter.OrgNameAZ
    };
    $scope.resetBountyFilters();

    var existingBday = localStorage.getItem("birthday");

    if(existingBday){
      $scope.dob = new Date(existingBday);
      
      $scope.defaultFilters.dateStart = getPlunderPeriod().start;
      $scope.defaultFilters.dateFinish = getPlunderPeriod().end;
      $scope.resetBountyFilters();

      renderMapWhenReady();
    }

    //init my plunder
    var existingPlunder = localStorage.getItem("myplunder") || "";
    var stringPlunderArray = existingPlunder.split(",");
    
    stringPlunderArray.forEach(function(stringPlunder){
      $scope.myPlunder.push(parseInt(stringPlunder));
    });

    //todo: map setting from local storage?
    $scope.showFullMap = false;
    $scope.showMobileFilters = false;
    $scope.showMobilePlunder = false;
  };

  $scope.dobFieldChange = function(fld){
    var fldVal = $('#' + fld + 'Field')[0].value;

    switch(fld){
      case "day":
        if(fldVal && (!isNaN(fldVal)) && fldVal.length === 2 && fldVal <= 31) $('#monthField').focus();
        break;
      case "month":
        if(fldVal && (!isNaN(fldVal)) && fldVal.length === 2 && fldVal <= 12) $('#yearField').focus();
        break;
      default:
        break;
    }
  };

//Toggles that alter the view
  $scope.toggleFullMap = function(){
    $scope.showFullMap = !$scope.showFullMap;
    renderMapWhenReady();
  }

  $scope.toggleMobileFilters = function(){
    $scope.showMobileFilters = !$scope.showMobileFilters;
  }

  $scope.toggleMobilePlunder = function(){
    $scope.showMobilePlunder = !$scope.showMobilePlunder;
  }

  $scope.getMyPlunder = function(){
    var plunderArray = [];
    $scope.bountyData.forEach(function(bountyItem){
      if($scope.myPlunder.indexOf(bountyItem.bountyId) !== -1) plunderArray.push(bountyItem);
    });
    return plunderArray;
  }

  $scope.toggleInMyPlunder = function(bountyId){
    var index = $scope.myPlunder.indexOf(bountyId);

    if(index === -1){
        $scope.myPlunder.push(bountyId);
      } else{
        $scope.myPlunder.splice(index, 1);
      }

      localStorage.setItem("myplunder", $scope.myPlunder);
  }

  function renderMapWhenReady(){
    $.getScript('https://www.google.com/jsapi', function()
    {
        google.load('maps', '3', { other_params: ['key=AIzaSyBnG2wcWi0MrBxd3wTtNCKTau-xHD_B324&libraries=places'], callback: function() {
          setTimeout(function() {
            //Google Map
            var mapContainer = $('#bountyMapContainer')[0];

            var googleMap = new google.maps.Map(mapContainer, {
              center: {lat: -37.815112, lng: 144.960909},
              zoom: 14,
              disableDefaultUI: true,
              styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#bcbbbb"},{"visibility":"on"}]}]
            });
              
            loadAllBountyMarkers(googleMap);
          }, 0)
        }});
    });
  };

  $scope.clearBirthday = function(){
    $scope.dob = null;
    localStorage.removeItem("birthday");
  };

  $scope.submitBirthday = function(){
    var yearVal = $('#yearField')[0].value;
    var monthVal = $('#monthField')[0].value;
    var dayVal = $('#dayField')[0].value;

    var isValid = (!isNaN(yearVal) && !isNaN(monthVal) && !isNaN(dayVal));

    if(isValid){
      var day = parseInt(dayVal);
      var month = parseInt(monthVal) - 1; //subtract one, months begin at 00
      var year = parseInt(yearVal);

      var thisYear = new Date().getFullYear();
      var isValid = year > (thisYear - 130) && year < (thisYear + 1);

      var getDaysInMonth = function(month){
        if([1,3,5,7,8,10,12].indexOf(month) !== -1){
          return 31;
        } else if([4,6,9,11].indexOf(month) !== -1){
          return 30;
        } else{
          //feb
          var leapYear = (year % 4 === 0) && ((year % 400 === 0) || (year % 100 !== 0));
          return leapYear ? 29 : 28;
        }
      };

      isValid = month <= 12 && month> 0 && day <= getDaysInMonth(month) && day > 0;
    }

    if(isValid){
      var today = new Date();
      var thisYear =  today.getFullYear();

      var thisYearsBirthday = new Date(thisYear, month, day);

      var bdayDate = new Date((thisYear + (thisYearsBirthday < today ? 1 : 0)), month, day);

      localStorage.setItem("birthday", bdayDate);

      $scope.dob = bdayDate;
      renderMapWhenReady();
      $scope.bountyFilters.dateStart = getPlunderPeriod().start;
      $scope.bountyFilters.dateFinish = getPlunderPeriod().end;
    }
  };

  $scope.getTypeById = function(typeId){
    var requestedType = null;
    $scope.bountyTypes.forEach(function(type){
      if(!requestedType && type.id === typeId) requestedType = type;
    });
    return requestedType;
  };

  $scope.getPlunderValue = function(){
    var amount = 0;
    $scope.filteredBountyData().forEach(function(bountyItem){
      amount = amount + bountyItem.maxValue;
    });
    return amount;
  }

  $scope.getMyPlunderTotal = function(){
    var total = 0;
    $scope.getMyPlunder().forEach(function(item){
      total += item.maxValue;
    });
    return total;
  }

  $scope.getPlunderPeriodString = function(){
      return dateToString($scope.bountyFilters.dateStart) + ' - ' + dateToString($scope.bountyFilters.dateFinish);
  }

  $scope.toggleBountyType = function(type){
      var index = $scope.bountyFilters.includeTypes.indexOf(type);

      if(index === -1){
        $scope.bountyFilters.includeTypes.push(type);
      } else{
        $scope.bountyFilters.includeTypes.splice(index, 1);
      }
  }

  $scope.getBountyAvailabilityMessage = function(bountyItem){
    if(bountyItem.conditions.wholeMonth){
      return 'Claim this Birthday Bounty anytime during ' + $scope.monthNames[$scope.dob.getMonth()];
    }

    var itemStart = new Date($scope.dob);   
    itemStart.setDate(itemStart.getDate() - bountyItem.conditions.daysBefore);

    var itemEnd = new Date($scope.dob);
    itemEnd.setDate(itemEnd.getDate() + bountyItem.conditions.daysAfter);

    if(itemStart - itemEnd === 0){
      return 'This Birthday Bounty can only be claimed on your birthday';
    } else{
      return 'Claim this Birthday Bounty between ' + dateToString(itemStart) + ' - ' + dateToString(itemEnd);
    }
  }

  function getPlunderPeriod(){
    var bdayDate = new Date($scope.dob);

    //todo: take into account custom period $scope.bountyFilters.customPeriod.startDate

    var minDate = new Date(bdayDate);
    var maxDate = new Date(bdayDate);

    $scope.filteredBountyData().forEach(function(item){
        var possibleMin = new Date($scope.dob);
        possibleMin.setDate(possibleMin.getDate() - item.conditions.daysBefore);
        if(possibleMin < minDate) minDate = possibleMin;

        var possibleMax = new Date($scope.dob);
        possibleMax.setDate(possibleMax.getDate() + item.conditions.daysAfter);
        if(possibleMax > maxDate) maxDate = possibleMax;
    });

    return {
      start: minDate,
      end: maxDate
    };
  }

  function dateToString(date, includeYear){
    return date.getDate() + '/' + (date.getMonth() + 1) + (includeYear ? '/' + date.getFullYear() : '');
  }

  $scope.resetBountyFilters = function(){
    //clone deault filters to active ones
    $scope.bountyFilters = jQuery.extend(true, {}, $scope.defaultFilters);
  }

  $scope.filteredBountyData = function() {
    var bdayDate = new Date($scope.dob);
    var options = $scope.bountyFilters;
    
    var shouldPush = function(item) {

        if(options.searchString){
          var searchFor = options.searchString.toLowerCase().trim();
            if(searchFor !== ""
            && item.title.toLowerCase().indexOf(searchFor) === -1 
            && item.organisation.name.toLowerCase().indexOf(searchFor) === -1) return false;
        }
      
        //Included types
        if (options.includeTypes.indexOf(item.types[0]) === -1) return false;

        // Monetary value
        if(item.maxValue){
          if ((options.minValue || options.minValue === 0) && item.maxValue < options.minValue) return false;
          if ((options.maxValue || options.maxValue === 0) && item.maxValue > options.maxValue) return false;
        } else if(!options.showUnknownValue) {
          return false;
        }

        //Availability
        var itemStart;
        var itemFinish;
        if(item.conditions.wholeMonth){
          itemStart = new Date(bdayDate.getFullYear(), bdayDate.getMonth(), 1);;
          itemFinish = new Date(bdayDate.getFullYear(), bdayDate.getMonth() + 1, 0);
        } else{
          itemStart = new Date(bdayDate) - item.conditions.daysBefore;
          itemFinish = new Date(bdayDate) + item.conditions.daysAfter;
        }
        //todo date filter not working :\


        // Eligibility rules
        if(!options.includeRegistrationReq && item.conditions.registrationRequiredUrl) return false;
        if(!options.includeIdentificationReq && item.conditions.identificationRequired) return false;
        if(!options.includeDigitalVoucherReq && item.conditions.digitalVoucherRequired) return false;
        if(!options.includePaperVoucherReq && item.conditions.paperVoucherRequired) return false;

        //Show Me
        var inPlunder = $scope.myPlunder.indexOf(item.bountyId) !== -1;
        if(inPlunder && parseInt(options.showMe) === $scope.enums.showMe.NotPlundered) return false;
        if(!inPlunder && parseInt(options.showMe) === $scope.enums.showMe.Plundered) return false;

        return true;
    };

    var filteredData = [];

    $scope.bountyData.forEach(function(bountyItem) {  
        if(shouldPush(bountyItem)) filteredData.push(bountyItem);
    });

     //Sort
      switch(parseInt(options.sortBy)){
          case $scope.enums.sorter.ValueHighLow:
            filteredData.sort(function(b1, b2){
              if(b1.maxValue === b2.maxValue) return 0;
              if(b1.maxValue < b2.maxValue) return 1;
              return -1;
            });
          break;
          case $scope.enums.sorter.ValueLowHigh:
            filteredData.sort(function(b1, b2){
              if(b1.maxValue === b2.maxValue) return 0;
              if(b1.maxValue < b2.maxValue) return -1;
              return 1;
            });
          break;
          case $scope.enums.sorter.AvailEarlyLate:
          break;
          case $scope.enums.sorter.AvailLateEarly:
          break;
          case $scope.enums.sorter.OrgNameAZ:
            filteredData.sort(function(b1, b2){
              if(b1.organisation.name > b2.organisation.name) return 1;
              if(b1.organisation.name < b2.organisation.name) return -1;
              return 0;
            });
          break;
          default:
          break;
      }
    
      $scope.bountyMarkers.forEach(function(bountyMarker){
          if(bountyMarker.div) bountyMarker.div.hidden = filteredData.indexOf(bountyMarker.bountyItem) === -1;
      });

      return filteredData;
  }

  function loadAllBountyMarkers(gMap){
    var placesService = new google.maps.places.PlacesService(gMap);

    var tipOffsetY = -10;
    var tipOffsetX = 15;

    var showBountyIconTooltip = function(event, bountyItem){
        var tooltip = $scope.bountyMarkerTooltip;

        if(!tooltip){
          tooltip = document.createElement('div');
          tooltip.className = "bounty-marker-tooltip";
          tooltip.innerHTML = "";
          tooltip.innerHTML += '<b>' + bountyItem.organisation.name + '</b><br/>';
          tooltip.innerHTML += bountyItem.title;

          $scope.bountyMarkerTooltip = tooltip;
          $(document.body).append($scope.bountyMarkerTooltip);     
        }

        tooltip.style.top = (event.pageY + tipOffsetY)+ 'px';
        tooltip.style.left = (event.pageX + tipOffsetX) + 'px';
    };

    var showDetailedTooltip = function(event, place){
        var tooltip = $scope.bountyMarkerTooltip;

        if(!tooltip){
          tooltip = document.createElement('div');
          tooltip.className = "bounty-marker-tooltip";

          $scope.bountyMarkerTooltip = tooltip;
          $(document.body).append($scope.bountyMarkerTooltip);     
        }

        tooltip.innerHTML = "";
        tooltip.innerHTML += '<b>' + place.name + '</b><br/>';
        tooltip.innerHTML += place.formatted_address;

        tooltip.style.top = (event.pageY + tipOffsetY)+ 'px';
        tooltip.style.left = (event.pageX + tipOffsetX) + 'px';
    };

    var createBountyMarker = function(item, location, image) {
      var marker = new google.maps.OverlayView();

      // Explicitly call setMap on this overlay.
      marker.setMap(gMap);

      //Keep track of the bountyItem type //todo??
       var itemType = $.grep($scope.bountyTypes, function(type){ return type.id == item.types[0]; })[0];
      marker.bountyItem = item;

      marker.draw = function() {
          var div = marker.div;
          const markerHeight = 26;
          const markerWidth = 26;

          if (!div) {
              div = marker.div = document.createElement('div');
              div.className = "bounty-marker";
              div.hidden = $scope.filteredBountyData().indexOf(item) === -1;
              
              div.style.width = markerWidth + 'px';
              div.style.height = markerHeight + 'px';
              div.style.backgroundImage = 'url(' + itemType.iconPath + ')';
              div.style.backgroundSize =  markerWidth + 'px ' + markerHeight + 'px';
              div.dataset.marker_id = item.bountyId;
              
              google.maps.event.addDomListener(div, "click", function(event) {      
                  google.maps.event.trigger(marker, "click"); //todo: need this?

                  //If we haven't already loaded this place's details
                  if(!location.placeDetails){
                      //Try to load them
                      placesService.getDetails({placeId:location.placeId},function(placeResult, status){
                        if(status == "OK"){
                          //Set the place details so we have it
                          location.placeDetails = placeResult;
                          showDetailedTooltip(event, placeResult);
                        } else{
                          //No place details found
                        }
                    });
                  } else {
                    //We already have the place details
                    showDetailedTooltip(event, location.placeDetails);
                  }
              });

              google.maps.event.addDomListener(div, "mousemove", function(event) {      
                  google.maps.event.trigger(marker, "mousemove"); //todo: need this?
                  showBountyIconTooltip(event, item);
              });

              google.maps.event.addDomListener(div, "mouseout", function(event) {      
                  google.maps.event.trigger(marker, "mouseout"); //todo: need this?
                  if($scope.bountyMarkerTooltip){
                    $scope.bountyMarkerTooltip.remove();
                    $scope.bountyMarkerTooltip = null;
                  }
              });              
              
              var panes = marker.getPanes();
              panes.overlayImage.appendChild(div);
          }
          
          var latLng = new google.maps.LatLng(location.lat, location.lng);
          var point = marker.getProjection().fromLatLngToDivPixel(latLng);
          
          if (point) {
              div.style.left = (point.x - (markerWidth/2)) + 'px';
              div.style.top = (point.y - markerHeight) + 'px';
          }
      };

      $scope.bountyMarkers.push(marker);
    }

    $scope.bountyData.forEach(function(item){
      item.organisation.locations.forEach(function(location){
        var latLng = new google.maps.LatLng(location.lat, location.lng);

        var marker = new google.maps.Marker({
            position: latLng,
            title: item.title,
            map: gMap,
            icon: '/'
        });
        
        marker.metadata = {type: "point", id: item.bountyId};
        createBountyMarker(item, location, null);
      });
    });
  };

  $scope.init();

}]);