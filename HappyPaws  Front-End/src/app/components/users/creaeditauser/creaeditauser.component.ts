import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-creaeditauser',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './creaeditauser.component.html',
  styleUrl: './creaeditauser.component.css'
})
export class CreaeditauserComponent implements OnInit {

  form:FormGroup=new FormGroup({});
  user:Users=new Users()
  id:number=0
  edicion:boolean=false

  listaGeneros:{value:string, viewValue:string}[]=[
    {value:'Masculino',viewValue:'Masculino'},
    {value:'Femenino',viewValue:'Femenino'},
  ]
  constructor(
    public snackBar: MatSnackBar,
    private uS:UsersService, 
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id = data['id'];
      this.edicion = data['id']!=null
      this.init()
    })


    this.form=this.formBuilder.group({
      hcodigo:[''],
      hnombre:['',[Validators.required, Validators.minLength(2)]],
      hapellido:['',[Validators.required, Validators.minLength(2)]],
      hemail:['',[Validators.required, Validators.email]],
      hdireccion:['',[Validators.required, Validators.minLength(5)]],
      htelefono:['',[Validators.required, Validators.pattern("^[0-9]+$")]],
      hgenero:['',Validators.required],
      husername:['',[Validators.required, Validators.minLength(2)]],
      hpassword: ['', [Validators.required, Validators.minLength(5)]],
    })
  }
  aceptar():void{
    if(this.form.valid){
      this.user.id=this.form.value.hcodigo
      this.user.nombre=this.form.value.hnombre;
      this.user.apellido=this.form.value.hapellido
      this.user.email=this.form.value.hemail
      this.user.direccion=this.form.value.hdireccion
      this.user.telefono=this.form.value.htelefono
      this.user.genero=this.form.value.hgenero
      this.user.username=this.form.value.husername
      this.user.password=this.form.value.hpassword
      if (this.edicion) {
        this.uS.update(this.user).subscribe(d => {
          this.uS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.id - b.id); 
            this.uS.setList(sortedData); 
          });
        });
        this.snackBar.open('Edición exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      } else {
        this.uS.insert(this.user).subscribe(d => {
          this.uS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.id - b.id); 
            this.uS.setList(sortedData); 
          });
        });
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
      this.router.navigate(['usuarios'])
    }
  }
  init(){
    if(this.edicion){
      this.uS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          hcodigo: new FormControl(data.id),
          hnombre: new FormControl(data.nombre), 
          hapellido: new FormControl(data.apellido), 
          hemail: new FormControl(data.email), 
          hdireccion: new FormControl(data.direccion), 
          htelefono: new FormControl(data.telefono), 
          hgenero: new FormControl(data.genero), 
          husername: new FormControl(data.username), 
          hpassword: new FormControl(data.password)
        });
      });
    }
  }
}
