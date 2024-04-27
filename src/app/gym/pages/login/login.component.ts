import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup = this.fb.group({
    user: [ '', Validators.required ],
    password: ['', Validators.required]
  });
    
  constructor ( private snack: MatSnackBar,
                private router: Router,                
                private location: Location,
                private toastr: ToastrService,
                private fb: FormBuilder,
                private spinner: NgxSpinnerService) {}

  formSubmit() {

    this.form.markAllAsTouched();
    this.form.get('user')?.setValue(this.form.get('user')?.value.trim())
    this.form.get('password')?.setValue(this.form.get('password')?.value.trim())

    if(this.form.invalid)
      return; 
     
     this.spinner.show();
     setTimeout(() => {
      this.toastr.success('Este es un comentario especial', 'Tarea Completada');
      console.log("😁😘💕😂😊😍🤣😒Por desarrollo")
      this.spinner.hide();
      this.router.navigate(['/admin/home']);
    }, 1500); // 3000 milisegundos = 3 segundos
     
  }
  
  calcel() {
    this.router.navigate(['/home']);
  }
}
