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
 $scope.login = "";
 $rootScope.$on('login_var', function (event, args) {
	$scope.login = args.global_login;
	global_login_id = args.global_login;
 });
 $scope.logout = function(){
		var login_var = "";
		$rootScope.$broadcast('login_var',{global_login:login_var});
		window.localStorage.removeItem("login_var_local");
		console.log(window.localStorage.getItem("login_var_local"));
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
	/* http://makerites.com/testing/web_services_blood/index.php?action=user_login&email=jaymakerits@gmail&password=parmar007
http://makerites.com/testing/web_services_blood/index.php?action=user_registration&first_name=jayraj&last_name=singh&email=jaymakerits@gmail.com&password=parmar&phone=9827567489&blood_group=b+&dateofbirth=2017-02-4&gender=male&country=india&state=mp&city=indore&pincode=452001&address=vijay%20nagar */
	$scope.country_arr = country_arr;
	$scope.userdata = {};
	$scope.submitRegistrationForm = function(FormName) {
		var action = "user_registration";
		var data_parameters = "action="+action+"&first_name="+$scope.userdata.first_name+'#*$?@*#'+$scope.userdata.first_name_visibiity+"&last_name="+$scope.userdata.last_name+'#*$?@*#'+$scope.userdata.last_name_visibiity+"&email="+$scope.userdata.email+'#*$?@*#'+$scope.userdata.email_visibiity+"&password="+$scope.userdata.password+"&phone="+$scope.userdata.phone+'#*$?@*#'+$scope.userdata.phone_visibiity+"&blood_group="+$scope.userdata.blood_group+'#*$?@*#'+$scope.userdata.blood_group_visibiity+"&dateofbirth="+$scope.userdata.dateofbirth+'#*$?@*#'+$scope.userdata.dateofbirth_visibiity+"&gender="+$scope.userdata.gender+'#*$?@*#'+$scope.userdata.gender_visibiity+"&country="+$scope.userdata.country+'#*$?@*#'+$scope.userdata.country_visibiity+"&state="+$scope.userdata.state+'#*$?@*#'+$scope.userdata.state_visibiity+"&city="+$scope.userdata.city+'#*$?@*#'+$scope.userdata.city_visibiity+"&pincode="+$scope.userdata.pincode+'#*$?@*#'+$scope.userdata.pincode_visibiity+"&address=''";
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
	/* http://dreamgraphs.com/web_service.php?action=forgot_password&email=jaymakerits@gmail.com */
	/*$scope.submitforgotPassForm = function(FormName) {
		var action = "forgot_password";
		var data_parameters = "action="+action+"&email="+$scope.email;
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
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response[0].msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
				if(response[0].success == 'Y'){
					$scope.email = '' ;
					FormName.$setPristine();
				}
				$ionicLoading.hide();
			});
		}
	};*/
})
/** Change Password Controller **/
.controller('changePassCtrl',function($scope,$http,$ionicLoading,$state,$ionicPopup) {
	$scope.data = {};
	/* http://dreamgraphs.com/web_service.php?action=change_password&user_id=48&old_password=123&current_password=12345 */
	$scope.submitchangePassForm = function(FormName) {
		var action = "change_password";
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&old_password="+$scope.data.old_password+"&current_password="+$scope.data.password;
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
					$scope.data.old_password = $scope.data.password = $scope.data.confirmpassword = '' ;
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
			$state.go('app.register',{Option:Option});
		}
	}
})
/** Users List Controller **/
.controller('usersListCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory,$ionicScrollDelegate) {
	/** http://dreamgraphs.com/web_service.php?action=users_list&user_id=12 **/
	$scope.$on('$ionicView.enter', function() {
		var action = "users_list";
		var data_parameters = "action="+action+"&user_id="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.users = response.data;
				$ionicLoading.hide();
			}
		});
	});
	$scope.scrollTop = function() {
		$ionicScrollDelegate.scrollTop();
	};
})
/** Menu **/
.controller('MenuController', function($scope,$ionicSideMenuDelegate,$state,$ionicHistory) {
	$scope.GotoPage = function(page){ 
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('app.'+page);
		$ionicSideMenuDelegate.toggleLeft();
	}
});
