import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  linkTheme = document.querySelector('#theme');

  constructor() { 

    const themeUrl = localStorage.getItem("selected-theme") || './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', themeUrl);

  }

  changeTheme(theme: string){
    const url = `./assets/css/colors/${theme}.css`
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('selected-theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const selectedClassName = 'working';
    const links = document.querySelectorAll('#themecolors .selector');

    links.forEach(e=>{
      e.classList.remove(selectedClassName);
      const btnTheme = e.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;

      const currentThemeUrl = this.linkTheme?.getAttribute('href');

      if(currentThemeUrl === btnThemeUrl){
        e.classList.add(selectedClassName);
      }

    });
  }

}
