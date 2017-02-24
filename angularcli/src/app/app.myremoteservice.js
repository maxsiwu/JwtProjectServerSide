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
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
//import router
var router_1 = require("@angular/router");
var PwdChangeStatusModel = (function () {
    function PwdChangeStatusModel() {
    }
    return PwdChangeStatusModel;
}());
exports.PwdChangeStatusModel = PwdChangeStatusModel;
var MyRemoteService = (function () {
    function MyRemoteService(http, router) {
        this.http = http;
        this.router = router;
        this.userLoggedIn = new Rx_1.Subject();
        this.userIsAdmin = new Rx_1.Subject();
        //this.site = "http://localhost:50554/"
        this.site = "http://www.takethisapart.com/jwt/";
    }
    MyRemoteService.prototype.checkCredentials = function () {
        if (sessionStorage.getItem("currentUser") === null) {
            this.router.navigate(['/page-login']);
        }
    };
    MyRemoteService.prototype.setToken = function (value) {
        this.token = value;
    };
    MyRemoteService.prototype.getAllUsers = function (token) {
        var url = this.site + 'api/accounts/users';
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.get(url, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MyRemoteService.prototype.getUserByName = function (token, username) {
        var url = this.site + 'api/accounts/user/' + username;
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token });
        var options = new http_2.RequestOptions({ headers: headers });
        var params = new http_1.URLSearchParams();
        return this.http.get(url, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MyRemoteService.prototype.getRoleByName = function (token, username) {
        var url = this.site + 'api/accounts/role/' + username;
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token });
        var options = new http_2.RequestOptions({ headers: headers });
        var params = new http_1.URLSearchParams();
        return this.http.get(url, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MyRemoteService.prototype.assignRolesByEmail = function (token, email, roles) {
        var url = this.site + 'api/accounts/user/' + email + '/' + roles;
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token });
        var options = new http_2.RequestOptions({ headers: headers });
        var params = new http_1.URLSearchParams();
        var content = new http_1.URLSearchParams();
        content.set('roles', roles);
        content.set('email', email);
        return this.http.put(url, content.toString(), options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MyRemoteService.prototype.changePassword = function (pwdChangeModel) {
        var url = this.site + 'api/accounts/changepassword';
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + pwdChangeModel['authToken'] });
        var options = new http_2.RequestOptions({ headers: headers });
        var params = new http_1.URLSearchParams();
        var content = new http_1.URLSearchParams();
        content.set('OldPassword', pwdChangeModel['OldPassword']);
        content.set('NewPassword', pwdChangeModel['NewPassword']);
        content.set('ConfirmPassword', pwdChangeModel['ConfirmPassword']);
        return this.http.post(url, content.toString(), options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MyRemoteService.prototype.login = function (loginModel) {
        var url = this.site + 'oauth/token';
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var params = new http_1.URLSearchParams();
        var content = new http_1.URLSearchParams();
        content.set('password', loginModel['password']);
        content.set('username', loginModel['username']);
        content.set('grant_type', loginModel['grant_type']);
        return this.http.post(url, content.toString(), options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MyRemoteService.prototype.loggedIn = function () {
        this.userLoggedIn.next(true);
    };
    MyRemoteService.prototype.isAdmin = function (roles) {
        if (roles != null) {
            for (var i = 0; i < roles.length; i++) {
                if (roles[i] == "Admin") {
                    this.userIsAdmin.next(true);
                }
            }
        }
    };
    MyRemoteService.prototype.logout = function () {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userRole');
        this.router.navigate(['/page-logout']);
    };
    MyRemoteService.prototype.createUser = function (userModel) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var url = this.site + 'api/accounts/create';
        var params = new http_1.URLSearchParams();
        var content = new http_1.URLSearchParams();
        content.set('Email', userModel["Email"]);
        content.set('Password', userModel["Password"]);
        content.set('ConfirmPassword', userModel["ConfirmPassword"]);
        content.set('FirstName', userModel["FirstName"]);
        content.set('LastName', userModel["LastName"]);
        content.set('UserName', userModel["UserName"]);
        return this.http.post(url, content.toString(), options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MyRemoteService.prototype.confirmEmail = function (token, id) {
        var url = this.site + 'api/accounts/confirmemail';
        var params = new http_1.URLSearchParams();
        var content = new http_1.URLSearchParams();
        content.set('UserID', id);
        content.set('Token', token);
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(url, content.toString(), options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    // Retreival of JSON from .NET is a success.
    // I had trouble parsing the passwordChange response with extractData so I 
    // created this custom function to do it.
    // private parsePwdChangeData(res: Response) {
    //     let pwdChangeStatus = new PwdChangeStatusModel();
    //     pwdChangeStatus._body = res["_body"];
    //     pwdChangeStatus.status = res["status"];
    //     pwdChangeStatus.statusText = res["statusText"];
    //     return pwdChangeStatus || {};
    // }
    // Retreival of JSON from .NET is a success.
    MyRemoteService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    // An error occurred. Notify the user.
    MyRemoteService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        //convert string to json object
        try {
            var responseError = JSON.parse(error._body);
        }
        catch (errMsg) {
            errMsg = error.statusText;
        }
        if (responseError != null) {
            if (responseError["error_description"] != null) {
                errMsg = responseError["error_description"];
            }
            if (responseError["modelState"] != null) {
                //convert object to json object
                var allErrors = "";
                errMsg = JSON.stringify(responseError["modelState"]);
                errMsg = JSON.parse(errMsg);
                if (errMsg[""] != null) {
                    allErrors += errMsg[""][0] + "|";
                }
                if (errMsg["model.NewPassword"] != null) {
                    allErrors += errMsg["model.NewPassword"][0] + "|";
                }
                if (errMsg["model.ConfirmPassword"] != null) {
                    allErrors += errMsg["model.ConfirmPassword"][0] + "|";
                }
                if (errMsg["createUserModel.Password"] != null) {
                    allErrors += errMsg["createUserModel.Password"][0] + "|";
                }
                if (errMsg["createUserModel.ConfirmPassword"] != null) {
                    allErrors += errMsg["createUserModel.ConfirmPassword"][0] + "|";
                }
                errMsg = allErrors;
            }
        }
        return Observable_1.Observable.throw(errMsg);
    };
    return MyRemoteService;
}());
MyRemoteService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_2.Http, router_1.Router])
], MyRemoteService);
exports.MyRemoteService = MyRemoteService;
//# sourceMappingURL=app.myremoteservice.js.map