import fs from 'fs';
import path from 'path';

export class GerenciadorArquivos {
  
  private static readonly DIRETORIO = 'dados';


  // CRIA A PASTA DADOS, SE NÃO EXISTIR --------------------------------------------------
  private static garantirDiretorio(): void {
    if (!fs.existsSync(this.DIRETORIO)) {
      fs.mkdirSync(this.DIRETORIO);
    }
  }

  // SALVA QUALQUER ENTRADA DE DADOS EM UM ARQUIVO JSON -----------------------------------
  public static salvarDados(nomeArquivo: string, dados: any[]): void {
    this.garantirDiretorio();
    
    const caminhoPastaDados = `${this.DIRETORIO}/${nomeArquivo}`;
    // Converte array em JSON
    const DadosEmJSON = JSON.stringify(dados, null, 2)

    try {

      fs.writeFileSync(caminhoPastaDados, DadosEmJSON, 'utf-8');
      console.log(`✅ Dados salvos em ${nomeArquivo}`);
    } catch (erro) {
      console.error(`❌ Erro ao salvar: ${erro}`);
    }
  }

  // CARREGA UM ARQUIVO JSON E RETORNA OS DADOS -----------------------------------------------
  public static carregarDados(nomeArquivo: string): any[] {
    const caminho = path.join(this.DIRETORIO, `${nomeArquivo}`);

    try {
      if (!fs.existsSync(caminho)) {
        return [];
      }
      const conteudo = fs.readFileSync(caminho, 'utf-8');
      return JSON.parse(conteudo);
    } catch (erro) {
      console.error(`❌ Erro ao carregar: ${erro}`);
      return [];
    }
  }

}