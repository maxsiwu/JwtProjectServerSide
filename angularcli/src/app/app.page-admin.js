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
var PageAdminComponent = (function () {
    function PageAdminComponent(_remoteService) {
        this.allUsersJSON = null;
        this.oneUser = null;
        this.remoteService = _remoteService;
    }
    PageAdminComponent.prototype.ngOnInit = function () {
        this.remoteService.checkCredentials();
    };
    PageAdminComponent.prototype.getAllUsers = function () {
        var _this = this;
        this.sendingRequest = true;
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser.token;
        this.remoteService.getAllUsers(this.token)
            .subscribe(function (data) {
            console.log(data);
            _this.allUsersJSON = data;
            _this.sendingRequest = false;
        }, function (error) {
            alert(error);
            _this.sendingRequest = false;
        }, function () {
            console.log("Finished");
            _this.sendingRequest = false;
        });
    };
    PageAdminComponent.prototype.getUserByName = function (userNameSearch) {
        var _this = this;
        this.sendingRequest = true;
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser.token;
        this.remoteService.getUserByName(this.token, userNameSearch)
            .subscribe(function (data) {
            console.log(data);
            _this.oneUser = data;
            _this.error = null;
            _this.sendingRequest = false;
        }, function (error) {
            _this.error = error;
            _this.sendingRequest = false;
        }, function () {
            console.log("Finished");
            _this.sendingRequest = false;
        });
    };
    return PageAdminComponent;
}());
PageAdminComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/view/admin.html',
    }),
    __metadata("design:paramtypes", [app_myremoteservice_1.MyRemoteService])
], PageAdminComponent);
exports.PageAdminComponent = PageAdminComponent;
//# sourceMappingURL=app.page-admin.js.map