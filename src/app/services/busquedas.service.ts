import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http:HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{
        'token': this.token
      }}
  }

  private convertToUsuarios(result : any[]) : Usuario[]{
    return result.map(u => new Usuario(u.nombre, u.email, '', u.img, u.google, u.role, u.uid));
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales',
          valor: string){
    const url = `${base_url}/search/in/${tipo}/${valor}`;
    return this.http.get<any[]>(url, this.headers)
              .pipe(
                map((resp:any) => {
                  switch (tipo) {
                    case 'usuarios':
                      return this.convertToUsuarios(resp.result);                  
                    default:
                      return [];
                  }
                })
              )
  }
}