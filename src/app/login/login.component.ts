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
      });
    });
  }

  setUser(user: GoogleUser): void{
    this.googleUser = user;
    console.log(user);
  }

  signIn(): void{
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()){
      Promise.resolve(gapi.auth2.getAuthInstance().signIn())
        .then((user) => this.setUser(user));
    }else{
      this.setUser(gapi.auth2.getAuthInstance().currentUser.get());
    }
  }

  signOut(): void{
    gapi.auth2.getAuthInstance().signOut();
    this.googleUser = undefined;
  }

}
