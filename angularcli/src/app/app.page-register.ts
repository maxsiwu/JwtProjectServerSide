import { Component } from '@angular/core';
import {  MyRemoteService } from './app.myremoteservice';

export class UserModel {
    Email:string;
    UserName:string;
    Password:string;
    ConfirmPassword:string;
    FirstName:string;
    LastName:string;
}

@Component({
    templateUrl: './view/register.html',
})

export class PageRegisterComponent { 
    remoteService: MyRemoteService;
    token:string;
    registerResponse:string;
    userModel:UserModel;
    allErrors:string;
    sendingRequest:boolean;

    constructor(_remoteService: MyRemoteService) {
        this.userModel = new UserModel();
        this.remoteService = _remoteService;
    }
    registerUser() {
         this.sendingRequest = true;  
        this.remoteService.createUser(this.userModel)
            .subscribe(

            data => {
                this.token    = data["id"];
                this.allErrors = null;
                this.sendingRequest = false;
            },

            error => {
                this.allErrors = error.toString().split("|");
                this.sendingRequest = false;
            },

            () => {
                console.log("Finished");
                this.sendingRequest = false;
            });
    }
}
