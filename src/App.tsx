import React from 'react';
import { FileUpload } from './components/FileUpload';
import { Visualizer } from './components/Visualizer';
import { AudioControls } from './components/AudioControls';
import { useAudioStore } from './store/audioStore';

function App() {
  const audioBuffer = useAudioStore((state) => state.audioBuffer);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {!audioBuffer ? (
        <div className="max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Audio Visualizer
          </h1>
          <FileUpload />
        </div>
      ) : (
        <>
          <div className="fixed inset-0">
            <Visualizer />
          </div>
          <AudioControls />
        </>
      )}
    </div>
  );
}

export default App;