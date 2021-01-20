import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class VocabserviceService {

  constructor(private webService: WebService) {}

  getCates(){
    return this.webService.get('vocabcate');
  }

  getWord(cate_id:string){
    return this.webService.get(`vocabcate/${cate_id}/word`);
  }

  getGrammarCate(){
    return this.webService.get('grammarcate');
  }
  getGrammarLesson(cate_id: string){
    return this.webService.get(`grammarcate/${cate_id}/grammar`);
  }
}
