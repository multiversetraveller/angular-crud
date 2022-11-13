import { Component, OnInit } from '@angular/core';
import{Auth, signInWithEmailAndPassword} from '@angular/fire/auth'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginlabel = "New to traveller's blog?";

  constructor( 
    public fbs:Auth,
    private router:Router,
    public authservices:AuthServiceService,

    ) { }

  ngOnInit(): void {
  }


  signin(value:any){
    signInWithEmailAndPassword(this.fbs,value.email,value.password)
    .then((result)=>{
      console.log(result.user)
      if(result.user.emailVerified){
        Swal.fire({position: 'center',icon: 'success',title: 'Login Successfull',showConfirmButton: false,timer: 1500})
        .then(()=>{
          this.authservices.SetUserData(result.user);
          this.router.navigate(['home']);
        })

      }
      else{
        Swal.fire({position: 'top-end',icon: 'error',title: 'Please first verify your email id, We sent you a new mail check. ', showConfirmButton: true})
        .then(()=>{
          this.authservices.SendVerificationMail();
        })
      }
    })

    .catch((err)=>{
      Swal.fire({position: 'top-end',icon: 'error',title: err.message, showConfirmButton: true,})
    })
  }
}
