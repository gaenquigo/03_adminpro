import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  ngOnInit(){
   
    this.btnClass = `btn ${this.btnClass}`
  }

@Input('valor') progreso : number = 50;
@Input() btnClass : string = 'btn-primary';

 @Output('valor') valorsalida : EventEmitter<number> = new EventEmitter();


  cambiarValor(valor : number){

    if(this.progreso <= 0 && valor < 0){
      this.valorsalida.emit(0);
      return this.progreso = 0;
    }
    if(this.progreso >=100 && valor >= 0){
      this.valorsalida.emit(100);
      return this.progreso = 100;
    }
    this.progreso = this.progreso+valor;
    //this.valorsalida.emit(this.progreso);
    return this.valorsalida.emit(this.progreso);
  
  }


  onChange(valor : number){

    if(valor < 0 ){
      this.progreso = 0;
    }else if (valor > 100) {
      this.progreso = 100;
    } else {
      this.progreso = valor;
    }

    this.valorsalida.emit(this.progreso);
  }

}
