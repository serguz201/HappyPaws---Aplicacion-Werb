import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Albergue } from '../../../models/Albergue';
import { AlbergueService } from '../../../services/albergue.service';
import { Comentario } from '../../../models/Comentario';
import { ComentarioService } from '../../../services/comentario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditacomentario',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './creaeditacomentario.component.html',
  styleUrl: './creaeditacomentario.component.css'
})
export class CreaeditacomentarioComponent implements OnInit {
  form:FormGroup=new FormGroup({});
  comentario:Comentario=new Comentario()
  id:number=0
  edicion:boolean=false
  listaAlbergues: Albergue[] = []

  constructor(
    public snackBar: MatSnackBar,
    private cS: ComentarioService, 
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
        hcomentario:['',[Validators.required, Validators.minLength(5)]],
        hestrella:['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$"), Validators.min(0), Validators.max(5)]],
        halbergue:['', Validators.required],
      })
      this.aS.list().subscribe((data) => {
        this.listaAlbergues = data;
      });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.comentario.idComentario = this.form.value.hcodigo;
      this.comentario.comentario = this.form.value.hcomentario;
      this.comentario.estrella = this.form.value.hestrella;
      this.comentario.albergue.idAlbergue = this.form.value.halbergue;

      if (this.edicion) {
        this.cS.update(this.comentario).subscribe(() => {
          this.cS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idComentario- b.idComentario);
            this.cS.setList(sortedData);
          });
        });
        this.snackBar.open('Edición exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      } else {
        this.cS.insert(this.comentario).subscribe(() => {
          this.cS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idComentario - b.idComentario);
            this.cS.setList(sortedData);
          });
        });
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }

      this.router.navigate(['comentarios']);
    }
  }
  init(){
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idComentario),
          hcomentario: new FormControl(data.comentario),
          hestrella: new FormControl(data.estrella),
          halbergue: new FormControl(data.albergue.idAlbergue),
        });
      });
    }
  }
}
