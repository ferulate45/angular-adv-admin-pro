import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html'
})
export class Grafica1Component{

  //chart 1
  labels1:string[] =  [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  data1:number[] =  [ 350, 450, 100 ];

  //chart 2
  labels2:string[] =  [ 'Pan', 'Cafe', 'Crema' ];
  data2:number[] =  [ 350, 450, 100 ];

  //chart 3
  labels3:string[] =  [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  data3:number[] =  [ 350, 450, 100 ];

  //chart 4
  labels4:string[] =  [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  data4:number[] =  [ 350, 450, 100 ];

}
