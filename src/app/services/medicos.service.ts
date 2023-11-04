import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/Medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {


  base_url =  environment.base_url;

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


  constructor(private http : HttpClient) { }

  listarMedicos(){
    return this.http.get<Medico[]>(`${this.base_url}/medicos`, this.headers)
    .pipe(
      map(
        (resp  :any ) =>{
          return resp.medicos;
        }
      )
    );
  }

}
