(function(){

  angular
       .module('navigation')
       .controller('BlogController', [
          '$routeParams',
          '$scope',
          '$http',
          BlogController
       ])
       .filter('html', function($sce) {
          return function(val) {
              return $sce.trustAsHtml(val);
          };
        });
        // .directive('boop', function () {
        //   return {
        //     templateUrl: './assets/templates/projects.html',
        //   };
        // });

  function BlogController($routeParams, $scope, $http) {
    var self = this;
    self.test = "hack the planet";
    console.log($routeParams);
    self.post = getPost($routeParams.id)
    console.log(self.post)
    function getPost(id) {
      console.log(id)
      var posts = [];
      posts[10] = {
        title: "Blog Title Here",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus luctus consectetur. In sapien orci, vehicula in odio sit amet, imperdiet convallis nisl. Quisque quis vulputate lacus. Maecenas eu pharetra metus. Nullam enim dolor, efficitur in risus eu, congue facilisis nisi. Maecenas sollicitudin orci at elit venenatis, eget volutpat augue fringilla. Cras vel purus dictum, mattis quam posuere, dignissim felis. Praesent ultrices elit eget sapien aliquam, et rhoncus augue pellentesque. Maecenas eget magna turpis.\n\n<img src=\"https://i.imgur.com/jlFgGpe.jpg\">\n\nDonec scelerisque consequat blandit. Vivamus tincidunt et odio nec pellentesque. Phasellus in erat rhoncus, ornare purus et, tempus ante. Aliquam in lorem in ex pulvinar ultricies nec porta odio. Nullam dapibus nisi nec nibh placerat bibendum. Nam euismod, velit vel viverra ultrices, eros justo convallis dui, et aliquet libero odio a dui. Nulla a mauris ultrices, vehicula lacus sit amet, volutpat felis. Maecenas congue ex vitae enim ultricies, non ullamcorper metus vulputate. Integer eu semper ex. Donec erat urna, accumsan sed pretium quis, tempor sit amet lorem. Nulla facilisi. Donec euismod nibh interdum, tristique urna at, sodales ligula. Nam orci elit, consectetur finibus nulla a, finibus imperdiet est.",
      };
      return posts[id];
    }
  }

})();