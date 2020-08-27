import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {hybridRoutes} from './routes/routes.conf';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  ...hybridRoutes.getRoutes()
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
