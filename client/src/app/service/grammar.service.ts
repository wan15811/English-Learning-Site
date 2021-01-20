import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import {GrammarCate} from '../models/grammarcate.model';
@Injectable({
  providedIn: 'root'
})
export class GrammarService {
  selectedCate: GrammarCate;
  lesson: GrammarCate[];
  constructor(private webService: WebService) { }
  //GRAMMAR
  getGrammarCate(){
    return this.webService.get('grammarcate');
  }

  creatGrammarCate(title: string){
    return this.webService.post('grammarcate',{title});
  }
  updateGrammarCate(cate_id: string, title: string){
    return this.webService.put(`grammarcate/${cate_id}`,{title})
  }
  deleteCate(cate_id: string){
    return this.webService.delete(`grammarcate/${cate_id}`);
  }
  getGrammarLesson(cate_id:string){
    return this.webService.get(`grammarcate/${cate_id}/grammar`);
  }
  createLesson(cate_id: string, name: string, content: string, example: string){
    return this.webService.post(`grammarcate/${cate_id}/grammar`,{name,content,example});
  }
  updateLesson(cate_id: string, grammar_id: string,name: string, content: string, example: string){
    return this.webService.put(`grammarcate/${cate_id}/grammar/${grammar_id}`,{name,content,example});
  }
  deleteLesson(cate_id: string, grammar_id: string){
    return this.webService.delete(`grammarcate/${cate_id}/grammar/${grammar_id}`);
  }

  //VOCABULARY

  getVocabCate(){
    return this.webService.get('vocabcate');
  }
  createVocabCate(vocabCate: string){
    return this.webService.post('vocabcate',{vocabCate});
  }
  updateVocabCate(cate_id: string, vocabCate: string){
    return this.webService.put(`vocabcate/${cate_id}`,{vocabCate});
  }
  deleteVocabCate(cate_id: string){
    return this.webService.delete(`vocabcate/${cate_id}`);
  }
  getVocabLesson(cate_id:string){
    return this.webService.get(`vocabcate/${cate_id}/word`);
  }
  createVocabLesson(cate_id: string, vocabImg: string, vocabWord: string, vocabDescription: string){
    return this.webService.post(`vocabcate/${cate_id}/word`,{vocabImg,vocabWord,vocabDescription});
  }
  deleteVocabLesson(cate_id: string, vocab_id: string){
    return this.webService.delete(`vocabcate/${cate_id}/word/${vocab_id}`);
  }
}
