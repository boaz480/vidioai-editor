import React from 'react';
import { createContext, useState, useContext } from 'react';

// Definindo o tipo para o contexto
type QuizContextType = {
  videoUrl: string | null;
  isGenerating: boolean;
  generationProgress: number;
  generationStatus: string;
  quizQuestions: QuizQuestion[];
  quizSettings: QuizSettings;
  generateQuiz: () => Promise<void>;
  updateQuizSettings: (settings: Partial<QuizSettings>) => void;
  exportQuiz: () => Promise<string>;
};

// Tipos para perguntas e configurações do quiz
export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  timeInVideo?: number;
};

export type QuizSettings = {
  numberOfQuestions: number;
  difficulty: 'easy' | 'medium' | 'hard';
  format: 'multiple-choice' | 'true-false';
};

// Criando o contexto com valores padrão
const QuizContext = createContext<QuizContextType>({
  videoUrl: null,
  isGenerating: false,
  generationProgress: 0,
  generationStatus: '',
  quizQuestions: [],
  quizSettings: {
    numberOfQuestions: 5,
    difficulty: 'medium',
    format: 'multiple-choice'
  },
  generateQuiz: async () => {},
  updateQuizSettings: () => {},
  exportQuiz: async () => '',
});

// Hook personalizado para usar o contexto
export const useQuiz = () => useContext(QuizContext);

// Provedor do contexto
export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStatus, setGenerationStatus] = useState('');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizSettings, setQuizSettings] = useState<QuizSettings>({
    numberOfQuestions: 5,
    difficulty: 'medium',
    format: 'multiple-choice'
  });

  // Função para atualizar o progresso
  const updateProgress = (progress: number, status: string) => {
    setGenerationProgress(progress);
    setGenerationStatus(status);
  };

  // Função para gerar quiz
  const generateQuiz = async () => {
    setIsGenerating(true);
    updateProgress(0, 'Iniciando geração de quiz...');
    
    try {
      // Simulação de geração de quiz para demonstração
      updateProgress(0.2, 'Analisando conteúdo do vídeo...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      updateProgress(0.4, 'Identificando tópicos principais...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateProgress(0.6, 'Gerando perguntas...');
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      updateProgress(0.8, 'Criando opções de resposta...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Gerar perguntas de exemplo
      const exampleQuestions: QuizQuestion[] = [
        {
          id: '1',
          question: 'Qual é o principal benefício mencionado no vídeo?',
          options: ['Economia de tempo', 'Redução de custos', 'Melhor qualidade', 'Facilidade de uso'],
          correctOptionIndex: 0,
          timeInVideo: 15
        },
        {
          id: '2',
          question: 'Qual ferramenta é utilizada para edição de vídeo no aplicativo?',
          options: ['FFmpeg', 'Adobe Premiere', 'iMovie', 'Final Cut Pro'],
          correctOptionIndex: 0,
          timeInVideo: 45
        },
        {
          id: '3',
          question: 'O que o modo viral faz com os vídeos?',
          options: ['Adiciona música', 'Aumenta a saturação e velocidade', 'Adiciona legendas', 'Corta trechos silenciosos'],
          correctOptionIndex: 1,
          timeInVideo: 78
        },
        {
          id: '4',
          question: 'Qual recurso permite editar texto em vídeos?',
          options: ['Text Editor', 'OCR', 'Subtitle Maker', 'Text Overlay'],
          correctOptionIndex: 1,
          timeInVideo: 120
        },
        {
          id: '5',
          question: 'Qual comando de voz é usado para adicionar música lo-fi?',
          options: ['Adicione música lo-fi', 'Música lo-fi', 'Coloque lo-fi', 'Toque lo-fi'],
          correctOptionIndex: 0,
          timeInVideo: 150
        }
      ];
      
      // Ajustar número de perguntas conforme configurações
      const finalQuestions = exampleQuestions.slice(0, quizSettings.numberOfQuestions);
      setQuizQuestions(finalQuestions);
      
      updateProgress(1.0, 'Quiz gerado com sucesso!');
    } catch (error) {
      updateProgress(0, `Erro: ${error}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Função para atualizar configurações do quiz
  const updateQuizSettings = (settings: Partial<QuizSettings>) => {
    setQuizSettings(prev => ({
      ...prev,
      ...settings
    }));
  };

  // Função para exportar quiz
  const exportQuiz = async (): Promise<string> => {
    setIsGenerating(true);
    updateProgress(0, 'Preparando exportação do quiz...');
    
    try {
      // Simulação de exportação para demonstração
      for (let i = 1; i <= 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        updateProgress(i / 5, `Exportando quiz: ${i * 20}%`);
      }
      
      // Na implementação real, aqui seria gerado um arquivo JSON ou HTML com o quiz
      
      updateProgress(1.0, 'Quiz exportado com sucesso!');
      
      // Retornar URL de exemplo (na implementação real, seria o URL do arquivo exportado)
      return 'quiz_export.json';
    } catch (error) {
      updateProgress(0, `Erro na exportação: ${error}`);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  // Valores e funções fornecidos pelo contexto
  const value = {
    videoUrl,
    isGenerating,
    generationProgress,
    generationStatus,
    quizQuestions,
    quizSettings,
    generateQuiz,
    updateQuizSettings,
    exportQuiz,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
