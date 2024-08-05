import React, { useCallback, useEffect, useRef, useState } from "react";
import { Stage, Layer, Group, Rect, Text } from "react-konva";
import { MagneticBead, OnBoardMagneticBead } from "../components/MagneticBead";

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
  // const getPlayerCollectionCoordinates = (isPlayer1: boolean) => {
  //   if (isPlayer1) {
  //     return [
  //       { x: 30, y: 190 },
  //       { x: 30, y: 250 },
  //       { x: 30, y: 310 },
  //     ];
  //   } else {
  //     return [
  //       { x: 770, y: 190 },
  //       { x: 770, y: 250 },
  //       { x: 770, y: 310 },
  //     ];
  //   }
  // };

  const player1BeadsRef = useRef(player1beads);
  const player2BeadsRef = useRef(player2beads);
  const onBoardBeadsRef = useRef(onBoardBeads);
  const [_removingBeads, setRemovingBeads] = useState<Set<number>>(new Set());
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Points, _setPlayer1Points] = useState(10);
  const [player2Points, _setPlayer2Points] = useState(10);
  const [_layer1attract, setPlayer1Attract] = useState(0);
  const [_player2attract, setPlayer2Attract] = useState(0);
  useEffect(() => {
    player1BeadsRef.current = player1beads;
    player2BeadsRef.current = player2beads;
    onBoardBeadsRef.current = onBoardBeads;
  }, [player1beads, player2beads, onBoardBeads]);
  const switchPlayer = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
  };
  const handleDragMove = useCallback(
    (
      e: any,
      beadId: number,

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
      switchPlayer();
    },
    [mainBoardLeft, mainBoardRight]
  );
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
    const checkBeadAttractions = () => {
      let newBeads = [...onBoardBeads];
      let hasChanges = false;

      for (let i = 0; i < newBeads.length; i++) {
        for (let j = i + 1; j < newBeads.length; j++) {
          const distance = calculateDistance(newBeads[i], newBeads[j]);
          if (distance < (newBeads[i].radius + newBeads[j].radius) * 2) {
            const position = calculateAttachPosition(newBeads[i], newBeads[j]);
            newBeads[j] = { ...newBeads[j], x: position.x, y: position.y };
            hasChanges = true;
          }
        }
      }

      if (hasChanges) {
        // Check for groups of 3 or more
        for (let i = 0; i < newBeads.length; i++) {
          const attachedBeadIds = getAttachedBeads(newBeads, i);
          if (attachedBeadIds.length >= 2) {
            // newBeads = newBeads.filter(
            //   (bead) => !attachedBeadIds.includes(bead.id)
            // );
            // console.log("Group of 3 or more beads removed:", attachedBeadIds);
            setRemovingBeads(new Set(attachedBeadIds));
            setTimeout(() => {
              setOnBoardBeads((prevBeads) =>
                prevBeads.filter((bead) => !attachedBeadIds.includes(bead.id))
              );
              setRemovingBeads(new Set());
            }, 500); // Duration of the animation
            if (currentPlayer === 1) {
              // setPlayer1Points(
              //   (prevPoints) => prevPoints - attachedBeadIds.length
              // );
              setPlayer1Attract(attachedBeadIds.length);
              setPlayer2Attract(0);
              // const player1Coordinates = getPlayerCollectionCoordinates(true);
              // const updatedBeads = newBeads
              //   .filter((bead) => attachedBeadIds.includes(bead.id))
              //   .map((bead, index) => ({
              //     ...bead,
              //     x: player1Coordinates[index % player1Coordinates.length].x,
              //     y: player1Coordinates[index % player1Coordinates.length].y,
              //   }));
              // setPlayer1Beads((prevBeads) => [...prevBeads, ...updatedBeads]);
              console.log(
                "Player 1 points:",
                player1Points,
                attachedBeadIds.length
              );
            } else if (currentPlayer === 2) {
              setPlayer2Attract(attachedBeadIds.length);
              setPlayer1Attract(0);
              // setPlayer2Points(
              //   (prevPoints) => prevPoints - attachedBeadIds.length
              // );
              // const player2Coordinates = getPlayerCollectionCoordinates(false);
              // const updatedBeads = newBeads
              //   .filter((bead) => attachedBeadIds.includes(bead.id))
              //   .map((bead, index) => ({
              //     ...bead,
              //     x: player2Coordinates[index % player2Coordinates.length].x,
              //     y: player2Coordinates[index % player2Coordinates.length].y,
              //   }));
              // setPlayer2Beads((prevBeads) => [...prevBeads, ...updatedBeads]);
              console.log(
                "Player 2 points:",
                player2Points,
                attachedBeadIds.length
              );
            }
            break;
          }
        }
        setOnBoardBeads(newBeads);
      }
    };

    checkBeadAttractions();
  }, [onBoardBeads]);

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
              <Text text={`Player 1 - ${player1Points}`} x={10} y={10} />
              <Rect
                x={0}
                y={0}
                width={mainBoardLeft}
                height={stageHeight}
                fill={
                  !(currentPlayer === 1)
                    ? "rgba(0,0,255,0.1)"
                    : "rgba(255,0,0,0.1)"
                }
              />
              {player1beads.map((bead) => (
                <MagneticBead
                  bead={bead}
                  draggable={currentPlayer === 1}
                  handleDragMove={(e) =>
                    handleDragMove(e, bead.id, setPlayer1Beads)
                  }
                  handleDragEnd={(e) => handleDragEnd(e, bead.id, true, false)}
                  key={bead.id}
                />
              ))}
            </Group>
          </Layer>
          <Layer>
            <Group>
              <Text
                text={`Player 2-${player2Points}`}
                x={stageWidth - 80}
                y={10}
              />
              <Rect
                x={mainBoardRight}
                y={0}
                width={stageWidth - mainBoardRight}
                height={stageHeight}
                fill={
                  !(currentPlayer === 2)
                    ? "rgba(0,0,255,0.1)"
                    : "rgba(255,0,0,0.1)"
                }
              />
              {player2beads.map((bead) => (
                <MagneticBead
                  draggable={currentPlayer === 2}
                  bead={bead}
                  handleDragMove={(e) =>
                    handleDragMove(e, bead.id, setPlayer2Beads)
                  }
                  handleDragEnd={(e) => handleDragEnd(e, bead.id, false, true)}
                  key={bead.id}
                />
              ))}
            </Group>
          </Layer>
          <Layer>
            {/* {onBoardBeads.map((bead) => (
              <MagneticBead
                bead={bead}
                handleDragMove={(e) =>
                  handleDragMove(e, bead.id, setOnBoardBeads)
                }
                handleDragEnd={(e) => handleDragEnd(e, bead.id, false, false)}
                key={bead.id}
              />
            ))} */}
            {onBoardBeads.map((bead) => (
              //@ts-ignore
              // <animated.Group
              //   key={bead.id}
              //   {...useSpring({
              //     opacity: removingBeads.has(bead.id) ? 0 : 1,
              //     config: { duration: 500 },
              //   })}
              // >
              <OnBoardMagneticBead
                bead={bead}
                handleDragMove={(e) =>
                  handleDragMove(e, bead.id, setOnBoardBeads)
                }
                handleDragEnd={(e) => handleDragEnd(e, bead.id, false, false)}
                key={bead.id}
              />
              // </animated.Group>
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default CanvasBoard;
