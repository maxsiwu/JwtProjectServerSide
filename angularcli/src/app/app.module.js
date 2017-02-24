"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var app_page_register_1 = require("./app.page-register");
var app_page_login_1 = require("./app.page-login");
var app_page_logout_1 = require("./app.page-logout");
var app_page_profile_1 = require("./app.page-profile");
var app_page_assign_roles_1 = require("./app.page-assign-roles");
var app_page_admin_1 = require("./app.page-admin");
var app_page_confirm_email_1 = require("./app.page-confirm-email");
var app_page_default_1 = require("./app.page-default");
var app_page_secure_1 = require("./app.page-secure");
var app_routing_1 = require("./app.routing");
var http_1 = require("@angular/http");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var common_1 = require("@angular/common");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_1.routing,
            //CollapseModule.forRoot()
            ng2_bootstrap_1.CollapseModule
        ],
        declarations: [
            app_component_1.AppComponent,
            app_page_default_1.PageDefault,
            app_page_admin_1.PageAdminComponent,
            app_page_assign_roles_1.PageAssignRolesComponent,
            app_page_profile_1.PageProfileComponent,
            app_page_logout_1.PageLogoutComponent,
            app_page_login_1.PageLoginComponent,
            app_page_register_1.PageRegisterComponent,
            app_page_confirm_email_1.PageConfirmEmailComponent,
            app_page_secure_1.PageSecureComponent
        ],
        providers: [app_routing_1.appRoutingProviders, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map