import React, { useCallback, useEffect, useRef, useState } from "react";
import { Stage, Layer, Group, Rect } from "react-konva";
import MagneticBead from "../components/MagneticBead";
import { log } from "three/webgpu";

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
  const stageWidth = 800;
  const stageHeight = 600;
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

  const mainBoardLeft = 100;
  const mainBoardRight = 700;

  const player1BeadsRef = useRef(player1beads);
  const player2BeadsRef = useRef(player2beads);
  const onBoardBeadsRef = useRef(onBoardBeads);

  useEffect(() => {
    player1BeadsRef.current = player1beads;
    player2BeadsRef.current = player2beads;
    onBoardBeadsRef.current = onBoardBeads;
  }, [player1beads, player2beads, onBoardBeads]);

  const handleDragMove = useCallback(
    (
      e: any,
      beadId: number,
      beads: Bead[],
      setBeads: React.Dispatch<React.SetStateAction<Bead[]>>
    ) => {
      const { x, y } = e.target.position();
      setBeads((prevBeads) =>
        prevBeads.map((bead) => (bead.id === beadId ? { ...bead, x, y } : bead))
      );
    },
    []
  );

  const handleDragEnd = useCallback(
    (e: any, beadId: number, isPlayer1: boolean, isPlayer2: boolean) => {
      const { x, y } = e.target.position();
      console.log("Drag end:", beadId, x, y, isPlayer1, isPlayer2);

      if (x > mainBoardLeft && x < mainBoardRight) {
        let playerBeads: Bead[];
        let setPlayerBeads: React.Dispatch<React.SetStateAction<Bead[]>>;

        if (isPlayer1) {
          playerBeads = player1BeadsRef.current;
          setPlayerBeads = setPlayer1Beads;
        } else if (isPlayer2) {
          playerBeads = player2BeadsRef.current;
          setPlayerBeads = setPlayer2Beads;
        } else {
          // The bead is already on the board, just update its position
          setOnBoardBeads((prevBeads) =>
            prevBeads.map((bead) =>
              bead.id === beadId ? { ...bead, x, y } : bead
            )
          );
          return;
        }

        const movedBead = playerBeads.find((bead) => bead.id === beadId);
        if (
          movedBead &&
          !onBoardBeadsRef.current.some((bead) => bead.id === beadId)
        ) {
          setPlayerBeads((prevBeads) =>
            prevBeads.filter((bead) => bead.id !== beadId)
          );
          setOnBoardBeads((prevBeads) => [
            ...prevBeads,
            { ...movedBead, x, y },
          ]);
        }
      } else {
        console.log("out of bounds");
      }
    },
    [mainBoardLeft, mainBoardRight]
  );

  useEffect(() => {
    console.log("player1", player1beads);
    console.log("player2", player2beads);
    console.log("onboard", onBoardBeads);
  }, [player1beads, player2beads, onBoardBeads]);

  return (
    <div className="h-max w-screen flex justify-center items-center">
      <div
        className="border-2 border-slate-500 w-max rounded-2xl p-10"
        style={{
          backgroundColor: "#617b5b",
        }}
      >
        <Stage
          width={stageWidth}
          height={stageHeight}
          className="border-2 border-black border-solid rounded-2xl bg-white"
        >
          <Layer>
            <Group>
              <Rect
                x={0}
                y={0}
                width={mainBoardLeft}
                height={stageHeight}
                fill="rgba(0,0,255,0.1)"
              />
              {player1beads.map((bead) => (
                <MagneticBead
                  bead={bead}
                  handleDragMove={(e) =>
                    handleDragMove(e, bead.id, player1beads, setPlayer1Beads)
                  }
                  handleDragEnd={(e) => handleDragEnd(e, bead.id, true, false)}
                  key={bead.id}
                />
              ))}
            </Group>
          </Layer>
          <Layer>
            <Group>
              <Rect
                x={mainBoardRight}
                y={0}
                width={stageWidth - mainBoardRight}
                height={stageHeight}
                fill="rgba(0,0,255,0.1)"
              />
              {player2beads.map((bead) => (
                <MagneticBead
                  bead={bead}
                  handleDragMove={(e) =>
                    handleDragMove(e, bead.id, player2beads, setPlayer2Beads)
                  }
                  handleDragEnd={(e) => handleDragEnd(e, bead.id, false, true)}
                  key={bead.id}
                />
              ))}
            </Group>
          </Layer>
          <Layer>
            {onBoardBeads.map((bead) => (
              <MagneticBead
                bead={bead}
                handleDragMove={(e) =>
                  handleDragMove(e, bead.id, onBoardBeads, setOnBoardBeads)
                }
                handleDragEnd={(e) => handleDragEnd(e, bead.id, false, false)}
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
