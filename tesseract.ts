import Tesseract from 'tesseract.js';

// Classe para gerenciar o reconhecimento de texto com Tesseract.js
class TesseractProcessor {
  private worker: Tesseract.Worker | null = null;
  private progressCallback: ((progress: number) => void) | null = null;

  constructor() {
    // Inicializar worker sob demanda
  }

  // Inicializar worker do Tesseract
  private async getWorker() {
    if (!this.worker) {
      this.worker = await Tesseract.createWorker('por');
      
      // Configurar idioma português
      await this.worker.loadLanguage('por');
      await this.worker.initialize('por');
    }
    return this.worker;
  }

  // Definir callback de progresso
  setProgressCallback(callback: (progress: number) => void) {
    this.progressCallback = callback;
  }

  // Reconhecer texto em uma imagem
  async recognizeText(imageFile: File | Blob): Promise<string> {
    try {
      const worker = await this.getWorker();
      
      // Converter File/Blob para URL
      const imageUrl = URL.createObjectURL(imageFile);
      
      // Reconhecer texto
      const result = await worker.recognize(imageUrl, {
        logger: progress => {
          if (this.progressCallback) {
            // Mapear progresso do Tesseract (0-1) para nosso formato
            this.progressCallback(progress.progress);
          }
        }
      });
      
      // Liberar URL
      URL.revokeObjectURL(imageUrl);
      
      return result.data.text;
    } catch (error) {
      console.error('Erro ao reconhecer texto:', error);
      throw error;
    }
  }

  // Terminar worker quando não for mais necessário
  async terminate() {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }
}

// Exportar instância singleton
export const tesseractProcessor = new TesseractProcessor();
