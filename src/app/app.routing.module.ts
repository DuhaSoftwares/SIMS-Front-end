import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { AuthenticationComponent } from './main/authentication/authentication.component';
import { SignInComponent } from './main/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './main/authentication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './main/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './main/authentication/reset-password/reset-password.component';
import { LockScreenComponent } from './main/authentication/lock-screen/lock-screen.component';
import { ConfirmEmailComponent } from './main/authentication/confirm-email/confirm-email.component';
import { LogoutComponent } from './main/authentication/logout/logout.component';
import { NotFoundComponent } from './internal-components/not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { RoleTypeSM } from './models/service-models/app/enums/role-type-s-m.enum';
import { WarehouseComponent } from './main/warehouse/warehouse.component';

export const routes: Routes = [
  { path: '', redirectTo: 'authentication', pathMatch: 'full' },
  {
    path: 'authentication',
    component: AuthenticationComponent,
    children: [
        {path: '', component: SignInComponent},
        {path: 'sign-up', component: SignUpComponent},
        {path: 'forgot-password', component: ForgotPasswordComponent},
        {path: 'reset-password', component: ResetPasswordComponent},
        {path: 'lock-screen', component: LockScreenComponent},
        {path: 'confirm-email', component: ConfirmEmailComponent},
        {path: 'logout', component: LogoutComponent}
    ]
},
  {path:'dashboard',component:DashboardComponent, canActivate: [AuthGuard],
       data: {
      allowedRole: [RoleTypeSM.SystemAdmin, RoleTypeSM.SuperAdmin, RoleTypeSM.CompanyAdmin]
    },
  },
  {path:'warehouse',component:WarehouseComponent, canActivate: [AuthGuard],
    data: {
   allowedRole: [RoleTypeSM.SystemAdmin, RoleTypeSM.SuperAdmin, RoleTypeSM.CompanyAdmin]
 },
},
  {path: '**', component: NotFoundComponent}
  // {
  //   path: "dashboard",
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     allowedRole: [RoleTypeSM.ClientAdmin, RoleTypeSM.ClientEmployee],
  //     moduleName: ModuleNameSM.DashBoard,
  //     permissionType: [PermissionType.view]

  //   },
  // },

  // { path: '**', pathMatch: 'full', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
