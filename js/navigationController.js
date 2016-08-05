(function(){

  angular
       .module('navigation')
       .controller('NavigationController', [
          '$mdSidenav',
          '$http',
          NavigationController
       ])
       .filter('html', function($sce) {
          return function(val) {
              return $sce.trustAsHtml(val);
          };
        })
       .directive('mockEditor', function () {
          return {
            templateUrl: './assets/templates/mock.html',
          };
        })
       .directive('projectCard', function () {
          return {
            templateUrl: './assets/templates/projectCard.html',
          };
        })
        .directive('systemNav', function () {
          return {
            templateUrl: './assets/templates/nav.html',
          };
        })
        .directive('systemToolbar', function () {
          return {
            templateUrl: './assets/templates/systemToolbar.html',
          };
        })
        .directive('projects', function () {
          return {
            templateUrl: './assets/templates/projects.html',
          };
        });

  function NavigationController($mdSidenav, $http) {
    var self = this;

    self.toggleList = toggleNav;
    self.navItems = navigationItems();
    self.mail = 'root@iBreak.Systems';
    self.about = '';
    aboutText(self);
    self.projects = projectItems();
    function toggleNav() {
      $mdSidenav('left').toggle();
    }
    function aboutText(self) {
      $http.get("about.txt")
      .then(function(response) {
          self.about = response.data;
      });
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
        {
          'link': 'http://keybase.io/bmar',
          'label': 'BMAR@KeyBase.io',
          'icon': 'keybase',
        },
      ];
    }

    function projectItems() {
      return [
        {
          title: 'KeyBase.IO Chrome Extension',
          image: './assets/images/keybase.png',
          tags: 'JS, Chrome API, Keybase API, PGP Encryption',
          body: 'A Chrome Extension that leverages KBPGP.js and KeyBase.io API.  It is designed to enable easy and accurate PGP encryption with public keys.  It also supports the ability to sign messages with your armored private key.  This is currently used by the KeyBase.io community and available from the Chrome Extension store.',
          link: 'https://github.com/tehbmar/easy-keybase.io-encryption-extension',
          linkTitle: 'Easy KeyBase.io Encryption',
        },
        {
          title: 'Kali Linux HID Attack - Arduino',
          image: './assets/images/kali.png',
          tags: 'C, ASM, Python, Linux, Security',
          body: 'A simple HID Attack that functions on both major Linux distros and Mac OSx.  This is an attack that emulates a keyboard quickly using keyboard shortcuts to open terminals and spawn python shells.  The payload also includes a boot loader to overwrite the user\'s MBR. This was made as a proof of concept for a Hackathon.',
          link: 'https://github.com/tehbmar/Kali-Linux-Pwnr',
          linkTitle: 'Kali Linux Pwnr',
        },
        {
          title: 'BadDev',
          image: './assets/images/baddev.png',
          tags: 'PHP, MySQL, HTML, CSS, Security',
          body: 'This was a fully functional website designed to be riddled with vulnerabilities.  It goes against most best practices and standards.  I use it as a tool to teach exploitation as well as how to prevent it.  This was used for the Alaska Hackathon sponsored by Infragard.',
          link: 'https://github.com/tehbmar/baddev',
          linkTitle: 'BadDev',
        },
        {
          title: 'Interactive Stack',
          image: './assets/images/asm.png',
          tags: 'JS, ASM, PHP, C',
          body: 'A Hackathon project designed to transparently teach C code and how memory is managed while code is executed.  Using simple tools like objdump and gcc a json file is created that is fed into out ASM.js file.  The ASM.js file then simulates assembly language and manipulates the stack in real time as each operation is executed.  This was never finished and only was worked on for two days, but what was accomplished (ASM interpreted by JS) is still pretty impressive.  My job was writing the ASM.js library as well as the PHP compiler tools.',
          link: 'https://github.com/tehbmar/InteractiveStack',
          linkTitle: 'Interactive Stack',
        },
      ];
    }

  }

})();