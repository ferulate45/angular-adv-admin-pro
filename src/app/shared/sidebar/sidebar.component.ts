import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;
  menuItems: any[] = [];

  constructor(private sidebarService:SidebarService, private usuarioService:UsuarioService) {
    this.menuItems = this.sidebarService.retrieveMenu();
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
