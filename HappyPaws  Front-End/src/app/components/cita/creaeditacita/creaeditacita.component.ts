import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Albergue } from '../../../models/Albergue';
import { Users } from '../../../models/Users';
import { CitaService } from '../../../services/cita.service';
import { Cita } from '../../../models/Cita';
import { UsersService } from '../../../services/users.service';
import { AlbergueService } from '../../../services/albergue.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditacita',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule],
  templateUrl: './creaeditacita.component.html',
  styleUrl: './creaeditacita.component.css'
})
export class CreaeditacitaComponent implements OnInit {
  form:FormGroup=new FormGroup({});
  cita:Cita=new Cita()
  id:number=0
  edicion:boolean=false

  listaEstados:{value:string, viewValue:string}[]=[
    {value:'Cancelado',viewValue:'Cancelado'},
    {value:'Pendiente',viewValue:'Pendiente'},
    {value:'Realizado',viewValue:'Realizado'},
  ]
  listaTipos:{value:string, viewValue:string}[]=[
    {value:'Adopcion',viewValue:'Adopcion'},
    {value:'Visita',viewValue:'Visita'},
  ]
  listaAlbergues: Albergue[] = []
  listaUsuarios: Users[] = []
  constructor(
    public snackBar: MatSnackBar,
    private cS: CitaService, 
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private aS: AlbergueService,
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
        hfecha:['',[Validators.required, this.fechaValida]],
        hhora: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(0), Validators.max(24)]],
        hestado:['',Validators.required],
        htipo:['',Validators.required],
        hcomentario:['', [Validators.required, Validators.minLength(5)]],
        halbergue:['', Validators.required],
        huser:['', Validators.required],
      })
      this.aS.list().subscribe((data) => {
        this.listaAlbergues = data;
      });
      this.uS.list().subscribe((data) => {
        this.listaUsuarios = data;
      });
  }
  fechaValida(control: { value: string | number | Date; }) {
    const fecha = new Date(control.value);
    const hoy = new Date();
    return fecha > hoy ? null : { fechaInvalida: true };
  }
  aceptar(): void {
    if (this.form.valid) {
      this.cita.idCita = this.form.value.hcodigo;
      this.cita.fechaCita = this.form.value.hfecha;
      this.cita.horaCita = this.form.value.hhora;
      this.cita.estadoCita = this.form.value.hestado;
      this.cita.tipoCita = this.form.value.htipo;
      this.cita.comentarioCita = this.form.value.hcomentario;
      this.cita.albergue.idAlbergue = this.form.value.halbergue;
      this.cita.users.id = this.form.value.huser;

      if (this.edicion) {
        this.cS.update(this.cita).subscribe(() => {
          this.cS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idCita- b.idCita);
            this.cS.setList(sortedData);
          });
        });
        this.snackBar.open('Edición exitosa', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
        });
      } else {
        this.cS.insert(this.cita).subscribe(() => {
          this.cS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idCita - b.idCita);
            this.cS.setList(sortedData);
          });
        });
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }

      this.router.navigate(['citas']);
    }
  }
  init(){
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idCita),
          hfecha: new FormControl(data.fechaCita),
          hhora: new FormControl(data.horaCita),
          hestado: new FormControl(data.estadoCita),
          htipo: new FormControl(data.tipoCita),
          hcomentario: new FormControl(data.comentarioCita),
          halbergue: new FormControl(data.albergue.idAlbergue),
          huser: new FormControl(data.users.id),
        });
      });
    }
  }
}
