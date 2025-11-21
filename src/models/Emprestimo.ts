import { Livro } from "./Livro";
import { Membro } from "./Membro";

export class Emprestimo {
  
  // Encapsulamento
  private _livro: Livro;
  private _membro: Membro;
  private _dataEmprestimo: Date;
  private _dataDevolucao: Date | null; // Inicia nulo, sem devolução

  constructor(livro: Livro, membro: Membro) {
  this._livro = livro;
  this._membro =  membro;
  this._dataEmprestimo = new Date()   // Data atual automática
  this._dataDevolucao = null;         // Inicia sem data
  }

  // Getters
  public get livro(): Livro {
    return this._livro;
  }

  public get membro(): Membro {
    return this._membro;
  }

  public get dataEmprestimo(): Date {
    return this._dataEmprestimo;
  }

  public get dataDevolucao(): Date | null {
    return this._dataDevolucao;
  }

  //  Lógica Complexa aqui, não é Setter
  public devolverLivro(): void {
    this._dataDevolucao = new Date(); // Data de hoje
    this._livro.emprestado = false; // Utilizando Associação - Libera o Livro
    
  }

}