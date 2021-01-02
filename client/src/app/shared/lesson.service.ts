import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { Lesson } from './lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  selectedLesson: Lesson;
  lesson: Lesson[];
  readonly baseURL = 'http://localhost:8080/lesson';
  constructor(private http: HttpClient) { }
  postLesson(lesson: Lesson){
    return this.http.post(this.baseURL, lesson);
  }
  // getLesson(): Observable<Lesson[]>{
  //   return this.http.get<Lesson[]>(this.baseURL);
  // }
  getLessonDetails(_id: string){
    return this.http.get(this.baseURL + `/${_id}`)
  }
  getLessonList(){
    return this.http.get(this.baseURL);
  }
  putLesson(lesson: Lesson){
    return this.http.put(this.baseURL + `/${lesson._id}`, lesson);
  }
  deleteLesson(_id: string){
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
