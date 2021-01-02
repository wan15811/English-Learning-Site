import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../../../app/shared/lesson.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-listgrammar',
  templateUrl: './listgrammar.component.html',
  styleUrls: ['./listgrammar.component.css']
})
export class ListgrammarComponent implements OnInit {
  lessonDetails: any;
  constructor(private lessonService: LessonService, private router: Router) { }

  ngOnInit(): void {
    this.lessonService.getLessonList().subscribe(
      res => {
        this.lessonDetails = res ['lesson'];
      },
      err => {
        console.log(err);
      }
    );
  }

}
