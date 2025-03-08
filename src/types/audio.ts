export interface AudioState {
  audioContext: AudioContext | null;
  audioBuffer: AudioBuffer | null;
  source: AudioBufferSourceNode | null;
  analyser: AnalyserNode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

export interface VisualizerSettings {
  style: 'bars' | 'waves' | 'particles';
  sensitivity: number;
  colorScheme: 'default' | 'neon' | 'monochrome';
}

export interface ExportSettings {
  resolution: '720p' | '1080p' | '4k';
  quality: 'low' | 'medium' | 'high';
  fps: 30 | 60;
}
