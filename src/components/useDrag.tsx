import { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export const useDrag = (
  ref: any,
  onDragStart: any,
  onDragEnd: any,
  isCurrentPlayer: any
) => {
  const { gl, scene, camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState(new Vector3());

  const handlePointerDown = (event: any) => {
    if (isCurrentPlayer) {
      event.stopPropagation();
      setIsDragging(true);
      setInitialPosition(ref.current.position.clone());
      onDragStart(event);
    }
  };

  const handlePointerUp = (event: any) => {
    if (isDragging) {
      event.stopPropagation();
      setIsDragging(false);
      onDragEnd(event);
    }
  };

  const handlePointerMove = (event: any) => {
    if (isDragging) {
      event.stopPropagation();
      const vector = new Vector3();
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      vector.set(x, y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      ref.current.position.copy(pos);
    }
  };

  useEffect(() => {
    if (isDragging) {
      gl.domElement.addEventListener("pointermove", handlePointerMove);
      gl.domElement.addEventListener("pointerup", handlePointerUp);
    } else {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
      gl.domElement.removeEventListener("pointerup", handlePointerUp);
    }

    return () => {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
      gl.domElement.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const mesh = ref.current;
    if (mesh) {
      mesh.addEventListener("pointerdown", handlePointerDown);
    }

    return () => {
      if (mesh) {
        mesh.removeEventListener("pointerdown", handlePointerDown);
      }
    };
  }, [ref.current]);

  return isDragging;
};
