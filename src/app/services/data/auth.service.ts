import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    constructor() { }
  
    isLoggedIn(): boolean {
      return !!localStorage.getItem('usuario');
    }
  
    saveLogin(token: any): void {
      localStorage.setItem('usuario', token);
    }
  
    logout(): void {
      localStorage.removeItem('usuario');
    }
  }