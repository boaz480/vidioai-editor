import React from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaDownload, FaShare, FaTwitter, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

export default function ExportPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/editor" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <FaArrowLeft />
            <span>Voltar ao Editor</span>
          </Link>
          <h1 className="text-2xl font-bold accent-text accent-glow">Exportar Vídeo</h1>
          <div></div> {/* Placeholder for balance */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Export Progress Section */}
        <section className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Progresso da Exportação</h2>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Status:</span>
              <span className="accent-text">Exportação concluída!</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full">
              <div className="h-full w-full accent-bg rounded-full"></div>
            </div>
          </div>
          
          {/* Success Animation (would be animated in real implementation) */}
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full accent-bg flex items-center justify-center mb-4">
              <FaDownload className="text-black text-3xl" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Seu vídeo está pronto!</h3>
            <p className="text-gray-300 text-center max-w-md mb-6">
              Seu vídeo foi processado com sucesso e está pronto para download ou compartilhamento.
            </p>
            <button className="px-8 py-4 rounded-full accent-bg text-black font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
              <FaDownload />
              Baixar Vídeo
            </button>
          </div>
        </section>

        {/* Video Preview Section */}
        <section className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Prévia Final</h2>
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
            <div className="text-gray-500 flex flex-col items-center">
              <span>Prévia do vídeo exportado</span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">00:00</span>
            <span className="text-sm text-gray-400">00:30</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full">
            <div className="h-full w-0 accent-bg rounded-full"></div>
          </div>
        </section>

        {/* Export Options Section */}
        <section className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Opções de Exportação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-2">Qualidade:</label>
              <select className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:accent-border">
                <option>720p (HD)</option>
                <option selected>1080p (Full HD)</option>
                <option>4K (Ultra HD)</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Formato:</label>
              <select className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:accent-border">
                <option selected>MP4</option>
                <option>MOV</option>
                <option>WebM</option>
              </select>
            </div>
          </div>
          <button className="w-full py-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
            Aplicar e Re-exportar
          </button>
        </section>

        {/* Share Section */}
        <section className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Compartilhar</h2>
          <p className="text-gray-300 mb-4">
            Compartilhe seu vídeo diretamente nas suas redes sociais favoritas.
          </p>
          <div className="flex flex-wrap gap-4">
            <ShareButton icon={<FaTwitter />} platform="Twitter" color="bg-blue-500" />
            <ShareButton icon={<FaInstagram />} platform="Instagram" color="bg-pink-600" />
            <ShareButton icon={<FaTiktok />} platform="TikTok" color="bg-black border border-gray-700" />
            <ShareButton icon={<FaYoutube />} platform="YouTube" color="bg-red-600" />
          </div>
        </section>

        {/* Action Buttons */}
        <section className="mt-8 flex justify-center gap-4">
          <Link 
            href="/editor"
            className="px-6 py-3 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
          >
            Voltar ao Editor
          </Link>
          <Link 
            href="/"
            className="px-6 py-3 rounded-full accent-bg text-black font-bold hover:opacity-90 transition-opacity"
          >
            Novo Projeto
          </Link>
        </section>
      </main>
    </div>
  );
}

function ShareButton({ icon, platform, color }) {
  return (
    <button className={`flex items-center gap-2 px-4 py-3 rounded-lg ${color} hover:opacity-90 transition-opacity`}>
      {icon}
      <span>{platform}</span>
    </button>
  );
}
