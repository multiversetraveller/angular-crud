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
  number!: number;
  rangesData: { min: number, max: number, step: number }[] = [];
  baseValue: number = 200000; // Default base value set to 2 lakh
     constructor( 
    public authservices:AuthServiceService,
    public afsmode:AngularFireStorage,    public afstore: AngularFirestore,private firestore:Firestore,


  ) { }

  ngOnInit(): void {
    this.getSettings();

    this.getAllVipMembers();
    this.number = this.baseValue; // Initialize number to baseValue
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

  

   getStep() {
    for (const range of this.rangesData) {
      if (this.number >= range.min && this.number < range.max) {
        return range.step;
      }
    }
    return this.rangesData[0].step; // Default step
  }

  increment() {
    const step = this.getStep();
    const currentRange = this.rangesData.find(range => this.number >= range.min && this.number < range.max);

    if (currentRange && (this.number + step) < currentRange.max) {
      this.number += step;
    } else {
      const nextRange = this.rangesData.find(range => this.number < range.min);
      if (nextRange) {
        this.number = nextRange.min;
      }
    }
  }

  decrement() {
    const step = this.getStep();
    const currentRange = this.rangesData.find(range => this.number >= range.min && this.number < range.max);

    if (currentRange && (this.number - step) >= currentRange.min) {
      this.number -= step;
    } else {
      const prevRange = this.rangesData.slice().reverse().find(range => this.number >= range.max);
      if (prevRange) {
        this.number = prevRange.max - prevRange.step;
      }
    }
  }

  getSettings() {
    this.authservices.getSettings().subscribe(
      (response) => {
        if (response && response.data) {
          const tickerAppData = response.data.find((item: { ptype: string; }) => item.ptype === 'All');
          if (tickerAppData) {
            // Filter out invalid ranges if needed
            this.rangesData = tickerAppData.ticker_app.filter((item: { min: number; max: number; }) => item.min !== 0 && item.max !== 0);;
            console.log(this.rangesData,'--------------dev------------------------')
          }else{
            console.log('--------------dev------------------------')

          }
        }
      },
      (error) => {
        console.error('Error fetching settings:', error);
      }
    );
  }
}