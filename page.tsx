import React from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaFont, FaPen, FaCheck, FaTimes } from 'react-icons/fa';

export default function OcrPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/editor" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <FaArrowLeft />
            <span>Voltar ao Editor</span>
          </Link>
          <h1 className="text-2xl font-bold accent-text accent-glow">Edição de Texto (OCR)</h1>
          <div></div> {/* Placeholder for balance */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Video Frame Preview */}
          <section className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Frame do Vídeo</h2>
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
              <div className="text-gray-500 flex flex-col items-center">
                <FaFont className="text-4xl mb-2" />
                <span>Selecione um frame do vídeo</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">00:00</span>
              <span className="text-sm text-gray-400">00:30</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full mb-4">
              <div className="h-full w-1/3 accent-bg rounded-full"></div>
            </div>
            <button className="w-full py-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
              Extrair Frame Atual
            </button>
          </section>

          {/* Text Detection and Editing */}
          <section className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Texto Detectado</h2>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Status:</span>
                <span className="text-gray-400">Aguardando extração de frame</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full">
                <div className="h-full w-0 accent-bg rounded-full"></div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Texto Original:</label>
              <div className="bg-gray-800 rounded-lg p-4 min-h-24 text-gray-400">
                O texto detectado aparecerá aqui após a extração do frame.
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Novo Texto:</label>
              <textarea 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 min-h-24 focus:outline-none focus:accent-border text-white"
                placeholder="Digite o texto substituto aqui..."
                disabled
              ></textarea>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 py-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                <FaTimes />
                Cancelar
              </button>
              <button className="flex-1 py-3 rounded-lg accent-bg text-black font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                <FaCheck />
                Aplicar
              </button>
            </div>
          </section>
        </div>

        {/* Text Replacements List */}
        <section className="mt-8 bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Substituições de Texto</h2>
          <div className="overflow-hidden rounded-lg border border-gray-800">
            <table className="w-full text-left">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-4">Texto Original</th>
                  <th className="p-4">Novo Texto</th>
                  <th className="p-4">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="text-gray-400">
                  <td className="p-4" colSpan={3}>
                    Nenhuma substituição de texto adicionada.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="mt-8 flex justify-center gap-4">
          <Link 
            href="/editor"
            className="px-6 py-3 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
          >
            Voltar
          </Link>
          <button className="px-6 py-3 rounded-full accent-bg text-black font-bold hover:opacity-90 transition-opacity flex items-center gap-2 opacity-50 cursor-not-allowed">
            <FaPen />
            Aplicar Todas as Substituições
          </button>
        </section>
      </main>
    </div>
  );
}
