import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useAudioStore } from '../store/audioStore';
import { BarsVisualizer } from './visualizers/BarsVisualizer';
import { WavesVisualizer } from './visualizers/WavesVisualizer';
import { ParticlesVisualizer } from './visualizers/ParticlesVisualizer';

export const Visualizer: React.FC = () => {
  const { analyser, visualizerSettings } = useAudioStore();
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const getVisualizer = () => {
    switch (visualizerSettings.style) {
      case 'bars':
        return <BarsVisualizer />;
      case 'waves':
        return <WavesVisualizer />;
      case 'particles':
        return <ParticlesVisualizer />;
      default:
        return <BarsVisualizer />;
    }
  };

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ background: '#000' }}
      >
        {getVisualizer()}
      </Canvas>
    </div>
  );
};
