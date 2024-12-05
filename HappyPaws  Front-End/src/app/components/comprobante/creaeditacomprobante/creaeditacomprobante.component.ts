import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DonacionService } from '../../../services/donacion.service';
import { Donacion } from '../../../models/Donacion';
import { ComprobanteService } from '../../../services/comprobante.service';
import { Comprobante } from '../../../models/Comprobante';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-creaeditacomprobante',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    CommonModule,],
  templateUrl: './creaeditacomprobante.component.html',
  styleUrl: './creaeditacomprobante.component.css'
})
export class CreaeditacomprobanteComponent implements OnInit{
  form:FormGroup=new FormGroup({});
  comprobante:Comprobante=new Comprobante()
  id:number=0
  edicion:boolean=false

  listaEstados:{value:string, viewValue:string}[]=[
    {value:'Cancelado',viewValue:'Cancelado'},
    {value:'Pendiente',viewValue:'Pendiente'},
    {value:'Realizado',viewValue:'Realizado'},
  ]
  listaMetodos:{value:string, viewValue:string}[]=[
    {value:'Transferencia',viewValue:'Transferencia'},
    {value:'Efectivo',viewValue:'Efectivo'},
  ]
  listaDonaciones: Donacion[] = []
  constructor(
    public snackBar: MatSnackBar,
    private cS: ComprobanteService, 
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private dS: DonacionService,
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id = data['id'];
      this.edicion = data['id']!=null
      this.init()
    })
    
      this.form = this.formBuilder.group({
        hcodigo:[''],
        hmetodo:['',Validators.required],
        hestado:['',Validators.required],
        hdonacion:['', Validators.required],
      })
      this.dS.list().subscribe((data) => {
        this.listaDonaciones = data;
      });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.comprobante.idComprobante = this.form.value.hcodigo;
      this.comprobante.estadoComprobante = this.form.value.hestado;
      this.comprobante.metodoPago = this.form.value.hmetodo;
      this.comprobante.donacion.idDonacion = this.form.value.hdonacion;

      if (this.edicion) {
        this.cS.update(this.comprobante).subscribe(() => {
          this.cS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idComprobante- b.idComprobante);
            this.cS.setList(sortedData);
          });
        });
        this.snackBar.open('Edición exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      } else {
        this.cS.insert(this.comprobante).subscribe(() => {
          this.cS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idComprobante - b.idComprobante);
            this.cS.setList(sortedData);
          });
        });
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }

      this.router.navigate(['comprobantes']);
    }
  }
  init(){
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idComprobante),
          hestado: new FormControl(data.estadoComprobante),
          hmetodo: new FormControl(data.metodoPago),
          hdonacion: new FormControl(data.donacion.idDonacion),
        });
      });
    }
  }
}
