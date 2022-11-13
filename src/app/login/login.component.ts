import { Component, OnInit } from '@angular/core';
import{Auth,createUserWithEmailAndPassword} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import{AuthServiceService} from '../auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email:any;
password:any;
loginlabel = 'Already have an account?';
  constructor(
    private fbs:Auth,
    private authfb:AngularFireAuth,
    private router:Router,
    public authservices:AuthServiceService,
    ) { }

  ngOnInit(): void {
  }

  logins(value:any){
    console.log(value)
    createUserWithEmailAndPassword(this.fbs,value.email,value.password)
    .then((result) => {
        Swal.fire({position: 'center',icon: 'success',title: result.user.email+' your account has been created',showConfirmButton: true})
        this.authservices.SetUserData(result.user);
        console.log(result);
       this.authservices.SendVerificationMail();
     
    }).catch((err)=>{
      Swal.fire({position: 'center',icon: 'success',title:err.message,showConfirmButton: true})
   
    })
    

  }
  
 
}
