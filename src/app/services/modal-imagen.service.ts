import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _mostrarModal : boolean = false;
  public tipo : 'Usuarios' | 'Medicos'| 'Hospitales';
  public id : string;
  public img : string = 'no-image';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();


  get mostrarModal(){
    return this._mostrarModal;
  }
  constructor() { }

  cerrarModal(){
    this._mostrarModal = false;
  }

  abrirModal(tipo : 'Usuarios' | 'Medicos'| 'Hospitales',
   id : string,
   img : string =  'no-image'
  ){
    this._mostrarModal = true;

    this.tipo = tipo;
    this.id = id;

    if(img.includes('https')){
      this.img = img;
    }else{

      this.img = `${base_url}/upload/${tipo}/${img}`;
    } 
  }
  
}
