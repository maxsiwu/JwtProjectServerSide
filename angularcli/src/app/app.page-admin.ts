import { Component } from '@angular/core';
import {  MyRemoteService } from './app.myremoteservice';

@Component({
    templateUrl: './view/admin.html',
})

export class PageAdminComponent { 
    remoteService:MyRemoteService;
    allUsersJSON=null;
    oneUser=null;
    token:string;
    error:string;
    sendingRequest:boolean;

    constructor(_remoteService: MyRemoteService) {
        this.remoteService = _remoteService;
    }

    ngOnInit(){
        this.remoteService.checkCredentials();
    }

    getAllUsers() {
        this.sendingRequest = true;
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser.token;
        this.remoteService.getAllUsers(this.token)

        .subscribe(

        data => {
            console.log(data);
            this.allUsersJSON = data;
            this.sendingRequest = false;
        },
        error => {
            alert(error);
            this.sendingRequest = false;
        },
        () => {
            console.log("Finished");
            this.sendingRequest = false;
        });
    }

    getUserByName(userNameSearch) {
        this.sendingRequest = true;
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser.token;
        this.remoteService.getUserByName(this.token,userNameSearch)

        .subscribe(

        data => {
            console.log(data);
            this.oneUser = data;
            this.error = null;
            this.sendingRequest = false;
        },

        error => {
            this.error = error;
            this.sendingRequest = false;
        },

        () => {
            console.log("Finished");
            this.sendingRequest = false;
        });
    }
}