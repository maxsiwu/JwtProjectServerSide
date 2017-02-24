import { Component } from '@angular/core';
import {  MyRemoteService } from './app.myremoteservice';

export class ChangePasswordModel {
     OldPassword:string;
     NewPassword:string;
     ConfirmPassword:string;
     authToken:string;
}

@Component({
    templateUrl: './view/profile.html',
})
export class PageProfileComponent { 
    remoteService: MyRemoteService;
    ch_oldPwd:string;
    ch_newPwd:string;
    ch_confirmPassword:string;
    allErrors:string;
    bulkPasswordChangeResponse:string;
    token:string;
    sendingRequest:boolean;

    constructor(_remoteService: MyRemoteService) {
        this.remoteService = _remoteService;
    }
    ngOnInit(){
        this.remoteService.checkCredentials();
    }
    changePassword() {
        this.sendingRequest = true;
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser.token;
        let pwdChangeModel = new ChangePasswordModel();
        pwdChangeModel.ConfirmPassword = this.ch_confirmPassword;
        pwdChangeModel.NewPassword = this.ch_newPwd;
        pwdChangeModel.OldPassword = this.ch_oldPwd;
        pwdChangeModel.authToken = this.token;

        this.remoteService.changePassword(pwdChangeModel)
        .subscribe(

        data => {
            console.log(data);
            this.bulkPasswordChangeResponse = data.toString();
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