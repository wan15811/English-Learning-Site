import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LessonService } from '../shared/lesson.service';
import { Lesson} from '../shared/lesson.model';

declare var M: any;

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css'],
  providers: [LessonService]
})
export class LessonComponent implements OnInit {

  constructor( public lessonService: LessonService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshListLesson();
  }
  resetForm(form?: NgForm){
    if(form)
    form.reset();
    this.lessonService.selectedLesson = {
      _id: "",
      lessonName: "",
      title: "",
      imgURL: "",
      description: ""
    }
  }
  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.lessonService.postLesson(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshListLesson();
        M.toast({html:'Saved Successfully', classes: 'rounded'});
      });
    }
    else {
      this.lessonService.putLesson(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshListLesson();
        M.toast({html: 'Update successfully', classes: 'rounded'});
      });
    }
  }
  refreshListLesson(){
    this.lessonService.getLessonList().subscribe((res) => {
      this.lessonService.lesson = res as Lesson[];
    });
  }
  onEdit(lesson: Lesson){
    this.lessonService.selectedLesson = lesson;
  }
  onDelete(_id: string, form: NgForm){
    if(confirm('Are you sure to delete this record ?') == true){
      this.lessonService.deleteLesson(_id).subscribe((res) => {
        this.refreshListLesson();
        this.resetForm(form);
        M.toast({html: 'Deleted successfully', classes: 'rounded'});
      });
    }
  }
}
