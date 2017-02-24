import { Injectable }     from '@angular/core';
import { Component }      from '@angular/core';
import {URLSearchParams, QueryEncoder} from '@angular/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Subject} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 
//import router
import { Router } from '@angular/router';


export class PwdChangeStatusModel {
    _body:string;
    status:number;
    statusText:string;
}

@Injectable()
export class MyRemoteService {
    public site: string;
    public token: string;
    public userLoggedIn = new Subject<boolean>();
    public userIsAdmin = new Subject<boolean>();

    constructor(private http: Http, private router:Router) { 
       //this.site = "http://localhost:50554/"
       this.site = "http://www.takethisapart.com/jwt/"
    }

    checkCredentials(){
        if (sessionStorage.getItem("currentUser") === null){
            this.router.navigate(['/page-login']);
        }
    }
    setToken(value){
        this.token = value;
    }
    getAllUsers(token) {
        let url  = this.site + 'api/accounts/users';
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token}); 
        let options = new RequestOptions({ headers: headers });      

        return this.http.get(url, options)
            .map(this.extractData) 
            .catch(this.handleError);         
    }

    getUserByName(token, username){
        let url = this.site + 'api/accounts/user/' + username;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token});
        let options = new RequestOptions({ headers: headers });
        let params: URLSearchParams = new URLSearchParams();

        return this.http.get(url, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getRoleByName(token, username){
        let url = this.site + 'api/accounts/role/' + username;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token});
        let options = new RequestOptions({ headers: headers });
        let params: URLSearchParams = new URLSearchParams();

        return this.http.get(url, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    assignRolesByEmail(token,email,roles): Observable<Comment[]>{
        let url = this.site + 'api/accounts/user/' + email + '/' + roles;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token});
        let options = new RequestOptions({ headers: headers });
        let params: URLSearchParams = new URLSearchParams();
        let content = new URLSearchParams();
        content.set('roles', roles);
        content.set('email', email);
        return this.http.put(url,content.toString(), options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    changePassword(pwdChangeModel:Object): Observable<Comment[]> {
        let url  = this.site + 'api/accounts/changepassword';

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + pwdChangeModel['authToken']}); 
        let options = new RequestOptions({ headers: headers });
        let params: URLSearchParams = new URLSearchParams();

        let content = new URLSearchParams();
        content.set('OldPassword', pwdChangeModel['OldPassword']);
        content.set('NewPassword', pwdChangeModel['NewPassword']);   
        content.set('ConfirmPassword', pwdChangeModel['ConfirmPassword']);    

        return this.http.post(url, content.toString(), options)
            .map(this.extractData) 
            .catch(this.handleError); 
    }

    login(loginModel:Object): Observable<Comment[]> {
        let url     = this.site + 'oauth/token';
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); 
        let options = new RequestOptions({ headers: headers });
        let params: URLSearchParams = new URLSearchParams();

        let content = new URLSearchParams();
        content.set('password', loginModel['password']);
        content.set('username', loginModel['username']);
        content.set('grant_type', loginModel['grant_type']);
        
        return this.http.post(url, content.toString(), options)
            .map(this.extractData) 
            .catch(this.handleError); 
    }
    
    loggedIn(){
        this.userLoggedIn.next(true);
    }

    isAdmin(roles){
        if(roles != null){
            for(let i=0;i<roles.length;i++){
                if (roles[i] == "Admin"){
                    this.userIsAdmin.next(true);
                }
            }
        }
    }

    logout(){
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userRole');
        this.router.navigate(['/page-logout']);
    }

    createUser(userModel: Object): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}); 
        let options = new RequestOptions({ headers: headers });
        let url     = this.site + 'api/accounts/create';

        let params: URLSearchParams = new URLSearchParams();

        let content = new URLSearchParams();
        content.set('Email',  userModel["Email"]);
        content.set('Password', userModel["Password"]);  
        content.set('ConfirmPassword', userModel["ConfirmPassword"]);
        content.set('FirstName', userModel["FirstName"]);
        content.set('LastName', userModel["LastName"]);
        content.set('UserName', userModel["UserName"]);

        return this.http.post(url, content.toString(), options)
            .map(this.extractData) 
            .catch(this.handleError); 
    }

    confirmEmail(token, id){
        let url  = this.site + 'api/accounts/confirmemail' ;
        let params: URLSearchParams = new URLSearchParams();
        let content = new URLSearchParams();
        content.set('UserID',  id);
        content.set('Token',  token);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}); 
        let options = new RequestOptions({ headers: headers });      

        return this.http.post(url, content.toString(), options)
            .map(this.extractData) 
            .catch(this.handleError);   
    } 

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
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    // An error occurred. Notify the user.
    private handleError(error: any) {
        
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            
        //convert string to json object
        try{
            var responseError = JSON.parse(error._body);
        }catch(errMsg){
            errMsg = error.statusText;
        }
        
        if(responseError != null){
            if(responseError["error_description"] != null){
                errMsg = responseError["error_description"];
            }

            if(responseError["modelState"] != null){
                //convert object to json object
                var allErrors = "";
                errMsg = JSON.stringify(responseError["modelState"]);
                errMsg = JSON.parse(errMsg);
                if(errMsg[""] != null){
                     allErrors += errMsg[""][0] + "|";
                }
                if(errMsg["model.NewPassword"] != null){
                    allErrors += errMsg["model.NewPassword"][0] + "|";
                }
                if(errMsg["model.ConfirmPassword"] != null){
                     allErrors += errMsg["model.ConfirmPassword"][0] + "|";
                }

                if(errMsg["createUserModel.Password"] != null){
                    allErrors += errMsg["createUserModel.Password"][0] + "|";
                }

                if(errMsg["createUserModel.ConfirmPassword"] != null){
                    allErrors += errMsg["createUserModel.ConfirmPassword"][0] + "|";
                }

                errMsg = allErrors;
            }
            
        }
        
            return Observable.throw(errMsg);
    }
    

}