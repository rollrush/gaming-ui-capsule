import * as BABYLON from "@babylonjs/core";
import * as CANNON from "cannon";
import "@babylonjs/loaders";
import { useEffect } from "react";
export class MagneticChessGame {
  private scene: BABYLON.Scene;
  private engine: BABYLON.Engine;
  private camera: BABYLON.ArcRotateCamera | undefined;
  private mainBoard: BABYLON.Mesh | undefined;
  private playerBoard1: BABYLON.Mesh | undefined;
  private playerBoard2: BABYLON.Mesh | undefined;
  private chessPieces: BABYLON.Mesh[] = [];
  private player1Beads: BABYLON.Mesh[] = [];
  private player2Beads: BABYLON.Mesh[] = [];
  private mainBoardBeads: BABYLON.Mesh[] = [];
  //   private player1Score: number = 1;
  attachedBeadCount: any;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new BABYLON.Engine(canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    // this.scene.attachControl(true, true);
    this.createScene();
  }
  private getPlayerBoardBoundaries(board: BABYLON.Mesh): {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
  } {
    const boundingBox = board.getBoundingInfo().boundingBox;
    return {
      minX: boundingBox.minimumWorld.x,
      maxX: boundingBox.maximumWorld.x,
      minZ: boundingBox.minimumWorld.z,
      maxZ: boundingBox.maximumWorld.z,
    };
  }
  private isOnPlayerBoard(piece: BABYLON.Mesh): boolean {
    return (
      this.isOverBoard(piece, this.playerBoard1) ||
      this.isOverBoard(piece, this.playerBoard2)
    );
  }

  // private clampToBoardBoundaries(
  //     piece: BABYLON.Mesh,
  //     board: BABYLON.Mesh
  // ): void {
  //     const boardBoundingBox = board.getBoundingInfo().boundingBox;
  //     const halfWidth = boardBoundingBox.maximumWorld.x - board.position.x;
  //     const halfDepth = boardBoundingBox.maximumWorld.z - board.position.z;

  //     piece.position.x = Math.max(
  //         board.position.x - halfWidth,
  //         Math.min(piece.position.x, board.position.x + halfWidth)
  //     );
  //     piece.position.z = Math.max(
  //         board.position.z - halfDepth,
  //         Math.min(piece.position.z, board.position.z + halfDepth)
  //     );
  // }

  private createScene(): void {
    // Camera setup
    this.camera = new BABYLON.ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 3,
      25,
      BABYLON.Vector3.Zero(),
      this.scene
    );
    this.camera.attachControl(this.canvas, true);

    // Light setup
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );
    light.intensity = 0.7;

    // Enable physics
    this.scene.enablePhysics(
      new BABYLON.Vector3(0, -9.81, 0),
      new BABYLON.CannonJSPlugin(true, 10, CANNON)
    );

    // Create boards
    this.mainBoard = this.createBoard(0, 0, 0, 8, 8);
    this.playerBoard1 = this.createBoard(-10, 0, 0, 4, 8);
    this.playerBoard2 = this.createBoard(10, 0, 0, 4, 8);

    // Create some example chess pieces
    this.createChessPiece(-10, 2, 0, BABYLON.Color3.Green(), 1);
    this.createChessPiece(-10, 2, 1, BABYLON.Color3.Green(), 1);
    this.createChessPiece(-10, 2, 2, BABYLON.Color3.Green(), 1);
    this.createChessPiece(-10, 2, 3, BABYLON.Color3.Green(), 1);
    this.createChessPiece(10, 2, 0, BABYLON.Color3.Yellow(), 2);
    this.createChessPiece(10, 2, 1, BABYLON.Color3.Yellow(), 2);
    this.createChessPiece(10, 2, 3, BABYLON.Color3.Yellow(), 2);
    this.createChessPiece(10, 2, 2, BABYLON.Color3.Yellow(), 2);
    this.scene.registerBeforeRender(() => this.updateMagneticForces());
  }

  private createBoard(
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number
  ): BABYLON.Mesh {
    const board = BABYLON.MeshBuilder.CreateBox(
      "board",
      { width: width, height: 0.2, depth: depth },
      this.scene
    );
    board.position = new BABYLON.Vector3(x, y, z);
    board.physicsImpostor = new BABYLON.PhysicsImpostor(
      board,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0.9 },
      this.scene
    );
    return board;
  }

  private updateMagneticForces(): void {
    for (let i = 0; i < this.chessPieces.length; i++) {
      for (let j = i + 1; j < this.chessPieces.length; j++) {
        this.applyMagneticForceBetweenPieces(
          this.chessPieces[i],
          this.chessPieces[j]
        );
      }
    }
  }

  private applyMagneticForceBetweenPieces(
    piece1: BABYLON.Mesh,
    piece2: BABYLON.Mesh
  ): void {
    if (
      this.isOnPlayerBoard(piece1) ||
      this.isOnPlayerBoard(piece2) ||
      piece1.metadata.isDragging ||
      piece2.metadata.isDragging
    ) {
      return; // Skip magnetic attraction
    }
    const magneticStrength = 50; // Increased for stronger effect
    const attractionDistance = 2; // Increased for larger range of effect
    const snapDistance = 0.8;
    const distance = BABYLON.Vector3.Distance(piece1.position, piece2.position);
    if (distance < attractionDistance) {
      const direction = piece2.position.subtract(piece1.position).normalize();
      const forceMagnitude =
        magneticStrength * (1 - distance / attractionDistance);
      const force = direction.scale(forceMagnitude);

      piece1.physicsImpostor!.applyForce(force, piece1.getAbsolutePosition());
      piece2.physicsImpostor!.applyForce(
        force.scale(-1),
        piece2.getAbsolutePosition()
      );
      // console.log("beads attracted", piece1, piece2);
      console.log(distance);

      if (distance < snapDistance) {
        this.handleSnap(piece1, piece2);
        console.log("handleSnap, this is the snap distance", snapDistance);
      }
    }
  }

  // private handleSnap(piece1: BABYLON.Mesh, piece2: BABYLON.Mesh): void {
  //     const snappingPlayer = piece1.metadata.player || piece2.metadata.player;
  //     if (snappingPlayer === this.currentPlayer) {
  //         this.moveToPlayerBoard(piece1, snappingPlayer);
  //         this.moveToPlayerBoard(piece2, snappingPlayer);
  //     }
  // }
  private createChessPiece(
    x: number,
    y: number,
    z: number,
    color: BABYLON.Color3,
    player?: number
  ): void {
    const piece = BABYLON.MeshBuilder.CreateSphere(
      "piece",
      { diameter: 0.8 },
      this.scene
    );
    piece.position = new BABYLON.Vector3(x, y, z);
    piece.id = BABYLON.Tools.RandomId();
    // Store the initial position
    piece.metadata = {
      initialPosition: piece.position.clone(),
      currentposition: piece.position.clone(),
      isOnMainBoard: false,
      isDragging: false,
      player: player,
    };

    // Set material and color
    const material = new BABYLON.StandardMaterial("pieceMaterial", this.scene);
    material.diffuseColor = color;
    piece.material = material;

    // Add physics impostor
    piece.physicsImpostor = new BABYLON.PhysicsImpostor(
      piece,
      BABYLON.PhysicsImpostor.SphereImpostor,
      { mass: 1, restitution: 0.7, friction: 0.5 },
      this.scene
    );

    const dragBehavior = new BABYLON.PointerDragBehavior({
      dragPlaneNormal: new BABYLON.Vector3(0, 1, 0),
    });
    dragBehavior.useObjectOrientationForDragging = false;

    dragBehavior.onDragStartObservable.add(() => {
      piece.metadata.isDragging = true;
      piece.physicsImpostor!.setLinearVelocity(BABYLON.Vector3.Zero());
      piece.physicsImpostor!.setAngularVelocity(BABYLON.Vector3.Zero());
      piece.metadata.currentposition = piece.position.clone();
    });

    dragBehavior.onDragObservable.add(() => {
      piece.physicsImpostor!.setLinearVelocity(BABYLON.Vector3.Zero());
      piece.physicsImpostor!.setAngularVelocity(BABYLON.Vector3.Zero());
    });

    dragBehavior.onDragEndObservable.add(() => {
      if (piece.metadata.isSnapped) {
        return;
      }

      piece.metadata.isDragging = false;
      this.checkAndCorrectPosition(piece);
      if (this.isOverBoard(piece, this.mainBoard)) {
        this.mainBoardBeads.push(piece);
        piece.metadata.isOnMainBoard = true;
        if (player === 1) {
          this.player1Beads = this.player1Beads.filter((p) => p !== piece);
        } else {
          this.player2Beads = this.player2Beads.filter((p) => p !== piece);
        }
      }
      console.log("drag end", piece);
      console.log("player1Beads", this.player1Beads);
      console.log("player2Beads", this.player2Beads);
      console.log("mainBoardBeads", this.mainBoardBeads);
    });

    piece.addBehavior(dragBehavior);
    if (player === 1) {
      this.player1Beads.push(piece);
    } else {
      this.player2Beads.push(piece);
    }

    this.chessPieces.push(piece);

    // Add an observer to continuously check the piece's position, but only when not dragging
    this.scene.onBeforeRenderObservable.add(() => {
      if (!piece.metadata.isDragging) {
        this.checkAndCorrectPosition(piece);
      }
    });
  }

  private checkAndCorrectPosition(piece: BABYLON.Mesh): void {
    if (!this.isOverAnyBoard(piece)) {
      // If the piece is not over any board or has fallen below a certain height,
      // return it to its initial position
      console.log(
        "checkAndCorrectPosition",
        "the beads is not over any board or has fallen below a certain height",
        piece
      );

      piece.position = (
        piece.metadata.currentposition as BABYLON.Vector3
      ).clone();
      piece.physicsImpostor!.setLinearVelocity(BABYLON.Vector3.Zero());
      piece.physicsImpostor!.setAngularVelocity(BABYLON.Vector3.Zero());
    } else {
      // If the piece is over a board, ensure it stays at a minimum height
      piece.position.y = Math.max(piece.position.y, 0.4);
    }
  }
  private handleSnap(piece1: BABYLON.Mesh, piece2: BABYLON.Mesh): void {
    // const snappingPlayer = piece1.metadata.player || piece2.metadata.player;

    if (
      this.isOverBoard(piece1, this.mainBoard) &&
      this.isOverBoard(piece2, this.mainBoard) &&
      piece1.metadata.isOnMainBoard &&
      piece2.metadata.isOnMainBoard
    ) {
      //   const snappingPlayer = piece1.metadata.player || piece2.metadata.player;
      // Log the IDs of the beads that are attracted
      console.log(
        `Beads attracted on the main board: ${piece1.id} and ${piece2.id}`
      );

      this.moveToPlayerBoard(piece1, 1);
      this.moveToPlayerBoard(piece2, 1);

      // Remove the beads from the main board arrays
      this.mainBoardBeads = this.mainBoardBeads.filter(
        (p) => p !== piece1 && p !== piece2
      );

      // Increase the attached bead count
      // this.attachedBeadCount++;
      // this.player1Beads = this.player1Beads.filter((p) => p !== piece1);

      // Optionally move the beads to the player's board
      // this.moveToPlayerBoard(piece1, snappingPlayer);
      // this.moveToPlayerBoard(piece2, snappingPlayer);
    }
  }
  private moveToPlayerBoard(piece: BABYLON.Mesh, player: number): void {
    if (player === 1 && this.playerBoard1) {
      // Get the boundaries of the player1 board
      const boundaries = this.getPlayerBoardBoundaries(this.playerBoard1);

      // Generate random positions within the boundaries
      const randomX =
        boundaries.minX + Math.random() * (boundaries.maxX - boundaries.minX);
      const randomZ =
        boundaries.minZ + Math.random() * (boundaries.maxZ - boundaries.minZ);
      piece.metadata.isOnMainBoard = false;
      // Target position on the player1 board
      const targetPosition = new BABYLON.Vector3(
        randomX,
        this.playerBoard1.position.y + 0.5, // Slightly above the board
        randomZ
      );

      // Create animation
      const animation = new BABYLON.Animation(
        "moveToBoard",
        "position",
        30,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      );

      const keys = [
        { frame: 0, value: piece.position.clone() },
        { frame: 30, value: targetPosition },
      ];

      animation.setKeys(keys);

      piece.animations = [];
      piece.animations.push(animation);

      // Play sound effect
      // const snapSound = new BABYLON.Sound("snapSound", "path/to/snap.mp3", this.scene);
      // snapSound.play();

      // Start animation and update piece's final position
      this.scene.beginAnimation(piece, 0, 30, false, 1, () => {
        piece.position = targetPosition;

        // Add the piece to Player 1's bead collection
        this.player1Beads.push(piece);

        // Optionally update physics
        piece.physicsImpostor!.setLinearVelocity(BABYLON.Vector3.Zero());
        piece.physicsImpostor!.setAngularVelocity(BABYLON.Vector3.Zero());
      });
    }
  }

  //   private getRandomPositionOnBoard(board: BABYLON.Mesh): BABYLON.Vector3 {
  //     const boardBoundingBox = board.getBoundingInfo().boundingBox;
  //     const x =
  //       Math.random() *
  //         (boardBoundingBox.maximumWorld.x - boardBoundingBox.minimumWorld.x) +
  //       boardBoundingBox.minimumWorld.x;
  //     const z =
  //       Math.random() *
  //         (boardBoundingBox.maximumWorld.z - boardBoundingBox.minimumWorld.z) +
  //       boardBoundingBox.minimumWorld.z;
  //     return new BABYLON.Vector3(x, board.position.y + 0.5, z);
  //   }

  private isOverAnyBoard(piece: BABYLON.Mesh): boolean {
    const boards = [this.mainBoard, this.playerBoard1, this.playerBoard2];
    for (const board of boards) {
      if (this.isOverBoard(piece, board)) {
        return true;
      }
    }
    return false;
  }

  private isOverBoard(
    piece: BABYLON.Mesh,
    board: BABYLON.Mesh | undefined
  ): boolean {
    // console.log("board", board);

    if (!board) {
      return false;
    }

    const boardBoundingBox = board.getBoundingInfo().boundingBox;
    const piecePosition = piece.position;

    return (
      piecePosition.x >= boardBoundingBox.minimumWorld.x &&
      piecePosition.x <= boardBoundingBox.maximumWorld.x &&
      piecePosition.z >= boardBoundingBox.minimumWorld.z &&
      piecePosition.z <= boardBoundingBox.maximumWorld.z
    );
  }
  public run(): void {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }
}

// Usage
// const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
// const game = new MagneticChessGame(canvas);
// game.run();

const MagneticBeads = () => {
  useEffect(() => {
    console.log("useEffect");
    let canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    let app = new MagneticChessGame(canvas);
    app.run();
  }, []);
  window.addEventListener("DOMContentLoaded", () => {
    console.log("content loaded");
  });
  return (
    <canvas id="renderCanvas" style={{ width: "100%", height: "90%" }}></canvas>
  );
};

export default MagneticBeads;
