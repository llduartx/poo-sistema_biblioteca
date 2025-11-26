import Prompt from "prompt-sync";
import { Biblioteca } from "./Biblioteca";
import { Membro } from "./Membro";
import { Livro } from "./Livro";
import { GerenciadorArquivos } from "../utils/GerenciadorArquivos";

const teclado = Prompt();
const biblioteca = new Biblioteca();

function main() {
    let executando = true

    while (executando) {
        console.log(`\n=== SISTEMA DE BIBLIOTECA ===
1. Adicionar Livro
2. Adicionar Membro\n
3. Listar Livros Disponíveis
4. Listar Membros\n
5. Realizar Empréstimo
6. Devolver Livro\n
7. Listar Emprestimos Ativos\n
8. Remover Membro\n
9. Remover Livro\n
0. Sair
=============================
            `)

        const opcao: number = +teclado("Escolha uma opção: ");

        switch (opcao) {

            case 1:
                const titulo = teclado("Título: ");
                const autor = teclado("Autor: ");
                const ISBN = teclado("ISBN: ");
                const ano = +teclado("Ano: ");
                
                const livro = new Livro(titulo, autor, ISBN, ano);
                biblioteca.adicionarLivro(livro);
                break;

            case 2:
                const nome = teclado("Nome: ");
                const endereco = teclado("Endereço: ");
                const telefone = teclado("Telefone: ");
                const matricula = teclado("Matrícula: ");
                
                const membro = new Membro(nome, endereco, telefone, matricula);
                biblioteca.adicionarMembro(membro);
                break;

            case 3:
                biblioteca.listarLivrosDisponiveis()
                teclado('\n Pressione ENTER para continuar ...')
                break;
                
            case 4:
                biblioteca.listarMembros()
                teclado('\n Pressione ENTER para continuar ...')
                break;

            case 5:
                const ISBNEmprestado = teclado('Digite o ISBN do livro: ') || '';
                const livroEmprestado = biblioteca.buscarLivroPorISNB(ISBNEmprestado)

                if(livroEmprestado) {
                    const matriculaMembroEmprestado = teclado('Digite a Matricula do Membro: ') ||'';
                    const membroEmprestado = biblioteca.buscarMembroPorMatricula(matriculaMembroEmprestado)
                    
                    if(membroEmprestado) {
                        biblioteca.realizarEmprestimo(livroEmprestado, membroEmprestado)
                    } else {
                        console.log('Membro não encontrado');
                    }
                } else {
                    console.log('Livro não Encontrado');
                }
                teclado('\n Pressione ENTEER para continuar...')
            break;

            case 6:
                console.log("\n--- Devolução de Livro ---");
                const ISBNDevolucao = teclado('Digite o ISBN do livro: ')|| '';
                const LivroDevolucao = biblioteca.buscarLivroPorISNB(ISBNDevolucao)
                
                if(LivroDevolucao) {
                    biblioteca.realizarDevolucao(LivroDevolucao)
                } else {
                    console.log("Livro não encontrado!");
                }
                teclado('\n Pressione ENTER pra continuar...')
                break;
                
            case 7:
                biblioteca.listarEmprestimos()
                teclado('\n Pressione ENTER pra continuar...')
            break;

            case 8:
                const matriculaRemover = teclado('Digite a matrícula do membro a ser removido: ') || '';
                biblioteca.removerMembro(matriculaRemover);
                teclado('\n Membro removido com sucesso, Pressione ENTER para continuar ...')
            break;

            case 9:
                const isbnRemover = teclado('Digite o ISBN do livro a ser removido: ') || '';
                biblioteca.removerLivro(isbnRemover);
                teclado('\n Livro removido, Pressione ENTER para continuar ...')
            break;

            case 0:
                executando = false;
                console.log('Saindo do sistema...');
                break;

            default:
                console.log("❌ Opção inválida!");
        }
    }
}
main();
