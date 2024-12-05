import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { NotificacionService } from '../../../services/notificacion.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
Chart.register(...registerables);
@Component({
  selector: 'app-notficacionesxfecha',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [BaseChartDirective,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule],
  templateUrl: './notficacionesxfecha.component.html',
  styleUrl: './notficacionesxfecha.component.css'
})
export class NotficacionesxfechaComponent implements OnInit {
  fecha: Date = new Date(Date.now());
  form:FormGroup=new FormGroup({});
  mostrar: boolean = false;
  barChartOptions: ChartOptions={
    responsive: true,
  }
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = []
  constructor(private nS:NotificacionService, private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hfecha:['',Validators.required],
    })
  }
  Buscar(){
    this.mostrar = true;
    this.fecha = this.form.value.hfecha;
    this.init(this.fecha);
  }
  init(fecha: Date): void {
    if(this.mostrar){
    this.nS.getNotixFecha(fecha).subscribe(data=>{
      this.barChartLabels = data.map(item=>item.nombre + ' ' + item.apellido);
      this.barChartData = [
        {
          data: data.map(item=>item.cantidad),
          label: 'Cantidad de roles por usuario',
          backgroundColor: ['#FF5733', '#575fd4', '#33FF57', '#ed2a5c','#33ffe9','#8033ff', '#e9ff33'],
          borderColor: '#050404',
          borderWidth: 1,
        }
      ]
    })
    }
  }
}