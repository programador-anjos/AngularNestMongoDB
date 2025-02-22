import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {GenericoService} from './GenericoService';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostagemService extends GenericoService {

  constructor(http: HttpClient) {
    super(http, `/api/postagens`);
  }

  public uploadImage(imagem: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imagem);
    formData.append('key', '8651eab869ce9fd00792ca2d3e062b4f');
    return this.httpClient.post(`https://api.imgbb.com/1/upload`,
      formData, {});
  }

  // public uploadImage(imagem: File): Observable<string> {
  //   const formData = new FormData();
  //   formData.append('imagem', imagem);
  //   return this.httpClient.post(`${this.baseUrl}/api/postagens/upload`,
  //     formData, { responseType: 'text'});
  // }

}
