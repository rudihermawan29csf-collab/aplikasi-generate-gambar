import React, { useState } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ImageDisplay } from './components/ImageDisplay';
import { GeneratedImage, GenerationConfig } from './types';
import { generateFusionImage } from './services/geminiService';

const App: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (config: GenerationConfig) => {
    setIsGenerating(true);
    setError(null);
    setCurrentImage(null);

    try {
      const imageUrl = await generateFusionImage(config);
      
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: config.prompt,
        timestamp: Date.now(),
      };

      setCurrentImage(newImage);
    } catch (err: any) {
      setError(err.message || "Gagal membuat gambar. Silakan coba lagi.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 pb-20 selection:bg-yellow-500 selection:text-black">
      <Header />

      <main className="container mx-auto px-4 mt-8">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2 font-history">Forging the Legend</h2>
          <p className="text-gray-400 text-sm">
            Buat karakter, senjata, atau medan perang dengan estetika futuristik yang berakar pada keagungan sejarah Islam.
            Fusi gaya <strong>Free Fire</strong> x <strong>Bani Abbasiyah</strong>.
          </p>
        </div>

        <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />

        {error && (
          <div className="w-full max-w-4xl mx-auto mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-center font-mono text-sm">
            ERROR: {error}
          </div>
        )}

        <ImageDisplay image={currentImage} loading={isGenerating} />
        
        {/* Footer hint */}
        <div className="text-center mt-20 opacity-30 text-xs font-cyber tracking-widest">
          POWERED BY GEMINI AI • DESIGNED FOR ELITE SURVIVORS
        </div>
      </main>
    </div>
  );
};

export default App;