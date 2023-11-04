import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospitales } from '../interfaces/hospital.interface';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http : HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
   }

   get headers(){
      return {
        headers : {
        "x-token" : this.token
      }
    }
   }


  creaHospital(nombre : string){

    return this.http.post(`${base_url}/hospitales`,{nombre}, this.headers);

  }


  listarHospitales(){
    
    return this.http.get<Hospitales>(`${base_url}/hospitales`,this.headers)
    .pipe(
      map(resp =>{
        
        const usuarios = resp.hospitales
        .map(hospital => new Hospital(
          hospital.nombre,
          hospital.img
        ))
        return {
          hospitales : resp.hospitales,
        }

      })
    );
  }

  actulizarHospital(hospital : Hospital){
    return this.http.put(`${base_url}/hospitales/${hospital._id}`,
    {nombre : hospital.nombre},
     this.headers);
  }

  borrarHospital(id : string){
      return this.http.delete(`${base_url}/hospitales/${id}`, this.headers);
  }
}
