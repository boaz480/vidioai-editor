import Image from "next/image";
import Link from "next/link";
import { FaVideo, FaMagic, FaQuestionCircle, FaMicrophone } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-8">
        <div className="flex items-center">
          <h1 className="text-2xl md:text-4xl font-bold accent-text accent-glow">
            VidioAI Editor
          </h1>
        </div>
        <nav>
          <Link 
            href="https://github.com" 
            target="_blank"
            className="px-4 py-2 rounded-full border accent-border hover:bg-gray-900 transition-colors"
          >
            GitHub
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 py-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold">
            Edição de vídeo com <span className="accent-text accent-glow">IA</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            Transforme seus vídeos com comandos de voz, cortes inteligentes e efeitos virais.
            Tudo isso diretamente no seu navegador.
          </p>
          <div className="pt-4">
            <Link 
              href="/editor"
              className="px-6 py-3 rounded-full accent-bg text-black font-bold text-lg hover:opacity-90 transition-opacity"
            >
              Começar a Editar
            </Link>
          </div>
        </div>
        <div className="flex-1 relative h-64 md:h-80 w-full rounded-lg overflow-hidden border-2 accent-border">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <FaVideo className="text-6xl accent-text" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Recursos Poderosos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<FaMicrophone className="text-3xl" />}
            title="Comandos de Voz"
            description="Edite seus vídeos usando comandos de voz naturais. Corte, adicione música, aplique efeitos e muito mais."
          />
          <FeatureCard 
            icon={<FaMagic className="text-3xl" />}
            title="Modo Viral Jarves"
            description="Transforme vídeos comuns em conteúdo viral com um clique. Cortes rápidos, saturação e efeitos sonoros."
          />
          <FeatureCard 
            icon={<FaQuestionCircle className="text-3xl" />}
            title="Geração de Quiz"
            description="Crie quizzes interativos baseados no conteúdo do seu vídeo automaticamente."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-5xl py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Como Funciona
        </h2>
        <div className="space-y-6">
          <Step 
            number="1"
            title="Faça upload do seu vídeo"
            description="Arraste e solte ou selecione um vídeo do seu dispositivo para começar."
          />
          <Step 
            number="2"
            title="Edite com comandos"
            description="Use comandos de texto ou voz para editar seu vídeo. Por exemplo: 'Corte os trechos silenciosos' ou 'Adicione música lo-fi'."
          />
          <Step 
            number="3"
            title="Exporte e compartilhe"
            description="Exporte seu vídeo editado e compartilhe nas suas redes sociais favoritas."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-5xl py-12 text-center">
        <div className="p-8 rounded-lg bg-gray-900 border accent-border">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Pronto para criar vídeos incríveis?
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Comece a editar seus vídeos com IA agora mesmo, gratuitamente.
          </p>
          <Link 
            href="/editor"
            className="px-6 py-3 rounded-full accent-bg text-black font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Começar a Editar
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-5xl py-8 mt-12 border-t border-gray-800 text-center text-gray-400">
        <p>© 2025 VidioAI Editor. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-lg bg-gray-900 border accent-border hover:bg-gray-800 transition-colors">
      <div className="accent-text mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full accent-bg flex items-center justify-center text-black font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
}
