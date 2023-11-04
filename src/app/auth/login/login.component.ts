import { AfterViewInit, Component, ElementRef, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

declare const google : any;
import { UsuarioService } from 'src/app/services/usuario.service';



const idGoogle = environment.GOOGLE_ID;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements AfterViewInit  {


  constructor(private router : Router, private fb : FormBuilder, 
    private serviceUsuario : UsuarioService,
    private ngZone : NgZone){}



  @ViewChild('googleBtn') googleBtn!: ElementRef; 
  

  public formSubmitted = false;
  public auth2: any;
 
  ngAfterViewInit(): void {
    this.loginSignInGoogle();
    
  }

  loginSignInGoogle(){
    google.accounts.id.initialize({
      client_id: `${idGoogle}`,
      callback: ((response :any) => this.handleCredentialResponse(response))
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(resp : any) {
    console.log("Encoded JWT ID token: " + resp.credential);
    this.serviceUsuario.loginGoogle(resp.credential)
    .subscribe({
      next : resp=>{
        console.log(resp);
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/');
        })
      },
      error(err) {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      },
    }
    )
  }

  public loginForm:FormGroup = this.fb.group({
    'email': [localStorage.getItem('email'), [Validators.required, Validators.email]],
    'password': ['123456', Validators.required],
    'recuerdame': [localStorage.getItem('recuerdame')]
   }
  );


  

  // logout(){
  //   this.router.navigateByUrl("/");
  // }

  login(){
  
   // console.log(this.loginForm.value);

    this.serviceUsuario.login(this.loginForm.value)
    .subscribe({
      next : resp => {
        console.log(resp);
        if(this.loginForm.controls['recuerdame'].value){
          localStorage.setItem('email', this.loginForm.get('email')?.value);
          localStorage.setItem('recuerdame', this.loginForm.get('recuerdame')?.value);
        }else{
          localStorage.removeItem('email');
          localStorage.removeItem('recuerdame');
        }

         this.router.navigateByUrl('/');
      },
      error(err) {
        Swal.fire('Upss..', err.error.msg, 'error');
      },
      complete( ) {
        console.log( 'ingresando')
      }
    })
    
  }

}
