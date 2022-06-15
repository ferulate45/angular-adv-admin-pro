import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  formSubmitted = false;

  registerForm = this.fb.group({
    nombre: ['Fernanda', [Validators.required, Validators.minLength(3)]],
    email: ['test@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    password2: ['123456', [Validators.required]],
    terminos: [true, [Validators.required, Validators.requiredTrue]]
  }, {validators: this.passwordsIguales('password', 'password2')})

  constructor(private router:Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService) { }

  crearUsuario(){
    this.formSubmitted = true;

    if(this.registerForm.invalid){
      return;
    }
    
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/');
      }, (err)=>{
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  campoNoValido(campo:string): boolean{
    if(this.formSubmitted && this.registerForm.get(campo)?.invalid){
      return true;
    }

    return false;
  }
  
  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    return this.formSubmitted && pass1 !== pass2;
  }

  passwordsIguales(campo1: string, campo2: string){
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(campo1);
      const pass2Control = formGroup.get(campo2);

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsIgual: true});
      }
    };
  }

  aceptaTerminos(){
    return this.formSubmitted && this.registerForm.get('terminos')?.invalid;
  }


}
