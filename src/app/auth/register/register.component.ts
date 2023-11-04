import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  public formSubmitted = false;


  public registerForm = this.fb.group({
    'nombre': ['GABRIEL', Validators.required],
    'email': ['tested@gmail.com', [Validators.required, Validators.email]],
    'password': ['123456', Validators.required],
    'password2': ['123456', Validators.required,],
    'terminos': [false, Validators.required]
   }
   ,{
      validator: this.passwordIguales('password', 'password2')
    }
  );

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
  }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.validaTerminos());

    if (this.registerForm.invalid || this.validaTerminos()) {
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(
        {
          next : response => {
            console.log(response);
          },
          error(err){
            Swal.fire('Error', err.error.msg, 'error');
            console.log();
          },
          complete() {
            Swal.fire('OK!', 'Usuario creado con Exito...', 'success');
          },
        });

  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  validarPasswordIguales() {

    const email1 = this.registerForm.get('password')?.value;
    const email2 = this.registerForm.get('password2')?.value;

    if (!(email1 === email2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }


  validaTerminos() {

    return !this.registerForm.get('terminos')?.value && this.formSubmitted;

  }

  passwordIguales(email1Name: string, email2Name: string) : ValidationErrors | null  {

    return (control: AbstractControl) => {

      const email1 = control.get(email1Name);
      const email2 = control.get(email2Name);
      if (email1?.value === email2?.value) {
        return email2?.setErrors(null);
      } else {
        return email2?.setErrors({ noSonIguales: true });
      }

    }
  }
  passwordEquals(control :AbstractControl): ValidationErrors | null {

    const pass1 = control.parent?.get('password')?.value;
    const pass2 = control.value;
 
    return !pass1 || !pass2 || pass1 !== pass2 ? { isNotEqual: true } : null;

  }

}
