import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { LoginForm } from '../../interfaces/login-form.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  google: any;
  formSubmitted = false;

  loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor(private router:Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone:NgZone) { }
  
  ngOnInit(): void {
    this.startAppGoogleBtn();
  }


  login(){

    this.usuarioService.login(this.loginForm.value as LoginForm)
      .subscribe(resp=>{

        if(this.loginForm.get('remember')?.value){
          localStorage.setItem('email', this.loginForm.get('email')?.value??'');
        }else{
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      }, (err)=>{
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  async startAppGoogleBtn() {
    await this.usuarioService.googleInit();
    this.google = this.usuarioService.google;

    this.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );



    // google.accounts.id.initialize({
    //   client_id: "980469037729-6st8b6spkmp87vr391brd7922j2ftu3o.apps.googleusercontent.com",
    //   callback: (googleUser:any) =>{
    //     this.usuarioService.loginGoogle(googleUser.credential).subscribe(resp =>{
    //       this.ngZone.run(()=>{
    //         this.router.navigateByUrl('/');
    //       });
    //     });
    //   }
    // });
    // google.accounts.id.renderButton(
    //   document.getElementById("buttonDiv"),
    //   { theme: "outline", size: "large" }  // customization attributes
    // );
  }
}
