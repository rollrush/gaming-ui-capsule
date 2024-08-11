import React, { useRef } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { div } from "three/webgpu";

const MainBoard = () => {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="burlywood" />
      {/* Add grid lines */}
      {[...Array(9)].map((_, i) => (
        <React.Fragment key={i}>
          <Line start={[-5, -4 + i, 0]} end={[5, -4 + i, 0]} />
          <Line start={[-4 + i, -5, 0]} end={[-4 + i, 5, 0]} />
        </React.Fragment>
      ))}
    </mesh>
  );
};

const PlayerBoard = ({
  position,
  rotation,
  player,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  player: string;
}) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[5, 0.5, 3]} />
        <meshStandardMaterial color="darkgray" />
      </mesh>
      <Text
        position={[0, 0.3, 0]}
        rotation={[Math.PI / 2, Math.PI, 0]}
        fontSize={0.5}
        color="white"
      >
        {player}
      </Text>
    </group>
  );
};

const Line = ({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) => {
  return (
    <line>
      <bufferGeometry attach="geometry" {...lineGeometry(start, end)} />
      <lineBasicMaterial attach="material" color="black" />
    </line>
  );
};

const Bead: React.FC<ThreeElements["mesh"] & { color: string }> = ({
  color,
  ...props
}) => {
  return (
    <mesh {...props}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const MagneticBeads = () => {
  return (
    <div className="h-screen w-screen">
      <Canvas camera={{ position: [25, 20, 30], fov: 30 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <MainBoard />
        <PlayerBoard
          position={[0, 0.7, 7.5]}
          rotation={[-Math.PI / 10, 0, 0]}
          player="Player 1"
        />
        <PlayerBoard
          position={[0, 0.7, -7.5]}
          rotation={[Math.PI / 10, -3.15, 0]}
          player="Player 2"
        />
        {/* Example beads */}
        {/* <Bead position={[-2, 0.2, 6.5]} color="red" />
      <Bead position={[0, 0.2, 6.5]} color="red" />
      <Bead position={[2, 0.2, 6.5]} color="red" />
      <Bead position={[-2, 0.2, -6.5]} color="blue" />
      <Bead position={[0, 0.2, -6.5]} color="blue" />
      <Bead position={[2, 0.2, -6.5]} color="blue" /> */}
        <OrbitControls enableRotate={true} enableZoom={false} />
      </Canvas>
    </div>
  );
};

// Helper function to create line geometry
const lineGeometry = (
  start: [number, number, number],
  end: [number, number, number]
) => {
  const points = [];
  points.push(new THREE.Vector3(...start));
  points.push(new THREE.Vector3(...end));
  return new THREE.BufferGeometry().setFromPoints(points);
};

export default MagneticBeads;
