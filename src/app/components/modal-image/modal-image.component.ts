import { Component, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ImagenUploadService } from 'src/app/services/imagen-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent {



  public imagenSubir: File;
  public rutaImagen: string;
  public imgTmp: any = null;


  constructor(public modalImagenService : ModalImagenService,
    private imagenUploadSerice : ImagenUploadService){
  }

  cerrarModal(){
    this.imgTmp = null;
    this.modalImagenService.cerrarModal();
  }


  cambiarImagen(event) {
    const file: File = event.target.files[0];
    console.log(file);
    this.imagenSubir = file;

    if (!file) {
      return this.imgTmp = null;
    }
    //Para leer un archivo seleccionado de una ruta con un <input file>
    //Tambien se puede cambiar a un base64 para enviar al backend y
    // descomprimirlo alla en el backend

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTmp = reader.result;
    }
  }


  subirImagen(){
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.imagenUploadSerice.uploadFile(this.imagenSubir, tipo, id)
    .subscribe( {
      next : (img :string) => {
      
        this.modalImagenService.nuevaImagen.emit(img);
        Swal.fire('Felicidades...', 'Imagen Actualizada con exito.', 'success');
        this.cerrarModal();
      },
      error(err) {  
        Swal.fire('Upps...', 'Error al cargar la Imagen.', 'error');
        this.cerrarModal();
      },
    });


  }

}
