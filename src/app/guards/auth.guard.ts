import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) 
    {
      return this.usuarioService.validarToken()
      .pipe(
        tap(isAutheticated =>{
          if(!isAutheticated){
            //this.router.navigateByUrl('/login');
          }
        })
      );
    }  
}
