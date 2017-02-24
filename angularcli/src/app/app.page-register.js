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
var UserModel = (function () {
    function UserModel() {
    }
    return UserModel;
}());
exports.UserModel = UserModel;
var PageRegisterComponent = (function () {
    function PageRegisterComponent(_remoteService) {
        this.userModel = new UserModel();
        this.remoteService = _remoteService;
    }
    PageRegisterComponent.prototype.registerUser = function () {
        var _this = this;
        this.sendingRequest = true;
        this.remoteService.createUser(this.userModel)
            .subscribe(function (data) {
            _this.token = data["id"];
            _this.allErrors = null;
            _this.sendingRequest = false;
        }, function (error) {
            _this.allErrors = error.toString().split("|");
            _this.sendingRequest = false;
        }, function () {
            console.log("Finished");
            _this.sendingRequest = false;
        });
    };
    return PageRegisterComponent;
}());
PageRegisterComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/view/register.html',
    }),
    __metadata("design:paramtypes", [app_myremoteservice_1.MyRemoteService])
], PageRegisterComponent);
exports.PageRegisterComponent = PageRegisterComponent;
//# sourceMappingURL=app.page-register.js.map