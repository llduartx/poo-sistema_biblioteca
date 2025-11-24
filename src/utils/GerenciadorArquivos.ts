import fs from 'fs';
import path from 'path';

export class GerenciadorArquivos {
  
  private static readonly DIRETORIO = 'dados';

  private static garantirDiretorio(): void {
    if (!fs.existsSync(this.DIRETORIO)) {
      fs.mkdirSync(this.DIRETORIO, { recursive: true });
    }
  }

  public static salvarDados(nomeArquivo: string, dados: any[]): void {
    try {
      this.garantirDiretorio();
      const caminho = path.join(this.DIRETORIO, `${nomeArquivo}.json`);
      fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), 'utf-8');
      console.log(`✅ Dados salvos em ${nomeArquivo}.json`);
    } catch (erro) {
      console.error(`❌ Erro ao salvar: ${erro}`);
    }
  }

  public static carregarDados(nomeArquivo: string): any[] {
    try {
      const caminho = path.join(this.DIRETORIO, `${nomeArquivo}.json`);
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
