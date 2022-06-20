import { Component, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html'
})
export class HospitalesComponent implements OnInit {

  imgSubs:Subscription | undefined;
  loading:boolean = true;
  hospitales: Hospital[] = [];
  hospitalesTemp: Hospital[] = [];

  constructor(private hospitalService: HospitalService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarHospitales());
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
    .subscribe(r =>{
      this.loading = false;
      this.hospitales = r.hospitales;
      this.hospitalesTemp = r.hospitales;
    });
  }

  guardarCambios(hospital:Hospital){
    this.hospitalService.actualizarHospital(hospital.uid, hospital.nombre)
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.nombre ,'success');
      });
  }

  eliminarHospital(hospital:Hospital){
    this.hospitalService.borrarHospital(hospital.uid)
      .subscribe(resp => {
        this.cargarHospitales();
        Swal.fire('Borrado', hospital.nombre ,'success');
      });
  }

  async openCrearHospitalModal(){
    const {value=''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true
    });

    if(value.trim().length > 0){
      const nombre = value.trim();
      this.hospitalService.crearHospital(nombre)
        .subscribe((resp: any) => {
          this.hospitales.push(resp.hospital);
          Swal.fire('Creado', nombre ,'success');
        });
    }
  }

  openChangeImageModal(hospital:Hospital){
    this.modalImagenService.openModal('hospitales', hospital.uid, hospital.img);
  }

  buscar(valor: string){

    if(valor.length === 0){
      return this.hospitales = this.hospitalesTemp;
    }

    this.busquedasService.buscar('hospitales', valor)
      .subscribe(resp =>{
        this.hospitales =  resp as Hospital[];
      });

    return;
  }

}
