import React, { useState } from "react";
import { Stage, Layer, Group } from "react-konva";

import MagneticBead from "../components/MagneticBead";

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
  const stageWidth = 800; // Width of the stage
  const stageHeight = 600; // Height of the stage
  // const handleDragEnd = (e: any, index: number) => {
  //   const { x, y } = e.target.position();
  //   let newBeads = [...beads];
  //   newBeads[index] = { ...newBeads[index], x, y };

  //   });

  //   setBeads(newBeads);
  // };
  const handleDragEnd = (e: any, index: number) => {
    let { x, y } = e.target.position();
    const bead = beads[index];

    // Boundary checks
    if (x - bead.radius < 5) {
      x = bead.radius;
    } else if (x + bead.radius > stageWidth) {
      x = stageWidth - bead.radius;
    }

    if (y - bead.radius < 5) {
      y = bead.radius;
    } else if (y + bead.radius > stageHeight) {
      y = stageHeight - bead.radius;
    }

    let newBeads = [...beads];
    newBeads[index] = { ...newBeads[index], x, y };
    newBeads[index] = { ...newBeads[index], x, y };

    newBeads.forEach((bead, i) => {
      if (i !== index) {
        const distance = calculateDistance(newBeads[index], bead);
        if (distance < (newBeads[index].radius + bead.radius) * 2) {
          const position = calculateAttachPosition(newBeads[index], bead);
          newBeads[i] = { ...bead, x: position.x, y: position.y };
        }
        let overlapDetected = false;
        for (let j = 0; j < newBeads.length; j++) {
          if (i !== j) {
            const distance = calculateDistance(newBeads[i], newBeads[j]);
            if (distance < newBeads[i].radius + newBeads[j].radius) {
              const position = calculateAttachPosition(
                newBeads[i],
                newBeads[j]
              );
              newBeads[j] = { ...newBeads[j], x: position.x, y: position.y };
              overlapDetected = true;
            }
          }
        }
        if (overlapDetected) {
          const distance = calculateDistance(newBeads[index], newBeads[i]);
          if (distance < newBeads[index].radius + newBeads[i].radius) {
            const position = calculateAttachPosition(
              newBeads[index],
              newBeads[i]
            );
            newBeads[i] = { ...newBeads[i], x: position.x, y: position.y };
          }
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
    <div className="h-max w-screen flex justify-center items-center">
      <div className="bg-white border-2 border-slate-500 w-max ">
        <Stage
          width={800}
          height={600}
          className="border-2 border-black border-solid"
        >
          <Layer>
            <Group>
              {beads.map((bead, index) => (
                <MagneticBead
                  bead={bead}
                  handleDragEnd={handleDragEnd}
                  index={index}
                  key={bead.id}
                />
              ))}
            </Group>
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default CanvasBoard;
