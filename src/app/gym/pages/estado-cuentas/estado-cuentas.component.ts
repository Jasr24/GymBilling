import { Component, OnInit } from '@angular/core';
import { Base } from '../../components/base.class';
import { ClienteResponseI } from '../../interfaces/DataBaseResponse';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataGenericService } from 'src/app/services/data/data.generic.service';
import { ModalAlert } from '../../components/modals/modal.alert/modal.alert.component';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarClienteComponent } from '../registrar-cliente/registrar-cliente.component';

@Component({
  selector: 'app-estado-cuentas',
  templateUrl: './estado-cuentas.component.html',
  styleUrls: ['./estado-cuentas.component.css']
})
export class EstadoCuentasComponent extends Base implements OnInit{

  dtList: ClienteResponseI[] = [];

  nameColumns = [
    //"Id",
    "Nombre",
    "Apellido",
    "Tipo identificacion",
    "Identificación",
    "Teléfono",
    "Email",
    "Estado",
    "Observaciones",
    "Acciones"
  ]

  attrData= [
    //"id",
    "nombres",
    "apellidos",
    "documentos_id",
    "identificacion",
    "telefono",
    "email",
    "estado",
    "nota",
    "opciones"
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
            console.log(r.data)
            this.dtList = r.data.map((cliente: ClienteResponseI) => {
              if(cliente.estado == 1){
                cliente.estado = "Activo"
              } else {
                cliente.estado = "Inactivo"
              }
              return {
                ...cliente,
                opciones: [
                  {
                    id: 1,
                    icon: "visibility",
                    class: "btn-view",
                    tool_tip: "Ver",
                  },
                  {
                    id: 2,
                    icon: "edit",
                    class: "btn-edit",
                    tool_tip: "Editar",
                  },
                  {
                    id: 3,
                    icon: "delete",
                    class: "btn-delete",
                    tool_tip: "Eliminar",
                  }
                ]
              };
            });
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

  action($event: any){
    if($event.id == 1){
      console.log("Ver")
    } else if ($event.id == 2){
      this.dialog.open(RegistrarClienteComponent, {
        disableClose: true,
        data: {
          data : $event.data
        }
      }).afterClosed().subscribe(result => {
        console.log(result)
      });
    } else if ($event.id == 3){
      console.log("Eliminar")
    }
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
