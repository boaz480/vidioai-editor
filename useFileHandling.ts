import { useEffect, useState } from 'react';

// Hook personalizado para gerenciar o upload de arquivos
export const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Limpar URL de visualização quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Função para lidar com o upload de arquivo
  const handleFileUpload = (uploadedFile: File | null, options?: { 
    maxSizeMB?: number,
    acceptedTypes?: string[]
  }) => {
    setError(null);
    
    if (!uploadedFile) {
      setFile(null);
      setPreview(null);
      return;
    }
    
    setIsLoading(true);
    
    // Verificar tipo de arquivo
    if (options?.acceptedTypes && !options.acceptedTypes.includes(uploadedFile.type)) {
      setError(`Tipo de arquivo não suportado. Por favor, use: ${options.acceptedTypes.join(', ')}`);
      setIsLoading(false);
      return;
    }
    
    // Verificar tamanho do arquivo
    if (options?.maxSizeMB && uploadedFile.size > options.maxSizeMB * 1024 * 1024) {
      setError(`Arquivo muito grande. Tamanho máximo: ${options.maxSizeMB}MB`);
      setIsLoading(false);
      return;
    }
    
    // Criar URL de visualização
    const previewUrl = URL.createObjectURL(uploadedFile);
    
    setFile(uploadedFile);
    setPreview(previewUrl);
    setIsLoading(false);
  };

  // Função para limpar o arquivo
  const clearFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    setError(null);
  };

  return {
    file,
    preview,
    error,
    isLoading,
    handleFileUpload,
    clearFile
  };
};

// Hook personalizado para gerenciar o armazenamento local
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      // Obter do localStorage
      const item = window.localStorage.getItem(key);
      // Analisar JSON armazenado ou retornar initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // Função para atualizar o valor no localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que o valor seja uma função
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Salvar estado
      setStoredValue(valueToStore);
      // Salvar no localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue] as const;
};

// Hook personalizado para gerenciar o cache de processamento
export const useProcessingCache = () => {
  const [cache, setCache] = useLocalStorage<Record<string, string>>('vidioai_processing_cache', {});
  
  // Adicionar item ao cache
  const addToCache = (key: string, value: string) => {
    setCache(prevCache => ({
      ...prevCache,
      [key]: value
    }));
  };
  
  // Obter item do cache
  const getFromCache = (key: string): string | null => {
    return cache[key] || null;
  };
  
  // Verificar se item existe no cache
  const hasInCache = (key: string): boolean => {
    return key in cache;
  };
  
  // Limpar cache
  const clearCache = () => {
    setCache({});
  };
  
  // Limpar item específico do cache
  const removeFromCache = (key: string) => {
    setCache(prevCache => {
      const newCache = { ...prevCache };
      delete newCache[key];
      return newCache;
    });
  };
  
  return {
    cache,
    addToCache,
    getFromCache,
    hasInCache,
    clearCache,
    removeFromCache
  };
};
