import { useEffect, useState } from 'react';
import { ffmpegProcessor, VideoProcessingOptions } from '../lib/ffmpeg';

// Hook personalizado para processamento de vídeo
export const useVideoProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);

  // Limpar URL quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (processedVideoUrl) {
        URL.revokeObjectURL(processedVideoUrl);
      }
    };
  }, [processedVideoUrl]);

  // Processar vídeo com FFmpeg
  const processVideo = async (videoFile: File, options: VideoProcessingOptions = {}) => {
    if (!videoFile) {
      setError('Nenhum arquivo de vídeo fornecido');
      return null;
    }

    try {
      setIsProcessing(true);
      setProgress(0);
      setError(null);

      // Definir callback de progresso
      ffmpegProcessor.setProgressCallback(setProgress);

      // Processar vídeo
      const processedBlob = await ffmpegProcessor.processVideo(videoFile, options);

      // Criar URL para o vídeo processado
      const url = URL.createObjectURL(processedBlob);
      setProcessedVideoUrl(url);

      setProgress(1);
      return url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao processar vídeo';
      setError(errorMessage);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  // Extrair frame de vídeo
  const extractFrame = async (videoFile: File, timeInSeconds: number) => {
    if (!videoFile) {
      setError('Nenhum arquivo de vídeo fornecido');
      return null;
    }

    try {
      setIsProcessing(true);
      setProgress(0);
      setError(null);

      // Definir callback de progresso
      ffmpegProcessor.setProgressCallback(setProgress);

      // Extrair frame
      const frameBlob = await ffmpegProcessor.extractFrame(videoFile, timeInSeconds);

      // Criar URL para o frame
      const url = URL.createObjectURL(frameBlob);

      setProgress(1);
      return url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao extrair frame';
      setError(errorMessage);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processVideo,
    extractFrame,
    isProcessing,
    progress,
    error,
    processedVideoUrl
  };
};
