import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

import { UsuariosComponent } from "./mantenimientos/usuarios/usuarios.component";
import { HospitalesComponent } from "./mantenimientos/hospitales/hospitales.component";
import { MedicosComponent } from "./mantenimientos/medicos/medicos.component";
import { MedicoComponent } from "./mantenimientos/medicos/medico/medico.component";
import { BusquedaComponent } from "./busqueda/busqueda.component";

import { AdminGuard } from "../guards/admin.guard";


const childRoutes : Routes = [
  { path: '', component: DashboardComponent, data:{titulo: 'Dashboard'} },
  { path: 'account-settings', component: AccountSettingsComponent, data:{titulo: 'Settings'} },
  { path: 'buscar/:value', component: BusquedaComponent, data:{titulo: 'Search'} },
  { path: 'grafica1', component: Grafica1Component, data:{titulo: 'Grafica 1'} },
  { path: 'perfil', component: PerfilComponent, data:{titulo: 'Perfil de Usuario'} },
  { path: 'progress', component: ProgressComponent, data:{titulo: 'Progress'}},
  { path: 'promises', component: PromesasComponent, data:{titulo: 'Promises'} },
  { path: 'rxjs', component: RxjsComponent, data:{titulo: 'Rxjs'} },

  //Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data:{titulo: 'Mantenimiento de Hospitales'} },
  { path: 'medicos', component: MedicosComponent, data:{titulo: 'Mantenimiento de Medicos'} },
  { path: 'medico/:id', component: MedicoComponent, data:{titulo: 'Medico'} },
  
  
  //admin routes
  { path: 'usuarios', canActivate: [AdminGuard] , component: UsuariosComponent, data:{titulo: 'Mantenimiento de Usuarios'} },

]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
