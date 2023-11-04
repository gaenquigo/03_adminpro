import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedaServicesService } from 'src/app/services/busqueda-services.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})

export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[];
  public valorActual: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private usuarioService: UsuarioService,
    private busquedaService: BusquedaServicesService,
    private modalImagenServices : ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenServices.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarUsuarios() );


  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.valorActual)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  cargarSiguiente(valor: number) {

    this.valorActual += valor;

    if (this.valorActual < 0) {
      this.valorActual = 0;
    } else if (this.valorActual > this.totalUsuarios) {
      this.valorActual -= valor;
      //this.valorActual =( this.totalUsuarios - (this.valorActual -this.totalUsuarios))
    }

    this.cargarUsuarios();
  }

  buscar(valorBusqueda) {

    if (valorBusqueda.length === 0) {
      this.cargarUsuarios();
    } else {
      console.log(valorBusqueda);
      this.busquedaService.buscar('Usuario', valorBusqueda)
        .subscribe(resp => {
          this.usuarios = resp;
        })

    }

  }


  borrarUsuario(usuario: Usuario) {


    if (usuario.uid === this.usuarioService.uid) {

      Swal.fire('Error', 'No se puede Borrar usted mismo!!', 'error');
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Va Eleminar?',
      text: `Está por eliminar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si. Borrelo!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {

      if (result.isConfirmed) {

        this.usuarioService.borrarUsuario(usuario)
          .subscribe((resp: any) => {
            if (resp.OK) {
              this.cargarUsuarios();
              swalWithBootstrapButtons.fire(
                'Borrado!',
                `Ha borrado a ${usuario.nombre}`,
                'success'
              )

            } else {
              Swal.fire('Error', `Error al eliminar a ${usuario.nombre} !!`, 'error');
            }

          });

      } else (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      )
    })
  }

  actualizarRole(usuario: Usuario) {
    this.usuarioService.actualizarUsuarioRole(usuario)
      .subscribe(resp => {
        console.log(resp);
      })
  }


  mostrarModalImaagen(usuario : Usuario){
    this.modalImagenServices.abrirModal('Usuarios', usuario.uid, usuario.img);
  }


}
