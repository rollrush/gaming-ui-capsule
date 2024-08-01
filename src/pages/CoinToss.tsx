// src/CoinFlip.js

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Coin = () => {
  const ref = useRef(null);
  const [isFlipping, setIsFlipping] = useState(false);

  useFrame(() => {
    if (isFlipping && ref && ref.current) {
      //@ts-ignore
      ref.current.rotation.y += 0.2; // Control the speed of the flip
    }
  });

  const handleFlip = () => {
    setIsFlipping(true);
    setTimeout(() => setIsFlipping(false), 2000); // duration of the flip
  };

  return (
    <>
      <mesh ref={ref} onClick={handleFlip}>
        <cylinderBufferGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial color="gold" />
        <meshStandardMaterial color="silver" />
      </mesh>
      <OrbitControls />
    </>
  );
};

const CoinFlip = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Coin />
    </Canvas>
  );
};

export default CoinFlip;
