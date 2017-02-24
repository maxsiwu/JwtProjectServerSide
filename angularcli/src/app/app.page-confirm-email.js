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
var http_1 = require("@angular/http");
var PageConfirmEmailComponent = (function () {
    function PageConfirmEmailComponent(_remoteService) {
        this.remoteService = _remoteService;
        this.getParam();
        if (this.linkId != '' && this.linkToken != '') {
            this.confirmEmail();
        }
    }
    PageConfirmEmailComponent.prototype.getParam = function () {
        var params = new http_1.URLSearchParams(window.location.search);
        this.linkId = params.get('userid');
        this.linkToken = params.get('code');
    };
    PageConfirmEmailComponent.prototype.confirmEmail = function () {
        var _this = this;
        this.remoteService.confirmEmail(this.linkToken, this.linkId)
            .subscribe(function (data) {
            console.log(data);
            _this.confirmResponse = data.toString();
        }, function (error) {
            alert(error);
        }, function () {
            console.log("Finished");
        });
    };
    return PageConfirmEmailComponent;
}());
PageConfirmEmailComponent = __decorate([
    core_1.Component({
        templateUrl: './app/view/confirm-email.html',
    }),
    __metadata("design:paramtypes", [app_myremoteservice_1.MyRemoteService])
], PageConfirmEmailComponent);
exports.PageConfirmEmailComponent = PageConfirmEmailComponent;
//# sourceMappingURL=app.page-confirm-email.js.map