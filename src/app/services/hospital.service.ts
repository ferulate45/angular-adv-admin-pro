import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CargarHospital } from '../interfaces/cargar-hospitales.interface';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient, private router: Router) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{
        'token': this.token
      }}
  }

  cargarHospitales(skip: number = 0){    
    const url = `${base_url}/hospitales`;
    return this.http.get<CargarHospital>(url, this.headers)
      .pipe(
        map(resp => resp )
      );
  }

  crearHospital(nombre: string){    
    const url = `${base_url}/hospitales`;
    return this.http.post<CargarHospital>(url, {nombre}, this.headers);
  }

  actualizarHospital(id:string, nombre: string){    
    const url = `${base_url}/hospitales/${id}`;
    return this.http.put<CargarHospital>(url, {nombre}, this.headers);
  }

  borrarHospital(id:string){    
    const url = `${base_url}/hospitales/${id}`;
    return this.http.delete<CargarHospital>(url, this.headers);
  }
  
}
