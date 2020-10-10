import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { CreateAccountComponent } from './authentication/create-account/create-account.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';

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
