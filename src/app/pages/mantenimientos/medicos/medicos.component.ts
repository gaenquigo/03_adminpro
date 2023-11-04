import { Component } from '@angular/core';
import { Medico } from 'src/app/models/Medico.model';
import { MedicosService } from 'src/app/services/medicos.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent {

  listaMedicos : Medico[] = [];
  constructor(private medicoService : MedicosService){
    this.obtenerMedicos();
  }


  obtenerMedicos(){
    this.medicoService.listarMedicos()
    .subscribe(resp =>{
      this.listaMedicos = resp;
    })

  }
}
