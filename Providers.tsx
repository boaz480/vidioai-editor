import { VideoProvider } from '../contexts/VideoContext';
import { OcrProvider } from '../contexts/OcrContext';
import { QuizProvider } from '../contexts/QuizContext';
import { SpeechProvider } from '../contexts/SpeechContext';
import { AudioProvider } from '../contexts/AudioContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <VideoProvider>
      <OcrProvider>
        <QuizProvider>
          <SpeechProvider>
            <AudioProvider>
              {children}
            </AudioProvider>
          </SpeechProvider>
        </QuizProvider>
      </OcrProvider>
    </VideoProvider>
  );
}
