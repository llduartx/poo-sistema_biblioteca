import { error } from "console";
import { Biblioteca } from "../src/models/Biblioteca";
import { Emprestimo } from "../src/models/Emprestimo";
import { Livro } from "../src/models/Livro";
import { Membro } from "../src/models/Membro";

describe('Sistema de Biblioteca', () => {
  let  biblioteca : Biblioteca

  beforeEach(() => {
    biblioteca = new Biblioteca()
  })

  test('Deve cadastrar e encontrar um livro pelo seu ISBN', () => {
    
    // Cenário
    const livro = new Livro('Clean Code', 'Robert Martin', '12345', 2008)
    
    // Execução
    biblioteca.adicionarLivro(livro)
    const livroEncontrado = biblioteca.buscarLivro('12345')

    // Validação
    expect(livroEncontrado).toBeDefined();
    expect(livroEncontrado?.titulo).toBe('Clean Code');
    expect(livroEncontrado?.emprestado).toBe(false);

  })

  test('Deve adicionar e encontrar um membro pela sua matricula', () => {
    // Cenário
    const membro = new Membro('Gabriel Schug', 'Pelotas, RS', '55984840000', '1234');
  
    // Execução
    biblioteca.adicionarMembro(membro);
    const membroEncontrado = biblioteca.buscarMembro('1234');
  
    // Validação
    expect(membroEncontrado).toBeDefined();
    expect(membroEncontrado?.matricula).toBe('1234');
  })


  // Teste 3: Lógica de Empréstimo (Sucesso)
  test('Deve realizar o empréstimo de livro disponível',() => {
    // Cenário
    const livro = new Livro('Clean Code', 'Robert Martin', '12345', 2008)
    const membro = new Membro('Gabriel Schug', 'Pelotas, RS', '55984840000', '1234');

    // Execução
    biblioteca.adicionarLivro(livro)
    biblioteca.adicionarMembro(membro)

    const emprestar = biblioteca.realizarEmprestimo(livro, membro)

    // Validação
    expect(emprestar).toBe(true)
    expect(livro.emprestado).toBe(true)
  })

  // Teste 4: Lógica de Bloqueio (Falha Esperada)
  // Cenário
    test('Deve lançar erro ao tentar realizar emprestimo de livro emprestado', () => {
      const livro = new Livro('Clean Code', 'Robert Martin', '12345', 2008)
      const membro1 = new Membro('Gabriel Schug', 'Pelotas, RS', '55984840000', '1234');
      const membro2 = new Membro('Joaquim Duarte', 'Pelotas, RS', '55984840000', '4321');
  
      // Execução
      biblioteca.adicionarLivro(livro)
      biblioteca.adicionarMembro(membro1)
      biblioteca.adicionarMembro(membro2)
      
      biblioteca.realizarEmprestimo(livro, membro1)
      const emprestimo2 = biblioteca.realizarEmprestimo(livro, membro2)
      

      // Validação
      expect(emprestimo2).toBe(false)
      expect(livro.emprestado).toBe(true)
    })

})