import { useState } from "react";
// import Interface from "../interface/Interface";
import { Canvas } from "@react-three/fiber";
import Interface from "../Slotgame/interface/Interface";
import Game from "../Slotgame/Game";

const Slotgame = () => {
  const [windowWidth] = useState(window.innerWidth);
  const cameraPositionZ = windowWidth > 500 ? 30 : 40;
  return (
    <>
      <div className="w-screen h-screen">
        <Interface />
        <Canvas camera={{ fov: 75, position: [0, 0, cameraPositionZ] }}>
          <Game />
          {/* // <Text size={100} /> */}
        </Canvas>
      </div>
    </>
  );
};

export default Slotgame;
