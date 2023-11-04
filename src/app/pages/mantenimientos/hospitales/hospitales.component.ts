import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedaServicesService } from 'src/app/services/busqueda-services.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];

  constructor(private hospitalServices: HospitalService,
    private modalImagenServices : ModalImagenService,
    private busquedaService :  BusquedaServicesService) { }
  @Input() nombreHospital: string = '';
  public cargando : boolean = false;
  public imgSubs: Subscription;

  ngOnInit(): void {
    this.listarHopsitales();
    this.imgSubs = this.modalImagenServices.nuevaImagen
    .pipe(delay(100))
    .subscribe( img => this.listarHopsitales() );

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  public _mostrarModal: boolean = true;

  cerrarModal() {
    this._mostrarModal = true;

  }
  mostrarModal() {
    this._mostrarModal = false;
  }

  crearHospital() {
    if (this.nombreHospital.trim().length === 0){
      return;
    }
    this.hospitalServices.creaHospital(this.nombreHospital)
      .subscribe((resp: any) => {
        console.log(resp);
        Swal.fire('Felicidades!!', `Ha creado el hospital ${resp.hospital.nombre}`, 'success')
        this.nombreHospital = '';
        this.cerrarModal();
        this.listarHopsitales();
      });

  }

  listarHopsitales() {
    this.cargando =  true;
    this.hospitalServices.listarHospitales()
      .subscribe((resp) => {
        this.hospitales = resp.hospitales;
        this.cargando = false;
      })
  }

  actuliazarHospital(hospital: Hospital) {
    this.hospitalServices.actulizarHospital(hospital)
      .subscribe(resp => {
        Swal.fire('', 'Actualizdo con éxito', 'success');
        this.listarHopsitales();
      })

  }

  borrarHospital(hospital: Hospital) {

   const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Va Eleminar?',
      text: `Está por eliminar a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si. Borrelo!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {

      if (result.isConfirmed) {

        this.hospitalServices.borrarHospital(hospital._id)
          .subscribe((resp: any) => {
            if (resp.OK) {
              this.listarHopsitales();
              swalWithBootstrapButtons.fire(
                'Borrado!',
                `Ha borrado a ${hospital.nombre}`,
                'success'
              )

            } else {
              Swal.fire('Error', `Error al eliminar a ${hospital.nombre} !!`, 'error');
            }

          });

      } else (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      )
    })
  }

  mostrarModalImaagen(hospital : Hospital){
    this.modalImagenServices.abrirModal('Hospitales', hospital._id, hospital.img);
  }

  buscar(valorBusqueda : string){

    if (valorBusqueda.length === 0) {
      this.listarHopsitales();
    } else {
      console.log(valorBusqueda);
      this.busquedaService.buscar('Hospital', valorBusqueda)
        .subscribe(resp => {
          this.hospitales = resp;
        })

    }
  }

}
