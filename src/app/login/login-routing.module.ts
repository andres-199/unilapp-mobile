import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutGuard } from '../guards/logout.guard';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  {
    path: 'forgotten-password',
    loadChildren: () =>
      import('./forgotten-password/forgotten-password.module').then(
        (m) => m.ForgottenPasswordPageModule
      ),
    canActivate: [LogoutGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
