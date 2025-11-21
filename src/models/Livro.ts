export class Livro {
  
  // Encapsulamento
  private _titulo : string = "";
  private _autor : string = "";
  private _isbn : string = "";
  private _anoPublicacao : number = 0;
  private _emprestado : boolean  = false;

  constructor(titulo: string, autor: string, isbn: string, anoPublicacao: number) {
    this._titulo = titulo;
    this._autor = autor;
    this._isbn = isbn;
    this._anoPublicacao = anoPublicacao;
    this._emprestado = false
  }

  // Get - para busca de informações
  public get titulo(): string{
    return this._titulo
  }

  public get autor(): string{
    return this._autor
  }
  public get isbn(): string{
    return this._isbn
  }
  public get anoPublicacao(): number{
    return this._anoPublicacao
  }
  public get emprestado(): boolean {
    return this._emprestado
  }

  // Setter - atualizar emprestimo / devolução
  public set emprestado(status : boolean) {
    this._emprestado = status
  } 

  // Polimorfismo 
  public exibirDados(): string{

    const status = this._emprestado ? "Sim" : "Não"
    
    return `Título: ${this._titulo} \n 
            Autor: ${this._autor}\n 
            ISBN: ${this._isbn}\n 
            Ano de Publicação: ${this._anoPublicacao}\n 
            Emprestado? ${status}\n`
  } 
}