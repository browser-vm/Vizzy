import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useAudioStore } from '../store/audioStore';

export const AudioControls: React.FC = () => {
  const { isPlaying, currentTime, duration, play, pause, seek } = useAudioStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-white/10 rounded-full transition"
              onClick={() => seek(Math.max(0, currentTime - 10))}
            >
              <SkipBack className="w-6 h-6" />
            </button>

            <button
              className="p-3 bg-white text-black rounded-full hover:scale-105 transition"
              onClick={isPlaying ? pause : play}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>

            <button
              className="p-2 hover:bg-white/10 rounded-full transition"
              onClick={() => seek(Math.min(duration, currentTime + 10))}
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm">{formatTime(currentTime)}</span>
            <div className="w-64 h-1 bg-white/20 rounded-full">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-sm">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};