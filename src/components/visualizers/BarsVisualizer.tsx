import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioStore } from '../../store/audioStore';
import * as THREE from 'three';

export const BarsVisualizer: React.FC = () => {
  const analyser = useAudioStore((state) => state.analyser);
  const sensitivity = useAudioStore((state) => state.visualizerSettings.sensitivity);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Optimize by using smaller data array and memoizing
  const dataArray = useMemo(() => new Uint8Array(64), []);
  const matrix = useMemo(() => new THREE.Matrix4(), []);
  const tempVector = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    if (analyser) {
      analyser.fftSize = 128; // Reduce FFT size
      analyser.smoothingTimeConstant = 0.8; // Add smoothing
    }
  }, [analyser]);

  useFrame(() => {
    if (!analyser || !meshRef.current) return;

    analyser.getByteFrequencyData(dataArray);

    for (let i = 0; i < 64; i++) {
      const height = (dataArray[i] / 255) * sensitivity * 3;
      const position = (i - 32) * 0.2;

      matrix.makeTranslation(position, height / 2, 0);
      tempVector.set(0.1, height, 0.1);
      matrix.scale(tempVector);
      meshRef.current.setMatrixAt(i, matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 64]}>
      <boxGeometry />
      <meshPhongMaterial color="#fff" />
      <pointLight position={[10, 10, 10]} />
      <ambientLight intensity={0.5} />
    </instancedMesh>
  );
};
