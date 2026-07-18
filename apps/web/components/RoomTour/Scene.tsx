"use client";

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export const ROOM_SPACING = 14;

export interface TourRoom {
  id: string;
  name: string;
  z: number;
  texture: string;
  eyebrow: string;
  headline: string;
  subline: string;
}

export const ROOMS: TourRoom[] = [
  {
    id: "hall",
    name: "Hall",
    z: 0,
    texture: "/images/concepts/hall.webp",
    eyebrow: "Entryway Design",
    headline: "The first impression your home makes",
    subline:
      "A console, a mirror, the right light — we design entryways that set the tone for everything beyond.",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    z: -ROOM_SPACING,
    texture: "/images/concepts/bedroom.webp",
    eyebrow: "Bedroom Interiors",
    headline: "Rest starts with thoughtful design",
    subline:
      "Layered textures, considered storage, lighting that adapts from morning to night — bedrooms built for how you actually sleep and wake.",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    z: -ROOM_SPACING * 2,
    texture: "/images/concepts/kitchen.webp",
    eyebrow: "Kitchen Design",
    headline: "Where every Indian kitchen works harder",
    subline:
      "Chimneys that clear, counters that last, layouts shaped for the way Mumbai families actually cook — not imported templates.",
  },
  {
    id: "bathroom",
    name: "Bathroom",
    z: -ROOM_SPACING * 3,
    texture: "/images/concepts/bathroom.webp",
    eyebrow: "Bathroom Refit",
    headline: "Small rooms, precise craft",
    subline:
      "Waterproofing, tile alignment, fixture placement — bathrooms demand the most precision per square foot. We bring it.",
  },
];

const DOORWAY_Z_POSITIONS = [
  -ROOM_SPACING / 2,
  -ROOM_SPACING * 1.5,
  -ROOM_SPACING * 2.5,
];

/* --------------------------------------------------------------------------
   RoomPlane — Sharp texture configuration & aspect-ratio matched mesh
   -------------------------------------------------------------------------- */

function RoomPlane({ room, isMobile }: { room: TourRoom; isMobile: boolean }) {
  const texture = useTexture(room.texture);
  const { gl } = useThree();

  // Configure high-DPI texture filtering & maximum anisotropy for sharp rendering
  useEffect(() => {
    if (texture) {
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = gl.capabilities.getMaxAnisotropy();
      texture.generateMipmaps = true;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    }
  }, [texture, gl]);

  // Compute exact mesh plane dimensions from source image dimensions
  const planeArgs: [number, number] = useMemo(() => {
    const img = texture?.image as HTMLImageElement | undefined;
    if (img?.width && img?.height) {
      const aspect = img.width / img.height;
      return [9 * aspect, 9];
    }
    return [16, 9];
  }, [texture]);

  const [planeW, planeH] = planeArgs;

  return (
    <group position={[0, 0, room.z]}>
      {/* Main room image plane */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={planeArgs} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Foreground brass architectural frame layer matching exact aspect */}
      {!isMobile && (
        <group position={[0, 0, 0.15]}>
          <mesh position={[0, planeH / 2 + 0.02, 0]}>
            <planeGeometry args={[planeW + 0.08, 0.08]} />
            <meshBasicMaterial color="#B08D57" transparent opacity={0.6} />
          </mesh>
          <mesh position={[0, -planeH / 2 - 0.02, 0]}>
            <planeGeometry args={[planeW + 0.08, 0.08]} />
            <meshBasicMaterial color="#B08D57" transparent opacity={0.6} />
          </mesh>
          <mesh position={[-planeW / 2 - 0.02, 0, 0]}>
            <planeGeometry args={[0.08, planeH + 0.12]} />
            <meshBasicMaterial color="#B08D57" transparent opacity={0.6} />
          </mesh>
          <mesh position={[planeW / 2 + 0.02, 0, 0]}>
            <planeGeometry args={[0.08, planeH + 0.12]} />
            <meshBasicMaterial color="#B08D57" transparent opacity={0.6} />
          </mesh>
        </group>
      )}

      {/* Background ambient dark plane */}
      <mesh position={[0, 0, -0.3]}>
        <planeGeometry args={[planeW + 4, planeH + 3]} />
        <meshBasicMaterial color="#1C1B19" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

/* --------------------------------------------------------------------------
   DoorframePassthrough — 3D architectural frame occluder at thresholds
   -------------------------------------------------------------------------- */

function DoorframePassthrough({ z }: { z: number }) {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#161513",
        roughness: 0.85,
        metalness: 0.15,
      }),
    []
  );

  return (
    <group position={[0, 0, z]}>
      {/* Top lintel */}
      <mesh position={[0, 4.6, 0]} material={material}>
        <boxGeometry args={[12, 1.0, 0.6]} />
      </mesh>
      {/* Left pillar */}
      <mesh position={[-5.6, 0, 0]} material={material}>
        <boxGeometry args={[1.0, 10, 0.6]} />
      </mesh>
      {/* Right pillar */}
      <mesh position={[5.6, 0, 0]} material={material}>
        <boxGeometry args={[1.0, 10, 0.6]} />
      </mesh>
      {/* Brass inlay accent */}
      <mesh position={[0, 4.05, 0.31]}>
        <boxGeometry args={[10.1, 0.06, 0.02]} />
        <meshBasicMaterial color="#B08D57" />
      </mesh>
    </group>
  );
}

/* --------------------------------------------------------------------------
   CameraRig — Clamped camera dolly with smooth lerp & demand invalidation
   -------------------------------------------------------------------------- */

function CameraRig({
  scrollProgress,
  isMobile,
}: {
  scrollProgress: React.MutableRefObject<number>;
  isMobile: boolean;
}) {
  const { camera, invalidate } = useThree();
  const startZ = 7;
  const maxZ = -(ROOM_SPACING * (ROOMS.length - 1)); // Exactly -42 (Bathroom plane position)
  const lastZ = useRef(camera.position.z);

  useFrame((state) => {
    // Map 0..1 scrollProgress into 2 phases:
    // 0.0 .. 0.85: Camera travels down Z axis from startZ (7) to maxZ (-42)
    // 0.85 .. 1.0: Camera remains parked at maxZ (-42) showing Bathroom behind CTA
    const roomPhaseEnd = 0.85;
    const roomProgress = Math.min(scrollProgress.current / roomPhaseEnd, 1);

    const targetZ = THREE.MathUtils.clamp(
      startZ + roomProgress * (maxZ - startZ),
      maxZ,
      startZ
    );

    // Elastic lerp follow
    const lerpFactor = isMobile ? 0.12 : 0.06;
    let nextZ = THREE.MathUtils.lerp(camera.position.z, targetZ, lerpFactor);

    // Double clamp camera Z to guarantee overshoot into black void is physically impossible
    nextZ = THREE.MathUtils.clamp(nextZ, maxZ, startZ);
    camera.position.z = nextZ;

    // Subtle sway tied to movement
    const time = state.clock.getElapsedTime();
    const swayX = Math.sin(time * 1.5) * 0.05 * (isMobile ? 0.4 : 1);
    const swayY = Math.cos(time * 2.0) * 0.03 * (isMobile ? 0.4 : 1);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, swayX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, swayY, 0.05);

    camera.lookAt(0, 0, camera.position.z - 6);

    // Invalidate for demand rendering loop
    if (Math.abs(camera.position.z - lastZ.current) > 0.001) {
      lastZ.current = camera.position.z;
      invalidate();
    }
  });

  return null;
}

/* --------------------------------------------------------------------------
   RoomTourScene Component
   -------------------------------------------------------------------------- */

export default function RoomTourScene({
  scrollProgress,
  isMobile = false,
}: {
  scrollProgress: React.MutableRefObject<number>;
  isMobile?: boolean;
}) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      camera={{ fov: isMobile ? 58 : 50, position: [0, 0, 7] }}
      onCreated={({ gl }) => {
        gl.setClearColor("#1C1B19");
      }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      className="w-full h-full"
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 10, 5]} intensity={0.9} />

      <Suspense fallback={null}>
        {ROOMS.map((room) => (
          <RoomPlane key={room.id} room={room} isMobile={isMobile} />
        ))}
      </Suspense>

      {DOORWAY_Z_POSITIONS.map((z, idx) => (
        <DoorframePassthrough key={`door-${idx}`} z={z} />
      ))}

      <CameraRig scrollProgress={scrollProgress} isMobile={isMobile} />
    </Canvas>
  );
}
