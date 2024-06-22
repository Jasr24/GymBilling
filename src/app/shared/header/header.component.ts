import { AfterViewChecked, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/services/data/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  AfterViewChecked{

  @Input() isHome: boolean = false;
  @Input() isLogin: boolean = false;
  @Input() menu: boolean = false;

  @ViewChild
  (MatSidenav)

  viewSidenav!: MatSidenav;
  public filasMenu: any;

  constructor(private router: Router,        
              private location: Location,        
              private spinner: NgxSpinnerService,
              private cdRef:ChangeDetectorRef,
              private authService: AuthService,
              private observer: BreakpointObserver,
            ){
              this.filasMenu = [
                {
                  ruta: "/admin/home",
                  nombreRuta: "Inicio"
                },
                {
                  ruta: "/admin/registrar-cliente",
                  nombreRuta: "Registrar cliente"
                },
                {
                  ruta: "/admin/registro-pagos",
                  nombreRuta: "Registro pagos"
                },
                {
                  ruta: "/admin/reportes",
                  nombreRuta: "Reportes"
                },
                {
                  ruta: "/admin/estado-cuentas",
                  nombreRuta: "Estado cuentas"
                },
                {
                  ruta: "/login",
                  nombreRuta: "Cerrar sesión"
                }
              ]
            }


  ngAfterViewChecked(): void {    
    this.observer.observe(['(max-width: 600px)']).subscribe((res) => {
      if (res.matches) {
        this.viewSidenav.mode = 'over';
      } else {
        this.viewSidenav.mode = 'side';
      }
    });
    this.cdRef.detectChanges();
  }
  

  login(){
    this.router.navigate(['/login']);
  }

  onLogoutClick(item: any) {
    console.log(item)
     if (item.nombreRuta === "Cerrar sesión") {
       this.logout();
     }
     this.viewSidenav.close(); 
  }
  
  logout(){
    this.authService.logout()
    this.router.navigate(['/login']);
    this.menu = false;
  }

  back(){
    this.router.navigate(['/admin/home']);
  }

  calcel() {
    this.location.back();
  }
}
