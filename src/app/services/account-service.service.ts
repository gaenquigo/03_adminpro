import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {


    
  private themeSelector = document.querySelector('#theme');

  constructor() {

    const urlDefecto : string = `./assets/css/colors/default-dark.css` 
    const urlSeleccionada =localStorage.getItem("theme") || urlDefecto;
    this.themeSelector?.setAttribute('href',urlSeleccionada);
   }

   changeTheme(theme : string){

    const url : string = `./assets/css/colors/${theme}.css`    
    this.themeSelector?.setAttribute('href',url);
    localStorage.setItem('theme', url);
  }

  checkCurrentTheme(){

    const listTheme = document.querySelectorAll('.selector');

    listTheme.forEach( elm =>{
        elm.classList.remove('working');
        const btnTheme = elm.getAttribute('data-theme');
        const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
        const btnCurrentTheme = this.themeSelector?.getAttribute('href');

        if(btnThemeUrl == btnCurrentTheme){
            elm.classList.add('working');
        }

    })

  }
}
