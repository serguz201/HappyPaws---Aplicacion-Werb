import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { RoleService } from '../../../services/role.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-rolebyuser',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './rolebyuser.component.html',
  styleUrl: './rolebyuser.component.css'
})
export class RolebyuserComponent implements OnInit {
  barChartOptions: ChartOptions={
    responsive: true,
  }
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = []
  constructor(private rS:RoleService){}
  ngOnInit(): void {
    this.rS.getCount().subscribe(data=>{
      this.barChartLabels = data.map(item=>item.nombreRol);
      this.barChartData = [
        {
          data: data.map(item=>item.count),
          label: 'Cantidad de roles por usuario',
          backgroundColor: ['#FF5733', '#575fd4', '#33FF57', '#ed2a5c','#33ffe9','#8033ff', '#e9ff33'],
          borderColor: '#050404',
          borderWidth: 1,
        }
      ]
    })
  }
}
