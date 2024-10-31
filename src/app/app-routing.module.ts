import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { AuthenticationComponent } from './components/main/authentication/authentication.component';
import { ConfirmEmailComponent } from './components/main/authentication/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './components/main/authentication/forgot-password/forgot-password.component';
import { LockScreenComponent } from './components/main/authentication/lock-screen/lock-screen.component';
import { LogoutComponent } from './components/main/authentication/logout/logout.component';
import { ResetPasswordComponent } from './components/main/authentication/reset-password/reset-password.component';
import { SignInComponent } from './components/main/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './components/main/authentication/sign-up/sign-up.component';
import { WarehouseComponent } from './components/main/warehouse/warehouse.component';
import { AuthGuard } from './guard/auth.guard';
import { RoleTypeSM } from './models/service-models/app/enums/role-type-s-m.enum';
import { NotFoundComponent } from './components/internal/not-found/not-found.component';

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
  {
    path: '', loadChildren: () => import('../app/components/main/product/product.module').then(m => m.ProductModule), canActivate: [AuthGuard],
    data: {
      allowedRole: [RoleTypeSM.SystemAdmin, RoleTypeSM.SuperAdmin, RoleTypeSM.CompanyAdmin]
    }
  },
  { path: '', loadChildren: () => import('../app/components/main/people/people.module').then(m => m.PeopleModule), canActivate: [AuthGuard],
    data: {
      allowedRole: [RoleTypeSM.SystemAdmin, RoleTypeSM.SuperAdmin, RoleTypeSM.CompanyAdmin]
    } },

  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class AppRoutingModule {}
