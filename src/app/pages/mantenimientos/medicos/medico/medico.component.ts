import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { CargarHospitales } from 'src/app/interfaces/cargar-hospitales.interface';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html'
})
export class MedicoComponent implements OnInit {

  medicoSaved: Medico | undefined;
  medicoForm: FormGroup = {} as FormGroup;
  hospitales: Hospital[] = [];
  hospitalSelected: Hospital | undefined;

  constructor(private fb: FormBuilder, 
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id}) => {
      this.cargarMedico(id);
    });

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        this.hospitalSelected = this.hospitales.find(x => x._id === hospitalId);
      });
  }

  cargarMedico(id:string){

    if(id === 'nuevo'){
      return;
    }

    this.medicoService.getMedicoById(id)
      .pipe(
        delay(100)
      ).subscribe(({medico}) => {

        if(!medico){          
          return this.router.navigateByUrl('/dashboard/medicos');
        }

        const {nombre, hospital} = medico;
        const hospitalId = hospital?._id;
        this.medicoSaved = medico;
        this.medicoForm.setValue({nombre, hospital: hospitalId});
        return;
      }, ()=>{
        return this.router.navigateByUrl('/dashboard/medicos');
      });
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
      .subscribe( (resp:CargarHospitales) => {
          this.hospitales = resp.hospitales;
      });
  }

  guardarMedico(){
    const {nombre} = this.medicoForm.value;
    if(this.medicoSaved){
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSaved._id
      };
      this.medicoService.actualizarMedico(data)
        .subscribe( (resp:any) => {
          Swal.fire('Medico Actualizado', `${nombre}`, 'success');
        });
    }else{
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe( (resp:any) => {
          Swal.fire('Medico Creado', `${nombre}`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        });
    }
  }
}
