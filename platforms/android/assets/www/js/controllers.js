var global_login_id = "";
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})
/** Member Logout Controller **/
.controller('LogoutCtrl', function($scope,$rootScope,$ionicHistory,$state) {
 $scope.login =  "";
 $rootScope.$on('login_var', function (event, args) {
	$scope.login = args.global_login;
	global_login_id = args.global_login;
 });
 $scope.logout = function(){
		var login_var = "";
		$rootScope.$broadcast('login_var',{global_login:login_var});
		window.localStorage.removeItem("login_var_local");
		window.localStorage.removeItem("login_type");
		$ionicHistory.clearCache();
		$ionicHistory.clearHistory();
    };
})
/** Member Login Controller**/
.controller('loginCtrl',function($scope,$http,$state,$ionicLoading,$ionicPopup,$ionicHistory,$rootScope,$stateParams) {
	$scope.Option = $stateParams.Option;
	$scope.userdata = {};
	/* http://makerites.com/testing/web_services_blood/index.php?action=user_login&email=user@gmail.com&password=admin123 */
	$scope.submitLoginForm = function(FormName) {
		var action = "user_login";
        var data_parameters = "action="+action+"&email="+$scope.userdata.email+"&password="+$scope.userdata.password;
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else{
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				if(response.success == 'Y'){
					$scope.userdata.email = $scope.userdata.password = '' ;
					FormName.$setPristine();
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					$rootScope.$broadcast('login_var',{global_login:response.msg.id});
					window.localStorage.setItem("login_var_local",response.msg.id);
					window.localStorage.setItem("login_type",response.msg.login_type);
					$state.go("app."+$scope.Option);
				}
				else{
					$ionicPopup.show({
					  template: '',
					  title: '<p><i class="ion-android-cancel icon-popup"></i></p> '+response.msg,
					  scope: $scope,
					  buttons: [
						{ 
						  text: 'Ok',
						  type: 'button-custom'
						},
					  ]
					});
				}
				$ionicLoading.hide();
			});
		}
	};
})
/** Member Registration Controller**/
.controller('registrationCtrl',function($scope,$http,$state,$ionicLoading,$ionicHistory,$ionicPopup,$stateParams,$filter,$rootScope) {
	$scope.Option = $stateParams.Option;
	/* http://makerites.com/testing/web_services_blood/index.php?action=user_registration&first_name=jayraj&last_name=singh&email=jaymakerits@gmail.com&password=parmar&phone=9827567489&dateofbirth=2017-02-4&gender=male&country=india&state=mp&city=indore&pincode=452001&address=vijay%20nagar */
	$scope.country_arr = country_arr;
	$scope.userdata = {};
	$scope.submitRegistrationForm = function(FormName) {
		var action = "user_registration";
		var availability = $scope.userdata.availability != undefined ? $scope.userdata.availability : '';
		var data_parameters = "action="+action+"&first_name="+$scope.userdata.first_name+'#*$?@*#'+$scope.userdata.first_name_visibiity+"&last_name="+$scope.userdata.last_name+'#*$?@*#'+$scope.userdata.last_name_visibiity+"&email="+$scope.userdata.email+'#*$?@*#'+$scope.userdata.email_visibiity+"&password="+$scope.userdata.password+"&phone="+$scope.userdata.phone+'#*$?@*#'+$scope.userdata.phone_visibiity+"&dateofbirth="+$scope.userdata.dateofbirth+'#*$?@*#'+$scope.userdata.dateofbirth_visibiity+"&gender="+$scope.userdata.gender+'#*$?@*#'+$scope.userdata.gender_visibiity+"&country="+$scope.userdata.country+'#*$?@*#'+$scope.userdata.country_visibiity+"&state="+$scope.userdata.state+'#*$?@*#'+$scope.userdata.state_visibiity+"&city="+$scope.userdata.city+'#*$?@*#'+$scope.userdata.city_visibiity+"&pincode="+$scope.userdata.pincode+'#*$?@*#'+$scope.userdata.pincode_visibiity+"&address=''"+"&login_type="+$scope.Option+"&availability="+availability;
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else{
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				if(response.success == 'Y'){
					$scope.userdata = {};
					FormName.$setPristine();
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					$rootScope.$broadcast('login_var',{global_login:response.user_id});
					window.localStorage.setItem("login_var_local",response.user_id);
					window.localStorage.setItem("login_type",response.login_type);
					$ionicPopup.show({
					  template: '',
					  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
					  scope: $scope,
					  buttons: [
						{ 
						  text: 'Ok',
						  type: 'button-custom',
						  onTap: function() { 
							console.log('tapped');
							$state.go('app.'+$scope.Option,{},{ reload: true });
						  }
						},
					  ]
					});
				}
				else{
					$ionicPopup.show({
					  template: '',
					  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
					  scope: $scope,
					  buttons: [
						{ 
						  text: 'Ok',
						  type: 'button-custom'
						},
					  ]
					});
				}
				$ionicLoading.hide();
			});
		}
	};
	$scope.countryChanged = function() {
		var index = $scope.userdata.country;
		$scope.filteredstates = state_arr[index];
	};
	// Datepicker
	$scope.userdata.dateofbirth = $filter('date')(new Date(), "dd-MM-yyyy"); 
	$scope.Callbackdateofbirth = function (val) {
		if (!val) {	
			console.log('Date not selected');
		} else {
			console.log('Selected date is : ', val);
			val = $filter('date')(val, "dd-MM-yyyy");
			$scope.userdata.dateofbirth = val;
		}
	};
})
/** Forgot Password Controller **/
.controller('forgotPassCtrl',function($scope,$http,$ionicLoading,$state,$ionicPopup,$stateParams) {
	$scope.Option = $stateParams.Option;
	/* http://makerites.com/testing/web_services_blood/index.php?action=forgot_password&email=jaymakerits@gmail.com */
	$scope.userdata = {};
	$scope.submitforgotPassForm = function(FormName) {
		var action = "forgot_password";
		var data_parameters = "action="+action+"&email="+$scope.userdata.email;
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else{
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
				if(response.success == 'Y'){
					$scope.userdata.email = '' ;
					FormName.$setPristine();
				}
				$ionicLoading.hide();
			});
		}
	};
})
/** Change Password Controller **/
.controller('changePassCtrl',function($scope,$http,$ionicLoading,$state,$ionicPopup) {
	$scope.userdata = {};
	/* http://makerites.com/testing/web_services_blood/index.php?action=change_password&user_id=48&old_password=123&current_password=12345 */
	$scope.submitchangePassForm = function(FormName) {
		var action = "change_password";
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&old_password="+$scope.userdata.old_password+"&current_password="+$scope.userdata.password;
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else{
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
				if(response.success == 'Y'){
					$scope.userdata = {} ;
					FormName.$setPristine();
				}
				$ionicLoading.hide();
			});
		}
	};
})
/** Member Profile Controller **/
.controller('memberProfileCtrl',function($scope,$http,$ionicLoading,$ionicHistory,$state,$ionicPopup) {
	$scope.GotoPage = function(page){ 
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('app.'+page);
	}
})
/** Home Controller **/
.controller('homeCtrl', function($http,$scope,$state,$ionicHistory,$ionicPopup,$ionicLoading,$timeout,$rootScope) {
	/** Check Login **/
	$scope.$on('$ionicView.enter', function() {
		var login_var_local = window.localStorage.getItem("login_var_local");
		console.log(login_var_local);
		if(login_var_local !== undefined && login_var_local != null && login_var_local != '') {
			$rootScope.$broadcast('login_var',{global_login:login_var_local});
		}
	});
	/** End Check Login **/
	/** Goto Option **/
	$scope.GotoOption = function(Option){
		var login_var_local = window.localStorage.getItem("login_var_local");
		if(login_var_local !== undefined && login_var_local != null  && login_var_local != ''){
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('app.'+Option);
		}
		else{
			$state.go('app.login',{Option:Option});
		}
	}
})
/** Users List Controller **/
.controller('usersListCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory,$ionicScrollDelegate) {
	/** http://makerites.com/testing/web_services_blood/index.php?action=user_list **/
	$scope.$on('$ionicView.enter', function() {
		var action = "user_list";
		var data_parameters = "action="+action;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.users = response.data;	
			}
			$ionicLoading.hide();
		});
	});
	$scope.scrollTop = function() {
		$ionicScrollDelegate.scrollTop();
	};
})
/** User Details Controller **/
.controller('userDetailsCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory) {
	/** http://makerites.com/testing/web_services_blood/index.php?action=user_list **/
	$scope.$on('$ionicView.enter', function() {
		var action = "user_list";
		var data_parameters = "action="+action+"&user_id="+$stateParams.user_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.userdata = response.data[0];
				$ionicLoading.hide();
			}
		});
	});
})
/** Settings Controller **/
.controller('settingsCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory,$ionicPopup) {
	$scope.userdata = {};
	$scope.$on('$ionicView.enter', function() {
		$scope.userdata.login_type = window.localStorage.getItem("login_type");
	});
})
/** Settings Kefir Availability Controller **/
.controller('settingsKefirAvailabilityCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory,$ionicPopup) {	
	/** http://makerites.com/testing/web_services_blood/index.php?action=user_list **/
	$scope.userdata = {};
	$scope.$on('$ionicView.enter', function() {
		var action = "user_list";
		var data_parameters = "action="+action+"&user_id="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.userdata.availability = response.data[0].availability == 'Available' ? 1 : 0;
				$ionicLoading.hide();
			}
		});
	});
	$scope.changeAvailability = function(FormName) {
		var action = "change_availability";
		var availability = $scope.userdata.availability == 1 ? 'Available' : 'Not Available'; 
		var data_parameters = "action="+action+"&availability="+availability+"&user_id="+global_login_id;
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
				$ionicLoading.hide();
			});
	};
})
/** Settings Profile Picture Controller **/
.controller('settingsProfilePictureCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory,$ionicPopup,$cordovaCamera,$cordovaFileTransfer) {	
	/** http://makerites.com/testing/web_services_blood/index.php?action=user_list **/
	$scope.userdata = {};
	var alertPopup;
	$scope.$on('$ionicView.enter', function() {
		var action = "user_list";
		var data_parameters = "action="+action+"&user_id="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				$scope.userdata.profile_img = response.data[0].profile_img != '' ? response.data[0].profile_img : './img/siteimgs/userdefault.png';
				$ionicLoading.hide();
			}
		});
	});
	//Cover Photo
	$scope.chooseOption4CoverS = function() {
		alertPopup = $ionicPopup.show({
		  template: '<div class="row text-center"><div class="col col-50"><button class="button button-royal icon ion-camera" ng-click="takePhoto4UpdateCoverS()"></button></div><div class="col col-50"><button class="button button-energized icon ion-images" ng-click="choosePhoto4UpdateCoverS()" ></button></div></div>',
		  //templateUrl: 'templates/uploadmemberregistration.html',
		  title: 'Choose Option',
		  scope: $scope,
		  buttons: [
			{ 
			  text: 'Cancel',
			  type: 'button-custom'
			},
		  ]
		});
	};
	// open PhotoLibrary
    $scope.takePhoto4UpdateCoverS = function () {
		alertPopup.close();
		console.log('takePhoto');
		var options = {
			quality: 90,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 800,
			targetHeight: 300,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};
		$cordovaCamera.getPicture(options).then(function (imageData) {
			$scope.userdata.profile_img = imageData;
			var server = globalip;
			var options = new FileUploadOptions();
			options.fileKey = "profile_img";
			options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
			options.mimeType = "image/jpeg";
			options.chunkedMode = false; // Transfer picture to server
			var params = new Object(); 
			params.user_id = global_login_id;
			params.action = "updateProfileImg";
			options.params = params;
			var ft = new FileTransfer();
			ft.upload(imageData, server, function(r) {
				//document.getElementById('camera_status').innerHTML = "Upload successful: " + r.bytesSent + " bytes uploaded.";
			}, function(error) {
			   // document.getElementById('camera_status').innerHTML = "Upload failed: Code = " + error.code;
			}, options);
		}, function (err) {
			// An error occured. Show a message to the user
		});
	}
	$scope.choosePhoto4UpdateCoverS = function () {
		alertPopup.close();
		console.log('choosePhoto');
		var options = {
			quality: 90,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 800,
			targetHeight: 300,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};
		$cordovaCamera.getPicture(options).then(function (imageData) {
			$scope.userdata.profile_img = imageData;
			var server = globalip;
			var options = new FileUploadOptions();
			options.fileKey = "profile_img";
			options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
			options.mimeType = "image/jpeg";
			options.chunkedMode = false; // Transfer picture to server
			var params = new Object(); 
			params.user_id = global_login_id;
			params.action = "updateProfileImg";
			options.params = params;
			var ft = new FileTransfer();
			ft.upload(imageData, server, function(r) {
				//document.getElementById('camera_status').innerHTML = "Upload successful: " + r.bytesSent + " bytes uploaded.";
			}, function(error) {
			   // document.getElementById('camera_status').innerHTML = "Upload failed: Code = " + error.code;
			}, options);
		}, function (err) {
			// An error occured. Show a message to the user
		});
	}
})
/** Settings Update Info Controller **/
.controller('settingsUpdateInfoCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory,$ionicPopup,$filter) {
	$scope.country_arr = country_arr;
	/** http://makerites.com/testing/web_services_blood/index.php?action=user_list&user_id=1 **/
	$scope.userdata = {};
	$scope.$on('$ionicView.enter', function() {
		var action = "user_list";
		var data_parameters = "action="+action+"&user_id="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				$scope.userdata.first_name = response.data[0].first_name;
				$scope.userdata.first_name_visibiity = response.data[0].first_name_v == '1' ? 1 : 0;
				$scope.userdata.last_name = response.data[0].last_name;
				$scope.userdata.last_name_visibiity = response.data[0].last_name_v == '1' ? 1 : 0;
				$scope.userdata.email = response.data[0].email;
				$scope.userdata.email_visibiity = response.data[0].email_v == '1' ? 1 : 0;
				$scope.userdata.phone = response.data[0].phone;
				$scope.userdata.phone_visibiity = response.data[0].phone_v == '1' ? 1 : 0;
				$scope.userdata.dateofbirth = response.data[0].dateofbirth;
				$scope.userdata.dateofbirth_visibiity = response.data[0].dateofbirth_v == '1' ? 1 : 0;
				$scope.userdata.gender = response.data[0].gender;
				$scope.userdata.gender_visibiity = response.data[0].gender_v == '1' ? 1 : 0;
				$scope.userdata.country = response.data[0].country;
				$scope.userdata.country_visibiity = response.data[0].country_v == '1' ? 1 : 0;
				$scope.filteredstates = state_arr[$scope.userdata.country];
				$scope.userdata.state = response.data[0].state;
				$scope.userdata.state_visibiity = response.data[0].state_v == '1' ? 1 : 0;
				$scope.userdata.city = response.data[0].city;
				$scope.userdata.city_visibiity = response.data[0].city_v == '1' ? 1 : 0;
				$scope.userdata.pincode = response.data[0].pincode;
				$scope.userdata.pincode_visibiity = response.data[0].pincode_v == '1' ? 1 : 0;
				$ionicLoading.hide();
			}
		});
	});
	$scope.submitmemberUpdateForm = function(FormName) {
		var action = "user_update";
		var data_parameters = "action="+action+"&first_name="+$scope.userdata.first_name+'#*$?@*#'+$scope.userdata.first_name_visibiity+"&last_name="+$scope.userdata.last_name+'#*$?@*#'+$scope.userdata.last_name_visibiity+"&email="+$scope.userdata.email+'#*$?@*#'+$scope.userdata.email_visibiity+"&phone="+$scope.userdata.phone+'#*$?@*#'+$scope.userdata.phone_visibiity+"&dateofbirth="+$scope.userdata.dateofbirth+'#*$?@*#'+$scope.userdata.dateofbirth_visibiity+"&gender="+$scope.userdata.gender+'#*$?@*#'+$scope.userdata.gender_visibiity+"&country="+$scope.userdata.country+'#*$?@*#'+$scope.userdata.country_visibiity+"&state="+$scope.userdata.state+'#*$?@*#'+$scope.userdata.state_visibiity+"&city="+$scope.userdata.city+'#*$?@*#'+$scope.userdata.city_visibiity+"&pincode="+$scope.userdata.pincode+'#*$?@*#'+$scope.userdata.pincode_visibiity+"&user_id="+global_login_id;
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else{
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				if(response.success == 'Y'){
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					$ionicPopup.show({
					  template: '',
					  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
					  scope: $scope,
					  buttons: [
						{ 
						  text: 'Ok',
						  type: 'button-custom',
						  onTap: function() { 
							console.log('tapped');
							$state.go('app.settings',{},{ reload: true });
						  }
						},
					  ]
					});
				}
				else{
					$ionicPopup.show({
					  template: '',
					  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
					  scope: $scope,
					  buttons: [
						{ 
						  text: 'Ok',
						  type: 'button-custom'
						},
					  ]
					});
				}
				$ionicLoading.hide();
			});
		}
	};
	$scope.countryChanged = function() {
		var index = $scope.userdata.country;
		$scope.filteredstates = state_arr[index];
	};
	// Datepicker 
	$scope.Callbackdateofbirth = function (val) {
		if (!val) {	
			console.log('Date not selected');
		} else {
			console.log('Selected date is : ', val);
			val = $filter('date')(val, "dd-MM-yyyy");
			$scope.userdata.dateofbirth = val;
		}
	};
})
/** Kefir Donate Controller **/
.controller('kefirDonateCtrl',function($scope,$http,$state,$ionicLoading,$ionicHistory,$ionicPopup,$stateParams) {
	/* http://makerites.com/testing/web_services_blood/index.php?action=donate&country=india&state=mp&city=indore&pincode=452001&phone=9827567489&user_id=8&type=donate */
	$scope.country_arr = country_arr;
	$scope.userdata = {};
	$scope.submitkefirDonateForm = function(FormName) {
		var action = "donate";
		var data_parameters = "action="+action+"&country="+$scope.userdata.country+"&state="+$scope.userdata.state+"&city="+$scope.userdata.city+"&pincode="+$scope.userdata.pincode+"&phone="+$scope.userdata.phone+"&user_id="+global_login_id+"&type=donate";
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else{
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
				if(response.success == 'Y'){
					$scope.userdata = {};
					FormName.$setPristine();
				}
				$ionicLoading.hide();
			});
		}
	};
	$scope.countryChanged = function() {
		var index = $scope.userdata.country;
		$scope.filteredstates = state_arr[index];
	};
})
/** Kefir Request Controller **/
.controller('kefirRequestCtrl',function($scope,$http,$state,$ionicPopup) {
	$scope.country_arr = country_arr;
	$scope.userdata = {};
	$scope.submitkefirRequestForm = function(FormName) {
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else{
			//$scope.userdata = {};
			//FormName.$setPristine();
			$state.go('app.kefir-request-search-results',{country:$scope.userdata.country,state:$scope.userdata.state,city:$scope.userdata.city,pincode:$scope.userdata.pincode});
		}
	};
	$scope.countryChanged = function() {
		var index = $scope.userdata.country;
		$scope.filteredstates = state_arr[index];
	};
})
/** Kefir Request Search Result Controller **/
.controller('kefirRequestSearchResultsCtrl',function($scope,$http,$state,$ionicLoading,$stateParams) {
	/** http://makerites.com/testing/web_services_blood/index.php?action=search_donor **/
	$scope.$on('$ionicView.enter', function() {
		var action = "search_donor";
		var data_parameters = "action="+action+"&country="+$stateParams.country+"&state="+$stateParams.state+"&city="+$stateParams.city+"&pincode="+$stateParams.pincode;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.users = response.data;	
			}
			$ionicLoading.hide();
		});
	});
})
/** Paleo Products List Controller **/
.controller('paleoProductsCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory) {
	$scope.$on('$ionicView.enter', function() {
		$scope.products = {};
		var action = "product_list";
		var data_parameters = "action="+action+"&category="+$stateParams.category;
		if($stateParams.product_id){ data_parameters += "&product_id="+$stateParams.product_id; }
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.products = response.data;	
			}
			$ionicLoading.hide();
		});
	});
	$scope.GotoLink = function(url){
	  var ref = window.open(url,'_blank','location=no'); 
	  return false;
	}
})
/** Contact Controller **/
.controller('contactCtrl',function($scope,$http,$state,$ionicLoading,$ionicHistory,$ionicPopup,$stateParams) {
	/* http://makerites.com/testing/web_services_blood/index.php?action=contact_us&name=jayraj&email=jaymakerits@gmail&phone=9827567489&country=india&state=mp&city=india&message=hello */
	$scope.country_arr = country_arr;
	$scope.userdata = {};
	$scope.submitcontactForm = function(FormName) {
		var action = "contact_us";
		var data_parameters = "action="+action+"&name="+$scope.userdata.name+"&phone="+$scope.userdata.phone+"&email="+$scope.userdata.email+"&country="+$scope.userdata.country+"&state="+$scope.userdata.state+"&city="+$scope.userdata.city+"&message="+$scope.userdata.message;
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else{
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
				if(response.success == 'Y'){
					$scope.userdata = {};
					FormName.$setPristine();
				}
				$ionicLoading.hide();
			});
		}
	};
	$scope.countryChanged = function() {
		var index = $scope.userdata.country;
		$scope.filteredstates = state_arr[index];
	};
})
/** Menu **/
.controller('MenuController', function($scope,$ionicSideMenuDelegate,$state,$ionicHistory) {
	$scope.GotoPage = function(page,category){ 
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('app.'+page,{category:category});
		$ionicSideMenuDelegate.toggleLeft();
	}
});
