import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GrammarService } from 'src/app/service/grammar.service';
import {Vocab} from '../../models/vocabulary.model';
@Component({
  selector: 'app-newvocab',
  templateUrl: './newvocab.component.html',
  styleUrls: ['./newvocab.component.css']
})
export class NewvocabComponent implements OnInit {

  constructor(private grammarService: GrammarService, private route: ActivatedRoute, private router:Router) { }
  cate_id: string;
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) =>{
          this.cate_id = params['cate_id'];
      }
    )
  }
   createVocabLesson(vocabImg: string, vocabWord: string, vocabDescription: string){
    this.grammarService.createVocabLesson(this.cate_id,vocabImg,vocabWord,vocabDescription).subscribe((newlesson:Vocab)=>{
      this.router.navigate(['../'],{relativeTo:this.route});
    })
   }

}
