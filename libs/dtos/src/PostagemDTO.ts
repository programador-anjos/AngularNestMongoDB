import {GenericoDTO} from './GenericoDTO';

export class PostagemDTO extends GenericoDTO<PostagemDTO> {
  titulo = '';
  descricao = '';
  foto = '';

  constructor(model?: Partial<PostagemDTO>) {
    super(model);
  }

}
