import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-logindone',
  templateUrl: './logindone.component.html',
  styleUrls: ['./logindone.component.css']
})
export class LogindoneComponent implements OnInit {
getmail:any;
getextramail: any;
  constructor(
    public authservices:AuthServiceService
  ) { }

  ngOnInit(): void {
    this.getextramail = JSON.parse(localStorage.getItem('user')!).email;
    this.getmail  ='https://mail.google.com/mail/u/0/#inbox'; 
  }

}
