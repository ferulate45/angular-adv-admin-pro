import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages/pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

const routes : Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent, data:{titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data:{titulo: 'Progress'}},
            { path: 'grafica1', component: Grafica1Component, data:{titulo: 'Grafica 1'} },
            { path: 'account-settings', component: AccountSettingsComponent, data:{titulo: 'Settings'} },
            { path: 'promises', component: PromesasComponent, data:{titulo: 'Promises'} },
            { path: 'rxjs', component: RxjsComponent, data:{titulo: 'Rxjs'} }
        ]
    }
]; 


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule{}