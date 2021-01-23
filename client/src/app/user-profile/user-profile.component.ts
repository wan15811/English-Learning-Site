import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { SocialAuthService } from "angularx-social-login";
import { SocialUser, GoogleLoginProvider } from "angularx-social-login";
import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public unsubscribe$ = new SubSink;

  userDetails: any;
  user: SocialUser;
  constructor(private userService: UserService, private router: Router, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);
      }
    );
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    // })
  }
  // loginSocial(){
  //   this.authService.authState.subscribe((user) => {
  //     this.user = user;
  //   })
  // }
  // signOut(){
  //   this.authService.signOut();
  // }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/signin']);
    this.unsubscribe$.unsubscribe();
  }
}
