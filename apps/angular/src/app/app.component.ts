import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PostagemService } from './services/PostagemService';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { Divider } from 'primeng/divider';
import { ToastService } from './utils/ToastService';
import { v4 as uuidv4 } from 'uuid';
import { PostagemDTO } from '../../../../libs/dtos/src/PostagemDTO';
import Cropper from 'cropperjs';

@Component({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    SkeletonModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
    FileUploadModule,
    ImageModule,
    TextareaModule,
    CardModule,
    SelectButtonModule,
    DataViewModule,
    TagModule,
    TooltipModule,
    Divider
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService, ConfirmationService, PostagemService]
})
export class AppComponent implements OnInit {
  visualizacoes: any[] = [
    { label: 'Tabela', value: Visualizacao.TABELA, icon: 'pi pi-table' },
    // { label: 'Lista', value: Visualizacao.LISTA, icon: 'pi pi-list' },
    { label: 'Cartões', value: Visualizacao.CARTAO, icon: 'pi pi-clone' }
  ];
  visualizacao = Visualizacao.TABELA;

  item: PostagemDTO = new PostagemDTO();
  lista: PostagemDTO[] = [];
  janelaAberta = false;
  carregando = false;

  constructor(protected messageService: MessageService,
              protected confirmationService: ConfirmationService,
              protected postagemService: PostagemService,
              protected toastService: ToastService) {

    this.toastService.events.subscribe(m => this.messageService.add(m));
  }


  carregarImagem(inputUpload: any) {
    const file: File = inputUpload.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {


      // let image = document.getElementById("image") as HTMLImageElement;
      // // image.width = 400
      // cropper = new Cropper(image, {
      //   aspectRatio: 1,
      //   viewMode: 3,
      // });


      this.item.foto = 'loading.gif';
      this.postagemService.uploadImage(file).subscribe({
        next: (data: any) => {
          this.item.foto = data.data.display_url;
          this.toastService.sucesso('Imagem salva no repositório');
        },
        error: (err) => {
          this.toastService.erro(err);
          console.error(err);
        }
      });
    });
    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {
    this.lista = [];
    this.carregando = true;
    this.postagemService.obter<PostagemDTO>().subscribe({
      next: (posts) => {
        this.carregando = false;
        this.lista = posts;
      },
      error: (e) => {
        this.carregando = false;
        this.toastService.erro('Erro inesperado');
        console.error(e);
      }
    });
  }

  abrir() {
    this.item = new PostagemDTO();
    this.janelaAberta = true;
  }

  passar(p: PostagemDTO) {
    Object.assign(this.item, p);
    this.janelaAberta = true;
  }

  salvar() {
    if (!this.item.foto) {
      this.toastService.erro('Selecione uma imagem para cadastro.');
    } else if (this.item.titulo && this.item.descricao) {
      if (this.item._id) {
        this.alterar();
      } else {
        this.item._id = uuidv4();
        this.cadastrar();
      }
      this.janelaAberta = false;
    } else {
      this.toastService.erro('Preencha todos os campos.');
    }
  }

  cadastrar() {
    this.carregando = true;
    this.postagemService.criar(this.item).subscribe({
      next: () => {
        this.pesquisar();
        this.toastService.sucesso('Postagem cadastrada.');
      },
      error: (e) => {
        this.carregando = false;
        this.toastService.erro('Erro inesperado');
        console.error(e);
      }
    });
  }

  alterar() {
    this.carregando = true;
    this.postagemService.alterar(this.item).subscribe({
      next: () => {
        this.pesquisar();
        this.toastService.sucesso('Postagem alterada.');
      },
      error: (e) => {
        this.carregando = false;
        this.toastService.erro('Erro inesperado');
        console.error(e);
      }
    });
  }

  confirmar(p: PostagemDTO) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar ?',
      header: 'Atenção',
      icon: 'pi pi-trash',
      rejectButtonProps: {
        label: 'Não',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Sim',
        severity: 'danger',
        outlined: false
      },
      accept: () => {
        if (p._id) {
          this.deletar(p._id);
        }
      }
    });
  }

  deletar(id: string) {
    this.carregando = true;
    this.postagemService.deletar(id)
      .subscribe({
        next: () => {
          this.carregando = false;
          this.janelaAberta = false;
          this.pesquisar();
          this.toastService.sucesso('Postagem deletada.');
        },
        error: (e) => {
          this.toastService.erro('Erro inesperado');
          console.error(e);
        }
      });
  }

  obterPalavra(target: any) {
    return target.value;
  }

  protected readonly Visualizacao = Visualizacao;


}

export enum Visualizacao {
  TABELA = 1,
  LISTA = 2,
  CARTAO = 3
}
