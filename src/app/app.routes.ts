import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminInicioComponent } from './components/admin-inicio/admin-inicio.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin-inicio', component: AdminInicioComponent }
];
