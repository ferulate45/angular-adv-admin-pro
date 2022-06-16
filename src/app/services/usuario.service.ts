import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {catchError, map, Observable, of, tap} from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { ProfileForm } from '../interfaces/profile-form';
import { RegisterForm } from '../interfaces/register-form';
import { Usuario } from '../models/usuario.model';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public google: any;
  usuario:Usuario = new Usuario('','');

  constructor(private http: HttpClient, private router: Router, private ngZone:NgZone) { 
    this.googleInit();
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  googleInit(){
    return new Promise<void>(resolve => {
      google.accounts.id.initialize({
        client_id: "980469037729-6st8b6spkmp87vr391brd7922j2ftu3o.apps.googleusercontent.com",
        callback: (googleUser:any) =>{
          this.loginGoogle(googleUser.credential).subscribe(resp =>{
            this.ngZone.run(()=>{
              this.router.navigateByUrl('/');
            });
          });
        }
      });

      this.google = google;
      resolve();
    });



    // google.accounts.id.initialize({
    //   client_id: "980469037729-6st8b6spkmp87vr391brd7922j2ftu3o.apps.googleusercontent.com"
    // });
  }

  logout(){
    localStorage.removeItem('token');
    google.accounts.id.disableAutoSelect();

    this.ngZone.run(()=>{
      this.router.navigateByUrl('/auth/login'); 
    });
  }

  validarToken():Observable<boolean>{
    return this.http.get(`${base_url}/login/renew`, {
      headers:{
        'token': this.token
      }
    }).pipe(
      map((resp:any)=>{
        const {email,google,nombre, role, img = '', uid} = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(err => of(false))
    );
  }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  actualizarPerfil(data: ProfileForm){
    data = {
      ...data,
      role: this.usuario.role || ''
    };
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers:{
        'token': this.token
      }}
    );
  }

  login(formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  loginGoogle(token: any){
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }
}
