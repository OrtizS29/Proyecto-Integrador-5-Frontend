import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminInicioComponent } from './components/admin-inicio/admin-inicio.component';
import { GestionBrigadasComponent } from './components/gestion-brigadas/gestion-brigadas.component';
import { GestionPersonalComponent } from './components/gestion-personal/gestion-personal.component';
import { NovedadesComponent } from './components/novedades/novedades.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin',
    component: AdminInicioComponent,
    children: [
      { path: '', redirectTo: 'brigadas', pathMatch: 'full' }, // Redirección por defecto
      { path: 'brigadas', component: GestionBrigadasComponent },
      { path: 'personal', component: GestionPersonalComponent },
      { path: 'novedades', component: NovedadesComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
