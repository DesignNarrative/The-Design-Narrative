'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface AvatarShapeProps {
  roleType: string;
  isHovered: boolean;
}

function AvatarShape({ roleType, isHovered }: AvatarShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const rotationSpeed = useRef(0.4);

  // Smoothly interpolate rotation speed based on hover states
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const targetSpeed = isHovered ? 2.2 : 0.4;
    rotationSpeed.current += (targetSpeed - rotationSpeed.current) * 0.05;

    // Direct frame updates
    meshRef.current.rotation.y += rotationSpeed.current * delta;
    meshRef.current.rotation.x += rotationSpeed.current * 0.4 * delta;

    // Gentle float oscillation
    meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.08;
  });

  const normalizedRole = roleType.toLowerCase();

  // 1. CEO / Operations (Torus Knot)
  if (normalizedRole.includes('ceo') || normalizedRole.includes('founder')) {
    return (
      <mesh ref={meshRef} scale={0.95}>
        <torusKnotGeometry args={[0.5, 0.15, 128, 16, 2, 3]} />
        <meshPhysicalMaterial
          color="#fbbf24"
          metalness={0.95}
          roughness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>
    );
  }

  // 2. Designers (Morphing DistortSphere Blob)
  if (normalizedRole.includes('designer') || normalizedRole.includes('ux')) {
    return (
      <mesh ref={meshRef} scale={1.1}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <MeshDistortMaterial
          color="#a78bfa"
          distort={isHovered ? 0.45 : 0.25}
          speed={isHovered ? 3.0 : 1.5}
          roughness={0.1}
          metalness={0.05}
          transmission={0.9} // frosted glass transmission
          thickness={0.6}
        />
      </mesh>
    );
  }

  // 3. Lead Developer (Wireframe Box Grid)
  if (normalizedRole.includes('developer') || normalizedRole.includes('programmer')) {
    return (
      <mesh ref={meshRef} scale={1.05}>
        <boxGeometry args={[0.75, 0.75, 0.75]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
        />
      </mesh>
    );
  }

  // 4. QA / Testers (Crystalline Octahedron)
  if (normalizedRole.includes('tester') || normalizedRole.includes('qa')) {
    return (
      <mesh ref={meshRef} scale={1.05}>
        <octahedronGeometry args={[0.65]} />
        <meshPhysicalMaterial
          color="#84cc16"
          metalness={0.1}
          roughness={0.05}
          transmission={0.95}
          thickness={0.8}
          clearcoat={1.0}
        />
      </mesh>
    );
  }

  // 5. SEO & Performance Marketers (Targeted Cone)
  if (normalizedRole.includes('seo') || normalizedRole.includes('market')) {
    return (
      <mesh ref={meshRef} scale={1.0} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.45, 0.85, 4]} />
        <meshPhysicalMaterial
          color="#a3e635"
          metalness={0.2}
          roughness={0.1}
          transmission={0.8}
          thickness={0.5}
        />
      </mesh>
    );
  }

  // 6. Video & Social (Spinning Torus Ring)
  return (
    <mesh ref={meshRef} scale={1.0}>
      <torusGeometry args={[0.5, 0.12, 12, 48]} />
      <meshPhysicalMaterial
        color="#f43f5e"
        metalness={0.85}
        roughness={0.1}
        clearcoat={0.8}
      />
    </mesh>
  );
}

export default function TeamAvatarCanvas({ roleType, isHovered }: AvatarShapeProps) {
  return (
    <div className="w-full h-full relative z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1.8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />
        <pointLight position={[-3, -3, 2]} intensity={0.5} color="#8b5cf6" />
        <AvatarShape roleType={roleType} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
