import { OnInit, Component }      from '@angular/core';
import { MyRemoteService } from './app.myremoteservice';
import {URLSearchParams} from "@angular/http";

@Component({
    templateUrl: './view/confirm-email.html',
})
export class PageConfirmEmailComponent {
    remoteService: MyRemoteService;
    confirmResponse: string;
    linkId: string;
    linkToken: string;

    constructor(_remoteService: MyRemoteService) {
        this.remoteService = _remoteService;
        this.getParam();
        if(this.linkId != '' && this.linkToken !='' ){
            this.confirmEmail();
        }
    }

    getParam(){
        let params = new URLSearchParams(window.location.search);
        this.linkId = params.get('userid');
        this.linkToken = params.get('code');
    }
    confirmEmail() {
        this.remoteService.confirmEmail(this.linkToken, this.linkId)

        .subscribe(

        data => {
            console.log(data);
            this.confirmResponse = data.toString();
        },

        error => {
            alert(error)
        },

        () => {
            console.log("Finished")
        });
    }
}