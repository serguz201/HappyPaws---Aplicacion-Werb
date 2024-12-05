  import { Component, OnInit } from '@angular/core';
  import { FormBuilder,  FormControl,  FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
  import { MatInputModule } from '@angular/material/input';
  import {MatSelectModule} from '@angular/material/select';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import {MatButtonModule} from '@angular/material/button';
  import { ActivatedRoute, Params, Router } from '@angular/router';
  import { Albergue } from '../../../models/Albergue';
  import { AlbergueService } from '../../../services/albergue.service';
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
    templateUrl: './creaeditaalbergue.component.html',
    styleUrl: './creaeditaalbergue.component.css'
  })
  export class CreaeditaalbergueComponent implements OnInit {
    form:FormGroup=new FormGroup({});
    albergue:Albergue=new Albergue()
    id:number=0
    edicion:boolean=false

    constructor(
      public snackBar: MatSnackBar,
      private aS:AlbergueService, 
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
        hemail:['',[Validators.required, Validators.email]],
        hdireccion:['',[Validators.required, Validators.minLength(2)]],
        htelefono:['',[Validators.required, Validators.pattern("^[0-9]+$")]],
        hcapacidad:['',[Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(5)]],
        hapertura:['',[Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(0), Validators.max(24)]],
        hcierre:['',[Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(0), Validators.max(24)]],
        hweb:['',[Validators.required, Validators.minLength(2)]],
        hacreditacion:['',[Validators.required, Validators.minLength(7)]],
      })
    }
    aceptar():void{
      if(this.form.valid){
        this.albergue.idAlbergue=this.form.value.hcodigo
        this.albergue.nombreAlbergue=this.form.value.hnombre
        this.albergue.emailAlbergue=this.form.value.hemail
        this.albergue.direccionAlbergue=this.form.value.hdireccion
        this.albergue.telefonoAlbergue=this.form.value.htelefono
        this.albergue.capacidadMaxima=this.form.value.hcapacidad
        this.albergue.horaApertura=this.form.value.hapertura
        this.albergue.horaCierre=this.form.value.hcierre
        this.albergue.webSite=this.form.value.hweb
        this.albergue.acreditacionAlbergue=this.form.value.hacreditacion
        if (this.edicion) {
          this.aS.update(this.albergue).subscribe(d => {
            this.aS.list().subscribe(data => {
              const sortedData = data.sort((a, b) => a.idAlbergue - b.idAlbergue);
              this.aS.setList(sortedData); 
            });
          });
          this.snackBar.open('Edición exitosa', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        } else {
          this.aS.insert(this.albergue).subscribe(d => {
            this.aS.list().subscribe(data => {
              const sortedData = data.sort((a, b) => a.idAlbergue - b.idAlbergue); 
              this.aS.setList(sortedData); 
            });
          });
          this.snackBar.open('Registro exitoso', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
        
        this.router.navigate(['albergues'])
      }
    }
    init(){
      if(this.edicion){
        this.aS.listId(this.id).subscribe((data)=>{
          this.form=new FormGroup({
            hcodigo: new FormControl(data.idAlbergue),
            hnombre: new FormControl(data.nombreAlbergue), 
            hemail: new FormControl(data.emailAlbergue),   
            hdireccion: new FormControl(data.direccionAlbergue), 
            htelefono: new FormControl(data.telefonoAlbergue), 
            hcapacidad: new FormControl(data.capacidadMaxima),
            hapertura: new FormControl(data.horaApertura), 
            hcierre: new FormControl(data.horaCierre), 
            hweb: new FormControl(data.webSite), 
            hacreditacion: new FormControl(data.acreditacionAlbergue)
          });
        });
      }
    }
  }