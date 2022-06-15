import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {catchError, map, Observable, of, tap} from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { RegisterForm } from '../interfaces/register-form';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public google: any;

  constructor(private http: HttpClient, private router: Router, private ngZone:NgZone) { 
    this.googleInit();
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
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers:{
        'token': token
      }
    }).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
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
