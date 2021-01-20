import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GrammarService } from 'src/app/service/grammar.service';

@Component({
  selector: 'app-update-grammar',
  templateUrl: './update-grammar.component.html',
  styleUrls: ['./update-grammar.component.css']
})
export class UpdateGrammarComponent implements OnInit {

  constructor(private grammarService: GrammarService, private route: ActivatedRoute, private router:Router) { }
  cate_id: string;
  grammar_id: string;
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.cate_id = params['cate_id'];
        this.grammar_id = params['grammar_id'];
      }
    )
  }
  updateLesson(name: string, content: string, example: string){
      this.grammarService.updateLesson(this.cate_id, this.grammar_id, name, content, example).subscribe(()=>{
        this.router.navigate(['/viewgrammar/grammar/'+this.cate_id]);
      })
  }

}
