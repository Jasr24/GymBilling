import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlert } from '../../components/modals/modal.alert/modal.alert.component';
import { AuthService } from 'src/app/services/data/auth.service';

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
    
  constructor ( 
    private snack: MatSnackBar,
    private router: Router,                
    private location: Location,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private dataService: DataService,
    private authService: AuthService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}

  formSubmit() {

    this.form.markAllAsTouched();
    
    if(this.form.invalid)
      return; 
     
    var usuario = this.form.get('user')?.value
    var contraseña = this.form.get('password')?.value
    const json = {
      usuario: usuario,
      contraseña: contraseña
    }

    this.spinner.show();

    try {
      this.dataService.login(json).subscribe(r => {
        this.spinner.hide();
        if (r.success && r.status == 1) {
          this.authService.saveLogin(r.data)
          this.router.navigate(['/admin/home']);
        } else {
          if (r.status == 0){
            this.openDialogs('Error', r.message, 2);
          } else {
            this.openDialogs('Error', 'Ha ocurrido un error, por favor inténtelo nuevamente más tarde.', 2);
          }
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
  }
  
  calcel() {
    this.router.navigate(['/home']);
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, ''); // Remover caracteres no numéricos
    this.form.get('user')?.patchValue(value); // Actualizar el valor del formulario
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
