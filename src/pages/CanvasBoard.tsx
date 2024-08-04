import React, { useEffect, useState } from "react";
import { Stage, Layer, Group, Rect } from "react-konva";
import MagneticBead from "../components/MagneticBead";
import { Howl } from "howler";

const attachSound = new Howl({
  src: [""], // Correct path to your sound file in the public directory
});

const stageWidth = 800; // Width of the stage
const stageHeight = 600; // Height of the stage
const mainBoardLeft = 130;
const mainBoardRight = stageWidth - 130;

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
  const [player1beads, setPlayer1Beads] = useState<Bead[]>([
    {
      id: 1,
      x: 30,
      y: 70,
      radius: 20,
      color: "blue",
      strength: 5,
      threshold: 0.05,
    },
    {
      id: 2,
      x: 30,
      y: 130,
      radius: 30,
      color: "blue",
      strength: 3,
      threshold: 0.08,
    },
    {
      id: 3,
      x: 30,
      y: 190,
      radius: 30,
      color: "blue",
      strength: 3,
      threshold: 0.08,
    },
    {
      id: 4,
      x: 30,
      y: 250,
      radius: 30,
      color: "blue",
      strength: 3,
      threshold: 0.08,
    },
    {
      id: 5,
      x: 30,
      y: 310,
      radius: 30,
      color: "blue",
      strength: 3,
      threshold: 0.08,
    },
  ]);
  const [player2beads, setPlayer2Beads] = useState<Bead[]>([
    {
      id: 6,
      x: stageWidth - 30,
      y: 70,
      radius: 20,
      color: "blue",
      strength: 5,
      threshold: 0.05,
    },
    {
      id: 7,
      x: stageWidth - 30,
      y: 130,
      radius: 30,
      color: "blue",
      strength: 3,
      threshold: 0.08,
    },
    {
      id: 8,
      x: stageWidth - 30,
      y: 190,
      radius: 30,
      color: "blue",
      strength: 3,
      threshold: 0.08,
    },
    {
      id: 9,
      x: stageWidth - 30,
      y: 250,
      radius: 30,
      color: "blue",
      strength: 3,
      threshold: 0.08,
    },
    {
      id: 10,
      x: stageWidth - 30,
      y: 310,
      radius: 30,
      color: "blue",
      strength: 3,
      threshold: 0.08,
    },
  ]);
  const [onBoardBeads, setOnBoardBeads] = useState<Bead[]>([]);

  const handleDragEnd = (
    e: any,
    beadId: number,
    beads: Bead[],
    setBeads: React.Dispatch<React.SetStateAction<Bead[]>>
  ) => {
    let { x, y } = e.target.position();
    const beadIndex = beads.findIndex((bead) => bead.id === beadId);
    const bead = beads[beadIndex];
    console.log("Bead: ", bead, "Bead Index: ", beadIndex);

    if (!bead) return;

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
    console.log(
      "X: ",
      x,
      "Y: ",
      y,
      "formthe function",
      mainBoardLeft,
      mainBoardRight
    );

    // Check if the bead is placed within the main board area
    if (x >= mainBoardLeft && x <= mainBoardRight) {
      let newBeads = [...beads];
      setOnBoardBeads([...onBoardBeads, bead]);
      setBeads(newBeads.filter((b) => b.id !== beadId));
      console.log("condition satisies bead inside the board", newBeads);
      console.log(
        "condition satisies bead inside the board",
        onBoardBeads,
        "this is the on board beads",
        beads,
        "thisis playe"
      );
      // newBeads[beadIndex] = { ...bead, x, y };

      // // Adding bead to the main board
      // let newOnBoardBeads = [...onBoardBeads, newBeads[beadIndex]];
      // console.log("newOnBoardBeads", newOnBoardBeads);

      // // Handling attachment of beads
      // newOnBoardBeads.forEach((bead, i) => {
      //   if (i !== beadIndex) {
      //     const distance = calculateDistance(newOnBoardBeads[beadIndex], bead);
      //     if (
      //       distance <
      //       (newOnBoardBeads[beadIndex].radius + bead.radius) * 2
      //     ) {
      //       const position = calculateAttachPosition(
      //         newOnBoardBeads[beadIndex],
      //         bead
      //       );
      //       newOnBoardBeads[i] = { ...bead, x: position.x, y: position.y };
      //     }
      //   }
      // });

      // setOnBoardBeads(newOnBoardBeads);

      // const attachedBeadIds = getAttachedBeads(newOnBoardBeads, beadIndex);
      // if (attachedBeadIds.length >= 2) {
      //   attachedBeadIds.forEach((id) => {
      //     const attachedBead = e.target;
      //     if (attachedBead) {
      //       attachedBead.to({
      //         scaleX: 0,
      //         scaleY: 0,
      //         opacity: 0,
      //         duration: 0.3,
      //         onFinish: () => {
      //           newOnBoardBeads = newOnBoardBeads.filter(
      //             (bead) => !attachedBeadIds.includes(bead.id)
      //           );
      //           setOnBoardBeads(newOnBoardBeads);
      //         },
      //       });
      //     }
      //   });
      // }

      // Remove the bead from the player's collection
      newBeads = newBeads.filter((b) => b.id !== beadId);
      setBeads(newBeads);

      // Add the bead to the main board
      setOnBoardBeads([...onBoardBeads, bead]);
    } else {
      // If the bead is not placed within the main board area, reset its position
      e.target.position({ x: bead.x, y: bead.y });
    }

    console.log("Player 1 Beads: ", player1beads);
    console.log("Player 2 Beads: ", player2beads);
    console.log("On Board Beads: ", onBoardBeads);
  };

  // const calculateDistance = (bead1: Bead, bead2: Bead): number => {
  //   if (!bead1 || !bead2) return Infinity;
  //   const dx = bead1.x - bead2.x;
  //   const dy = bead1.y - bead2.y;
  //   return Math.sqrt(dx * dx + dy * dy);
  // };

  // const calculateAttachPosition = (
  //   bead1: Bead,
  //   bead2: Bead
  // ): { x: number; y: number } => {
  //   const dx = bead1.x - bead2.x;
  //   const dy = bead1.y - bead2.y;
  //   const angle = Math.atan2(dy, dx);
  //   const offsetX = Math.cos(angle) * (bead1.radius + bead2.radius);
  //   const offsetY = Math.sin(angle) * (bead1.radius + bead2.radius);

  //   return {
  //     x: bead1.x - offsetX,
  //     y: bead1.y - offsetY,
  //   };
  // };

  // const getAttachedBeads = (beads: Bead[], index: number): number[] => {
  //   const attachedBeads: number[] = [];
  //   const stack: number[] = [index];
  //   const visited: boolean[] = Array(beads.length).fill(false);

  //   while (stack.length > 0) {
  //     const currentIndex = stack.pop();
  //     if (currentIndex === undefined || visited[currentIndex]) continue;

  //     visited[currentIndex] = true;
  //     attachedBeads.push(beads[currentIndex].id);

  //     beads.forEach((bead, i) => {
  //       if (
  //         !visited[i] &&
  //         calculateDistance(beads[currentIndex], bead) <
  //           (beads[currentIndex].radius + bead.radius) * 2
  //       ) {
  //         stack.push(i);
  //       }
  //     });
  //   }

  //   return attachedBeads;
  // };

  useEffect(() => {
    attachSound.on("loaderror", (error) => {
      console.error("Error loading sound:", error);
    });

    attachSound.on("load", () => {
      console.log("Sound loaded successfully");
    });
  }, []);

  return (
    <div className="h-max w-screen flex justify-center items-center">
      <div
        className="border-2 border-slate-500 w-max rounded-2xl p-10 "
        style={{
          backgroundColor: "#617b5b",
        }}
      >
        <Stage
          width={800}
          height={600}
          className="border-2 border-black border-solid rounded-2xl bg-white"
        >
          <Layer>
            <Group>
              <Rect
                x={0}
                y={0}
                width={130}
                height={600}
                fill="rgba(0,0,255,0.1)"
              />
              {player1beads.map((bead) => (
                <MagneticBead
                  bead={bead}
                  handleDragEnd={(e) =>
                    handleDragEnd(e, bead.id, player1beads, setPlayer1Beads)
                  }
                  key={bead.id}
                />
              ))}
            </Group>
          </Layer>
          <Layer>
            <Group>
              <Rect
                x={800 - 130}
                y={0}
                width={130}
                height={600}
                fill="rgba(0,0,255,0.1)"
              />
              {player2beads.map((bead) => (
                <MagneticBead
                  bead={bead}
                  handleDragEnd={(e) =>
                    handleDragEnd(e, bead.id, player2beads, setPlayer2Beads)
                  }
                  key={bead.id}
                />
              ))}
            </Group>
          </Layer>
          <Layer>
            {onBoardBeads.map((bead) => (
              <MagneticBead
                bead={bead}
                handleDragEnd={(e) =>
                  handleDragEnd(e, bead.id, onBoardBeads, setOnBoardBeads)
                }
                key={bead.id}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default CanvasBoard;
