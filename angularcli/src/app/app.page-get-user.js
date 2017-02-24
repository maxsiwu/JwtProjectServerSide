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
var PageGetUserComponent = (function () {
    function PageGetUserComponent(_remoteService) {
        this.oneUser = null;
        this.remoteService = _remoteService;
    }
    PageGetUserComponent.prototype.getUserByName = function (userNameSearch) {
        var _this = this;
        this.remoteService.getUserByName(this.remoteService.token, userNameSearch)
            .subscribe(function (data) {
            console.log(data);
            _this.oneUser = data;
        }, function (error) {
            alert(error);
        }, function () {
            console.log("Finished");
        });
    };
    return PageGetUserComponent;
}());
PageGetUserComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/view/get-user.html',
    }),
    __metadata("design:paramtypes", [app_myremoteservice_1.MyRemoteService])
], PageGetUserComponent);
exports.PageGetUserComponent = PageGetUserComponent;
//# sourceMappingURL=app.page-get-user.js.map