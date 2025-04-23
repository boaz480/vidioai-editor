import React from 'react';
import { createContext, useState, useContext } from 'react';

// Definindo o tipo para o contexto
type AudioContextType = {
  availableAudios: AudioTrack[];
  selectedAudio: AudioTrack | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  selectAudio: (id: string) => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
  playAudio: () => Promise<void>;
  pauseAudio: () => void;
  applyAudioToVideo: (videoUrl: string) => Promise<string | null>;
};

// Tipo para faixas de áudio
export type AudioTrack = {
  id: string;
  name: string;
  path: string;
  duration: number;
  category: 'lofi' | 'trap' | 'funny' | 'other';
};

// Criando o contexto com valores padrão
const AudioContext = createContext<AudioContextType>({
  availableAudios: [],
  selectedAudio: null,
  isPlaying: false,
  volume: 1.0,
  isMuted: false,
  selectAudio: () => {},
  setVolume: () => {},
  toggleMute: () => {},
  playAudio: async () => {},
  pauseAudio: () => {},
  applyAudioToVideo: async () => null,
});

// Hook personalizado para usar o contexto
export const useAudio = () => useContext(AudioContext);

// Provedor do contexto
export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Faixas de áudio disponíveis
  const defaultAudios: AudioTrack[] = [
    {
      id: 'lofi1',
      name: 'Lo-Fi Beats',
      path: '/audio/lofi.mp3',
      duration: 120,
      category: 'lofi'
    },
    {
      id: 'trap1',
      name: 'Trap Beat',
      path: '/audio/trap.mp3',
      duration: 90,
      category: 'trap'
    },
    {
      id: 'funny1',
      name: 'Funny Sound',
      path: '/audio/funny.mp3',
      duration: 60,
      category: 'funny'
    }
  ];

  const [availableAudios] = useState<AudioTrack[]>(defaultAudios);
  const [selectedAudio, setSelectedAudio] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);

  // Função para selecionar áudio
  const selectAudio = (id: string) => {
    const audio = availableAudios.find(a => a.id === id);
    setSelectedAudio(audio || null);
  };

  // Função para definir volume
  const setVolume = (value: number) => {
    setVolumeState(Math.max(0, Math.min(1, value)));
  };

  // Função para alternar mudo
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Função para reproduzir áudio
  const playAudio = async () => {
    if (!selectedAudio) return;
    
    // Na implementação real, aqui seria usado o Web Audio API
    // Simulação para demonstração
    setIsPlaying(true);
    
    // Simular término da reprodução após alguns segundos
    setTimeout(() => {
      setIsPlaying(false);
    }, 5000);
  };

  // Função para pausar áudio
  const pauseAudio = () => {
    setIsPlaying(false);
    // Na implementação real, aqui seria pausado o Web Audio API
  };

  // Função para aplicar áudio ao vídeo
  const applyAudioToVideo = async (videoUrl: string): Promise<string | null> => {
    if (!selectedAudio || !videoUrl) return null;
    
    // Na implementação real, aqui seria usado FFmpeg.wasm para adicionar áudio ao vídeo
    // Simulação para demonstração
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Retornar URL de vídeo de exemplo (na implementação real, seria o vídeo com áudio)
    return videoUrl;
  };

  // Valores e funções fornecidos pelo contexto
  const value = {
    availableAudios,
    selectedAudio,
    isPlaying,
    volume,
    isMuted,
    selectAudio,
    setVolume,
    toggleMute,
    playAudio,
    pauseAudio,
    applyAudioToVideo,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContext;
