import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

declare function customInitFunctions() : void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {


  year = new Date().getFullYear();
  
  constructor(private settingsService:SettingsService) { 


  }

  ngOnInit(): void {
    customInitFunctions();
  }

}
