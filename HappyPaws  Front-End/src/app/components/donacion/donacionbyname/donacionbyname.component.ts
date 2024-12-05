import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { DonacionService } from '../../../services/donacion.service';
Chart.register(...registerables);

@Component({
  selector: 'app-rolebyuser',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './donacionbyname.component.html',
  styleUrl: './donacionbyname.component.css'
})
export class DonacionbynameComponent implements OnInit {
  barChartOptions: ChartOptions={
    responsive: true,
  }
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = []
  constructor(private dS:DonacionService){}
  ngOnInit(): void {
    this.dS.getDonaciones().subscribe(data=>{
      this.barChartLabels = data.map(item=>item.nombre + ' ' + item.apellido);
      this.barChartData = [
        {
          data: data.map(item=>item.montoTotal),
          label: 'Persona con mayor donación',
          backgroundColor: ['#FF5733', '#575fd4', '#33FF57', '#ed2a5c','#33ffe9','#8033ff', '#e9ff33'],
          borderColor: '#050404',
          borderWidth: 1,
        }
      ]
    })
  }
}
