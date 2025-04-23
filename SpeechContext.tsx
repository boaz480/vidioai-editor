import React from 'react';
import { createContext, useState, useContext } from 'react';

// Definindo o tipo para o contexto
type SpeechContextType = {
  isListening: boolean;
  transcript: string;
  confidence: number;
  startListening: () => Promise<void>;
  stopListening: () => void;
  speak: (text: string) => Promise<void>;
  processCommand: (command: string) => Promise<string>;
};

// Criando o contexto com valores padrão
const SpeechContext = createContext<SpeechContextType>({
  isListening: false,
  transcript: '',
  confidence: 0,
  startListening: async () => {},
  stopListening: () => {},
  speak: async () => {},
  processCommand: async () => '',
});

// Hook personalizado para usar o contexto
export const useSpeech = () => useContext(SpeechContext);

// Provedor do contexto
export const SpeechProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);

  // Função para iniciar o reconhecimento de voz
  const startListening = async () => {
    // Verificar se o navegador suporta reconhecimento de voz
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Seu navegador não suporta reconhecimento de voz. Tente usar Chrome ou Edge.');
      return;
    }

    try {
      setIsListening(true);
      
      // Na implementação real, aqui seria usado Web Speech API
      // Simulação para demonstração
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simular recebimento de transcrição após alguns segundos
      setTimeout(() => {
        setTranscript('Adicione música lo-fi');
        setConfidence(0.92);
        setIsListening(false);
      }, 3000);
      
    } catch (error) {
      console.error('Erro ao iniciar reconhecimento de voz:', error);
      setIsListening(false);
    }
  };

  // Função para parar o reconhecimento de voz
  const stopListening = () => {
    setIsListening(false);
    // Na implementação real, aqui seria interrompido o Web Speech API
  };

  // Função para sintetizar voz
  const speak = async (text: string) => {
    // Verificar se o navegador suporta síntese de voz
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta síntese de voz. Tente usar Chrome ou Edge.');
      return;
    }

    try {
      // Na implementação real, aqui seria usado Web Speech API (SpeechSynthesis)
      // Simulação para demonstração
      console.log(`Falando: ${text}`);
      await new Promise(resolve => setTimeout(resolve, text.length * 50));
    } catch (error) {
      console.error('Erro ao sintetizar voz:', error);
    }
  };

  // Função para processar comandos
  const processCommand = async (command: string): Promise<string> => {
    const lowerCommand = command.toLowerCase();
    
    // Simulação de processamento de comando para demonstração
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Lógica de interpretação de comandos
    if (lowerCommand.includes('corte') && lowerCommand.includes('silencio')) {
      return 'process_video';
    } else if (lowerCommand.includes('corte entre') || lowerCommand.includes('cortar entre')) {
      // Extrair tempos do comando
      const regExp = RegExp(/(\d+):(\d+)/g);
      const matches = [...lowerCommand.matchAll(regExp)];
      
      if (matches.length >= 2) {
        const start = matches[0];
        const end = matches[1];
        
        const startSeconds = parseInt(start[1]) * 60 + parseInt(start[2]);
        const endSeconds = parseInt(end[1]) * 60 + parseInt(end[2]);
        
        return `cut_video:${startSeconds}:${endSeconds}`;
      }
    } else if (lowerCommand.includes('modo viral')) {
      return 'viral_mode';
    } else if (lowerCommand.includes('legenda') || lowerCommand.includes('subtítulo')) {
      const textMatch = RegExp(/legenda:?\s*(.+)$|subtítulo:?\s*(.+)$/i).exec(lowerCommand);
      if (textMatch) {
        const text = textMatch[1] || textMatch[2] || '';
        return `add_subtitles:${text}`;
      }
    } else if (lowerCommand.includes('música') || lowerCommand.includes('audio')) {
      if (lowerCommand.includes('lo-fi') || lowerCommand.includes('lofi')) {
        return 'add_audio:lofi';
      } else if (lowerCommand.includes('trap')) {
        return 'add_audio:trap';
      } else if (lowerCommand.includes('engraçad') || lowerCommand.includes('funny')) {
        return 'add_audio:funny';
      }
    } else if (lowerCommand.includes('remova') && lowerCommand.includes('áudio')) {
      return 'remove_audio';
    }
    
    // Comando não reconhecido - tentar interpretar intenção
    if (lowerCommand.includes('legal') || lowerCommand.includes('melhor') || lowerCommand.includes('bom')) {
      // Usuário quer melhorar o vídeo de alguma forma
      return 'viral_mode';
    }
    
    return 'unknown_command';
  };

  // Valores e funções fornecidos pelo contexto
  const value = {
    isListening,
    transcript,
    confidence,
    startListening,
    stopListening,
    speak,
    processCommand,
  };

  return (
    <SpeechContext.Provider value={value}>
      {children}
    </SpeechContext.Provider>
  );
};

export default SpeechContext;
