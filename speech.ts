import { useState, useEffect } from 'react';

// Interface para o hook de reconhecimento de voz
interface UseSpeechRecognitionReturn {
  transcript: string;
  listening: boolean;
  browserSupportsSpeechRecognition: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

// Hook personalizado para reconhecimento de voz
export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [browserSupports, setBrowserSupports] = useState(false);

  // Inicializar reconhecimento de voz
  useEffect(() => {
    // Verificar suporte do navegador
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      // Configurar reconhecimento
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'pt-BR';
      
      // Configurar eventos
      recognitionInstance.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };
      
      recognitionInstance.onend = () => {
        setListening(false);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Erro de reconhecimento de voz:', event.error);
        setListening(false);
      };
      
      setRecognition(recognitionInstance);
      setBrowserSupports(true);
    } else {
      setBrowserSupports(false);
    }
    
    // Limpar ao desmontar
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  // Iniciar reconhecimento
  const startListening = () => {
    if (recognition && !listening) {
      try {
        recognition.start();
        setListening(true);
      } catch (error) {
        console.error('Erro ao iniciar reconhecimento:', error);
      }
    }
  };

  // Parar reconhecimento
  const stopListening = () => {
    if (recognition && listening) {
      recognition.stop();
      setListening(false);
    }
  };

  // Resetar transcrição
  const resetTranscript = () => {
    setTranscript('');
  };

  return {
    transcript,
    listening,
    browserSupportsSpeechRecognition: browserSupports,
    startListening,
    stopListening,
    resetTranscript
  };
};

// Interface para o hook de síntese de voz
interface UseSpeechSynthesisReturn {
  speak: (text: string) => void;
  cancel: () => void;
  speaking: boolean;
  supported: boolean;
}

// Hook personalizado para síntese de voz
export const useSpeechSynthesis = (): UseSpeechSynthesisReturn => {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  // Verificar suporte do navegador
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSupported(true);
    }
  }, []);

  // Falar texto
  const speak = (text: string) => {
    if (!supported) return;
    
    // Cancelar qualquer fala anterior
    cancel();
    
    // Criar nova instância de fala
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configurar idioma e voz
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Configurar eventos
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    
    // Iniciar fala
    window.speechSynthesis.speak(utterance);
  };

  // Cancelar fala
  const cancel = () => {
    if (supported) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  return {
    speak,
    cancel,
    speaking,
    supported
  };
};
