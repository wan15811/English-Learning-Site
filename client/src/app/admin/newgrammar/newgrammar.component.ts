import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Grammar } from 'src/app/models/grammar.model';
import { GrammarService } from 'src/app/service/grammar.service';

@Component({
  selector: 'app-newgrammar',
  templateUrl: './newgrammar.component.html',
  styleUrls: ['./newgrammar.component.css']
})
export class NewgrammarComponent implements OnInit {

  constructor(private grammarService: GrammarService, private route: ActivatedRoute, private router:Router) { }
  cate_id: string;
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) =>{
          this.cate_id = params['cate_id'];
      }
    )
  }
  //create new lesson
  createLesson(name: string, content: string, example: string){
    this.grammarService.createLesson(this.cate_id,name,content,example).subscribe((newlesson:Grammar)=>{
      this.router.navigate(['../'],{relativeTo: this.route});
    })
  }
}
