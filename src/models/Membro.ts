import { Pessoa } from "./Pessoa";

export class Membro extends Pessoa {
  
  // Encapsulamento
  private _matricula: string = "";

  constructor(nome: string, endereco: string, telefone: string, matricula: string) {
    super(nome, endereco, telefone)
    this._matricula = matricula;
  }

  // Get - para busca de informações
  public get matricula(): string{
    return this._matricula
  }

  // Polimorfismo (!! Fazer no final)
  public override exibirDados(): string{
    return `${super.exibirDados} - Matricula: ${this._matricula}`
  } 
}