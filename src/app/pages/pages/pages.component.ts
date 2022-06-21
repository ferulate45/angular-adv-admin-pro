import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { SidebarService } from 'src/app/services/sidebar.service';

declare function customInitFunctions() : void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {


  year = new Date().getFullYear();
  
  constructor(private settingsService:SettingsService, private sidebarService: SidebarService) { 


  }

  ngOnInit(): void {
    customInitFunctions();
    //this.sidebarService.cargarMenu();
  }

}
