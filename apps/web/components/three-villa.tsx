"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function VillaModel() {
  const modelRef = useRef<THREE.Group>(null);

  // Slow auto-rotation loop
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={modelRef} position={[0, -0.6, 0]}>
      {/* Concrete Foundation Slab */}
      <mesh castShadow receiveShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[6.5, 0.1, 4.5]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.8} />
      </mesh>

      {/* Wooden Deck Accent */}
      <mesh position={[2, 0.11, 0.1]}>
        <boxGeometry args={[2, 0.02, 3.8]} />
        <meshStandardMaterial color="#8C6239" roughness={0.7} />
      </mesh>

      {/* Luxury Charcoal Accent Wall */}
      <mesh castShadow position={[-2.8, 1, 0]}>
        <boxGeometry args={[0.4, 1.8, 4.2]} />
        <meshStandardMaterial color="#1e1e1e" roughness={0.9} />
      </mesh>

      {/* Gold Accent Pillar Grid */}
      <mesh castShadow position={[-1.2, 0.9, 1.8]}>
        <cylinderGeometry args={[0.04, 0.04, 1.6, 12]} />
        <meshStandardMaterial color="#C5A880" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[1.2, 0.9, 1.8]}>
        <cylinderGeometry args={[0.04, 0.04, 1.6, 12]} />
        <meshStandardMaterial color="#C5A880" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[-1.2, 0.9, -1.8]}>
        <cylinderGeometry args={[0.04, 0.04, 1.6, 12]} />
        <meshStandardMaterial color="#C5A880" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[1.2, 0.9, -1.8]}>
        <cylinderGeometry args={[0.04, 0.04, 1.6, 12]} />
        <meshStandardMaterial color="#C5A880" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Glass Walls (Ground Floor Living) */}
      <mesh position={[0.4, 0.9, 0]}>
        <boxGeometry args={[4.8, 1.6, 3.4]} />
        <meshStandardMaterial color="#9bc5e2" transparent opacity={0.12} roughness={0.05} metalness={0.95} />
      </mesh>

      {/* Main Concrete Roof / First Floor Cantilever Plinth */}
      <mesh castShadow receiveShadow position={[0, 1.75, 0]}>
        <boxGeometry args={[6.7, 0.12, 4.7]} />
        <meshStandardMaterial color="#FAFAFA" roughness={0.4} />
      </mesh>

      {/* Upper Floor Cantilevered Charcoal Cube */}
      <mesh castShadow position={[-0.8, 2.6, 0]}>
        <boxGeometry args={[4.2, 1.6, 3.8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.85} />
      </mesh>

      {/* Gold Trim Line on Cantilever */}
      <mesh position={[1.31, 2.6, 0]}>
        <boxGeometry args={[0.02, 1.6, 3.8]} />
        <meshStandardMaterial color="#C5A880" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Upper Floor Floor-to-Ceiling Balcony window */}
      <mesh position={[0.5, 2.6, 1.91]}>
        <boxGeometry args={[2.8, 1.2, 0.02]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.2} roughness={0.05} metalness={0.9} />
      </mesh>
    </group>
  );
}

export default function ThreeVilla() {
  return (
    <div className="w-full h-full min-h-[400px] relative select-none">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-dark-light/50 border border-white/5 rounded-2xl">
          <div className="text-white/40 text-xs tracking-widest uppercase animate-pulse">Initializing 3D Space...</div>
        </div>
      }>
        <Canvas
          shadows
          camera={{ position: [7, 5, 8], fov: 40 }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Ambient Lighting */}
          <ambientLight intensity={0.6} />

          {/* Strong spotlight casting shadows */}
          <directionalLight
            castShadow
            position={[5, 12, 6]}
            intensity={1.5}
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />

          {/* Warm secondary light */}
          <pointLight position={[-6, 4, -4]} intensity={0.5} color="#C5A880" />

          {/* Model */}
          <VillaModel />

          {/* Architectural Design Grid Helper */}
          <Grid
            renderOrder={-1}
            position={[0, -0.65, 0]}
            args={[15, 15]}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor="#6f6f6f"
            sectionSize={2}
            sectionThickness={1}
            sectionColor="#C5A880"
            fadeDistance={30}
            infiniteGrid
          />

          {/* Controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            maxPolarAngle={Math.PI / 2 - 0.05} // don't go below ground level
            minDistance={4}
            maxDistance={15}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
