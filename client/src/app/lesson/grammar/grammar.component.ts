import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {VocabserviceService} from '../../service/vocabservice.service'
@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.component.html',
  styleUrls: ['./grammar.component.css']
})
export class GrammarComponent implements OnInit {
  cates: any[];
  lessons: any[];
  constructor(private vocabService:VocabserviceService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.vocabService.getGrammarLesson(params.cate_id).subscribe((lessons: any[])=>{
          this.lessons = lessons;
        })
      }
    )
    this.vocabService.getGrammarCate().subscribe((cates: any[])=>{
      this.cates = cates;
    })
  }

}
