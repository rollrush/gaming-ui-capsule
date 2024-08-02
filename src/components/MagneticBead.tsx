import Konva from "konva";
import React, { useState } from "react";
import { Circle } from "react-konva";
import { Portal } from "react-konva-utils";
interface Bead {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  strength: number;
  threshold: number;
}

interface ScalableCircleProps {
  bead: Bead;
  index: number;
  handleDragEnd: (e: any, index: number) => void;
}

const MagneticBead: React.FC<ScalableCircleProps> = ({
  bead,
  index,
  handleDragEnd,
}) => {
  const [isHeld, setIsHeld] = useState(false);
  let stageWidth = 800;
  let stageHeight = 600;

  return (
    <Portal selector=".top-layer" enabled={isHeld}>
      <Circle
        key={bead.id}
        x={bead.x}
        y={bead.y}
        radius={bead.radius}
        draggable
        // Realistic styling
        fillRadialGradientStartPoint={{ x: 0, y: 0 }}
        fillRadialGradientEndPoint={{ x: 0, y: 0 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndRadius={bead.radius}
        fillRadialGradientColorStops={[1, "black", 0.2, "white"]}
        shadowBlur={10}
        shadowColor="rgba(0, 0, 0, 1)"
        shadowOffset={{ x: 7, y: 5 }}
        shadowOpacity={1}
        scaleX={isHeld ? 1.2 : 1}
        scaleY={isHeld ? 1.2 : 1}
        onMouseDown={() => setIsHeld(true)}
        onMouseUp={() => setIsHeld(false)}
        onDragEnd={(e) => {
          setIsHeld(false);
          handleDragEnd(e, index);
        }}
        onMouseOut={() => setIsHeld(false)}
        dragBoundFunc={(pos) => {
          let newX = pos.x;
          let newY = pos.y;

          if (newX - bead.radius < 0) {
            newX = bead.radius;
          } else if (newX + bead.radius > stageWidth) {
            newX = stageWidth - bead.radius;
          }

          if (newY - bead.radius < 0) {
            newY = bead.radius;
          } else if (newY + bead.radius > stageHeight) {
            newY = stageHeight - bead.radius;
          }

          return {
            x: newX,
            y: newY,
          };
        }}
      />
    </Portal>
  );
};

export default MagneticBead;
