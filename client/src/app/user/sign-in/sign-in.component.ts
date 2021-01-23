import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import{ NgForm } from '@angular/forms'
import { UserService } from 'src/app/shared/user.service';
import {AuthenticationService} from '../../../../src/app/auth/authentication.service'
import { FacebookLoginProvider, SocialAuthService } from "angularx-social-login";
import { SocialUser, GoogleLoginProvider } from "angularx-social-login";
import { takeUntil } from 'rxjs/operators';
import { pipe, Subject } from 'rxjs';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public unsubscribe$ = new SubSink;

  user : SocialUser;
  constructor(private userService: UserService,
    private router : Router,
    public authService: SocialAuthService,
    public authenticateService: AuthenticationService,
    private _avtivatedRoute: ActivatedRoute) { }

  model ={
    email :'',
    password:''
  };
  emailRule = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit(){
    this.authService.authState
    .subscribe((user) =>{
      this.user = user;
    })
    if(this.userService.isLoggedIn()) //page sẽ xhien sau khi login
    this.router.navigateByUrl('/homepage');
    this.fbLibrary();
  }

  onSubmit(form : NgForm){
    this.userService.signin(form.value)
    .subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/homepage');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
  
  //login using social account
  public socialSignIn(socialProvider){
    
    let socialPlatformProvider;
    if (socialProvider === 'facebook'){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.authService.signIn(socialPlatformProvider).then(socialUser => {
      const reqObject = {
        email: socialUser.email,
        fullName: socialUser.firstName + socialUser.lastName,
        password: socialUser.authToken,
        image: socialUser.photoUrl,
        socialAuth: 'SocialAuth' + socialUser.authToken
      };
      this.userService.postUser(reqObject)
      .subscribe(
        _data => {
          this.loginSocialUser(reqObject, true);

        },
        error => {
          if(error.status === 422){
            this.loginSocialUser(reqObject, false);
          }
        }
      )
    });
  }

  loginSocialUser(reqObject, loginForFirst) {
    this.userService.signin(reqObject)
    .subscribe(
      data => {
        this.authenticateService.userProfileSubject$.next(data);
        sessionStorage.setItem('User', JSON.stringify(data));
        loginForFirst ? this.router.navigateByUrl('/userprofile') : this.router.navigateByUrl('/homepage');
      }
    )
  }
  // signInWithGoogle():void{
  //   if(this.authService.signIn(GoogleLoginProvider.PROVIDER_ID))
  //   this.router.navigateByUrl('/homepage');
  // }
  // signInWithFacebook():void{
  //   if(this.authService.signIn(FacebookLoginProvider.PROVIDER_ID))
  //   this.router.navigateByUrl('/homepage');
  // }
  movetoregister(){
    this.router.navigateByUrl('/signup', /* Removed unsupported properties by Angular migration: relativeTo. */ {});
  }
  fbLibrary() {

    (window as any).fbAsyncInit = function() {
      window['FB'].init({
        appId      : '839775800152410',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      window['FB'].AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

  }

  //unsubscribe
  onDestroy(){
    this.unsubscribe$.unsubscribe();
  }

}
