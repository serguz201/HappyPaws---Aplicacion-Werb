import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { MascotaService } from '../../../services/mascota.service';
Chart.register(...registerables);

@Component({
  selector: 'app-rolebyuser',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './mascotabyadopcion.component.html',
  styleUrl: './mascotabyadopcion.component.css'
})
export class MascotabyadopcionComponent implements OnInit {
  barChartOptions: ChartOptions={
    responsive: true,
  }
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = []
  constructor(private mS:MascotaService){}
  ngOnInit(): void {
    this.mS.getAdopcion().subscribe(data=>{
      this.barChartLabels = data.map(item=>item.nombreAlbergue);
      this.barChartData = [
        {
          data: data.map(item=>item.count),
          label: 'Albergue con mayor cantidad de mascotas no adoptadas',
          backgroundColor: ['#FF5733', '#575fd4', '#33FF57', '#ed2a5c','#33ffe9','#8033ff', '#e9ff33'],
          borderColor: '#050404',
          borderWidth: 1,
        }
      ]
    })
  }
}

