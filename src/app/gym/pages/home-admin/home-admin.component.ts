import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {

  public datosAdministrador: any;

  constructor ( private snack: MatSnackBar,
    private router: Router,                
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit() {
    //this.datosAdministrador = servicio para traer la data;
    this.datosAdministrador = {
      nombre: "José Andres Saavedra Romero",
      tipoDocumento: "Cedula de ciudadanía",
      identificacion: 1106785681
    }
  }

}
