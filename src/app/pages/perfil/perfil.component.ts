import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileForm } from 'src/app/interfaces/profile-form';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  profileForm: FormGroup;
  imagenSubir: File = {} as File;
  imgTemp : any = null;

  constructor(private fb: FormBuilder, 
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) { 
    this.usuario = usuarioService.usuario;

    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {


  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.profileForm?.value as ProfileForm)
          .subscribe(() => {
            const {email, nombre} = this.profileForm.value;

            this.usuario.email = email;
            this.usuario.nombre = nombre;

            Swal.fire('Guardado', 'Cambios guardados con exito', 'success');

          }, (err: any) =>{
            Swal.fire('Error', err.error.msg, 'error');
          });
  }

  cambiarImagen(event: any){
    const file = event?.target?.files[0];
    this.imagenSubir = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
    }
    return;
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid as string)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Cambios guardados con exito', 'success');
      }).catch( err => {
        Swal.fire('Error', 'Error al subir la imagen', 'error');
      });
  }
}
