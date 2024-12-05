import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { AlbergueService } from '../../../services/albergue.service';
Chart.register(...registerables);

@Component({
  selector: 'app-alberguebycount',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './alberguebycount.component.html',
  styleUrls: ['./alberguebycount.component.css']
})
export class AlberguebycountComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private aS: AlbergueService) {}
  ngOnInit(): void {
    this.aS.getCount().subscribe(data=>{
      this.barChartLabels = data.map(item=>item.nombreAlbergue);
      this.barChartData = [
        {
          data: data.map(item=>item.capacidad),
          label: 'Albergue con mayor capacidad',
          backgroundColor: ['#FF5733', '#575fd4', '#33FF57', '#ed2a5c','#33ffe9','#8033ff', '#e9ff33'],
          borderColor: '#050404',
          borderWidth: 1,
        }
      ]
    })
  }
}