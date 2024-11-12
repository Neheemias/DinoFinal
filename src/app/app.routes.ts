import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { homeGuard } from './guards/home.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
    canActivate: [loginGuard]
  },
  {
    path: 'map',
    loadComponent: () => import('./pages/map/map.page').then( m => m.MapPage),
  },
  {
    path: 'theme',
    loadComponent: () => import('./pages/theme/theme.page').then( m => m.ThemePage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'correo',
    loadComponent: () => import('./pages/correo/correo.page').then( m => m.CorreoPage)
  },
  {
    path: 'correcto',
    loadComponent: () => import('./pages/correcto/correcto.page').then( m => m.CorrectoPage)
  },
  {
    path: 'foro',
    loadComponent: () => import('./pages/foro/foro.page').then( m => m.ForoPage)
  },
  {
    path: 'correo',
    loadComponent: () => import('./pages/correo/correo.page').then( m => m.CorreoPage)
  },
  {
    path: 'incorrecto',
    loadComponent: () => import('./pages/incorrecto/incorrecto.page').then( m => m.IncorrectoPage)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'leerqr',
    loadComponent: () => import('./pages/leerqr/leerqr.page').then( m => m.LeerqrPage)
  },
  {
    path: 'miclase',
    loadComponent: () => import('./pages/miclase/miclase.page').then( m => m.MiclasePage)
  },
  //no estaba
  {
    path: 'mis-datos',
    loadComponent: () => import('./pages/mis-datos/mis-datos.page').then( m => m.MisDatosPage)
  },
  {
    path: 'preguntas',
    loadComponent: () => import('./pages/preguntas/preguntas.page').then( m => m.PreguntasPage)
  },
  

];
