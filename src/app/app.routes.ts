import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminInicioComponent } from './components/admin-inicio/admin-inicio.component';
import { GestionBrigadasComponent } from './components/gestion-brigadas/gestion-brigadas.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin',
    component: AdminInicioComponent,
    children: [
      { path: 'brigadas', component: GestionBrigadasComponent },
      { path: '', redirectTo: 'brigadas', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
