import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService: UsuarioService, private router:Router){ }
  
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.usuarioService.validarToken()
    .pipe(
      tap(isAutheticated =>{
        if(!isAutheticated){
          this.router.navigateByUrl('/auth/login');
        }
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) 
    {
      return this.usuarioService.validarToken()
      .pipe(
        tap(isAutheticated =>{
          if(!isAutheticated){
            this.router.navigateByUrl('/auth/login');
          }
        })
      );
    }  
}
