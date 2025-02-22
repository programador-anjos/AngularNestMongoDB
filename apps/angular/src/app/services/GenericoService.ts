import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { environmentLocal } from '../../environments/environment.local';
import { GenericoDTO } from '../../../../nest/src/app/compartilhado/dto/GenericoDTO';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericoService {

  protected readonly baseUrl: string = environmentLocal.baseUrl;

  protected optionsJSON = {
    headers: new HttpHeaders().set('Content-Type', `application/json`),
    params: new HttpParams()
  };

  protected constructor(protected httpClient: HttpClient, protected apiUrl: string) {
  }

  obterPorId<R extends GenericoDTO<R>>(id: number, path: string = "/"): Observable<R> {
    let url: string = `${this.baseUrl}${this.apiUrl}${path}${id}`;
    return this.httpClient.get<R>(url, this.optionsJSON);
  }

  obterPorParametros<R extends GenericoDTO<R>>(param: any, path: string = "/"): Observable<R[]> {
    let url: string = `${this.baseUrl}${this.apiUrl}${path}`;
    return this.httpClient.get<R[]>(url, this.optionsJSON);
  }

  obter<R extends GenericoDTO<R>>(path: string = "/"): Observable<R[]> {
    let url: string = `${this.baseUrl}${this.apiUrl}${path}`;
    return this.httpClient.get<R[]>(url, this.optionsJSON);
  }

  criar<T extends GenericoDTO<T>, R extends GenericoDTO<R>>(parametro: T, path: string = "/"): Observable<R> {
    let url: string = `${this.baseUrl}${this.apiUrl}${path}`;
    return this.httpClient.post<R>(url, parametro.toJson(), this.optionsJSON);
  }

  alterar<T extends GenericoDTO<T>, R extends GenericoDTO<R>>(model: T, path: string = "/"): Observable<R> {
    let url: string = `${this.baseUrl}${this.apiUrl}${path}${model._id}`;
    return this.httpClient.put<R>(url, model.toJson(), this.optionsJSON);
  }

  deletar(id: string, path: string = "/"): Observable<void> {
    let url: string = `${this.baseUrl}${this.apiUrl}${path}${id}`;
    return this.httpClient.delete<void>(url, this.optionsJSON);
  }

}
