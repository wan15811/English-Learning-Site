import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//component
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

//Material
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';

import{appRoutes} from'./routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';


//
import { QuillModule } from 'ngx-quill';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './page/homepage/homepage.component';
//
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LessonComponent } from './lesson/lesson.component';
import { GrammarComponent } from './lesson/grammar/grammar.component';
import { HeadComponent } from './head/head.component';
import { FootComponent } from './foot/foot.component';
import { from } from 'rxjs';
import { NavbarComponent } from './navbar/navbar.component';
import { ListAbjComponent } from './lesson/grammar/list-abj/list-abj.component';
//social login
import {SocialAuthServiceConfig} from 'angularx-social-login';
import {SocialLoginModule, GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import { VocabcateComponent } from './lesson/vocabcate/vocabcate.component';
import { TestComponent } from './test/test.component';
import { ViewGrammarComponent } from './admin/view-grammar/view-grammar.component';
import { ViewVocabComponent } from './admin/view-vocab/view-vocab.component';
import { NewgrammarComponent } from './admin/newgrammar/newgrammar.component';
import { UpdateGrammarComponent } from './admin/update-grammar/update-grammar.component';
import { NewvocabComponent } from './admin/newvocab/newvocab.component';
import { LoginComponent } from './admin/login/login.component';
import { SignupComponent } from './admin/signup/signup.component';
import { AboutusComponent } from './page/aboutus/aboutus.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    HomepageComponent,
    LessonComponent,
    GrammarComponent,
    HeadComponent,
    FootComponent,
    NavbarComponent,
    ListAbjComponent,
    VocabcateComponent,
    TestComponent,
    ViewGrammarComponent,
    ViewVocabComponent,
    NewgrammarComponent,
    UpdateGrammarComponent,
    NewvocabComponent,
    LoginComponent,
    SignupComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    QuillModule,
    MatSidenavModule,
    SocialLoginModule,
    FlexLayoutModule,
    MatFormFieldModule
  ],providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '814180048879-s53ol9diqnveu7nf35spog0i93jf8cbn.apps.googleusercontent.com'            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('839775800152410')
          }
        ]
      } as SocialAuthServiceConfig
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
