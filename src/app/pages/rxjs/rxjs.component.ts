import { Component, OnDestroy } from '@angular/core';
import { Observable, retry , interval, take, map, filter, Subscription} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnDestroy {

  intervalSubs: Subscription = new Subscription();

  constructor() {
    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);
    
    // this.retornaObservable()
    // .pipe(
    //   retry(2)
    // )
    // .subscribe(
    //   valor => console.log(`val: ${valor}`),
    //   error => console.warn('Error:', error),
    //   () => console.info('Obs terminado')      
    // );
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo() : Observable<number>{
    return interval(500)
                        .pipe(
                          map(valor => valor+1 ),
                          take(10),
                          filter(valor => valor % 2 === 0)
                          );
  }

  retornaObservable() : Observable<number>{
    let i = -1; 
    return new Observable<number>(observer => {

      const intervalo = setInterval(()=>{
        i++;
        observer.next(i);

        if(i === 4){
          clearInterval(intervalo);
          observer.complete();
        }

        if(i === 2){
          observer.error('i llego a 2');
        }

      }, 1000);
    });
  }

}
