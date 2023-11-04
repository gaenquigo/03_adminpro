import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { t } from 'chart.js/dist/chunks/helpers.core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cargaUsuario } from '../interfaces/carga-usuarios.interface';
import { LoginForm } from '../interfaces/login-interface';
import { registerForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

declare const google : any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario : Usuario;

  constructor(private http: HttpClient,
     private router : Router,
     private ngZone : NgZone) { }

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

     get uid():string{
      return this.usuario.uid || '';
     }


  logout(){
    //gquintana@unicartagena.edu.co
    localStorage.removeItem('token');
    if(this.usuario.google){
      google.accounts.id.revoke('gabriel.quintana.gomez@gmail.com', ()=>{
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/login');
        });
          
      },catchError=>{
        console.log(catchError);
      });
    }else{
      this.router.navigateByUrl('/login');
    }
   

  }

  validarToken(): Observable<boolean>{

    
    return this.http.get(`${base_url}/login/renovar`, {
      headers : {
        "x-token" : this.token
      }
    }).pipe(
      tap((resp : any)=>{
        const {nombre, email, img='', google, role,uid} = resp.usuario;
        this.usuario = new Usuario(nombre, email, '',google, img, role, uid);
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(resp => of(false))
    )
  }


  crearUsuario(formData: registerForm) {
    //console.log('creando usuario');
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          console.log(resp.token);
          localStorage.setItem('token', resp.token);
        })
      );

  }

  actualizarUsuario(data : {nombre : string, email : string, role : string}){

    data = {
      ...data,
      role : this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`,data, this.headers);


  }

  login(formData: LoginForm) {
    console.log('Ingresando login');
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          console.log(resp.token);
          localStorage.setItem('token', resp.token);
        })
      );
  }

  loginGoogle(token: string) {

    return this.http.post(`${base_url}/login/google`, { 'token': token })
      .pipe(
        tap((resp: any) => {
          console.log("ojo el token", resp.token);
          localStorage.setItem('token', resp.token);
        })
      )
  }

  cargarUsuarios(inicio : number){
    return this.http
    .get<cargaUsuario>(`${base_url}/usuarios?desde=${inicio}`,this.headers)
    .pipe(
      map(resp =>{
        const usuarios = resp.usuarios
        .map(user => new Usuario(
          user.nombre,
          user.email,
           '',
          user.google,
          user.img, 
          user.role, 
          user.uid)
        );

        return {
          total : resp.total,
          usuarios
        }

      })
    );
  }


  borrarUsuario(usuario : Usuario){
    return this.http.delete(`${base_url}/usuarios/${usuario.uid}`, this.headers);
  }
  

  actualizarUsuarioRole(usuario : Usuario ){
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`,usuario, this.headers);
  }


}
