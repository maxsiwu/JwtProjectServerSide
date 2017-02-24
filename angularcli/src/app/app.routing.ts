import { ModuleWithProviders }          from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';
import { AppComponent }                 from './app.component';
import { PageRegisterComponent }        from './app.page-register';
import { PageLoginComponent }           from './app.page-login';
import { PageLogoutComponent }          from './app.page-logout';
import { PageProfileComponent }         from './app.page-profile';
import { PageAssignRolesComponent }     from './app.page-assign-roles';
import { PageAdminComponent }           from './app.page-admin';
import { PageConfirmEmailComponent }    from './app.page-confirm-email';
import { PageSecureComponent }          from './app.page-secure';
import { PageDefault }                  from './app.page-default';

const appRoutes: Routes = [
    { path: 'page-login', component: PageLoginComponent },
    { path: 'page-logout', component: PageLogoutComponent },
    { path: 'page-register', component: PageRegisterComponent },
    { path: 'page-profile', component: PageProfileComponent },
    { path: 'page-assign-roles', component: PageAssignRolesComponent },
    { path: 'page-admin', component: PageAdminComponent },
    { path: 'page-confirm-email', component: PageConfirmEmailComponent },
    { path: 'page-secure', component: PageSecureComponent },
    //{ path: 'page-confirm-email/:userId/:code', component: PageConfirmEmailComponent },
    { path: '', redirectTo: '/page-login', pathMatch: 'full'},
    { path: '**', component: PageDefault }
];

export const appRoutingProviders: any[] = [

];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);