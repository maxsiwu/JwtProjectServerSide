import { Component } from '@angular/core';
import { MyRemoteService } from './app.myremoteservice';
import { Router } from '@angular/router';

export class LoginModel {
    username:string;
    password:string;
    grant_type:string;

    constructor() {
        this.grant_type = 'password';
    }
}

@Component({
    templateUrl: './view/login.html',
})

export class PageLoginComponent { 
    remoteService: MyRemoteService;
    username:string;
    password:string;
    grant_type:string;
    loginResponse;
    authToken:string;
    authError:string;
    sendingRequest:boolean;

    constructor(_remoteService: MyRemoteService, private router:Router) {
        this.remoteService = _remoteService;
    }

    login() {
        this.sendingRequest = true;
        let loginModel = new LoginModel();
        loginModel.password = this.password;
        loginModel.username = this.username;
        
        this.remoteService.login(loginModel)
            .subscribe(

            data => {
                this.loginResponse = "Logged in.";
                console.log(data);
                this.authToken = data["access_token"];
                sessionStorage.setItem('currentUser', JSON.stringify({ token: this.authToken, name: name }));
                this.router.navigate(['/page-secure',{userName:this.username}]);
                this.remoteService.loggedIn();
                this.authError = null;
                this.sendingRequest = false;
            },
            error => {
                this.authError = error;
                this.sendingRequest = false;
            },
            () => {
                console.log("Finished");
                this.sendingRequest = false;
            });
    }

}