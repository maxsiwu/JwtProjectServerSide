import { NgModule }                     from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { FormsModule }                  from '@angular/forms';
import { AppComponent }                 from './app.component';
import { PageRegisterComponent }        from './app.page-register';
import { PageLoginComponent }           from './app.page-login';
import { PageLogoutComponent }          from './app.page-logout';
import { PageProfileComponent }         from './app.page-profile';
import { PageAssignRolesComponent }     from './app.page-assign-roles';
import { PageAdminComponent }           from './app.page-admin';
import { PageConfirmEmailComponent }    from './app.page-confirm-email';
import { PageDefault }                  from './app.page-default';
import { PageSecureComponent }          from './app.page-secure';
import { routing, appRoutingProviders } from './app.routing';
import { HttpModule }                   from '@angular/http';
import { CollapseModule }               from 'ng2-bootstrap';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        //CollapseModule.forRoot()
        CollapseModule
    ],
    declarations: [
        AppComponent, 
        PageDefault,
        PageAdminComponent,
        PageAssignRolesComponent,
        PageProfileComponent,
        PageLogoutComponent,
        PageLoginComponent,
        PageRegisterComponent,
        PageConfirmEmailComponent,
        PageSecureComponent
    ],
    providers: [ appRoutingProviders, {provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap: [AppComponent]
})
export class AppModule { }