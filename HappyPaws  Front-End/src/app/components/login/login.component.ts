import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtRequest } from '../../models/jwtRequest';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/Users';

import { RoleService } from '../../services/role.service';
import { Role } from '../../models/Role';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule, 
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private uS:UsersService, private route: ActivatedRoute, private formBuilber: FormBuilder,
    private tS: RoleService
  ) {}
  username: string = '';
  password: string = '';
  mensaje: string = '';
  form: FormGroup = new FormGroup({});
  usuario: Users = new Users();
  TiposdeUsuario: Role = new Role();
  usrid:number = 0;
  

  ngOnInit(): void {
    this.form = this.formBuilber.group({
      codigo:[''],
      nombre: ['', Validators.required],
      apellido: [''],
      genero: [''],
      email: ['', Validators.required],
      ultima_ubicacion: [''],
      password: ['', Validators.required],
      enabled: [''],
    });
  }
  aceptar(): void {
    //sessionStorage.clear();
    
    if (this.form.valid) {
      this.usuario.id = this.form.value.id;
      this.usuario.username = this.form.value.username;
      this.usuario.apellido = this.form.value.apellido;
      this.usuario.genero = this.form.value.genero;
      this.usuario.email = this.form.value.email;


      this.usuario.enabled = true;
      
      this.uS.insert(this.usuario).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
        
      });


      this.router.navigate(['login']).then(() => {
        window.location.reload();
      });

    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
      this.snackBar.open(this.mensaje, "Aviso",{duration:2000});

    }
  }

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['homes']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }
  
  insertarrol(iduser:number){

    this.TiposdeUsuario.id = 0;
    this.TiposdeUsuario.rol = 'CUSTOMER';
    this.TiposdeUsuario.user.id = iduser;

    this.tS.insert(this.TiposdeUsuario).subscribe();
    console.log('User ID TU:', this.TiposdeUsuario.user.id);
  }

}