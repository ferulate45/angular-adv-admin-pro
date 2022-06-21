import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent{
  usuario: Usuario;

  constructor(private usuarioService:UsuarioService,
              private router: Router) {
    this.usuario = usuarioService.usuario;
  }

  logout(){
    this.usuarioService.logout();
  }

  buscar(value:string){
    if(value.trim().length === 0){
      return;
      //this.router.navigateByUrl('/dashboard');
    }
    this.router.navigateByUrl(`/dashboard/buscar/${value}`);
  }
}
