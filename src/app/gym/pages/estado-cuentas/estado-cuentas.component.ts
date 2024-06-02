import { Component, OnInit } from '@angular/core';
import { Base } from '../../components/base.class';
import { ClienteResponseI } from '../../interfaces/DataBaseResponse';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataGenericService } from 'src/app/services/data/data.generic.service';
import { ModalAlert } from '../../components/modals/modal.alert/modal.alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-estado-cuentas',
  templateUrl: './estado-cuentas.component.html',
  styleUrls: ['./estado-cuentas.component.css']
})
export class EstadoCuentasComponent extends Base implements OnInit{

  dtList: ClienteResponseI[] = [];

  nameColumns = [
    "Id",
    "Nombres",
    "Apellidos",
    "Tipo identificacion",
    "Identificación",
    "Teléfono",
    "Email",
    "Estado",
    "Observaciones"
  ]

  attrData= [
    "id",
    "nombres",
    "apellidos",
    "documentos_id",
    "identificacion",
    "telefono",
    "email",
    "estado",
    "nota"
  ]

  constructor(
    private spinner: NgxSpinnerService,
    private DataGenericService: DataGenericService,
    public dialog: MatDialog
  ){
    super();
    this.obtenerClientes()
  }

  ngOnInit(): void {}

  obtenerClientes(){
    this.spinner.show();
    setTimeout(() => {
      try {
        this.DataGenericService.obtenerTodosDatosTable("clientes").subscribe(r => {
          console.log(r)
          this.spinner.hide();
          if (r.success) {
            this.dtList = r.data
          } else {
            this.openDialogs('Error', 'Ha ocurrido un error, por favor inténtelo nuevamente más tarde.', 2);
          }
        },
        error => {
          this.spinner.hide();
          console.error('Ha ocurrido un error en la solicitud:', error);
          this.openDialogs('Error', 'Ha ocurrido un error en la solicitud, por favor inténtelo nuevamente más tarde.', 2);
        });
      } catch (err) {
        console.log(err)
      }
    }, 1500);
  }

  openDialogs(title: String, message: String, type: number): void {
    this.dialog.open(ModalAlert, {
      disableClose: true,
      data: {
        title: title,
        message: message,
        type: type
      }
    }).afterClosed().subscribe(result => {
    });
  }
}
