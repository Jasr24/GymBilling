import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Base } from '../../components/base.class';
import { GenericI } from 'src/app/models/models';

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
    {id : 0, abrev : "Inactivo", label : "Inactivo"}
  ];
  public tipoDocumentos: GenericI[] = [
    {id : 1, abrev : "Cedula coidadanía", label : "CC"},
    {id : 0, abrev : "Targeta identidad", label : "TI"}
  ]

  public estadoControl: FormControl = new FormControl(); // Nuevo FormControl para manejar el valor
  public tipoDocumentControl: FormControl = new FormControl(); // Nuevo FormControl para manejar el valor

  
  constructor(
    @Optional() public dialogRef: MatDialogRef<RegistrarClienteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    super()
    this.initForm();
    if(data){
      this.isDialog = true;
    }
    console.log(this.isDialog)
  }

  initForm() {
    this.form = this.fb.group({
      //id: [0],
      nombres: ["", [Validators.required]],
      apellidos: ["", [Validators.required]],
      tipo_documento: ["", [Validators.required]],
      numero_documento: ["", [Validators.required, Validators.minLength(5)]],
      correo: ["", [Validators.required, Validators.email]],
      celular: ["", [Validators.required]],
      estado: ["", [Validators.required]]
    });
    this.estadoControl = this.form.get('estado') as FormControl || new FormControl();
    this.tipoDocumentControl = this.form.get('tipo_documento') as FormControl || new FormControl();
  }


  clickCA() {

  }

  close(): void {
    this.dialogRef.close();
  }
}