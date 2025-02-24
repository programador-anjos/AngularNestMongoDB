import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { firstValueFrom, Observable, of } from 'rxjs';
import { PostagemService } from './services/PostagemService';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { expect, jest, test } from '@jest/globals';
import { PostagemDTO } from '../../../../libs/dtos/src/PostagemDTO';
import { GenericoDTO } from '../../../../libs/dtos/src/GenericoDTO';
import { GenericoService } from './services/GenericoService';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastService } from './utils/ToastService';

class MockService {
  obter(): Observable<any[]> {
    return of([
      {
        'id': '1',
        'titulo': 'titulo1',
        'descricao': 'descricao1',
        'foto': 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg'
      },
      {
        'id': '2',
        'titulo': 'titulo2',
        'descricao': 'descricao2',
        'foto': 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg'
      },
      {
        'id': '3',
        'titulo': 'titulo3',
        'descricao': 'descricao3',
        'foto': 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg'
      }
    ]);
  }
}

let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;
let postagemService: PostagemService;
let genericoService: GenericoService;
let messageService: MessageService;
let confirmationService: ConfirmationService;
let toastService: ToastService;

let appComponent: AppComponent;

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([])],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PostagemService, useClass: MockService },
        { provide: GenericoService, useClass: MockService },
        // { provide: ComponentFixtureAutoDetect, useValue: true },
        MessageService, ConfirmationService, ToastService]
    }).compileComponents()
      .then(() => {
        postagemService = TestBed.inject(PostagemService);
        genericoService = TestBed.inject(GenericoService);
        messageService = TestBed.inject(MessageService);
        confirmationService = TestBed.inject(ConfirmationService);
        toastService = TestBed.inject(ToastService);
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        appComponent = new AppComponent(messageService, confirmationService, postagemService, toastService);
        fixture.autoDetectChanges();
      });
  });

  it('mostra conteudo HTML', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#title').textContent).toEqual('Postagens');
  });

  it(`quantidade de visualizações`, () => {
    expect(component.visualizacoes).toHaveLength(2);
  });

  it(`pesquisa com resultados`, () => {
    appComponent.pesquisar();
    expect(appComponent.lista).toHaveLength(3);
  });

  it(`cadastra`, () => {
    component.item = Object.assign(new PostagemDTO(), { titulo: 'titulo', descricao: 'descricao', foto: 'foto' });
    let spyCadastra = jest.spyOn(component, 'cadastrar');
    component.salvar();
    expect(spyCadastra).toBeCalled();
  });

  it(`altera`, () => {
    component.item = Object.assign(new PostagemDTO(), { _id: '123', titulo: 'titulo', descricao: 'descricao', foto: 'foto' });
    let spyAltera = jest.spyOn(component, 'alterar');
    component.salvar();
    expect(spyAltera).toBeCalled();
  });

  it(`deleta`, () => {
    let spyDeleta = jest.spyOn(component, 'deletar');
    component.deletar("123");
    expect(spyDeleta).toBeCalled();
  });

  it(`mock service`, async () => {
    let genericoDTO: any = await firstValueFrom(postagemService.obter()).then((posts: GenericoDTO<PostagemDTO>[]) => posts[0]);
    expect(firstValueFrom(postagemService.obter())).resolves.toHaveLength(3);
    expect(genericoDTO.titulo).toBe('titulo1');
  });

  // it(`exibe linhas da tabela`, () => {
  // fixture.detectChanges();
  // const body = fixture.debugElement.queryAll(By.css('.cursor-pointer'));
  // console.log(body[0]);
  // const table = fixture.debugElement.queryAll(By.css('#table'));
  // console.log(table[0].nativeElement.innerHTML);
  // });

});
