import { Injectable } from '@angular/core';
import { AngularFireAuth ,} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollectionGroup} from '@angular/fire/compat/firestore';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userData: any;
  private apiUrl = 'https://allauction.in/score/admin_services/getAllSetting.php?series=vtspl1&tid=69';
  constructor(
    public authfb: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public afstore: AngularFirestore,
    private http: HttpClient
    
  ) { 

    this.authfb.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  

  SendVerificationMail() {
    return this.authfb.currentUser
      .then((u: any) => {
        u.sendEmailVerification();
        console.log(u)
      }).then(() => {
        this.router.navigate(['logindone']);
      })
      .catch((err)=>{
        console.log(err.message);
      })
  }
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afstore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  updateimage(user: any,imgurl:any) {
    const userRef: AngularFirestoreDocument<any> = this.afstore.doc(
      `users/${user.uid}`
    );
    const userData = {
      photoURL: imgurl,
    };
    
    return userRef.set(userData, {
      merge: true,
    });
   
  }

  get isLoggedIn() : boolean{
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  SignOut() {
    return this.authfb.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['signin']);
    });
  }

  getSettings(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
 
}
