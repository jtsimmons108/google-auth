import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import CurrentUser = gapi.auth2.CurrentUser;
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  googleUser: GoogleUser | undefined;
  constructor(private zone: NgZone) { }

  ngOnInit(): void {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: '180374672702-vad12pe1q4og9dr4mjra0hrsj57ol1im.apps.googleusercontent.com',
        apiKey: 'IsIXgFxGizBViqMq0VRPpfIb',
        scope: 'profile'
      }).then(() => {
        this.zone.run(() => {
          console.log(this);
          if (gapi.auth2.getAuthInstance().isSignedIn.get()){
            this.googleUser = gapi.auth2.getAuthInstance().currentUser.get();
          }
        });
      });
    });
  }



  signIn(): void{
    console.log('signing in');
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()){
      gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          this.zone.run(() => {
            console.log('finished signing in');
            this.setUser();
          });
        });
    }else{
      this.setUser();
    }
  }

  setUser(): void{
    console.log('setting user');
    this.googleUser = gapi.auth2.getAuthInstance().currentUser.get();
  }
  signOut(): void{
    gapi.auth2.getAuthInstance().signOut();
    // @ts-ignore
    this.googleUser = undefined;
  }

}
