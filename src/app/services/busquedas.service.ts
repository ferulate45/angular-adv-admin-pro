import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
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

  private convertToHospitales(result : any[]): Hospital[]{
    return result;
  }

  private convertToMedicos(result : any[]): Medico[]{
    return result;
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
                    case 'hospitales':
                      return this.convertToHospitales(resp.result);
                    case 'medicos':
                      return this.convertToMedicos(resp.result);
                    default:
                      return [];
                  }
                })
              )
  }

  busquedaGlobal(valor: string){
    const url = `${base_url}/search/${valor}`;
    return this.http.get(url, this.headers);
  }
}
