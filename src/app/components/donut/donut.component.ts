import { Component, Input } from '@angular/core';

import { ChartData,  Color } from 'chart.js';


@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent {

  @Input('title') title : string = "Sin titulo";

  @Input('labels') doughnutChartLabels: string[] = [ 'Label 1', 'Label 2', 'Label 3' ];
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels:this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ],
        backgroundColor:["#F5B041", "#E74C3C", "#873600"]
       }
       
    ]
  };

}
