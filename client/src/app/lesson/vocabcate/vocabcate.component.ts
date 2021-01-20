import { Component, OnInit } from '@angular/core';
import {Cate} from '../../models/vocabcate.model';
import{Vocab} from '../../models/vocabulary.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import {VocabserviceService} from '../../service/vocabservice.service';
@Component({
  selector: 'app-vocabcate',
  templateUrl: './vocabcate.component.html',
  styleUrls: ['./vocabcate.component.css'],
  providers: []
})
export class VocabcateComponent implements OnInit {
  cates:any[];
  words: any[];
  // cate_id: string;
  constructor(private vocabService:VocabserviceService , private route: ActivatedRoute, private router: Router) { }
  // arrCate: any = []
  // cate: Cate[]
  // vocab: Vocab[]
  ngOnInit(): void {
    // this.vocabcateService.getCate().subscribe(data => {
    //   console.log(data);
    //   this.arrCate = data;
    // });
    this.route.params.subscribe(
      (params:Params) => {
        console.log(params);
        this.vocabService.getWord(params.cate_id).subscribe((words: any[])=>{
          this.words = words;
        })
      }
    )
    this.vocabService.getCates().subscribe((cates:any[])=>{
      this.cates = cates;
    })
  }
}
