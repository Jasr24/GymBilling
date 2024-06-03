import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Base } from '../../components/base.class';
import { GenericI } from 'src/app/models/models';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataGenericService } from 'src/app/services/data/data.generic.service';
import { ModalAlert } from '../../components/modals/modal.alert/modal.alert.component';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent extends Base {

  public isDialog = false;
  public form!: FormGroup; //Se pono el !, para asegurarle a typescriupt que lo inicializaremos en el constructor.

  public estados: GenericI[] = [
    {id : 1, abrev : "Activo", label : "Activo"},
    {id : 2, abrev : "Inactivo", label : "Inactivo"}
  ];
  public tipoDocumentos: GenericI[] = [
    {id : 1, abrev : "Cedula coidadanía", nombre : "CC"},
    {id : 2, abrev : "Targeta identidad", nombre : "TI"}
  ]

  public estadoControl: FormControl = new FormControl(); // Nuevo FormControl para manejar el valor
  public tipoDocumentControl: FormControl = new FormControl(); // Nuevo FormControl para manejar el valor

  
  constructor(
    @Optional() public dialogRef: MatDialogRef<RegistrarClienteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private dataGenericService: DataGenericService,
    public dialog: MatDialog
  ) {
    super()
    this.initForm();
    this.obtenerTiposDocumentos();
    if(data){
      this.isDialog = true;
    }
  }

  initForm() {
    this.form = this.fb.group({
      //id: [0],
      nombres: ["", [Validators.required]],
      apellidos: ["", [Validators.required]],
      documento_id: ["", [Validators.required]],
      identificacion: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      telefono: ["", [Validators.required]],
      nota: ["", []],
      estado: ["", [Validators.required]]
    });
    this.estadoControl = this.form.get('estado') as FormControl || new FormControl();
    this.tipoDocumentControl = this.form.get('documento_id') as FormControl || new FormControl();
  }

  obtenerTiposDocumentos(){
    this.spinner.show();
    setTimeout(() => {
      try {
        this.dataGenericService.obtenerTodosDatosTable("tipos_documentos").subscribe(r => {
          this.spinner.hide();
          if (r.success) {
            this.tipoDocumentos = r.data
            if(this.data && this.data.data){
              this.loadData(this.data.data);
            }
          } else {
            this.openDialogs('Error', 'Ha ocurrido un error, por favor inténtelo nuevamente más tarde.', 2);
          }
        },
        error => {
          console.error('Ha ocurrido un error en la solicitud:', error);
          this.spinner.hide();
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

  private loadData(data: any): void {
    let tipoIdentificacion = 0;
    const documento = this.tipoDocumentos.find(doc => doc.nombre === data.documento_id);
    if (documento) {
        tipoIdentificacion = documento.id;
    }
    var estado = 0;
    if(data.estado == "Activo"){
      estado = 1;
    } else {
      estado = 2;
    }
    this.form.patchValue({
      nombres: data.nombres,
      apellidos: data.apellidos,
      documento_id: tipoIdentificacion,
      identificacion: data.identificacion,
      email: data.email,
      telefono: data.telefono,
      nota: data.nota,
      estado: estado
    });
  }

  clickCA() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.openDialogs('Advertencia', 'Por favor, complete todos los campos requeridos.', 3);
      return;
    } else {
      if(this.data && this.data.data){
        //Actualizar cliente
      } else {
        //Crear cliente
        this.spinner.show();
        setTimeout(() => {
          try {

            const jsonreques = {
              table: "clientes",
              data: this.form.value
            }

            this.dataGenericService.createElementoTable(jsonreques).subscribe(r => {
              this.spinner.hide();
              if (r.success) {
                this.form.reset();
                this.openDialogs('Wow!!!', 'Cliente creado con éxito.', 1);
              } else {
                this.openDialogs('Error', 'Ha ocurrido un error, por favor inténtelo nuevamente más tarde.', 2);
              }
            },
            error => {
              console.error('Ha ocurrido un error en la solicitud:', error);
              this.spinner.hide();
              this.openDialogs('Error', 'Ha ocurrido un error en la solicitud, por favor inténtelo nuevamente más tarde.', 2);
            });
          } catch (err) {
            console.log(err)
          }
        }, 1500);
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}