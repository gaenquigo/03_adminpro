import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BusquedaServicesService {

  constructor(private http: HttpClient) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        "x-token": this.token
      }
    }
  }


  tranformarUsuario(resultados: any[]): Usuario[] {

    return resultados.map(user => new Usuario(
      user.nombre,
      user.email,
      '',
      user.google,
      user.img,
      user.role,
      user.uid)
    );
  }

  tranformarHospital(resultados: any[]): Hospital[] {
    return resultados
  }

  buscar(tipo: 'Usuario' | 'Medico' | 'Hospital', criterio: string):any {

    return this.http.get<any[]>(`${base_url}/buscar/coleccion/${tipo}/${criterio}`, this.headers)
      .pipe(
        map((resp: any) => {
          switch (tipo) {
            case 'Usuario':
              console.log(this.tranformarUsuario(resp.resultado));
              return this.tranformarUsuario(resp.resultado);
            case 'Hospital':
              return this.tranformarHospital(resp.resultado);
            default:
              return [];

          }
          resp.resultado
        })
      );

  }


}
