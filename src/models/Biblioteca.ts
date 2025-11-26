import { Membro } from "./Membro";
import { Livro } from "./Livro";
import { Emprestimo } from "./Emprestimo";
import { GerenciadorArquivos } from "../utils/GerenciadorArquivos";


export class Biblioteca {
  private _livros : Livro[];
  private _membros : Membro[];
  private _emprestimos : Emprestimo[];

  constructor(){
    this._livros = [];
    this._membros = [];
    this._emprestimos = [];
    this.carregarDados();
  }

  // CARREGAR DADOS ------------------------------------------------------------------------
  private carregarDados(): void {
    // Carrega LIVROS
    const dadosLivros = GerenciadorArquivos.carregarDados('livros.json')

    this._livros = dadosLivros.map((dados: any) => 
    new Livro(dados._titulo, dados._autor, dados._isbn, dados._anoPublicacao)
  )
  // Ajusta o status de empréstimo
  this._livros.forEach((livro, index) => livro.emprestado = dadosLivros[index]._emprestado)

  // Carrega MEMBROS
  const dadosMembros = GerenciadorArquivos.carregarDados('membros.json')

  this._membros = dadosMembros.map((dados: any) =>
    new Membro(dados._nome, dados._endereco, dados._telefone, dados._matricula)
)
  // Carrega EMPRESTIMOS 
 /**
  * 
  * 
  * AGUARDANDO
  * 
  */

  }

  // CADASTROS | Livro + Membro ------------------------------------------------------------
  public adicionarLivro(novoLivro: Livro): void {
    this._livros.push(novoLivro)
    GerenciadorArquivos.salvarDados('livros.json', this._livros)
    console.log(`📕 Livro ${novoLivro.titulo} adicionado.`)
  }

  public adicionarMembro(novoMembro: Membro): void {
    this._membros.push(novoMembro)
    GerenciadorArquivos.salvarDados('membros.json', this._membros);
    console.log(`👤 Membro ${novoMembro} foi adicionado`)
  }

  // BUSCAS | Livros Disponíveis + Livro pelo ISBN + Membro pela Matrícula -----------------
  public listarLivrosDisponiveis(): string {
    console.log("\n--- Livros Disponíveis ---");
    const livrosDisponiveis = this._livros.filter((livro) => !livro.emprestado);
    if (livrosDisponiveis.length === 0) {
      return " 🚫 Não há livros disponíveis para emprestimo..."
    } 
      return livrosDisponiveis.map((livro) => livro.exibirDados()).join("\n")
  
    }

  public listarEmprestimos(): string {
    console.log("\n--- Livros Emprestados ---");
    const livrosEmprestados = this._livros.filter((livro) => livro.emprestado);
    if (livrosEmprestados.length === 0) {
      return " 🚫 Não há livros emprestados..."
    } 
      return livrosEmprestados.map((livro) => livro.exibirDados()).join("\n")
  
    }


  public listarMembros(): string {
    console.log("\n--- Membros ---");
    const membros = this._membros.filter((membro) => membro.nome);
    if (membros.length === 0) {
      return " 🚫 Não há membros cadastrados..."
    } 
      return membros.map((livro) => livro.exibirDados()).join("\n")
  }

  public buscarLivroPorISNB(isbn: string): Livro | undefined {
    return this._livros.find(livro => livro.isbn === isbn)
  }

  public buscarMembroPorMatricula(matricula: string): Membro | undefined {
    return this._membros.find(m => m.matricula === matricula)
  }


  // REALIZAR EMPRÉSTIMO ------------------------------------------------------------------
  public realizarEmprestimo (livro : Livro, membro : Membro): void {
    if(livro.emprestado) {
      console.log(`O livro ${livro} já está emprestado`)
      return
    } 
      const novoEmprestimo = new Emprestimo(livro, membro)
      this._emprestimos.push(novoEmprestimo)
      livro.emprestado = true
      
      // Atualiza o arquivo de livros
      GerenciadorArquivos.salvarDados('livros.json', this._livros)
      console.log(`Realizado Empréstimo do livro "${livro.titulo}" para ${membro.nome}.`);
  }

  // REALIZAR DEVOLUÇÃO ------------------------------------------------------------------
  public realizarDevolucao (livro: Livro): void {
    const emprestimoAtivo = this._emprestimos.find(
      emprestimo => emprestimo.livro === livro && emprestimo.dataDevolucao === null
    )
    if (!emprestimoAtivo) {
      console.log("NÃO FOI ENCONTRADO EMPRÉSTIMO PARA ESTE LIVRO")
    return
    }
    emprestimoAtivo.devolverLivro();
    // Atualiza o arquivo de livros
    GerenciadorArquivos.salvarDados('livros.json', this._livros)
    console.log(`Realizada devolução do livro "${livro.titulo}`);
  }
  
}