import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {GrammarService} from '../../service/grammar.service';
import {GrammarCate} from '../../models/grammarcate.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-grammar',
  templateUrl: './view-grammar.component.html',
  styleUrls: ['./view-grammar.component.css']
})
export class ViewGrammarComponent implements OnInit {
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
            this.grammarService.getGrammarLesson(params.cate_id).subscribe((lesson: any[])=>{
              this.lesson = lesson;
            })
          }else{
            this.lesson = undefined;
          }


        }
      )
        //show list cate
      this.grammarService.getGrammarCate().subscribe((lists: any[])=>{
        this.lists = lists;
      })
  }

  createGrammarcate(title: string){
     this.grammarService.creatGrammarCate(title).subscribe((cate: GrammarCate)=>{
       console.log(cate);
      this.router.navigate(['/viewgrammar/grammar']);
     })
  }
  updateGrammarCate(title: string){
    this.grammarService.updateGrammarCate(this.cate_id,title).subscribe(()=>{
      this.router.navigate(['/viewgrammar']);
    })
  }
  deleteCate(){
    this.grammarService.deleteCate(this.selectedCateId).subscribe((res: any)=>{
      this.router.navigate(['/viewgrammar']);
    })
  }

  updateLesson(grammar_id: string){
    this.router.navigate([`viewgrammar/grammar/${this.cate_id}/updategrammar/${grammar_id}`]);
  }

  deleteLesson(cate_id: string, grammar_id: string){
    this.grammarService.deleteLesson(cate_id,grammar_id).subscribe(()=>{
      this.router.navigate(['viewgrammar/grammar']);
    })
  }

}
