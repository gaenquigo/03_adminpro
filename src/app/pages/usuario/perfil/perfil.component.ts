import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { ImagenUploadService } from 'src/app/services/imagen-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public formPerfil: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public rutaImagen: string;
  public imgTmp: any = null;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private imagenServices: ImagenUploadService) {
    this.usuario = usuarioService.usuario;
  }


  ngOnInit(): void {

    this.formPerfil = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });

  }

  actualizarPerfil() {
    console.log(this.formPerfil.value);

    /* this.usuarioService.actualizarUsuario(this.formPerfil.value)
      .subscribe(resp => {
        console.log(resp);
        const { nombre, email } = this.formPerfil.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Felicidades!!', 'El usuario ha sido Actualizado.', 'success');
      },(err)=>{
        
      }); 
*/
    this.usuarioService.actualizarUsuario(this.formPerfil.value)
      .subscribe({
        next : resp => {
          console.log(resp);
          console.log(this.usuario);
          const { nombre, email } = this.formPerfil.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
          Swal.fire('Felicidades!!', 'El usuario ha sido Actualizado.', 'success');
        },
        error(err) {
          console.log(err);
          Swal.fire("Error", err.error.msg,'error');
        },
      },);
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


  subirArchivo() {
    console.log("File ", this.imagenSubir);
    this.imagenServices.uploadFile(this.imagenSubir, 'Usuarios', this.usuario.uid)
      .subscribe( {
        next : (resp:any) => {
          console.log(resp);

          this.usuario.img = resp.archivo;
          Swal.fire('Felicidades...', 'Imagen Actualizada con exito.', 'success');
        },
        error(err) {  
          Swal.fire('Upps...', 'Error al cargar la Imagen.', 'error');
        },
      });

  }

}
