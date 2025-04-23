import { useSpeechRecognition, useSpeechSynthesis } from '../lib/speech';
import { useState, useCallback } from 'react';

// Tipos de comandos reconhecidos
export type CommandType = 
  | 'process_video' 
  | 'cut_video' 
  | 'add_audio' 
  | 'viral_mode' 
  | 'add_subtitles' 
  | 'remove_audio' 
  | 'unknown_command';

// Resultado do processamento de comando
export type CommandResult = {
  type: CommandType;
  params?: Record<string, any>;
};

// Hook personalizado para comandos de voz
export const useSpeechCommands = () => {
  const { 
    transcript, 
    listening, 
    browserSupportsSpeechRecognition, 
    startListening, 
    stopListening, 
    resetTranscript 
  } = useSpeechRecognition();
  
  const { speak, supported: speechSynthesisSupported } = useSpeechSynthesis();
  
  const [lastCommand, setLastCommand] = useState<string>('');
  const [lastCommandResult, setLastCommandResult] = useState<CommandResult | null>(null);

  // Processar comando de texto
  const processCommand = useCallback((command: string): CommandResult => {
    const lowerCommand = command.toLowerCase();
    setLastCommand(command);
    
    // Lógica de interpretação de comandos
    if (lowerCommand.includes('corte') && lowerCommand.includes('silencio')) {
      const result = { type: 'process_video' as CommandType };
      setLastCommandResult(result);
      return result;
    } else if (lowerCommand.includes('corte entre') || lowerCommand.includes('cortar entre')) {
      // Extrair tempos do comando
      const regExp = RegExp(/(\d+):(\d+)/g);
      const matches = [...lowerCommand.matchAll(regExp)];
      
      if (matches.length >= 2) {
        const start = matches[0];
        const end = matches[1];
        
        const startSeconds = parseInt(start[1]) * 60 + parseInt(start[2]);
        const endSeconds = parseInt(end[1]) * 60 + parseInt(end[2]);
        
        const result = { 
          type: 'cut_video' as CommandType, 
          params: { startTime: startSeconds, endTime: endSeconds } 
        };
        setLastCommandResult(result);
        return result;
      }
    } else if (lowerCommand.includes('modo viral')) {
      const result = { type: 'viral_mode' as CommandType };
      setLastCommandResult(result);
      return result;
    } else if (lowerCommand.includes('legenda') || lowerCommand.includes('subtítulo')) {
      const textMatch = RegExp(/legenda:?\s*(.+)$|subtítulo:?\s*(.+)$/i).exec(lowerCommand);
      if (textMatch) {
        const text = textMatch[1] || textMatch[2] || '';
        const result = { 
          type: 'add_subtitles' as CommandType, 
          params: { text } 
        };
        setLastCommandResult(result);
        return result;
      }
    } else if (lowerCommand.includes('música') || lowerCommand.includes('audio')) {
      let audioType = 'default';
      
      if (lowerCommand.includes('lo-fi') || lowerCommand.includes('lofi')) {
        audioType = 'lofi';
      } else if (lowerCommand.includes('trap')) {
        audioType = 'trap';
      } else if (lowerCommand.includes('engraçad') || lowerCommand.includes('funny')) {
        audioType = 'funny';
      }
      
      const result = { 
        type: 'add_audio' as CommandType, 
        params: { audioType } 
      };
      setLastCommandResult(result);
      return result;
    } else if (lowerCommand.includes('remova') && lowerCommand.includes('áudio')) {
      const result = { type: 'remove_audio' as CommandType };
      setLastCommandResult(result);
      return result;
    }
    
    // Comando não reconhecido - tentar interpretar intenção
    if (lowerCommand.includes('legal') || lowerCommand.includes('melhor') || lowerCommand.includes('bom')) {
      // Usuário quer melhorar o vídeo de alguma forma
      const result = { type: 'viral_mode' as CommandType };
      setLastCommandResult(result);
      return result;
    }
    
    const result = { type: 'unknown_command' as CommandType };
    setLastCommandResult(result);
    return result;
  }, []);

  // Iniciar reconhecimento de voz
  const listenForCommand = useCallback(() => {
    if (browserSupportsSpeechRecognition) {
      resetTranscript();
      startListening();
    } else {
      alert('Seu navegador não suporta reconhecimento de voz. Tente usar Chrome ou Edge.');
    }
  }, [browserSupportsSpeechRecognition, resetTranscript, startListening]);

  // Responder ao usuário com voz
  const respondWithVoice = useCallback((text: string) => {
    if (speechSynthesisSupported) {
      speak(text);
    }
  }, [speak, speechSynthesisSupported]);

  return {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    speechSynthesisSupported,
    listenForCommand,
    stopListening,
    processCommand,
    respondWithVoice,
    lastCommand,
    lastCommandResult
  };
};
