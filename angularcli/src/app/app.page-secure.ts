import { Component } from '@angular/core';
import { MyRemoteService } from './app.myremoteservice';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './view/secure.html'
})
 
export class PageSecureComponent {
    remoteService: MyRemoteService;
    token:string;
    userRole:string;
    userName:string;
    fullName:string;
    subject:any;

    constructor(_remoteService: MyRemoteService, private route: ActivatedRoute) {
        this.remoteService = _remoteService;
    }
 
    ngOnInit(){
        this.remoteService.checkCredentials();
        this.subject = this.route.params.subscribe(params => {
            if(params['userName'] != null){
                sessionStorage.setItem('userName',params['userName']);
            }
          
        });
        this.getRoleByName(sessionStorage.getItem('userName'));
    }
 
    logout() {
        this.remoteService.logout();
    }

    getRoleByName(name) {
        this.userName = sessionStorage.getItem('userName');
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser.token;
        this.remoteService.getRoleByName(this.token,name)

        .subscribe(

        data => {
            console.log(data["roles"]);
            this.userRole = data["roles"];
            sessionStorage.setItem('userRole',data["roles"]);
            this.fullName = data["fullName"];
            this.remoteService.isAdmin(this.userRole);
        },

        error => {
            alert(error)
        },

        () => {
            console.log("Finished")
        });
    }
}