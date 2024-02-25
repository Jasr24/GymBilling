import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() isHome: boolean = false;
  @Input() isLogin: boolean = false;

  constructor(private router: Router,        
              private location: Location,        
              private spinner: NgxSpinnerService
            ){}


  login(){
    this.router.navigate(['/login']);
  }

  calcel() {
    this.location.back();
  }
}
