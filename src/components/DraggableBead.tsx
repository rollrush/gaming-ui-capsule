import React, { useRef, useState, useEffect } from "react";
import { MeshProps, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface DraggableBeadProps extends MeshProps {
  color: string;
  isMainBoard?: boolean;
  onDragEnd?: (position: THREE.Vector3) => void;
}

const DraggableBead: React.FC<DraggableBeadProps> = ({
  color,
  isMainBoard = false,
  onDragEnd,
  ...props
}) => {
  const { camera, gl, scene } = useThree();
  const beadRef = useRef<THREE.Mesh>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPlane, setDragPlane] = useState<THREE.Plane | null>(null);

  useEffect(() => {
    // Create a drag plane
    if (beadRef.current) {
      const normal = new THREE.Vector3(0, 1, 0);
      const plane = new THREE.Plane(normal, 0);
      setDragPlane(plane);
    }
  }, []);

  const onPointerDown = (event: THREE.Event) => {
    // event.stopPropagation();
    setIsDragging(true);
  };

  const onPointerUp = (event: THREE.Event) => {
    // event.stopPropagation();
    setIsDragging(false);
    if (onDragEnd && beadRef.current) {
      onDragEnd(beadRef.current.position);
    }
  };

  useFrame(({ mouse }) => {
    if (isDragging && beadRef.current && dragPlane) {
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersectionPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(dragPlane, intersectionPoint);

      // Update bead position
      beadRef.current.position.copy(intersectionPoint);

      // Apply magnetic behavior only on the main board
      if (isMainBoard) {
        const gridSize = 1;
        beadRef.current.position.x =
          Math.round(beadRef.current.position.x / gridSize) * gridSize;
        beadRef.current.position.z =
          Math.round(beadRef.current.position.z / gridSize) * gridSize;
      }

      // Clamp position to keep the bead within bounds
      beadRef.current.position.x = THREE.MathUtils.clamp(
        beadRef.current.position.x,
        -5,
        5
      );
      beadRef.current.position.z = THREE.MathUtils.clamp(
        beadRef.current.position.z,
        -5,
        5
      );
    }
  });

  return (
    <mesh
      ref={beadRef}
      {...props}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default DraggableBead;
