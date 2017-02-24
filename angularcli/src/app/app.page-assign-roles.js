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
var PageAssignRolesComponent = (function () {
    function PageAssignRolesComponent(_remoteService) {
        this.remoteService = _remoteService;
    }
    PageAssignRolesComponent.prototype.ngOnInit = function () {
        this.remoteService.checkCredentials();
    };
    PageAssignRolesComponent.prototype.assignRolesByEmail = function (email, role) {
        var _this = this;
        this.sendingRequest = true;
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser.token;
        this.remoteService.assignRolesByEmail(this.token, email, role)
            .subscribe(function (data) {
            console.log(data);
            _this.assignResponse = data.toString();
            _this.allErrors = null;
            _this.sendingRequest = false;
        }, function (error) {
            //alert(error)
            _this.allErrors = error;
            _this.sendingRequest = false;
        }, function () {
            console.log("Finished");
            _this.sendingRequest = false;
        });
    };
    return PageAssignRolesComponent;
}());
PageAssignRolesComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/view/assign-roles.html',
    }),
    __metadata("design:paramtypes", [app_myremoteservice_1.MyRemoteService])
], PageAssignRolesComponent);
exports.PageAssignRolesComponent = PageAssignRolesComponent;
//# sourceMappingURL=app.page-assign-roles.js.map