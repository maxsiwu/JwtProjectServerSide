"use strict";
var router_1 = require("@angular/router");
var app_page_register_1 = require("./app.page-register");
var app_page_login_1 = require("./app.page-login");
var app_page_logout_1 = require("./app.page-logout");
var app_page_profile_1 = require("./app.page-profile");
var app_page_assign_roles_1 = require("./app.page-assign-roles");
var app_page_admin_1 = require("./app.page-admin");
var app_page_confirm_email_1 = require("./app.page-confirm-email");
var app_page_secure_1 = require("./app.page-secure");
var app_page_default_1 = require("./app.page-default");
var appRoutes = [
    { path: 'page-login', component: app_page_login_1.PageLoginComponent },
    { path: 'page-logout', component: app_page_logout_1.PageLogoutComponent },
    { path: 'page-register', component: app_page_register_1.PageRegisterComponent },
    { path: 'page-profile', component: app_page_profile_1.PageProfileComponent },
    { path: 'page-assign-roles', component: app_page_assign_roles_1.PageAssignRolesComponent },
    { path: 'page-admin', component: app_page_admin_1.PageAdminComponent },
    { path: 'page-confirm-email', component: app_page_confirm_email_1.PageConfirmEmailComponent },
    { path: 'page-secure', component: app_page_secure_1.PageSecureComponent },
    //{ path: 'page-confirm-email/:userId/:code', component: PageConfirmEmailComponent },
    { path: '', redirectTo: '/page-login', pathMatch: 'full' },
    { path: '**', component: app_page_default_1.PageDefault }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map