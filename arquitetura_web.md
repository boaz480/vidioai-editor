# Arquitetura Web do VidioAI Editor

## Visão Geral
O VidioAI Editor Web será desenvolvido como uma aplicação Next.js, utilizando React para a interface do usuário e várias bibliotecas JavaScript para implementar as funcionalidades de edição de vídeo, reconhecimento de texto e processamento de áudio.

## Tecnologias Principais

### Frontend
- **Next.js**: Framework React para renderização do lado do servidor e geração de sites estáticos
- **Tailwind CSS**: Para estilização e design responsivo
- **FFmpeg.wasm**: Versão WebAssembly do FFmpeg para processamento de vídeo no navegador
- **Tesseract.js**: Para reconhecimento de texto em imagens
- **Web Speech API**: Para comandos de voz e síntese de fala
- **React Context API**: Para gerenciamento de estado (similar ao Provider no Flutter)

### Backend (Serverless)
- **Cloudflare Workers**: Para funções serverless e implantação
- **Cloudflare Pages**: Para hospedagem do site estático
- **Cloudflare R2**: Para armazenamento de arquivos (vídeos processados)

## Estrutura de Diretórios
```
vidioai-web/
├── public/              # Arquivos estáticos
│   ├── audio/           # Arquivos de áudio para o modo viral
│   └── images/          # Imagens e ícones
├── src/
│   ├── app/             # Páginas Next.js (App Router)
│   │   ├── page.tsx     # Página inicial
│   │   ├── editor/      # Editor de vídeo
│   │   ├── ocr/         # Edição de texto
│   │   ├── quiz/        # Geração de quiz
│   │   └── export/      # Exportação de vídeo
│   ├── components/      # Componentes React reutilizáveis
│   │   ├── ui/          # Componentes de UI básicos
│   │   ├── video/       # Componentes relacionados a vídeo
│   │   ├── audio/       # Componentes relacionados a áudio
│   │   └── ocr/         # Componentes relacionados a OCR
│   ├── contexts/        # Contextos React (equivalente aos Providers)
│   │   ├── VideoContext.tsx    # Gerenciamento de estado do vídeo
│   │   └── OcrContext.tsx      # Gerenciamento de estado do OCR
│   ├── hooks/           # Hooks personalizados
│   │   ├── useVideoProcessing.ts
│   │   ├── useOcr.ts
│   │   ├── useSpeechRecognition.ts
│   │   └── useQuizGeneration.ts
│   ├── lib/             # Funções utilitárias
│   │   ├── ffmpeg.ts    # Wrapper para FFmpeg.wasm
│   │   ├── tesseract.ts # Wrapper para Tesseract.js
│   │   ├── speech.ts    # Wrapper para Web Speech API
│   │   └── utils.ts     # Funções utilitárias gerais
│   └── types/           # Definições de tipos TypeScript
└── wrangler.toml        # Configuração do Cloudflare Workers
```

## Fluxo de Usuário
1. **Página Inicial**: Upload de vídeo e seleção de modo de edição
2. **Editor de Vídeo**: Interface principal para edição com comandos
3. **Edição de Texto (OCR)**: Detecção e substituição de texto no vídeo
4. **Geração de Quiz**: Criação automática de perguntas baseadas no conteúdo
5. **Exportação**: Processamento final e download do vídeo editado

## Componentes Principais

### VideoContext
Equivalente ao VideoProvider do Flutter, gerenciará:
- Upload e armazenamento temporário de vídeo
- Processamento de vídeo com FFmpeg.wasm
- Cortes, adição de áudio, modo viral
- Cache de processamento para otimização

### OcrContext
Equivalente ao OCRProvider do Flutter, gerenciará:
- Extração de frames do vídeo
- Reconhecimento de texto com Tesseract.js
- Substituição de texto no vídeo

### Componentes de UI
- **VideoPlayer**: Reprodução de vídeo com controles personalizados
- **Timeline**: Interface para visualização e edição de cortes
- **CommandInput**: Campo de entrada para comandos de texto/voz
- **ProcessingIndicator**: Feedback visual durante o processamento

## Desafios e Soluções

### Processamento de Vídeo no Navegador
- **Desafio**: FFmpeg.wasm é pesado e pode ser lento em dispositivos menos potentes
- **Solução**: Implementar processamento em chunks, mostrar feedback de progresso claro, e otimizar para vídeos menores

### Armazenamento Temporário
- **Desafio**: Navegadores têm limites de armazenamento
- **Solução**: Usar IndexedDB para cache local e implementar limpeza automática

### Compatibilidade com Navegadores
- **Desafio**: Algumas APIs podem não funcionar em todos os navegadores
- **Solução**: Implementar detecção de recursos e fallbacks quando necessário

## Otimizações
- Lazy loading de bibliotecas pesadas (FFmpeg.wasm, Tesseract.js)
- Processamento em Web Workers para não bloquear a UI
- Compressão de vídeo antes do processamento principal
- Cache de resultados intermediários

## Implantação
- CI/CD via GitHub Actions para Cloudflare Pages
- Configuração de domínio personalizado
- Monitoramento de desempenho e erros
