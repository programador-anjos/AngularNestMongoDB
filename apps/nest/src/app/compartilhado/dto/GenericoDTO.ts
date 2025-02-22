export abstract class GenericoDTO<T> {
  public _id?: string;
  public criado?: boolean;
  public alterado?: boolean;
  public deletado?: boolean;
  public selecionado?: boolean;

  protected constructor(model?: Partial<T>) {
    if (model) {
      Object.assign(this, model);
    }
  }

  public toJson(): any {
    return JSON.parse(JSON.stringify(this));
  }

}
