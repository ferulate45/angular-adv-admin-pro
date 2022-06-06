import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html'
})
export class DonaComponent {

  @Input('title') title:string = "sin titulo";
  @Input('labels') labels:string[] =  [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input('data') data:number[] =  [ 350, 450, 100 ];
    

  public colors:string[] = ["#e9e99e", "#4cc868", "#4e88c1"];
  // Doughnut
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.labels,
    datasets: [
      { data: this.data,
        backgroundColor: this.colors  }
    ]
  };

  ngOnChanges(changes: SimpleChanges): void{
    this.doughnutChartData = {
      labels: this.labels,
      datasets: [
        { data: this.data,
          backgroundColor: this.colors  }
      ]
    }
  }
}
