"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var app_myremoteservice_1 = require("./app.myremoteservice");
var router_1 = require("@angular/router");
var LoginModel = (function () {
    function LoginModel() {
        this.grant_type = 'password';
    }
    return LoginModel;
}());
exports.LoginModel = LoginModel;
var PageLoginComponent = (function () {
    function PageLoginComponent(_remoteService, router) {
        this.router = router;
        this.remoteService = _remoteService;
    }
    PageLoginComponent.prototype.login = function () {
        var _this = this;
        this.sendingRequest = true;
        var loginModel = new LoginModel();
        loginModel.password = this.password;
        loginModel.username = this.username;
        this.remoteService.login(loginModel)
            .subscribe(function (data) {
            _this.loginResponse = "Logged in.";
            console.log(data);
            _this.authToken = data["access_token"];
            sessionStorage.setItem('currentUser', JSON.stringify({ token: _this.authToken, name: name }));
            _this.router.navigate(['/page-secure', { userName: _this.username }]);
            _this.remoteService.loggedIn();
            _this.authError = null;
            _this.sendingRequest = false;
        }, function (error) {
            _this.authError = error;
            _this.sendingRequest = false;
        }, function () {
            console.log("Finished");
            _this.sendingRequest = false;
        });
    };
    return PageLoginComponent;
}());
PageLoginComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/view/login.html',
    }),
    __metadata("design:paramtypes", [app_myremoteservice_1.MyRemoteService, router_1.Router])
], PageLoginComponent);
exports.PageLoginComponent = PageLoginComponent;
//# sourceMappingURL=app.page-login.js.map