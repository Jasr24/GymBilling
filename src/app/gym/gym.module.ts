import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './pages/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { RegistrarClienteComponent } from './pages/registrar-cliente/registrar-cliente.component';
import { RegistroPagosComponent } from './pages/registro-pagos/registro-pagos.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { EstadoCuentasComponent } from './pages/estado-cuentas/estado-cuentas.component';
import { SelectSearchComponent } from './components/select.search/select.search.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ModalAlert } from './components/modals/modal.alert/modal.alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DataTableComponent } from './components/data.table/data.table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    HomeAdminComponent,
    RegistrarClienteComponent,
    RegistroPagosComponent,
    ReportesComponent,
    EstadoCuentasComponent,
    SelectSearchComponent,
    ModalAlert,
    DataTableComponent
  ],
  exports: [
    NgxSpinnerModule
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSnackBarModule,
    MatInputModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxMatSelectSearchModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class GymModule { }
