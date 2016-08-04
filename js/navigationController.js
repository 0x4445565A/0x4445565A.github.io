(function(){

  angular
       .module('navigation')
       .controller('NavigationController', [
          '$mdSidenav',
          NavigationController
       ]);

  function NavigationController($mdSidenav) {
    var self = this;

    self.toggleList = toggleNav;
    self.navItems = navigationItems();
    function toggleNav() {
      $mdSidenav('left').toggle();
    }
    function navigationItems() {
      return [
        {
          'link': 'http://github.com/tehbmar',
          'label': 'TehBmar@GitHub',
          'icon': 'github',
        },
        {
          'link': 'https://www.linkedin.com/in/brandon-martinez-70497831',
          'label': 'LinkedIn',
          'icon': 'linkedin',
        },
        {
          'link': 'http://twitter.com/tehbmar',
          'label': 'TehBmar@Twitter',
          'icon': 'twitter',
        },
      ];
    }

  }

})();