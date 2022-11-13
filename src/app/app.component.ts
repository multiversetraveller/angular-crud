import { Component } from '@angular/core';
import { OneSignal } from 'onesignal-ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-crud';

  constructor(public osp:OneSignal){
    // this.osp.init({
    //   appId: "20dc6161-f26a-4bc1-b6f3-0ca52612b6d6",
    // });
  }
}
