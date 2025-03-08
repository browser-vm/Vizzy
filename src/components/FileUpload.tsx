import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useAudioStore } from '../store/audioStore';

export const FileUpload: React.FC = () => {
  const initializeAudio = useAudioStore((state) => state.initializeAudio);

  const onDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type.includes('audio') || file.type === 'application/ogg')) {
      await initializeAudio(file);
    }
  }, [initializeAudio]);

  const onFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await initializeAudio(file);
    }
  }, [initializeAudio]);

  return (
    <div
      className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Upload className="w-12 h-12 mx-auto mb-4 text-white/60" />
      <p className="text-white/80 mb-2">Drag and drop your audio file here</p>
      <p className="text-white/60 text-sm mb-4">or</p>
      <label className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg cursor-pointer transition">
        Choose File
        <input
          type="file"
          className="hidden"
          accept="audio/*"
          onChange={onFileSelect}
        />
      </label>
    </div>
  );
};