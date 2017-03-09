birthdayBountyApp.directive('summary', function() {
  return {
    scope: false,
    template:  '<div class="feature-strip">' +
                    '<div class="summary-feature grow-appear">' +
                        '<h2>Shiver me timbers!</h2>' +
						'</span>Plunderin\' {{ getPlunderPeriodString() }} could earn you </span>' +
                        '<h1>{{ getPlunderValue() | currency }}</h1>' +
                        '<span>worth of free Birthday Bounty!</span>' +
                        '<br>' +
                    '</div>' +
                '</div>' +
                '<div class="summary-settings-container">' +
                    '<div class="bounty-summary-settings">' +
                        '<div class="settings-control">' +
                            '<div class="settings-label">' +
                                'Bounty Types:' +
                            '</div>' +
                            '<div class="settings-input">' +
                                '<div ng-repeat="bountyType in root.bountyTypes track by $index">' +
                                    '<img title="{{bountyType.name}}" ng-class="{ unselected: bountyFilters.includeTypes.indexOf(bountyType.id) === -1 }" class="bounty-type-icon toggle-bounty-type-button" ng-src="{{bountyType.iconPath}}" ng-click="toggleBountyType(bountyType.id)"/>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="settings-control">' +
                            '<div class="settings-label">' +
                                'Available Between:' +
                            '</div>' +
                            '<div class="settings-input">' +
                                '<select ng-model="bountyFilters.monthStart" ng-options="shortMonth for shortMonth in getShortMonths()"></select>' +
                                '<select ng-model="bountyFilters.dayStart" ng-options="day for day in getDaysInMonth(bountyFilters.monthStart)"></select>' +
                                ' and ' +
                                '<select ng-model="bountyFilters.monthFinish" ng-options="shortMonth for shortMonth in getShortMonths()"></select>' +
                                '<select ng-model="bountyFilters.dayFinish" ng-options="day for day in getDaysInMonth(bountyFilters.monthFinish)"></select>' +
                            '</div>' +
                        '</div>' +
                        // '<div class="settings-control">' +
                        // 	'<div class="settings-label">' +
                        // 		'Show Me:' +
                        // 	'</div>' +
                        // 	'<div class="settings-input">' +							
                        // 		'<input type="checkbox" ng-model="bountyFilters.showNotPlundered"> Bounty I haven\'t plundered<br>' +
                        // 		'<input type="checkbox" ng-model="bountyFilters.showPlundered"> Bounty I have plundered' +
                        // 	'</div>' +
                        // '</div>' +
                        '<div class="settings-control">' +
                            '<div class="settings-label">' +
                                'Sort By:' +
                            '</div>' +
                            '<div class="settings-input">' +
                                '<select ng-model="bountyFilters.sortBy" ng-options="getSorterString(sorter) for sorter in sorters"></select>' +
                            '</div>' +
                        '</div>' +
                        '<div class="settings-control">' +
                            '<a class="standard-button">' +
                                'View on Map' +
                            '</a>' +
                             '<a class="standard-button" ng-click="clearBirthday()" ng-if="dob">' +
                                'Change Birthday/Postcode' +
                             '</a>' +
                        '</div>' +
                        // '<div class="settings-input">' +
                        // 	'<div ng-click="resetBountyFilters()" class="reset-filters-button standard-button">' +
                        // 		'Reset All Filters' +
                        // 	'</div>' +
                        // '</div>' +
                    '</div>' +
              '</div>' +
              '<div class="content-wrapper">' +
                '<div class="bounty-summary-container">' +
                    '<div class="bounty-summary-items-container">' +
				        '<div ng-if="filteredBountyData().length < 1" class="no-bounty-message">' +
				        	'Could not find any Birthday Bounty! Try to adjust your filters using the Bounty Filters above.' +
				        '</div>' +
                        '<div ng-if="!!filteredBountyData()" ng-repeat="bountyItem in filteredBountyData() track by $index">' +
                            '<a class="bounty-thumbnail col-lg-4 col-sm-6" href="./bounty.html?bountyId={{bountyItem.bountyId}}">' +
                                '<span class="bounty-thumbnail-image" ng-style="{ \'background-image\': !!bountyItem.thumbnail ? \'url(images/bountypix/\' + bountyItem.thumbnail + \')\' : \'\'}">' +
                                    '<img class="bounty-thumbnail-icon" ng-src="{{root.getTypeById(bountyItem.types[0]).iconPath}}" />' +                        
                                '</span>' +
                                '<div>' +
                                    '<div class="bounty-thumbnail-details-left">' +
                                        '<h1>{{ bountyItem.title }}</h1>' +
                                        '{{ bountyItem.organisation.name }}' +
                                    '</div>' +
                                    '<div class="bounty-thumbnail-details-right">' +
                                        '5km away' +
                                    '</div>' +
                                '</div>' +
                            '</a>' +
                        '</div>' +
                     '</div>' +
                '</div>' +
            '</div>'
  }
});