import React, { useState } from "react";
import { Stage, Layer, Circle } from "react-konva";

interface Bead {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  strength: number;
  threshold: number;
}

const CanvasBoard: React.FC = () => {
  const [beads, setBeads] = useState<Bead[]>([
    {
      id: 1,
      x: 50,
      y: 50,
      radius: 20,
      color: "blue",
      strength: 5,
      threshold: 0.05,
    },
    {
      id: 2,
      x: 200,
      y: 200,
      radius: 30,
      color: "blue",
      strength: 3,
      threshold: 0.08,
    },

    {
      id: 3,
      x: 200,
      y: 200,
      radius: 30,
      color: "blue",
      strength: 3,
      threshold: 0.08,
    },

    {
      id: 4,
      x: 200,
      y: 200,
      radius: 30,
      color: "blue",
      strength: 3,
      threshold: 0.08,
    },

    {
      id: 5,
      x: 200,
      y: 200,
      radius: 30,
      color: "blue",
      strength: 3,
      threshold: 0.08,
    },
  ]);

  const handleDragEnd = (e: any, index: number) => {
    const { x, y } = e.target.position();
    let newBeads = [...beads];
    newBeads[index] = { ...newBeads[index], x, y };

    newBeads.forEach((bead, i) => {
      if (i !== index) {
        const distance = calculateDistance(newBeads[index], bead);
        if (distance < (newBeads[index].radius + bead.radius) * 2) {
          const position = calculateAttachPosition(newBeads[index], bead);
          newBeads[i] = { ...bead, x: position.x, y: position.y };
        }
      }
    });

    setBeads(newBeads);
  };

  const calculateDistance = (bead1: Bead, bead2: Bead): number => {
    const dx = bead1.x - bead2.x;
    const dy = bead1.y - bead2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const calculateAttachPosition = (
    bead1: Bead,
    bead2: Bead
  ): { x: number; y: number } => {
    const dx = bead1.x - bead2.x;
    const dy = bead1.y - bead2.y;
    const angle = Math.atan2(dy, dx);
    const offsetX = Math.cos(angle) * (bead1.radius + bead2.radius);
    const offsetY = Math.sin(angle) * (bead1.radius + bead2.radius);

    return {
      x: bead1.x - offsetX,
      y: bead1.y - offsetY,
    };
  };

  return (
    <Stage width={800} height={600}>
      <Layer>
        {beads.map((bead, index) => (
          <Circle
            key={bead.id}
            x={bead.x}
            y={bead.y}
            radius={bead.radius}
            fill={bead.color}
            draggable
            onDragEnd={(e) => handleDragEnd(e, index)}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default CanvasBoard;
