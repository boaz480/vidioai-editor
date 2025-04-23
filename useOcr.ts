import { useState } from 'react';
import { tesseractProcessor } from '../lib/tesseract';

// Hook personalizado para reconhecimento de texto (OCR)
export const useOcr = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [detectedText, setDetectedText] = useState('');

  // Processar imagem com Tesseract
  const recognizeText = async (imageFile: File | Blob) => {
    if (!imageFile) {
      setError('Nenhuma imagem fornecida');
      return '';
    }

    try {
      setIsProcessing(true);
      setProgress(0);
      setError(null);

      // Definir callback de progresso
      tesseractProcessor.setProgressCallback(setProgress);

      // Reconhecer texto
      const text = await tesseractProcessor.recognizeText(imageFile);
      setDetectedText(text);

      setProgress(1);
      return text;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao reconhecer texto';
      setError(errorMessage);
      return '';
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    recognizeText,
    isProcessing,
    progress,
    error,
    detectedText
  };
};
