birthdayBountyApp.directive('appfooter', function() {
  return {
    scope: false,
    template: '<div class="footer-strip">' +
                 '<div class="footer-text">' +
                     '<a target="_blank" href="http://www.lukehedin.com/">' +
                     	'Created by Luke Hedin' +
                     '</a>' +
                     '<div>' +
                         'Bounty data collected with help from <a target="_blank" href="https://www.linkedin.com/in/andrew-gierens-638b727b">Andrew Gierens</a> and <a target="_blank" href="https://www.instagram.com/malitoburito/">Mali Lewis</a>' +
                     '</div>' +
                     '<div>' +
                         'Social icons designed by <a target="_blank" href="http://www.flaticon.com/authors/freepik">Freepik</a> of Flaticon' +
                     '</div>' +
                     '<div>' +
                         'Bounty icons designed by <a target="_blank" href="http://www.flaticon.com/authors/madebyoliver">Madebyoliver</a> of Flaticon' +
                     '</div>' +
                     '<br/>' +
                     '<div>' +
                         'Your birthday is {{ getBirthdayString() }}' +
                     '</div>' +
                     '<a href="" ng-click="clearBirthday()" ng-if="dob">' +
                         'Click here to change your date of birth' +
                     '</a>' +
                 '</div>' +
             '</div>'
  }
});