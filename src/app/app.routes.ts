import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminInicioComponent } from './components/admin-inicio/admin-inicio.component';
import { GestionBrigadasComponent } from './components/gestion-brigadas/gestion-brigadas.component';
import { CrearBrigadaComponent } from './components/crear-brigada/crear-brigada.component';
import { GestionPersonalComponent } from './components/gestion-personal/gestion-personal.component';
import { ActualizarBrigadistaComponent } from './components/actualizar-brigadista/actualizar-brigadista.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ActualizarBrigadaComponent } from './components/actualizar-brigada/actualizar-brigada.component'; // 👈 Agregar esta línea

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin',
    component: AdminInicioComponent,
    children: [
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      { path: 'brigadas', component: GestionBrigadasComponent },
      { path: 'crear-brigada', component: CrearBrigadaComponent },
      { path: 'actualizar-brigada', component: ActualizarBrigadaComponent }, // 👈 Ruta agregada
      { path: 'personal', component: GestionPersonalComponent },
      { path: 'personal/actualizar', component: ActualizarBrigadistaComponent },
      { path: 'novedades', component: NovedadesComponent },
      { path: 'calendario', component: CalendarioComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
