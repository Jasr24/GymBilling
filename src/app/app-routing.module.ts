import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './gym/pages/login/login.component';
import { HomeComponent } from './gym/pages/home/home.component';
import { HomeAdminComponent } from './gym/pages/home-admin/home-admin.component';
import { RegistrarClienteComponent } from './gym/pages/registrar-cliente/registrar-cliente.component';
import { RegistroPagosComponent } from './gym/pages/registro-pagos/registro-pagos.component';
import { ReportesComponent } from './gym/pages/reportes/reportes.component';
import { EstadoCuentasComponent } from './gym/pages/estado-cuentas/estado-cuentas.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    children: [
      {
        path: 'home',
        component: HomeAdminComponent
      },
      {
        path: 'registrar-cliente',
        component: RegistrarClienteComponent
      },
      {
        path: 'registro-pagos',
        component: RegistroPagosComponent
      },
      {
        path: 'reportes',
        component: ReportesComponent
      },
      {
        path: 'estado-cuentas',
        component: EstadoCuentasComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
