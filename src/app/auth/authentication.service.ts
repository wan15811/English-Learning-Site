import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() {
  }

  userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$: Observable<any> = this.userProfileSubject$.asObservable();
}
