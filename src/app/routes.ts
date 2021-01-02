import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import {SignInComponent} from'./user/sign-in/sign-in.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import { from } from 'rxjs';
import { AuthGuard } from './auth/auth.guard';
import { HomepageComponent } from './page/homepage/homepage.component';
import { LessonComponent } from './lesson/lesson.component';
import { GrammarComponent } from './lesson/grammar/grammar.component';
import { ListAbjComponent } from './lesson/grammar/list-abj/list-abj.component';
import { ListgrammarComponent } from './lesson/grammar/listgrammar/listgrammar.component';
import { EnglishgrammarComponent } from './lesson/grammar/englishgrammar/englishgrammar.component';

export const appRoutes: Routes = [
  {
      path: 'signup', component: UserComponent,
      children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'signin', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
},
  {
    path: '', redirectTo: '/signin', pathMatch: 'full'
  },
  {
    path:'homepage', component:HomepageComponent
  },
  {
    //for manage grammar lesson
    path:'lessonpage', component: LessonComponent
  },
  {
    path: 'abjectives', component: GrammarComponent
  },
  {
    path:'listAbjectives', component: ListAbjComponent
  },
  {
    path:'listgrammar', component: ListgrammarComponent
  },
  {
    path:'englishgrammar', component: EnglishgrammarComponent
  }
];
