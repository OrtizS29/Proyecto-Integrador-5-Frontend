import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminInicioComponent } from './layouts/admin-inicio/admin-inicio.component';
import { BrigadistaContactoComponent } from './components/brigadista-contacto/brigadista-contacto.component';
import { BrigadistaTituloComponent } from './components/brigadista-titulo/brigadista-titulo.component';
import { GestionBrigadasComponent } from './components/gestion-brigadas/gestion-brigadas.component';
import { CrearBrigadaComponent } from './components/crear-brigada/crear-brigada.component';
import { GestionPersonalComponent } from './components/gestion-personal/gestion-personal.component';
import { ActualizarBrigadistaComponent } from './components/actualizar-brigadista/actualizar-brigadista.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ActualizarBrigadaComponent } from './components/actualizar-brigada/actualizar-brigada.component'; // 👈 Agregar esta línea
import { RegistroComponent } from './registro/registro.component';
import { UsuarioLayoutComponent } from './layouts/usuario-layout/usuario-layout.component';
import { ActualizarDatosComponent } from './components/actualizar-datos/actualizar-datos.component';
import { PostularseComponent } from './components/postularse/postularse.component';
import { PendientePostulacionComponent } from './components/pendiente-postulacion/pendiente-postulacion.component';
import { GestionPostulacionesComponent } from './components/gestion-postulaciones/gestion-postulaciones.component';
import { AgregarNovedadComponent } from './components/agregar-novedad/agregar-novedad.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'admin',
    component: AdminInicioComponent,
    children: [
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      { path: 'brigadista-contacto', component: BrigadistaContactoComponent },
      { path: 'brigadista-titulo', component: BrigadistaTituloComponent },
      { path: 'brigadas', component: GestionBrigadasComponent },
      { path: 'crear-brigada', component: CrearBrigadaComponent },
      { path: 'actualizar-brigada', component: ActualizarBrigadaComponent },
      { path: 'personal', component: GestionPersonalComponent },
      { path: 'personal/actualizar', component: ActualizarBrigadistaComponent },
      { path: 'personal-dialog/:id', loadComponent: () => import('./components/personal-dialog/personal-dialog.component').then(m => m.PersonalDialogComponent) }, // 👈 esta es la nueva
      { path: 'novedades', component: NovedadesComponent },
      { path: 'calendario', component: CalendarioComponent },
      { path: 'gestion-postulaciones/:idBrigada', component: GestionPostulacionesComponent },
      { path: 'agregar-novedad', component: AgregarNovedadComponent }
    ]
  },
  {
    path: 'usuario',
    component: UsuarioLayoutComponent,
    children:[

      {path: '', redirectTo: 'usuario', pathMatch: 'full'},
      {path: 'actualizar-datos', component: ActualizarDatosComponent},
      {path: 'postularse', component: PostularseComponent},
      {path: 'pendiente-postulacion', component: PendientePostulacionComponent},
      { path: 'registrar-usuario', loadComponent: () => import('./components/registrar-usuario/registrar-usuario.component').then(m => m.RegistrarUsuarioComponent) },
      { path: 'actualizar-usuario', loadComponent: () => import('./components/actualizar-usuario/actualizar-usuario.component').then(m => m.ActualizarUsuarioComponent) }


    ]

  },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

