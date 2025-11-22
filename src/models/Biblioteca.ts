import { Emprestimo } from "./Emprestimo";
import { Livro } from "./Livro";
import { Membro } from "./Membro";

export class Biblioteca {
  private _livros : Livro[];
  private _membros : Membro[];
  private _emprestimos : Emprestimo[];

  constructor(){
    this._livros = [];
    this._membros = [];
    this._emprestimos = [];
  }

  // Cadastros | Livro + Membro
  public adicionarLivro(novoLivro: Livro): void {
    this._livros.push(novoLivro)
    console.log(`📕 Livro ${novoLivro.titulo} adicionado.`)
  }

  public adicionarMembro(novoMembro: Membro): void {
    this._membros.push(novoMembro)
    console.log(`👤 Membro ${novoMembro} foi adicionado`)
  }

  // Buscas | Livros Disponíveis + Livro pelo ISBN + Membro pela Matrícula
  public listarLivrosDisponiveis(): string {
    const livrosDisponiveis = this._livros.filter((livro) => livro.emprestado === false);
    if (livrosDisponiveis.length === 0) {
      return " 🚫 Não há livros disponíveis para emprestimo..."
    } 
      return livrosDisponiveis.map((livro) => livro.exibirDados()).join("\n")
  }

  public buscarLivro(isbn: string): Livro | undefined {
    return this._livros.find(livro => livro.isbn === isbn)
  }

  public buscarMembro(matricula: string): Membro | undefined {
    return this._membros.find(m => m.matricula === matricula)
  }

  // EMPRÉSTIMO
  public realizarEmprestimo (livro : Livro, membro : Membro): boolean {
    if(livro.emprestado) {
      return false // Ocorreu alguma falha
    } 
      const emprestimo = new Emprestimo(livro, membro)
      this._emprestimos.push(emprestimo)
      livro.emprestado = true
      return true // Deu certo!
  }


}