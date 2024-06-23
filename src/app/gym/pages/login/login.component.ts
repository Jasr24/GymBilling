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

  pantalla = 1;
  title = "Iniciar sesión"
  buttonSend = "Ingresar"

  form: FormGroup = this.fb.group({
    user: [ '', Validators.required ],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    passwordTemporal: ['', Validators.required]
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
    
    var usuario = this.form.get('user')?.value
    var contraseña = this.form.get('password')?.value
    var confirmPassword = this.form.get('confirmPassword')?.value
    var passwordTemporal = this.form.get('passwordTemporal')?.value

    if(this.pantalla == 1 && usuario && contraseña){
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
    } else if (this.pantalla == 2 && usuario){

      this.spinner.show();
      const json = {
        usuario: usuario
      }
      try {
        this.dataService.codigoRecuperarContraseña(json).subscribe(r => {
          this.spinner.hide();
          if (r.success && r.status == 1) {
            this.dialog.open(ModalAlert, {
              disableClose: true,
              data: {
                title: "Envío Contraseña temporal",
                message: "Se ha enviado una contraseña temporal a su correo, la cual es requerida para restablecer la actual.",
                type: 1
              }
            }).afterClosed().subscribe(result => {
              this.pantalla = 3;
              this.buttonSend = "Restablecer"
              this.clearErrors()
            });
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
    } else {
      if (contraseña && confirmPassword && passwordTemporal) {
        if(contraseña == confirmPassword){
          try {
            const json = {
              usuario: usuario,
              contraseña: contraseña,
              contraseñaTemporal: passwordTemporal
            }
            this.dataService.cambiarContraseñacodigo(json).subscribe(r => {
              this.spinner.hide();
              if (r.success && r.status == 1) {
                this.dialog.open(ModalAlert, {
                  disableClose: true,
                  data: {
                    title: "Constraseña restablecida",
                    message: "Se ha cambiado la contraseña exitosamente.",
                    type: 1
                  }
                }).afterClosed().subscribe(result => {
                  window.location.reload();
                });
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
        } else {
          this.openDialogs('Advertencia', 'Las contraseñas no coinciden, por favor intente de nuevo.', 3);
        }
      }
    }
  }
  
  calcel() {
    if (this.pantalla == 1) {
      this.router.navigate(['/home']);
    } else {
      this.pantalla = 1;
      this.title = "Iniciar sesión"
      this.buttonSend = "Ingresar"
    }
  }

  forgot(){
    this.clearErrors()
    this.pantalla = 2;
    this.title = "Recuperar contraseña"
    this.buttonSend = "Recuperar"
  }

  clearErrors() {
      this.form.markAsPristine();
      this.form.markAsUntouched();
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.setErrors(null);
      });
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
