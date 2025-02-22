import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FiltroService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    // if (this.autenticacaoService.logado()) {
      return true;
    // }
    // this.router.navigate(["/"]);
    // return false;
  }
}
