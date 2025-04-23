import React from 'react';
import { createContext, useState, useContext } from 'react';

// Definindo o tipo para o contexto
type VideoContextType = {
  videoFile: File | null;
  videoUrl: string | null;
  isProcessing: boolean;
  processingProgress: number;
  processingStatus: string;
  setVideoFile: (file: File | null) => void;
  processVideo: (command?: string) => Promise<void>;
  cutVideo: (startTime: number, endTime: number) => Promise<void>;
  addAudio: (audioPath: string) => Promise<void>;
  applyViralMode: () => Promise<void>;
  addSubtitles: (text: string) => Promise<void>;
  exportVideo: () => Promise<string>;
  clearVideo: () => void;
};

// Criando o contexto com valores padrão
const VideoContext = createContext<VideoContextType>({
  videoFile: null,
  videoUrl: null,
  isProcessing: false,
  processingProgress: 0,
  processingStatus: '',
  setVideoFile: () => {},
  processVideo: async () => {},
  cutVideo: async () => {},
  addAudio: async () => {},
  applyViralMode: async () => {},
  addSubtitles: async () => {},
  exportVideo: async () => '',
  clearVideo: () => {},
});

// Hook personalizado para usar o contexto
export const useVideo = () => useContext(VideoContext);

// Provedor do contexto
export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');
  
  // Cache para evitar reprocessamento
  const [processedCache, setProcessedCache] = useState<Record<string, string>>({});

  // Função para atualizar o progresso
  const updateProgress = (progress: number, status: string) => {
    setProcessingProgress(progress);
    setProcessingStatus(status);
  };

  // Função para processar vídeo
  const processVideo = async (command?: string) => {
    if (!videoFile) return;
    
    setIsProcessing(true);
    updateProgress(0, 'Iniciando processamento...');
    
    // Verificar cache
    const cacheKey = `${videoFile.name}_${command || 'default'}`;
    if (processedCache[cacheKey]) {
      updateProgress(1.0, 'Recuperando do cache...');
      await new Promise(resolve => setTimeout(resolve, 500));
      setVideoUrl(processedCache[cacheKey]);
      setIsProcessing(false);
      return;
    }
    
    try {
      // Simulação de processamento para demonstração
      updateProgress(0.1, 'Preparando vídeo...');
      
      // Simular progresso
      for (let i = 1; i <= 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        updateProgress(i / 10, `Processando vídeo: ${i * 10}%`);
      }
      
      // Na implementação real, aqui seria usado FFmpeg.wasm para processar o vídeo
      
      // Criar URL para o vídeo processado (na implementação real, seria o resultado do processamento)
      const processedUrl = URL.createObjectURL(videoFile);
      setVideoUrl(processedUrl);
      
      // Adicionar ao cache
      setProcessedCache(prev => ({
        ...prev,
        [cacheKey]: processedUrl
      }));
      
    } catch (error) {
      updateProgress(0, `Erro: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Função para cortar vídeo
  const cutVideo = async (startTime: number, endTime: number) => {
    if (!videoFile) return;
    
    setIsProcessing(true);
    updateProgress(0, 'Preparando corte...');
    
    // Na implementação real, aqui seria usado FFmpeg.wasm para cortar o vídeo
    await processVideo(`cut_${startTime}_${endTime}`);
  };

  // Função para adicionar áudio
  const addAudio = async (audioPath: string) => {
    if (!videoFile) return;
    
    setIsProcessing(true);
    updateProgress(0, 'Adicionando áudio...');
    
    // Na implementação real, aqui seria usado FFmpeg.wasm para adicionar áudio ao vídeo
    await processVideo(`audio_${audioPath}`);
  };

  // Função para aplicar modo viral
  const applyViralMode = async () => {
    if (!videoFile) return;
    
    setIsProcessing(true);
    updateProgress(0, 'Aplicando modo viral...');
    
    // Na implementação real, aqui seria usado FFmpeg.wasm para aplicar efeitos virais
    await processVideo('viral_mode');
  };

  // Função para adicionar legendas
  const addSubtitles = async (text: string) => {
    if (!videoFile) return;
    
    setIsProcessing(true);
    updateProgress(0, 'Adicionando legendas...');
    
    // Na implementação real, aqui seria usado FFmpeg.wasm para adicionar legendas
    await processVideo(`subtitles_${text}`);
  };

  // Função para exportar vídeo
  const exportVideo = async (): Promise<string> => {
    if (!videoFile) throw new Error('Nenhum vídeo para exportar');
    
    setIsProcessing(true);
    updateProgress(0, 'Exportando vídeo...');
    
    try {
      // Simular progresso de exportação
      for (let i = 1; i <= 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 200));
        updateProgress(i / 10, `Exportando vídeo: ${i * 10}%`);
      }
      
      // Na implementação real, aqui seria usado FFmpeg.wasm para exportar o vídeo
      
      setIsProcessing(false);
      updateProgress(1.0, 'Exportação concluída!');
      
      return videoUrl || '';
    } catch (error) {
      setIsProcessing(false);
      updateProgress(0, `Erro na exportação: ${error}`);
      throw error;
    }
  };

  // Função para limpar vídeo
  const clearVideo = () => {
    setVideoFile(null);
    setVideoUrl(null);
    setIsProcessing(false);
    setProcessingProgress(0);
    setProcessingStatus('');
  };

  // Valores e funções fornecidos pelo contexto
  const value = {
    videoFile,
    videoUrl,
    isProcessing,
    processingProgress,
    processingStatus,
    setVideoFile: (file: File | null) => {
      setVideoFile(file);
      if (file) {
        setVideoUrl(URL.createObjectURL(file));
      } else {
        setVideoUrl(null);
      }
    },
    processVideo,
    cutVideo,
    addAudio,
    applyViralMode,
    addSubtitles,
    exportVideo,
    clearVideo,
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContext;
