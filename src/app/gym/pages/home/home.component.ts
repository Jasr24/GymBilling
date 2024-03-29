import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  documentTypes: { label: string, name: string }[] = [];
  form: FormGroup = this.fb.group({});

  constructor ( private snack: MatSnackBar,
                private router: Router,                
                private fb: FormBuilder,
                private toastr: ToastrService,
                private spinner: NgxSpinnerService
              ){}

  ngOnInit() {
    //this.documentTypes = this.documentService.getDocumentTypes();
    this.documentTypes = [
      {
        label : "CC",
        name : "Cedula de ciudadanía"
      },
      {
        label : "TI",
        name : "Targeta de identidad"
      },
      
      {
        label : "NN",
        name : "Otro"
      }
    ];

    this.form = this.fb.group({
      document: [ '', Validators.required],
      documentType: [this.documentTypes[0]?.label || '', Validators.required]
    });
  }

  formSubmit() {

    this.form.markAllAsTouched();
    const documentValue = this.form.get('document')?.value;
    if (documentValue != null) {
      this.form.get('document')?.setValue(documentValue.trim());
    }

    if(this.form.invalid)
      return; 
      
      this.spinner.show();
      setTimeout(() => {
        this.toastr.success('Este es un comentario especial', 'Tarea Completada');
        console.log("😁😘💕😂😊😍🤣😒Por desarrollo")
        this.spinner.hide();
      }, 1500); // 3000 milisegundos = 3 segundos
  }
  
  accep(){
    console.log("😂💕😂💕😂💕😂💕😂💕 Por desarrollo")
  }

  login(){
    this.router.navigate(['/login']);
  }
}
