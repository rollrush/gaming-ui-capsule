import React, { useEffect, useState } from "react";
import { Stage, Layer, Group } from "react-konva";
import MagneticBead from "../components/MagneticBead";
import { Howl } from "howler";

const attachSound = new Howl({
  src: [""], // Correct path to your sound file in the public directory
});
// import sound from "./rattingmag.mp3";
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
    const attachedBeadIds = getAttachedBeads(newBeads, index);
    console.log("playing sounds");
    // attachSound();

    if (attachedBeadIds.length >= 2) {
      // Play attach sound effect

      // Animate and remove beads
      attachedBeadIds.forEach((beadId) => {
        const attachedBead = e.target;
        if (attachedBead) {
          attachedBead.to({
            scaleX: 0,
            scaleY: 0,
            opacity: 0,
            duration: 0.3,
            onFinish: () => {
              newBeads = newBeads.filter(
                (bead) => !attachedBeadIds.includes(bead.id)
              );
              setBeads(newBeads);
            },
          });
        }
      });
    }
    // console.log(a, "attached beads");
    console.log(beads, "this is beads");
  };
  const calculateDistance = (bead1: Bead, bead2: Bead): number => {
    const dx = bead1.x - bead2.x;
    const dy = bead1.y - bead2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };
  // useEffect(() => {
  //   // Handle sound load error
  //   attachSound.on("loaderror", (id, error) => {
  //     console.error("Error loading sound:", error);
  //   });

  //   // Log when the sound is loaded
  //   attachSound.on("load", () => {
  //     console.log("Sound loaded successfully");
  //   });
  // }, []);
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
  const getAttachedBeads = (beads: Bead[], index: number): number[] => {
    const attachedBeads: number[] = [];
    const stack: number[] = [index];
    const visited: boolean[] = Array(beads.length).fill(false);

    while (stack.length > 0) {
      const currentIndex = stack.pop();
      if (currentIndex === undefined || visited[currentIndex]) continue;

      visited[currentIndex] = true;
      attachedBeads.push(beads[currentIndex].id);

      beads.forEach((bead, i) => {
        if (
          !visited[i] &&
          calculateDistance(beads[currentIndex], bead) <
            (beads[currentIndex].radius + bead.radius) * 2
        ) {
          stack.push(i);
        }
      });
    }

    // setBeads(newBeads);
    // setBeads(newBeads);

    return attachedBeads;
  };

  useEffect(() => {
    // Handle sound load error
    attachSound.on("loaderror", (id, error) => {
      console.error("Error loading sound:", error);
    });

    // Log when the sound is loaded
    attachSound.on("load", () => {
      console.log("Sound loaded successfully");
    });
  }, []);

  return (
    <div className="h-max w-screen flex justify-center items-center">
      <div className="border-2 border-slate-500 w-max rounded-2xl p-10 bg-orange-300 ">
        <Stage
          width={800}
          height={600}
          className="border-2 border-black border-solid rounded-2xl bg-white"
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
