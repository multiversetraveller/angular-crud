import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask} from '@angular/fire/compat/storage'
import {  Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection ,Firestore ,getDocs} from '@angular/fire/firestore';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  uploadprocess$!: Observable<number | undefined>;
  imageupload!: string;
  snapshot: any;
  getupdateimage$!: Observable<string | undefined>;
  downloadURL: any;

  constructor( 
    public authservices:AuthServiceService,
    public afsmode:AngularFireStorage,    public afstore: AngularFirestore,private firestore:Firestore,


  ) { }

  ngOnInit(): void {
    this.getAllVipMembers()
  }

  upload(event:any ) {
  
    const id = Math.random().toString(36).substring(2);
    let path = '/usersimage'+id+'.png';
    this.ref = this.afsmode.ref(path);
    this.ref.put(event.target.files[0]).then((data)=>{
      this.uploadprocess$ =  this.ref.put(event.target.files[0]).percentageChanges();
      data.ref.getDownloadURL().then(url => {
        this.downloadURL = url;
        var usersdata = JSON.parse(localStorage.getItem('user')!);
      this.authservices.updateimage(usersdata,this.downloadURL);
      console.log('in')
    });
    })
  
  }

  getAllVipMembers() {
    var getdata = JSON.parse( localStorage.getItem('user')!);
     const dbinstan = collection(this.firestore,'users' );
     getDocs(dbinstan).then((data)=>{
      console.log(data.docs.map((item)=>{
        return {...item.data(),id:item.id}
      }))
     })
     
   } 
}
