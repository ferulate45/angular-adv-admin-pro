import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';

import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html'
})
export class MedicosComponent implements OnInit, OnDestroy {

  imgSubs:Subscription | undefined;
  loading:boolean = true;
  medicos: Medico[] = [];
  medicosTemp: Medico[] = [];

  constructor(private medicoService: MedicoService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }
  
              ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe(img => this.cargarMedicos());
  }

  cargarMedicos(){
    this.medicoService.cargarMedicos()
    .subscribe(r =>{
      this.loading = false;
      this.medicos = r.medicos;
      this.medicosTemp = r.medicos;
    });
  }

  // guardarCambios(hospital:Hospital){
  //   this.hospitalService.actualizarHospital(hospital.uid, hospital.nombre)
  //     .subscribe(resp => {
  //       Swal.fire('Actualizado', hospital.nombre ,'success');
  //     });
  // }

  eliminarMedico(medico:Medico){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id)
        .subscribe(resp => {
          this.cargarMedicos();
          Swal.fire('Borrado', medico.nombre ,'success');
        });
      }
    })
    

  }

  // async openCrearMedicoModal(){
  //   const {value=''} = await Swal.fire<string>({
  //     title: 'Crear Hospital',
  //     text: 'Ingrese el nombre del nuevo hospital',
  //     input: 'text',
  //     inputPlaceholder: 'Nombre del Hospital',
  //     showCancelButton: true
  //   });

  //   if(value.trim().length > 0){
  //     const nombre = value.trim();
  //     this.hospitalService.crearHospital(nombre)
  //       .subscribe((resp: any) => {
  //         this.hospitales.push(resp.hospital);
  //         Swal.fire('Creado', nombre ,'success');
  //       });
  //   }
  // }

  openChangeImageModal(medico:Medico){
    this.modalImagenService.openModal('medicos', medico._id, medico.img);
  }

  buscar(valor: string){

    if(valor.length === 0){
      return this.medicos = this.medicosTemp;
    }

    this.busquedasService.buscar('medicos', valor)
      .subscribe(resp =>{
        this.medicos =  resp as Medico[];
      });

    return;
  }

}
