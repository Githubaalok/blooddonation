// Ionic Starter App
var globalip = "http://makerites.com/kefir/web_service.php";
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ionic-datepicker','ngCordova'])

.run(function($ionicPlatform,$state,$ionicPopup,$ionicHistory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.transition('none');
  $ionicConfigProvider.tabs.position('bottom'); 
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.login', {
	url: '/login/:Option',
	views: {
	  'menuContent': {
		templateUrl: 'templates/login.html',
		controller: 'loginCtrl'
	  }
	}
  })
  .state('app.register', {
	url: '/register/:Option',
	views: {
	  'menuContent': {
		templateUrl: 'templates/register.html',
		controller: 'registrationCtrl'
	  }
	}
  })
  .state('app.forgot-password', {
	url: '/forgot-password/:Option',
	views: {
	  'menuContent': {
		templateUrl: 'templates/forgot-password.html',
		controller: 'forgotPassCtrl'
	  }
	}
  })
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
	    controller: 'homeCtrl' 
      }
    }
  })
  .state('app.about', {
	url: '/about',
	views: {
	  'menuContent': {
		templateUrl: 'templates/about.html',
		//controller: 'contactCtrl'
	  }
	}
  })
  .state('app.more', {
	url: '/more',
	views: {
	  'menuContent': {
		templateUrl: 'templates/more.html',
		controller: 'contactCtrl'
	  }
	}
  })
  .state('app.share', {
	url: '/share',
	views: {
	  'menuContent': {
		templateUrl: 'templates/share.html',
		controller: 'contactCtrl'
	  }
	}
  })
  .state('app.user-list', {
		url: '/user-list',
		views: {
			'menuContent': {
				templateUrl: 'templates/user-list.html',
				controller: 'usersListCtrl'
			}
		}
	})
	.state('app.user-details', {
		url: '/user-details/:user_id',
		views: {
			'menuContent': {
				templateUrl: 'templates/user-details.html',
				controller: 'userDetailsCtrl'
			}
		}
	})
   .state('app.member-profile', {
	url: '/member-profile',
	views: {
	  'menuContent': {
		templateUrl: 'templates/member-profile.html',
		//controller: 'memberProfileCtrl'
	  }
	}
   })
   .state('app.settings', {
	url: '/settings',
	views: {
	  'menuContent': {
		templateUrl: 'templates/settings.html',
		controller: 'settingsCtrl'
	  }
	}
  })
  .state('app.settings~kefir-availability', {
	url: '/settings~kefir-availability',
	views: {
	  'menuContent': {
		templateUrl: 'templates/settings~kefir-availability.html',
		controller: 'settingsKefirAvailabilityCtrl'
	  }
	}
  })
  .state('app.settings~profile-picture', {
	url: '/settings~profile-picture',
	views: {
	  'menuContent': {
		templateUrl: 'templates/settings~profile-picture.html',
		controller: 'settingsProfilePictureCtrl'
	  }
	}
  })
  .state('app.settings~update-info', {
	url: '/settings~update-info',
	views: {
	  'menuContent': {
		templateUrl: 'templates/settings~update-info.html',
		controller: 'settingsUpdateInfoCtrl'
	  }
	}
  })
  .state('app.settings~change-password', {
	url: '/settings~change-password',
	views: {
	  'menuContent': {
		templateUrl: 'templates/settings~change-password.html',
		controller: 'changePassCtrl'
	  }
	}
  })
  .state('app.kefir-request', {
	url: '/kefir-request',
	views: {
	  'menuContent': {
		templateUrl: 'templates/kefir-request.html',
		controller: 'kefirRequestCtrl'
	  }
	}
  })
  .state('app.kefir-request-search-results', {
	url: '/kefir-request-search-results/:country/:state/:city/:pincode',
	views: {
	  'menuContent': {
		templateUrl: 'templates/kefir-request-search-results.html',
		controller: 'kefirRequestSearchResultsCtrl'
	  }
	}
  })
  .state('app.kefir-donate', {
	url: '/kefir-donate',
	views: {
	  'menuContent': {
		templateUrl: 'templates/kefir-donate.html',
		controller: 'kefirDonateCtrl'
	  }
	}
  })
  .state('app.benefitsofkefir', {
	url: '/benefitsofkefir',
	views: {
	  'menuContent': {
		templateUrl: 'templates/benefitsofkefir.html',
		//controller: 'changePassCtrl'
	  }
	}
  })
  .state('app.paleo-products', {
	url: '/paleo-products/:category',
	views: {
	  'menuContent': {
		templateUrl: 'templates/paleo-products.html',
		controller: 'paleoProductsCtrl'
	  }
	}
  })
  .state('app.products-details', {
	url: '/products-details/:category/:product_id',
	views: {
	  'menuContent': {
		templateUrl: 'templates/products-details.html',
		controller: 'paleoProductsCtrl'
	  }
	}
  })
  .state('app.contact', {
	url: '/contact',
	views: {
	  'menuContent': {
		templateUrl: 'templates/contact.html',
		controller: 'contactCtrl'
	  }
	}
  })
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})

.directive('map', function() {
	return {
		restrict: 'E',
		scope: {
		  onCreate: '&'
		},
		link: function ($scope, $element, $attr) {
		  function initialize() {
			var myLatLng = {lat:22.718557, lng: 75.863926};
			var mapOptions = {
			  center: new google.maps.LatLng(22.718557, 75.863926),
			  zoom: 14,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map($element[0], mapOptions);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				label: "A",
				content:"Hello World!"
			});
			var infowindow = new google.maps.InfoWindow({
			  content:"<p> MTH Compound, Indore, Madhya Pradesh 452007</p>"
			});
			infowindow.open(map,marker);
			
			$scope.onCreate({map: map});
	
			// Stop the side bar from dragging when mousedown/tapdown on the map
			google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
			  e.preventDefault();
			  return false;
			});
		  }
	
		  if (document.readyState === "complete") {
			initialize();
		  } else {
			google.maps.event.addDomListener(window, 'load', initialize);
		  }
		}
  	}
})
