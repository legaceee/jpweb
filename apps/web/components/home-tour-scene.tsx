"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export interface RoomConfig {
  id: string;
  src: string;
  alt: string;
  eyebrow: string;
  headline: string;
  subline: string;
  zPos: number;
}

export const TOUR_ROOM_POSITIONS: RoomConfig[] = [
  {
    id: "hall",
    src: "/images/concepts/hall.png",
    alt: "Concept visualization of a warm contemporary Indian entryway",
    eyebrow: "Entryway Design",
    headline: "The first impression your home makes",
    subline:
      "A console, a mirror, the right light — we design entryways that set the tone for everything beyond.",
    zPos: 0,
  },
  {
    id: "bedroom",
    src: "/images/concepts/bedroom.png",
    alt: "Concept visualization of a contemporary bedroom with linen headboard",
    eyebrow: "Bedroom Interiors",
    headline: "Rest starts with thoughtful design",
    subline:
      "Layered textures, considered storage, lighting that adapts from morning to night — bedrooms built for how you actually sleep and wake.",
    zPos: -22,
  },
  {
    id: "kitchen",
    src: "/images/concepts/kitchen.png",
    alt: "Concept visualization of a contemporary Indian kitchen with modular cabinetry",
    eyebrow: "Kitchen Design",
    headline: "Where every Indian kitchen works harder",
    subline:
      "Chimneys that clear, counters that last, layouts shaped for the way Mumbai families actually cook — not imported templates.",
    zPos: -44,
  },
  {
    id: "bathroom",
    src: "/images/concepts/bathroom.png",
    alt: "Concept visualization of a modern bathroom with large-format tiles",
    eyebrow: "Bathroom Refit",
    headline: "Small rooms, precise craft",
    subline:
      "Waterproofing, tile alignment, fixture placement — bathrooms demand the most precision per square foot. We bring it.",
    zPos: -66,
  },
];

/* Doorframe positions midway between rooms */
const DOORFRAME_POSITIONS = [-11, -33, -55];

/* --------------------------------------------------------------------------
   Doorframe 3D Geometry Component — physical architectural threshold
   -------------------------------------------------------------------------- */

function DoorFrame({ zPos }: { zPos: number }) {
  // Architectural doorway frame (top beam + 2 side pillars)
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1C1B19",
        roughness: 0.8,
        metalness: 0.2,
      }),
    []
  );

  return (
    <group position={[0, 0, zPos]}>
      {/* Top lintel beam */}
      <mesh position={[0, 2.7, 0]} material={material}>
        <boxGeometry args={[7.2, 0.6, 0.4]} />
      </mesh>
      {/* Left pillar */}
      <mesh position={[-3.3, 0, 0]} material={material}>
        <boxGeometry args={[0.6, 6, 0.4]} />
      </mesh>
      {/* Right pillar */}
      <mesh position={[3.3, 0, 0]} material={material}>
        <boxGeometry args={[0.6, 6, 0.4]} />
      </mesh>
      {/* Brass trim accent line */}
      <mesh position={[0, 2.38, 0.21]}>
        <boxGeometry args={[6.1, 0.04, 0.02]} />
        <meshBasicMaterial color="#B08D57" />
      </mesh>
    </group>
  );
}

/* --------------------------------------------------------------------------
   Room Node Component — textured image plane + depth layers
   -------------------------------------------------------------------------- */

function RoomNode({
  room,
  texture,
  isMobile,
}: {
  room: RoomConfig;
  texture: THREE.Texture;
  isMobile: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <group position={[0, 0, room.zPos]}>
      {/* Main room textured plane */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[9.6, 5.4]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Subtle depth layer: Brass architectural border frame in front */}
      {!isMobile && (
        <group position={[0, 0, 0.15]}>
          {/* Top border */}
          <mesh position={[0, 2.72, 0]}>
            <planeGeometry args={[9.64, 0.04]} />
            <meshBasicMaterial color="#B08D57" transparent opacity={0.6} />
          </mesh>
          {/* Bottom border */}
          <mesh position={[0, -2.72, 0]}>
            <planeGeometry args={[9.64, 0.04]} />
            <meshBasicMaterial color="#B08D57" transparent opacity={0.6} />
          </mesh>
          {/* Left border */}
          <mesh position={[-4.82, 0, 0]}>
            <planeGeometry args={[0.04, 5.44]} />
            <meshBasicMaterial color="#B08D57" transparent opacity={0.6} />
          </mesh>
          {/* Right border */}
          <mesh position={[4.82, 0, 0]}>
            <planeGeometry args={[0.04, 5.44]} />
            <meshBasicMaterial color="#B08D57" transparent opacity={0.6} />
          </mesh>
        </group>
      )}

      {/* Background ambient warmth plane */}
      <mesh position={[0, 0, -0.2]}>
        <planeGeometry args={[12, 7]} />
        <meshBasicMaterial color="#1C1B19" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

/* --------------------------------------------------------------------------
   Camera Dolly Controller — smooth lerp & subtle sway
   -------------------------------------------------------------------------- */

function DollyController({
  scrollProgress,
  isMobile,
}: {
  scrollProgress: number;
  isMobile: boolean;
}) {
  const { camera } = useThree();
  const startZ = 4.5;
  const endZ = -66.5;

  useFrame((state, delta) => {
    // Target Z based on scroll progress (0 = Hall, 1 = Bathroom)
    const targetZ = startZ + scrollProgress * (endZ - startZ);

    // Subtle elastic lerp for physical walking feel
    const lerpSpeed = isMobile ? 0.12 : 0.08;
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      targetZ,
      lerpSpeed
    );

    // Very subtle horizontal sway tied to movement velocity (capped for comfort)
    const time = state.clock.getElapsedTime();
    const swayX = Math.sin(time * 1.5) * 0.04 * (isMobile ? 0.5 : 1);
    const swayY = Math.cos(time * 2.0) * 0.03 * (isMobile ? 0.5 : 1);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, swayX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, swayY, 0.05);

    camera.lookAt(0, 0, camera.position.z - 5);
  });

  return null;
}

/* --------------------------------------------------------------------------
   Scene Content — loads textures and renders rooms + doorframes
   -------------------------------------------------------------------------- */

function SceneContent({
  scrollProgress,
  isMobile,
}: {
  scrollProgress: number;
  isMobile: boolean;
}) {
  const textures = useTexture(TOUR_ROOM_POSITIONS.map((r) => r.src));

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />

      <DollyController scrollProgress={scrollProgress} isMobile={isMobile} />

      {/* Room nodes along Z path */}
      {TOUR_ROOM_POSITIONS.map((room, idx) => {
        const tex = textures[idx];
        if (!tex) return null;
        return (
          <RoomNode
            key={room.id}
            room={room}
            texture={tex}
            isMobile={isMobile}
          />
        );
      })}

      {/* Doorframe occluders between thresholds */}
      {DOORFRAME_POSITIONS.map((z, idx) => (
        <DoorFrame key={`door-${idx}`} zPos={z} />
      ))}
    </>
  );
}

/* --------------------------------------------------------------------------
   Exported HomeTourScene — Canvas wrapper
   -------------------------------------------------------------------------- */

export default function HomeTourScene({
  scrollProgress,
  isMobile = false,
}: {
  scrollProgress: number;
  isMobile?: boolean;
}) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: isMobile ? 55 : 48 }}
        gl={{
          antialias: !isMobile,
          powerPreference: "high-performance",
          alpha: true,
        }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        className="w-full h-full"
      >
        <SceneContent scrollProgress={scrollProgress} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
