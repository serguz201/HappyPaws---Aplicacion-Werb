import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginService } from './services/login.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDatepickerModule, //fecha
    MatNativeDateModule, //fecha
    MatButtonModule,
    RouterLink,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HappyPawsAngular';

  role: string = '';
  constructor(private loginService: LoginService) {}

  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    if (typeof sessionStorage !== 'undefined') {
        this.role = this.loginService.showRole();
        return this.loginService.verificar();
    }
    return false;
}
  
  isCustomer() {
    return this.role === 'CLIENTE';
  }

  isAdmin() {
    return this.role === 'ADMINISTRADOR';
  }

  isAlbergue() {
    return this.role === 'ALBERGUE';
  }
}
