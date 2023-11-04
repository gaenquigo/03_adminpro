import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ImagenUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(fileItem: File, tipo: 'Usuarios' | 'Medicos' | 'Hospitales', id: string) {

    const formData = new FormData();
    formData.append('imagen', fileItem)
    return this.http.put(`${base_url}/upload/${tipo}/${id}`, formData, {
      headers: {
        'x-token': localStorage.getItem('token')
      }
    });

  }

  /* optenerImegen(tipo: 'Usuarios' | 'Medicos' | 'Hospitales', img : string){
    return this.http.get(`${base_url}/upload/${tipo}/${img}`);
  } */
}
