import { VerifyOTPComponent } from './authentication/verify-otp/verify-otp.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { CreateAccountComponent } from './authentication/create-account/create-account.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/forgot-password/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'createAccount',
        component: CreateAccountComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: 'verify-otp',
        component: VerifyOTPComponent
      },
      {
        path: 'logout/:status',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    redirectTo: 'authentication/login',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
