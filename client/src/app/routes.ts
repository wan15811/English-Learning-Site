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
    path: 'grammar', component: GrammarComponent
  },
  { path: 'grammar/:cate_id', component: GrammarComponent},
  {
    path:'listAbjectives', component: ListAbjComponent
  },
  {
    path: 'vocabcate', component: VocabcateComponent
  },
  {
    path:'vocabcate/:cate_id', component: VocabcateComponent
  },
  {
    path:'test', component:TestComponent
  },
  {path:'about-us', component: AboutusComponent},

    //admin
    {path:'loginadmin', component:LoginComponent},
    {path:'adminsignup', component:SignupComponent},
    {path:'viewgrammar', component:ViewGrammarComponent},
    {path:'viewgrammar/grammar', component:ViewGrammarComponent},
    {path:'viewvocab', component: ViewVocabComponent},
    {path:'viewvocab/vocabpage', component: ViewVocabComponent},
    {path:'viewvocab/vocabpage/:cate_id', component: ViewVocabComponent},
    {path:'viewvocab/vocabpage/:cate_id/newvocab', component:NewvocabComponent},
    {path:'viewgrammar/grammar/:cate_id', component: ViewGrammarComponent},
    {path:'viewgrammar/grammar/:cate_id/newgrammar',component: NewgrammarComponent},
    {path: 'viewgrammar/grammar/:cate_id/updategrammar/:grammar_id', component:UpdateGrammarComponent}
];
