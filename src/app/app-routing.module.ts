import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    canActivate: [GuardService],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'colors',
    canActivate: [GuardService],
    loadChildren: () => import('./pages/colors/colors.module').then(m => m.ColorsModule)
  },
  {
    path: 'inventario',
    canActivate: [GuardService],
    loadChildren: () => import('./pages/inventario/inventario.module').then(m => m.InventarioModule)
  },
  {
    path: 'producto',
    canActivate: [GuardService],
    loadChildren: () => import('./pages/producto/producto.module').then(m => m.ProductoModule)
  },
  {
    path: 'operacion',
    canActivate: [GuardService],
    loadChildren: () => import('./pages/operaciones/operaciones.module').then(m => m.OperacionesModule)
  },
  {
    path: 'reporte',
    canActivate: [GuardService],
    loadChildren: () => import('./pages/reportes/reportes.module').then(m => m.ReportesModule)
  },
  {
    path: 'colors/:id',
    loadChildren: () => import('./pages/colors/color-detail/color-detail.module').then(m => m.ColorDetailModule)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
