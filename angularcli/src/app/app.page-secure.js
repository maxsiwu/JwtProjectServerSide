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
var PageSecureComponent = (function () {
    function PageSecureComponent(_remoteService, route) {
        this.route = route;
        this.remoteService = _remoteService;
    }
    PageSecureComponent.prototype.ngOnInit = function () {
        this.remoteService.checkCredentials();
        this.subject = this.route.params.subscribe(function (params) {
            if (params['userName'] != null) {
                sessionStorage.setItem('userName', params['userName']);
            }
        });
        this.getRoleByName(sessionStorage.getItem('userName'));
    };
    PageSecureComponent.prototype.logout = function () {
        this.remoteService.logout();
    };
    PageSecureComponent.prototype.getRoleByName = function (name) {
        var _this = this;
        this.userName = sessionStorage.getItem('userName');
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser.token;
        this.remoteService.getRoleByName(this.token, name)
            .subscribe(function (data) {
            console.log(data["roles"]);
            _this.userRole = data["roles"];
            sessionStorage.setItem('userRole', data["roles"]);
            _this.fullName = data["fullName"];
            _this.remoteService.isAdmin(_this.userRole);
        }, function (error) {
            alert(error);
        }, function () {
            console.log("Finished");
        });
    };
    return PageSecureComponent;
}());
PageSecureComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/view/secure.html'
    }),
    __metadata("design:paramtypes", [app_myremoteservice_1.MyRemoteService, router_1.ActivatedRoute])
], PageSecureComponent);
exports.PageSecureComponent = PageSecureComponent;
//# sourceMappingURL=app.page-secure.js.map