import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'
})
export class IncrementadorComponent implements OnInit{
  
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  // @Input('valor') //Note: to rename parameter
  @Input('valor') progress: number = 50;
  @Input() btnClass:string = 'btn-info';
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  changeValue(value:number){

    if(this.progress >= 100 && value >=0){
      this.valorSalida.emit(100);
      return this.progress = 100;
    }

    if(this.progress <= 0 && value <=0){
      this.valorSalida.emit(0);
      return this.progress = 0;
    }

    const newVal = this.progress + value;
    this.valorSalida.emit(newVal);
    return this.progress = newVal;
  }

  onChange(newvalue:number){
    if(newvalue <= 0){
      this.progress = 0;
    }else if(newvalue >=100){
      this.progress = 100;
    }else{
      this.progress = newvalue;
    }

    this.valorSalida.emit(newvalue);
  }

}
