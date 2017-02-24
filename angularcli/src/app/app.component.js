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
var AppComponent = (function () {
    function AppComponent(_remoteService) {
        var _this = this;
        this.isCollapsed = true;
        this.remoteService = _remoteService;
        this.remoteService.userLoggedIn.asObservable().subscribe(function (data) {
            _this.loggedIn = data;
        });
        this.remoteService.userIsAdmin.asObservable().subscribe(function (data) {
            _this.isAdmin = data;
        });
        this.remoteService.isAdmin();
        if (sessionStorage.getItem('currentUser') != null) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
        }
    }
    AppComponent.prototype.collapsed = function (event) {
        //console.log(event);
    };
    AppComponent.prototype.expanded = function (event) {
        //console.log(event);
    };
    AppComponent.prototype.logout = function () {
        this.remoteService.logout();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app/app.component.html',
        providers: [app_myremoteservice_1.MyRemoteService]
    }),
    __metadata("design:paramtypes", [app_myremoteservice_1.MyRemoteService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map