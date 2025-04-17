import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminInicioComponent } from './components/admin-inicio/admin-inicio.component';
import { GestionBrigadasComponent } from './components/gestion-brigadas/gestion-brigadas.component';
import { CrearBrigadaComponent } from './components/crear-brigada/crear-brigada.component';
import { GestionPersonalComponent } from './components/gestion-personal/gestion-personal.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { CalendarioComponent } from './components/calendario/calendario.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin',
    component: AdminInicioComponent,
    children: [
      { path: '', redirectTo: 'brigadas', pathMatch: 'full' }, // Redirección por defecto
      { path: 'brigadas', component: GestionBrigadasComponent },
      { path: 'crear-brigada', component: CrearBrigadaComponent }, // Redireccion a la creacion de brigadas
      { path: '', redirectTo: 'brigadas', pathMatch: 'full' },
      { path: 'personal', component: GestionPersonalComponent },
      { path: 'novedades', component: NovedadesComponent },
      { path: 'calendario', component: CalendarioComponent } // Ruta para calendario
    ]
  },
  { path: '**', redirectTo: '' } // Redirección en caso de ruta no encontrada
];
