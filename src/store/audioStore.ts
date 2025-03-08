import { create } from 'zustand';
import { AudioState, VisualizerSettings } from '../types/audio';

interface AudioStore extends AudioState {
  visualizerSettings: VisualizerSettings;
  initializeAudio: (file: File) => Promise<void>;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  updateVisualizerSettings: (settings: Partial<VisualizerSettings>) => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  audioContext: null,
  audioBuffer: null,
  source: null,
  analyser: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  visualizerSettings: {
    style: 'bars',
    sensitivity: 1,
    colorScheme: 'default'
  },

  initializeAudio: async (file: File) => {
    try {
      // Close existing context if it exists
      const currentContext = get().audioContext;
      if (currentContext) {
        await currentContext.close();
      }

      const audioContext = new AudioContext({
        // Optimize audio context settings
        latencyHint: 'playback',
        sampleRate: 44100,
      });

      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 128; // Reduce FFT size
      analyser.smoothingTimeConstant = 0.8;

      set({
        audioContext,
        audioBuffer,
        analyser,
        duration: audioBuffer.duration,
        currentTime: 0,
        isPlaying: false,
        source: null,
      });
    } catch (error) {
      console.error('Error initializing audio:', error);
      // Clean up on error
      const { audioContext } = get();
      if (audioContext) {
        await audioContext.close();
      }
      set({
        audioContext: null,
        audioBuffer: null,
        analyser: null,
        source: null,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
      });
    }
  },

  play: () => {
    const { audioContext, audioBuffer, analyser, source: existingSource } = get();
    if (!audioContext || !audioBuffer || !analyser) return;

    // Stop existing source if playing
    if (existingSource) {
      existingSource.stop();
    }

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    source.start();

    set({ source, isPlaying: true });
  },

  pause: () => {
    const { source, audioContext } = get();
    if (source) {
      source.stop();
      set({ source: null, isPlaying: false });
    }
  },

  seek: (time: number) => {
    const { audioBuffer, isPlaying } = get();
    if (!audioBuffer) return;

    set({ currentTime: time });
    if (isPlaying) {
      get().pause();
      get().play();
    }
  },

  updateVisualizerSettings: (settings) => {
    set((state) => ({
      visualizerSettings: { ...state.visualizerSettings, ...settings }
    }));
  }
}));
