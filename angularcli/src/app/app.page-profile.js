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
var ChangePasswordModel = (function () {
    function ChangePasswordModel() {
    }
    return ChangePasswordModel;
}());
exports.ChangePasswordModel = ChangePasswordModel;
var PageProfileComponent = (function () {
    function PageProfileComponent(_remoteService) {
        this.remoteService = _remoteService;
    }
    PageProfileComponent.prototype.ngOnInit = function () {
        this.remoteService.checkCredentials();
    };
    PageProfileComponent.prototype.changePassword = function () {
        var _this = this;
        this.sendingRequest = true;
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser.token;
        var pwdChangeModel = new ChangePasswordModel();
        pwdChangeModel.ConfirmPassword = this.ch_confirmPassword;
        pwdChangeModel.NewPassword = this.ch_newPwd;
        pwdChangeModel.OldPassword = this.ch_oldPwd;
        pwdChangeModel.authToken = this.token;
        this.remoteService.changePassword(pwdChangeModel)
            .subscribe(function (data) {
            console.log(data);
            _this.bulkPasswordChangeResponse = data.toString();
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
    return PageProfileComponent;
}());
PageProfileComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/view/profile.html',
    }),
    __metadata("design:paramtypes", [app_myremoteservice_1.MyRemoteService])
], PageProfileComponent);
exports.PageProfileComponent = PageProfileComponent;
//# sourceMappingURL=app.page-profile.js.map