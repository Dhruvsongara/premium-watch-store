var app = angular.module("watchApp", []);

// Authentication Controller
app.controller("authController", function ($scope, $http, $window) {
  $scope.loginData = { email: "", password: "" };

  // Login Function
  $scope.login = function () {
    $http
      .post("http://localhost:5000/api/auth/login", $scope.loginData)
      .then(function (response) {
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          $window.location.href = "index.html";
        } else {
          alert("Login failed! Please check your credentials.");
        }
      })
      .catch(function (error) {
        alert("Error during login: " + error.data.message);
      });
  };

  // Signup Function
  $scope.user = { name: "", email: "", password: "" };
  $scope.signin = function () {
    $http
      .post("http://localhost:5000/api/auth/signin", $scope.user)
      .then(function (response) {
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          $window.location.href = "login.html";
        } else {
          alert("SignUp failed! Please try again.");
        }
      })
      .catch(function (error) {
        alert("Error during signup: " + error.data.message);
      });
  };
});

// watch Controller
app.controller("watchController", function ($scope, $http, $window) {
  $scope.filteredwatches = [];
  $scope.reverseSort = false;
  $scope.token = localStorage.getItem("token");
  $scope.categories = [
    "omega_luxury",
    "omega1_luxury",
    "fossil",
    "rado",
    "diesel",
    "rolex1",
    "fossil1",
    "poedagar-green-luxury",
    "cartier",
    "blancpain",
    "IWC",
    "arnold & son",
  ];

  $scope.isLoggedIn = !!$scope.token; // Check if token exists

  $scope.toggleCategorySort = function (reverseSort) {
    if (reverseSort) {
      $scope.filteredwatches.sort((a, b) => b.name.localeCompare(a.name));
      $scope.reverseSort = !reverseSort;
    } else {
      $scope.filteredwatches.sort((a, b) => a.name.localeCompare(b.name));
      $scope.reverseSort = !reverseSort;
    }
  };

  $scope.handleAuth = function () {
    if ($scope.isLoggedIn) {
      // Logout
      localStorage.removeItem("token");
      $scope.isLoggedIn = false;
      $window.location.href = "signin.html"; // or "login.html"
    } else {
      // Go to sign in page
      $window.location.href = "signin.html";
    }
  };

  // Load watch items only if logged in
  if ($scope.isLoggedIn) {
    $http
      .get("http://localhost:5000/api/watches", {
        headers: { Authorization: "Bearer " + $scope.token },
      })
      .then((response) => {
        $scope.allwatches = response.data;
        $scope.filteredwatches = $scope.allwatches;
      })
      .catch((error) => {
        console.error("Error fetching watches:", error);
      });
  }

  // Fetch all watches
  $http
    .get("http://localhost:5000/api/watches", {
      headers: { Authorization: "Bearer " + $scope.token },
    })
    .then((response) => {
      $scope.allwatches = response.data;
      $scope.filteredwatches = $scope.allwatches;
    })
    .catch((error) => {
      console.error("Error fetching watches:", error);
    });

  // Filter by category
  $scope.filterByCategory = function (category) {
    if (category) {
      $scope.filteredwatches = $scope.allwatches.filter(
        (watch) => watch.category.toLowerCase() === category.toLowerCase()
      );
    } else {
      $scope.filteredwatches = $scope.allwatches;
    }
  };

  // View detailed watch information
  $scope.viewwatchDetails = function (watchId) {
    $window.location.href = "watch-details.html?id=" + watchId;
  };
});

// watch Details Controller
app.controller("watchDetailsController", function ($scope, $http, $window) {
  const urlParams = new URLSearchParams($window.location.search);
  const watchId = urlParams.get("id");
  $scope.token = localStorage.getItem("token");

  $scope.isLoggedIn = !!$scope.token; // Check if token exists

  $scope.handleAuth = function () {
    if ($scope.isLoggedIn) {
      // Logout
      localStorage.removeItem("token");
      $scope.isLoggedIn = false;
      $window.location.href = "signin.html"; // or "login.html"
    } else {
      // Go to sign in page
      $window.location.href = "signin.html";
    }
  };

  if (watchId) {
    $http
      .get("http://localhost:5000/api/watches/" + watchId, {
        headers: { Authorization: "Bearer " + $scope.token },
      })
      .then((response) => {
        $scope.watch = response.data;
      })
      .catch((error) => {
        console.error("Error fetching watch details:", error);
      });
  }

  $scope.addToCart = function () {
    if (!$scope.token) {
      alert("Please login first!");
      $window.location.href = "login.html";
      return;
    }

    $http
      .post(
        "http://localhost:5000/api/cart/add",
        { watch: watchId, quantity: 1 },
        { headers: { Authorization: "Bearer " + $scope.token } }
      )
      .then(function (response) {
        alert("Item added to cart!");
      })
      .catch(function (error) {
        alert(
          "Error adding to cart: " +
            (error.data?.message || "Please try again.")
        );
      });
  };
});

// Cart Controller
app.controller("cartController", function ($scope, $http, $window) {
  $scope.token = localStorage.getItem("token");
  $scope.cartItems = [];

  if (!$scope.token) {
    $window.location.href = "login.html";
    return;
  }

  $scope.isLoggedIn = !!$scope.token; // Check if token exists

  $scope.handleAuth = function () {
    if ($scope.isLoggedIn) {
      // Logout
      localStorage.removeItem("token");
      $scope.isLoggedIn = false;
      $window.location.href = "signin.html"; // or "login.html"
    } else {
      // Go to sign in page
      $window.location.href = "signin.html";
    }
  };

  // Fetch cart items
  $scope.fetchCart = function () {
    $http
      .get("http://localhost:5000/api/cart", {
        headers: { authorization: "Bearer " + $scope.token },
      })
      .then(function (response) {
        $scope.cartItems = response.data;
      })
      .catch(function (error) {
        console.error("Error fetching cart:", error);
      });
  };

  // Remove from cart
  $scope.removeFromCart = function (cartItemId) {
    $http
      .post(
        "http://localhost:5000/api/cart/remove",
        { id: cartItemId },
        { headers: { Authorization: "Bearer " + $scope.token } }
      )
      .then(function (response) {
        $scope.fetchCart(); // Refresh cart
      })
      .catch(function (error) {
        console.error("Error removing item:", error);
      });
  };

  // Initialize
  $scope.fetchCart();
});
