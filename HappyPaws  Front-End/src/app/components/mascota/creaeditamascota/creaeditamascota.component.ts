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
import { AlbergueService } from '../../../services/albergue.service';
import { Mascota } from '../../../models/Mascota';
import { MascotaService } from '../../../services/mascota.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditamascota',
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
  templateUrl: './creaeditamascota.component.html',
  styleUrl: './creaeditamascota.component.css'
})
export class CreaeditamascotaComponent implements OnInit {
  form:FormGroup=new FormGroup({});
  mascota: Mascota=new Mascota()
  id: number=0
  edicion:boolean=false

  listaEstados:{value:string, viewValue:string}[]=[
    {value:'Saludable',viewValue:'Saludable'},
    {value:'Enfermo',viewValue:'Enfermo'},
  ]
  listaAdopciones: { value: boolean, viewValue: string }[] = [
    { value: true, viewValue: 'Adoptado' },
    { value: false, viewValue: 'No Adoptado' }
];
  listaSexos:{value:string, viewValue:string}[]=[
    {value:'Macho',viewValue:'Macho'},
    {value:'Hembra',viewValue:'Hembra'},
  ]
  listaAlbergues: Albergue[] = []
  constructor(
    public snackBar: MatSnackBar,
    private mS: MascotaService,
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private aS: AlbergueService,
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id = data['id'];
      this.edicion = data['id']!=null
      this.init()
    })
    
      this.form = this.formBuilder.group({
        hcodigo:[''],
        hnombre:['',[Validators.required, Validators.minLength(2)]],
        hsexo:['',Validators.required],
        hnacimiento:['',[Validators.required, this.fechaValida]],
        hraza:['',[Validators.required, Validators.minLength(2)]],
        hadopcion:['',Validators.required],
        hfecha:['',[Validators.required, this.fechaValida]],
        hestado:['',Validators.required],
        halbergue:['', Validators.required],
      })
      this.aS.list().subscribe((data) => {
        this.listaAlbergues = data;
      });
  }
  fechaValida(control: { value: string | number | Date; }) {
    const fecha = new Date(control.value);
    const hoy = new Date();
    return fecha < hoy ? null : { fechaInvalida: true };
  }
  aceptar(): void {
    if (this.form.valid) {
      this.mascota.idMascota= this.form.value.hcodigo;
      this.mascota.nombreMascota = this.form.value.hnombre;
      this.mascota.sexoMascota = this.form.value.hsexo;
      this.mascota.nacimientoMascota = this.form.value.hnacimiento;
      this.mascota.razaMascota = this.form.value.hraza;
      this.mascota.estadoAdopcion = this.form.value.hadopcion;
      this.mascota.fechaIngresoMascota = this.form.value.hfecha;
      this.mascota.estadoMascota = this.form.value.hestado;
      this.mascota.albergue.idAlbergue = this.form.value.halbergue;

      if (this.edicion) {
        this.mS.update(this.mascota).subscribe(() => {
          this.mS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idMascota- b.idMascota);
            this.mS.setList(sortedData);
          });
        });
        this.snackBar.open('Edición exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      } else {
        this.mS.insert(this.mascota).subscribe(() => {
          this.mS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idMascota - b.idMascota);
            this.mS.setList(sortedData);
          });
        });
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }

      this.router.navigate(['mascotas']);
    }
  }
  init(){
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          hcodigo: new FormControl(data.idMascota),
          hfecha: new FormControl(data.fechaIngresoMascota),
          hnombre: new FormControl(data.nombreMascota),
          hsexo: new FormControl(data.sexoMascota),
          hnacimiento: new FormControl(data.nacimientoMascota),
          hraza: new FormControl(data.razaMascota),
          hadopcion: new FormControl(data.estadoAdopcion),
          hestado: new FormControl(data.estadoMascota),
          halbergue: new FormControl(data.albergue.idAlbergue),
        });
      });
    }
  }
}

