import * as BABYLON from "@babylonjs/core";
import * as CANNON from "cannon";
import "@babylonjs/loaders";
import { useEffect } from "react";
export class MagneticChessGame {
  private scene: BABYLON.Scene;
  private engine: BABYLON.Engine;
  private camera: BABYLON.ArcRotateCamera | undefined;
  private mainBoard: BABYLON.Mesh | null = null;
  private playerBoard1: BABYLON.Mesh | null = null;
  private playerBoard2: BABYLON.Mesh | null = null;
  private testBoard: BABYLON.Mesh | null = null;
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

  private async createScene(): Promise<void> {
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
    console.log(
      this.mainBoard?.getBoundingInfo().boundingBox,
      "this is boudnign info of mainbaord"
    );

    this.playerBoard1 = this.createBoard(-10, 0, 0, 4, 8);
    this.playerBoard2 = this.createBoard(10, 0, 0, 4, 8);
    console.log(
      this.playerBoard1?.getBoundingInfo().boundingBox,
      "this is boudnign info of plaeyr1"
    );
    // console.log(
    //   this.playerBoard2?.getBoundingInfo(),
    //   "this is boudnign info of player2"
    // );

    // // this.testBoard = await this.createBoard2(0, 0, 0, 6, 6);
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

  private async createBoard2(
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number
  ): Promise<BABYLON.Mesh | null> {
    const result = await BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "/public/models/", // Directory where the GLB file is located
      "mainboard.glb", // The GLB file name
      this.scene
    );

    // Assuming your model is the first mesh in the array
    const importedMesh = result.meshes[0];

    // Ensure it's a Mesh type before continuing
    if (importedMesh instanceof BABYLON.Mesh) {
      importedMesh.scaling = new BABYLON.Vector3(width, 0.2, depth);
      importedMesh.position = new BABYLON.Vector3(x, 0.1, z);

      // Apply physics impostor if necessary
      // importedMesh.physicsImpostor = new BABYLON.PhysicsImpostor(
      //   importedMesh,
      //   BABYLON.PhysicsImpostor.BoxImpostor,
      //   { mass: 0, restitution: 0.5 },
      //   this.scene
      // );

      importedMesh.physicsImpostor = new BABYLON.PhysicsImpostor(
        importedMesh,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0.5, friction: 0.1 },
        this.scene
      );
      importedMesh.physicsImpostor!.physicsBody.showBoundingBox = true;
      console.log("Main board position:", importedMesh.position);
      console.log(
        "Main board bounding box:",
        importedMesh.getBoundingInfo().boundingBox
      );
      return importedMesh;
    } else {
      console.error("The imported mesh is not of type BABYLON.Mesh.");
      return null; // Handle this case as needed
    }
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
    // Create borders
    const borderHeight = 0.5;
    const borderThickness = 0.2;

    // Left border
    const leftBorder = BABYLON.MeshBuilder.CreateBox(
      "leftBorder",
      { width: borderThickness, height: borderHeight, depth: depth },
      this.scene
    );
    leftBorder.position = new BABYLON.Vector3(
      x - width / 2 - borderThickness / 2,
      y + borderHeight / 2,
      z
    );

    // Right border
    const rightBorder = BABYLON.MeshBuilder.CreateBox(
      "rightBorder",
      { width: borderThickness, height: borderHeight, depth: depth },
      this.scene
    );
    rightBorder.position = new BABYLON.Vector3(
      x + width / 2 + borderThickness / 2,
      y + borderHeight / 2,
      z
    );

    // Front border
    const frontBorder = BABYLON.MeshBuilder.CreateBox(
      "frontBorder",
      {
        width: width + 2 * borderThickness,
        height: borderHeight,
        depth: borderThickness,
      },
      this.scene
    );
    frontBorder.position = new BABYLON.Vector3(
      x,
      y + borderHeight / 2,
      z - depth / 2 - borderThickness / 2
    );

    // Back border
    const backBorder = BABYLON.MeshBuilder.CreateBox(
      "backBorder",
      {
        width: width + 2 * borderThickness,
        height: borderHeight,
        depth: borderThickness,
      },
      this.scene
    );
    backBorder.position = new BABYLON.Vector3(
      x,
      y + borderHeight / 2,
      z + depth / 2 + borderThickness / 2
    );

    board.position = new BABYLON.Vector3(x, y, z);
    board.physicsImpostor = new BABYLON.PhysicsImpostor(
      board,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0.1, friction: 0.8 },
      this.scene
    );
    leftBorder.physicsImpostor = new BABYLON.PhysicsImpostor(
      leftBorder,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0.1, friction: 0.8 },
      this.scene
    );

    rightBorder.physicsImpostor = new BABYLON.PhysicsImpostor(
      rightBorder,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0.1, friction: 0.8 },
      this.scene
    );

    frontBorder.physicsImpostor = new BABYLON.PhysicsImpostor(
      frontBorder,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0.1, friction: 0.8 },
      this.scene
    );

    backBorder.physicsImpostor = new BABYLON.PhysicsImpostor(
      backBorder,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0.1, friction: 0.8 },
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
      // this.checkAndCorrectPosition(piece);
      if (this.isOverBoard(piece, this.mainBoard)) {
        console.log("inside the is main overboard");

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

  private isOverAnyBoard(piece: BABYLON.Mesh): boolean {
    const boards = [this.mainBoard, this.playerBoard1, this.playerBoard2];
    for (const board of boards) {
      if (this.isOverBoard(piece, board)) {
        // console.log("retrunde true");

        return true;
      }
      //  onsole.log("retrunde false", board, this.mainBoard);
    }
    return false;
  }

  private isOverBoard(
    piece: BABYLON.Mesh,
    board: BABYLON.Mesh | null
  ): boolean {
    if (!board) {
      // console.log("this is not board", board);
      console.log("false");

      return false;
    }
    // console.log("true");

    const boardBoundingBox = board.getBoundingInfo().boundingBox;
    const piecePosition = piece.position;
    // console.log(boardBoundingBox, piecePosition, "bounding box and position");

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
    // this.scene.debugLayer.show();

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
