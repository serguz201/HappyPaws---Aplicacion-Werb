import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users.service';
import { Notificacion } from '../../../models/Notificacion';
import { NotificacionService } from '../../../services/notificacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditanotificacion',
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
  templateUrl: './creaeditanotificacion.component.html',
  styleUrl: './creaeditanotificacion.component.css'
})
export class CreaeditanotificacionComponent implements OnInit {
  form:FormGroup=new FormGroup({});
  notificacion: Notificacion = new Notificacion();
  id:number=0
  edicion:boolean=false
  listaTipos:{value:string, viewValue:string}[]=[
    {value:'Urgente',viewValue:'Urgente'},
    {value:'Mensaje',viewValue:'Mensaje'},
  ]
  listaUsuarios: Users[] = []
  constructor(
    public snackBar: MatSnackBar,
    private nS: NotificacionService, 
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private uS: UsersService,
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id = data['id'];
      this.edicion = data['id']!=null
      this.init()
    })
    
      this.form = this.formBuilder.group({
        hcodigo:[''],
        hmensaje:['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        hemisor:['',Validators.required],
        htipo:['',Validators.required],
        huser:['', Validators.required],
      })
      this.uS.list().subscribe((data) => {
        this.listaUsuarios = data;
      });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.notificacion.idNotificacion = this.form.value.hcodigo;
      this.notificacion.mensaje = this.form.value.hmensaje;
      this.notificacion.idEmisor = this.form.value.hemisor;
      this.notificacion.tipo = this.form.value.htipo;
      this.notificacion.users.id = this.form.value.huser;

      if (this.edicion) {
        this.nS.update(this.notificacion).subscribe(() => {
          this.nS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idNotificacion- b.idNotificacion);
            this.nS.setList(sortedData);
          });
        });
        this.snackBar.open('Edicion exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      } else {
        this.nS.insert(this.notificacion).subscribe(() => {
          this.nS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idNotificacion - b.idNotificacion);
            this.nS.setList(sortedData);
          });
        });
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
      this.router.navigate(['notificaciones']);
    }
  }
  init(){
    if (this.edicion) {
      this.nS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idNotificacion),
          hmensaje: new FormControl(data.mensaje),
          hemisor: new FormControl(data.idEmisor),
          htipo: new FormControl(data.tipo),
          huser: new FormControl(data.users.id),
        });
      });
    }
  }
}