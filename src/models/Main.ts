import Prompt from "prompt-sync";
import { Biblioteca } from "./Biblioteca";
import { Membro } from "./Membro";
import { Livro } from "./Livro";
import { GerenciadorArquivos } from "../utils/GerenciadorArquivos";

const teclado = Prompt();
const biblioteca = new Biblioteca();

while (true) {
    console.log("\n=== SISTEMA DE BIBLIOTECA ===");
    console.log("1. Adicionar Membro");
    console.log("2. Adicionar Livro");
    console.log("3. Realizar Empréstimo");
    console.log("4. Listar Livros Disponíveis");
    console.log("9. Sair");
    console.log("=============================");

    const opcao: number = +teclado("Escolha uma opção: ");

    switch (opcao) {
        case 1:
            const nome = teclado("Nome: ");
            const endereco = teclado("Endereço: ");
            const telefone = teclado("Telefone: ");
            const matricula = teclado("Matrícula: ");
            
            const membro = new Membro(nome, endereco, telefone, matricula);
            biblioteca.adicionarMembro(membro);
            break;

        case 2:
            const titulo = teclado("Título: ");
            const autor = teclado("Autor: ");
            const isbn = teclado("ISBN: ");
            const ano = +teclado("Ano: ");
            
            const livro = new Livro(titulo, autor, isbn, ano);
            biblioteca.adicionarLivro(livro);
            break;

        case 3:
            const matBusca = teclado("Matrícula do membro: ");
            const isbnBusca = teclado("ISBN do livro: ");
            
            const membroBusca = biblioteca.buscarMembro(matBusca);
            const livroBusca = biblioteca.buscarLivro(isbnBusca);
            
            if (membroBusca && livroBusca) {
                const resultado = biblioteca.realizarEmprestimo(livroBusca, membroBusca);
                if (resultado) {
                    console.log("✅ Empréstimo realizado!");
                } else {
                    console.log("❌ Livro já está emprestado!");
                }
            } else {
                console.log("❌ Membro ou livro não encontrado!");
            }
            break;

        case 4:
            console.log("\n" + biblioteca.listarLivrosDisponiveis());
            break;

        case 9:
            GerenciadorArquivos.salvarDados('membros', []);
            GerenciadorArquivos.salvarDados('livros', []);
            console.log("Até logo!");
            break;

        default:
            console.log("❌ Opção inválida!");
    }
}