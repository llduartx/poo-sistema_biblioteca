// Classe abstrata - para não ser instanciada
export abstract class Pessoa {
  
  // Encapsulamento - herança
  protected _nome: string = "";
  protected _endereco: string = "";
  protected _telefone: string = "";

  constructor(nome: string, endereco: string, telefone: string) {
    this._nome = nome;
    this._endereco = endereco;
    this._telefone = telefone;
  }

  
  // Getters - para busca de informações
  public get nome(): string{
    return this._nome
  }

  public get endereco(): string{
    return this._endereco
  }

    public get telefone(): string{
    return this._telefone
  }

  
  // Setters - para atualizações de cadastro
  public set endereco(novoEndereço: string) {
    this._endereco = novoEndereço
  }

  public set telefone(novoTelefone: string) {
    this._telefone = novoTelefone
  }


  // Polimorfismo (!! Fazer no final)
  public exibirDados(): string{
    return `Nome: ${this._nome}, Telefone: ${this._telefone}`
  } 
}