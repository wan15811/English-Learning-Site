import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../../../app/shared/lesson.service';
import { Router } from "@angular/router";
import {HttpClient} from '@angular/common/http';
import { Lesson } from 'src/app/shared/lesson.model';

import { from } from 'rxjs';

@Component({
  selector: 'app-englishgrammar',
  templateUrl: './englishgrammar.component.html',
  styleUrls: ['./englishgrammar.component.css'],
  providers: [LessonService]
})
export class EnglishgrammarComponent implements OnInit {
  public lesson = [];
  constructor(public lessonService: LessonService, private router: Router) { }
  // lessonDetails: Lesson;
  ngOnInit(): void {

  }


}
