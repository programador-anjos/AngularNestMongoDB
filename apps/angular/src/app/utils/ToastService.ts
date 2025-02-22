import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Message} from 'primeng/message';
import {ToastMessageOptions} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private subject: Subject<ToastMessageOptions> = new Subject<ToastMessageOptions>();
  private observable: Observable<ToastMessageOptions> = this.subject.asObservable();

  /**
   * Fluxo de eventos para receber mensagens.
   */
  public get events() {
    return this.observable;
  }

  /**
   * Exibir mensagem de sucesso.
   */
  public sucesso(mensagem: string, titulo: string = 'Sucesso', duracao: number = 3000, fixo: boolean = false) {
    this.subject.next({
      icon: 'pi-check-circle',
      severity: 'success',
      detail: mensagem,
      summary: titulo,
      life: duracao
    });
  }

  /**
   * Exibir mensagem de erro.
   */
  public erro(mensagem: string, titulo: string = 'Falha', duracao: number = 3000, fixo: boolean = false) {
    this.subject.next({
      icon: 'pi-exclamation-triangle',
      styleClass: 'p-toast-icon',
      severity: 'error',
      detail: mensagem,
      summary: titulo,
      life: duracao,
      sticky: fixo
    });
  }

  /**
   * Exibir mensagem informativa.
   */
  public informativo(mensagem: string, titulo: string = 'Informação', duracao: number = 3000, fixo: boolean = false) {
    this.subject.next({
      icon: 'pi-info-circle',
      severity: 'info',
      detail: mensagem,
      summary: titulo,
      life: duracao,
      sticky: fixo
    });
  }

  /**
   * Exibir mensagem de aviso.
   */
  public aviso(mensagem: string, titulo: string = 'Avis', duracao: number = 3000, fixo: boolean = false) {
    this.subject.next({
      icon: 'pi-exclamation-triangle',
      severity: 'warn',
      detail: mensagem,
      summary: titulo,
      life: duracao,
      sticky: fixo
    });
  }

}
