import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnDestroy{

  titulo : string = "";
  tituloSubs$ : Subscription = new Subscription();

  constructor(private router:Router) {
    this.tituloSubs$ =  this.getArgumentosRuta().subscribe( ({titulo}) =>{
                                                    this.titulo = titulo;
                                                    document.title = `AdminPro - ${titulo}`;
                                                  });;
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta(){
    return this.router.events
    .pipe(
      filter(x => x instanceof ActivationEnd && x.snapshot.firstChild === null),
      map(x2 => (x2 as ActivationEnd).snapshot.data)
    );

  }
}
