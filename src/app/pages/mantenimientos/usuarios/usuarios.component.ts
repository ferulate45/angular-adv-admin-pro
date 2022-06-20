import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit, OnDestroy {

  totalUsuarios: number = 0;
  usuarios: Usuario[] = [];
  usuariosTemp: Usuario[] = [];
  skip: number = 0;
  loading: boolean =  true;

  imgSubs:Subscription | undefined;

  constructor(private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }
  
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarUsuarios());
  }

  cargarUsuarios(){
    this.loading = true;
    this.usuarioService.cargarUsuarios(this.skip)
      .subscribe(({total, usuarios}) =>{
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.loading = false;
      })
  }

  cambiarPagina(valor:number){
    this.skip += valor;

    if(this.skip < 0){
      this.skip = 0;
    } else if(this.skip > this.totalUsuarios){
      this.skip -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(valor: string){

    if(valor.length === 0){
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar('usuarios', valor)
      .subscribe(resp =>{
        this.usuarios =  resp as Usuario[];
      });

    return;
  }

  eliminarUsuario(usuario: Usuario){

    if(usuario.uid === this.usuarioService.uid){
      return Swal.fire('Error', 'Accion no permitida', 'error');
    }

    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe((resp) => {
            Swal.fire("Usuario eliminado", `${usuario.nombre} elimando con exito`, 'success');
            this.cargarUsuarios();
          });
      }
    })
  }

  cambiarRole(usuario:Usuario){
    this.usuarioService.actualizarUsuario(usuario)
      .subscribe(resp =>{
        console.log(resp);
      })
  }

  openChangeImageModal(usuario:Usuario){
    this.modalImagenService.openModal('usuarios', usuario.uid, usuario.img);
  }
}
