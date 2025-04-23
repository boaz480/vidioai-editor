import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// Tipo para as opções de processamento de vídeo
export type VideoProcessingOptions = {
  command?: string;
  startTime?: number;
  endTime?: number;
  audioPath?: string;
  subtitles?: string;
  viralMode?: boolean;
};

// Classe para gerenciar o processamento de vídeo com FFmpeg
class FFmpegProcessor {
  private ffmpeg;
  private loaded = false;
  private progressCallback: ((progress: number) => void) | null = null;

  constructor() {
    this.ffmpeg = createFFmpeg({
      log: true,
      progress: ({ ratio }) => {
        if (this.progressCallback) {
          this.progressCallback(ratio);
        }
      },
    });
  }

  // Inicializar FFmpeg
  async load() {
    if (!this.loaded) {
      await this.ffmpeg.load();
      this.loaded = true;
    }
  }

  // Definir callback de progresso
  setProgressCallback(callback: (progress: number) => void) {
    this.progressCallback = callback;
  }

  // Processar vídeo com FFmpeg
  async processVideo(
    videoFile: File,
    options: VideoProcessingOptions = {}
  ): Promise<Blob> {
    try {
      // Garantir que FFmpeg está carregado
      await this.load();

      // Nome do arquivo de entrada
      const inputFileName = 'input.mp4';
      
      // Nome do arquivo de saída
      const outputFileName = 'output.mp4';

      // Escrever arquivo de entrada no sistema de arquivos virtual do FFmpeg
      this.ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoFile));

      // Construir comando FFmpeg baseado nas opções
      let command: string[] = [];

      // Entrada
      command.push('-i', inputFileName);

      // Cortar vídeo se startTime e endTime forem fornecidos
      if (options.startTime !== undefined && options.endTime !== undefined) {
        command.push('-ss', options.startTime.toString());
        command.push('-to', options.endTime.toString());
      }

      // Adicionar áudio se audioPath for fornecido
      if (options.audioPath) {
        // Na implementação real, precisaríamos primeiro carregar o arquivo de áudio
        // Aqui estamos assumindo que já temos o áudio no sistema de arquivos virtual
        command.push('-i', options.audioPath);
        command.push('-filter_complex', '[0:a]volume=1[a1];[1:a]volume=0.5[a2];[a1][a2]amix=inputs=2:duration=longest');
      }

      // Aplicar modo viral se viralMode for true
      if (options.viralMode) {
        command.push('-vf', 'eq=saturation=1.3,setpts=0.9*PTS');
        command.push('-af', 'atempo=1.1');
      }

      // Adicionar legendas se subtitles for fornecido
      if (options.subtitles) {
        // Criar arquivo de legendas
        const subtitleFile = 'subtitles.srt';
        const subtitleContent = `1\n00:00:00,000 --> 00:59:59,999\n${options.subtitles}`;
        this.ffmpeg.FS('writeFile', subtitleFile, new TextEncoder().encode(subtitleContent));
        
        command.push('-vf', `subtitles=${subtitleFile}:force_style='FontSize=24,PrimaryColour=&HFFFFFF&,OutlineColour=&H000000&,BorderStyle=3'`);
      }

      // Comando personalizado se fornecido
      if (options.command) {
        // Remover comandos existentes e usar o personalizado
        command = ['-i', inputFileName];
        
        // Dividir o comando em partes e adicionar
        const customParts = options.command
          .replace('{input}', inputFileName)
          .replace('{output}', outputFileName)
          .split(' ')
          .filter(part => part !== '-i' && part !== inputFileName && part !== outputFileName);
        
        command.push(...customParts);
      }

      // Adicionar arquivo de saída
      command.push(outputFileName);

      // Executar comando FFmpeg
      await this.ffmpeg.run(...command);

      // Ler arquivo de saída
      const data = this.ffmpeg.FS('readFile', outputFileName);
      
      // Criar blob a partir dos dados
      const blob = new Blob([data.buffer], { type: 'video/mp4' });
      
      // Limpar arquivos do sistema de arquivos virtual
      this.ffmpeg.FS('unlink', inputFileName);
      this.ffmpeg.FS('unlink', outputFileName);
      
      return blob;
    } catch (error) {
      console.error('Erro ao processar vídeo:', error);
      throw error;
    }
  }

  // Extrair frame de vídeo
  async extractFrame(videoFile: File, timeInSeconds: number): Promise<Blob> {
    try {
      // Garantir que FFmpeg está carregado
      await this.load();

      // Nome do arquivo de entrada
      const inputFileName = 'input.mp4';
      
      // Nome do arquivo de saída
      const outputFileName = 'frame.jpg';

      // Escrever arquivo de entrada no sistema de arquivos virtual do FFmpeg
      this.ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoFile));

      // Executar comando FFmpeg para extrair frame
      await this.ffmpeg.run(
        '-i', inputFileName,
        '-ss', timeInSeconds.toString(),
        '-frames:v', '1',
        outputFileName
      );

      // Ler arquivo de saída
      const data = this.ffmpeg.FS('readFile', outputFileName);
      
      // Criar blob a partir dos dados
      const blob = new Blob([data.buffer], { type: 'image/jpeg' });
      
      // Limpar arquivos do sistema de arquivos virtual
      this.ffmpeg.FS('unlink', inputFileName);
      this.ffmpeg.FS('unlink', outputFileName);
      
      return blob;
    } catch (error) {
      console.error('Erro ao extrair frame:', error);
      throw error;
    }
  }
}

// Exportar instância singleton
export const ffmpegProcessor = new FFmpegProcessor();
