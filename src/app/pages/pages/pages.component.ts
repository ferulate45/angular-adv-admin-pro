import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  year = new Date().getFullYear();
  
  constructor() { }

  ngOnInit(): void {
  }

}
