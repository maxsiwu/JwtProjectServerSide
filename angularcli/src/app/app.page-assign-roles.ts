import { Component } from '@angular/core';
import {  MyRemoteService } from './app.myremoteservice';

@Component({
    templateUrl: './view/assign-roles.html',
})

export class PageAssignRolesComponent {
    remoteService: MyRemoteService;
    assignResponse: string;
    token: string;
    allErrors: string;
    sendingRequest: boolean;
    constructor(_remoteService: MyRemoteService) {
        this.remoteService = _remoteService;
    }

    ngOnInit(){
        this.remoteService.checkCredentials();
    }

    assignRolesByEmail(email, role) {
        this.sendingRequest = true;
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser.token;
        this.remoteService.assignRolesByEmail(this.token, email, role)

        .subscribe(

        data => {
            console.log(data);
            this.assignResponse = data.toString();
            this.allErrors = null;
            this.sendingRequest = false;
        },

        error => {
            //alert(error)
            this.allErrors = error;
            this.sendingRequest = false;
        },

        () => {
            console.log("Finished");
            this.sendingRequest = false;
        });
    }
 }