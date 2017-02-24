import { Component }      from '@angular/core';
import {  MyRemoteService } from './app.myremoteservice';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    providers: [MyRemoteService]
})
export class AppComponent {
    remoteService: MyRemoteService;
    loggedIn: boolean;
    isAdmin: boolean;
    userRole: string;
    public isCollapsed:boolean = true;

    constructor(_remoteService: MyRemoteService) {
        this.remoteService = _remoteService;
        
        this.remoteService.userLoggedIn.asObservable().subscribe(
            data => {
                this.loggedIn = data;
            }
        );

        this.remoteService.userIsAdmin.asObservable().subscribe(
            data => {
                this.isAdmin = data;
            }
        );
        
        if(sessionStorage.getItem('currentUser')!= null){
            this.loggedIn = true;
            if(sessionStorage.getItem('userRole') !=null){
                this.userRole = sessionStorage.getItem('userRole');
                this.remoteService.isAdmin(this.userRole);
            }
        }else{
            this.loggedIn = false;
        }

    }
    public collapsed(event:any):void {
        //console.log(event);
    }
    
    public expanded(event:any):void {
        //console.log(event);
    }
    logout() {
        this.remoteService.logout();
    }
}