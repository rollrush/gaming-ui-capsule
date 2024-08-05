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
  handleDragMove: (e: any, id: number) => void;
  handleDragEnd: (e: any, id: number) => void;
  draggable?: boolean;
}

const MagneticBead: React.FC<ScalableCircleProps> = ({
  bead,
  handleDragMove,
  handleDragEnd,
  draggable,
}) => {
  const [isHeld, setIsHeld] = useState(false);
  const stageWidth = 800;
  const stageHeight = 600;

  return (
    <Portal selector=".top-layer" enabled={isHeld}>
      <Circle
        key={bead.id}
        x={bead.x}
        y={bead.y}
        radius={bead.radius}
        draggable={draggable}
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
        onDragMove={(e) => {
          handleDragMove(e, bead.id);
        }}
        onDragEnd={(e) => {
          setIsHeld(false);
          handleDragEnd(e, bead.id);
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
const OnBoardMagneticBead: React.FC<ScalableCircleProps> = ({
  bead,
  handleDragMove,
  handleDragEnd,
}) => {
  const [isHeld, setIsHeld] = useState(false);
  const stageWidth = 800;
  const stageHeight = 600;

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
        onDragMove={(e) => {
          handleDragMove(e, bead.id);
        }}
        onDragEnd={(e) => {
          setIsHeld(false);
          handleDragEnd(e, bead.id);
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

export { OnBoardMagneticBead, MagneticBead };
