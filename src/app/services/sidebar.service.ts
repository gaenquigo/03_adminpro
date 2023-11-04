import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  menu: any[] = [
    {
      nombre: 'Dashboard',
      icon: "mdi mdi-gauge",
      subMenu: [
        {
          nombreSubMenu : "Main",
          ruta : ""
        },
        {
          nombreSubMenu : "Barras de Progreso",
          ruta : "progress"
        },
        {
          nombreSubMenu : "Grafricas",
          ruta : "grafica1"
        },
        {
          nombreSubMenu : "Promesas",
          ruta : "promesas"
        },
        {
          nombreSubMenu : "Rxjs",
          ruta : "rxjs"
        }
      ]

    },
    {
      nombre: 'Mantenimiento',
      icon: "mdi mdi-engine",
      subMenu: [
        {
          nombreSubMenu : "Usuarios",
          ruta : "usuarios"
        },
        {
          nombreSubMenu : "Hospitales",
          ruta : "hospitales"
        },
        {
          nombreSubMenu : "Médicos",
          ruta : "medicos"
        },
        
      ]

    },
  ]
}
