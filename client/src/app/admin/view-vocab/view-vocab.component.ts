import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import {GrammarService} from '../../service/grammar.service';
import {Cate} from '../../models/vocabcate.model';
@Component({
  selector: 'app-view-vocab',
  templateUrl: './view-vocab.component.html',
  styleUrls: ['./view-vocab.component.css']
})
export class ViewVocabComponent implements OnInit {
  selectedCateId: string;
  cate: any[];
  lesson: any[];
  //show list cate
  lists: any[];
  cate_id:string;
  constructor(private grammarService: GrammarService, private route: ActivatedRoute, private router: Router) {
    this.cate = []
    this.lesson = []
  }

  ngOnInit(): void {
    //show list cate
    this.route.params.subscribe(
      (params: Params) =>{
        if(params.cate_id){
          this.cate_id = params['cate_id'];
          this.selectedCateId = params.cate_id;
          this.grammarService.getVocabLesson(params.cate_id).subscribe((lesson: any[])=>{
            this.lesson = lesson;
          })
        }else{
          this.lesson = undefined;
        }
      }
    )
      //show list cate
    this.grammarService.getVocabCate().subscribe((lists: any[])=>{
      this.lists = lists;
    })
  }
  createVocabCate(vocabCate: string){
    this.grammarService.createVocabCate(vocabCate).subscribe((cate: Cate)=>{
      console.log(cate);
      this.router.navigate(['/viewvocab/vocabpage']);
    })
  }

  updateVocabCate(vocabCate: string){
    this.grammarService.updateVocabCate(this.cate_id,vocabCate).subscribe(()=>{
      this.router.navigate(['/viewvocab']);
    })
  }

  deleteVocabCate(){
    this.grammarService.deleteVocabCate(this.selectedCateId).subscribe((res:any)=>{
      this.router.navigate(['/viewvocab']);
    })
  }

  deleteVocabLesson(cate_id: string, vocab_id: string){
    this.grammarService.deleteVocabLesson(cate_id,vocab_id).subscribe(()=>{
      this.router.navigate(['viewvocab/vocabpage']);
    })
  }

}
