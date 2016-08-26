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
    self.posts = []
    self.post = {
      title: '...',
      body: '...',
    }
    $http.get("./posts/list.json")
    .then(function(response) {
      self.posts = response.data;
    })
    .then(function() {
      getPost(self);
    });

    function getPost(self) {
      var posts = self.posts;
      if (typeof posts[$routeParams.id] != "undefined") {
        self.post.title = posts[$routeParams.id].title;
        $http.get("./posts/" + posts[$routeParams.id].body + ".txt")
        .then(function(response) {
          self.post.body = response.data;
        });
      } else {
        self.post.title = "404";
        self.post.body = "The item you seek is not here..."
      }
    }
  }

})();