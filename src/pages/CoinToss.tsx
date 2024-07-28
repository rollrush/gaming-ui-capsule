import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/coinstyle.css";

const CoinToss = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState("heads");
  const [currentSide, setCurrentSide] = useState("heads"); // New state for current side

  const handleFlip = () => {
    setIsFlipping(true);
    setTimeout(() => setIsFlipping(false), 2000); // duration of the flip
    const randomResult = Math.random() > 0.5 ? "heads" : "tails";
    setResult(randomResult);
    console.log(randomResult);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        className={`coin ${currentSide}`} // Apply color based on currentSide
        animate={{
          rotateY: isFlipping ? 360 * 3 : 0, // 3 full flips
        }}
        transition={{
          duration: 2, // match with setTimeout duration
          ease: "easeInOut",
        }}
        onAnimationComplete={() => {
          setCurrentSide(result); // Update currentSide after flip
        }}
      >
        <div className="front">Heads</div>
        <div className="back">Tails</div>
      </motion.div>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleFlip}
      >
        Flip Coin
      </button>
    </div>
  );
};

export default CoinToss;
