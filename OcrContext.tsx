import React from 'react';
import { createContext, useState, useContext } from 'react';

// Definindo o tipo para o contexto
type OcrContextType = {
  detectedText: string;
  imageUrl: string | null;
  videoUrl: string | null;
  isProcessing: boolean;
  processingProgress: number;
  processingStatus: string;
  textReplacements: Record<string, string>;
  processImage: (imageUrl: string) => Promise<void>;
  extractFrameFromVideo: (videoUrl: string, timeInSeconds: number) => Promise<void>;
  addTextReplacement: (original: string, replacement: string) => void;
  clearTextReplacements: () => void;
  applyTextReplacements: () => Promise<string | null>;
};

// Criando o contexto com valores padrão
const OcrContext = createContext<OcrContextType>({
  detectedText: '',
  imageUrl: null,
  videoUrl: null,
  isProcessing: false,
  processingProgress: 0,
  processingStatus: '',
  textReplacements: {},
  processImage: async () => {},
  extractFrameFromVideo: async () => {},
  addTextReplacement: () => {},
  clearTextReplacements: () => {},
  applyTextReplacements: async () => null,
});

// Hook personalizado para usar o contexto
export const useOcr = () => useContext(OcrContext);

// Provedor do contexto
export const OcrProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [detectedText, setDetectedText] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');
  const [textReplacements, setTextReplacements] = useState<Record<string, string>>({});
  
  // Cache para resultados de OCR
  const [ocrCache, setOcrCache] = useState<Record<string, string>>({});

  // Função para atualizar o progresso
  const updateProgress = (progress: number, status: string) => {
    setProcessingProgress(progress);
    setProcessingStatus(status);
  };

  // Função para processar imagem
  const processImage = async (imageUrl: string) => {
    setIsProcessing(true);
    updateProgress(0.2, 'Iniciando reconhecimento de texto...');
    setImageUrl(imageUrl);
    
    try {
      // Verificar cache
      if (ocrCache[imageUrl]) {
        updateProgress(1.0, 'Recuperando do cache...');
        await new Promise(resolve => setTimeout(resolve, 500));
        setDetectedText(ocrCache[imageUrl]);
        setIsProcessing(false);
        return;
      }
      
      updateProgress(0.4, 'Analisando imagem...');
      
      // Na implementação real, aqui seria usado Tesseract.js para OCR
      // Simulação para demonstração
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Texto de exemplo detectado
      const exampleText = "Este é um texto de exemplo que seria detectado pelo OCR. O texto real dependeria da imagem processada.";
      setDetectedText(exampleText);
      
      // Adicionar ao cache
      setOcrCache(prev => ({
        ...prev,
        [imageUrl]: exampleText
      }));
      
      updateProgress(1.0, 'Texto detectado com sucesso!');
    } catch (error) {
      setDetectedText(`Erro ao processar texto: ${error}`);
      updateProgress(0.0, 'Falha no reconhecimento de texto');
    } finally {
      setIsProcessing(false);
    }
  };

  // Função para extrair frame de vídeo
  const extractFrameFromVideo = async (videoUrl: string, timeInSeconds: number) => {
    setIsProcessing(true);
    updateProgress(0.1, 'Extraindo frame do vídeo...');
    setVideoUrl(videoUrl);
    
    try {
      // Na implementação real, aqui seria usado FFmpeg.wasm para extrair o frame
      // Simulação para demonstração
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // URL de imagem de exemplo (na implementação real, seria o frame extraído)
      const frameUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
      setImageUrl(frameUrl);
      
      updateProgress(0.5, 'Frame extraído, processando texto...');
      await processImage(frameUrl);
    } catch (error) {
      updateProgress(0.0, `Erro: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Função para adicionar substituição de texto
  const addTextReplacement = (original: string, replacement: string) => {
    setTextReplacements(prev => ({
      ...prev,
      [original]: replacement
    }));
  };

  // Função para limpar substituições de texto
  const clearTextReplacements = () => {
    setTextReplacements({});
  };

  // Função para aplicar substituições de texto
  const applyTextReplacements = async (): Promise<string | null> => {
    if (!videoUrl || Object.keys(textReplacements).length === 0) return null;
    
    setIsProcessing(true);
    updateProgress(0.1, 'Preparando substituições de texto...');
    
    try {
      // Na implementação real, aqui seria usado FFmpeg.wasm para aplicar legendas
      // Simulação para demonstração
      updateProgress(0.3, 'Gerando arquivo de legendas...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      updateProgress(0.5, 'Aplicando legendas ao vídeo...');
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // URL de vídeo de exemplo (na implementação real, seria o vídeo com legendas)
      const resultUrl = videoUrl;
      
      updateProgress(1.0, 'Textos substituídos com sucesso!');
      return resultUrl;
    } catch (error) {
      updateProgress(0.0, `Erro: ${error}`);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  // Valores e funções fornecidos pelo contexto
  const value = {
    detectedText,
    imageUrl,
    videoUrl,
    isProcessing,
    processingProgress,
    processingStatus,
    textReplacements,
    processImage,
    extractFrameFromVideo,
    addTextReplacement,
    clearTextReplacements,
    applyTextReplacements,
  };

  return (
    <OcrContext.Provider value={value}>
      {children}
    </OcrContext.Provider>
  );
};

export default OcrContext;
