import React, { useState } from "react";
import "../styles/coinstyle.css";

const CoinToss: React.FC = () => {
  const [result, setResult] = useState<string>("");

  const coinToss = () => {
    setResult("");
    setTimeout(() => {
      if (Math.random() < 0.5) {
        setResult("heads");
        console.log("heads");
      } else {
        setResult("tails");
        console.log("tails");
      }
    }, 100); // Adding a slight delay to allow re-rendering
  };

  return (
    <div className="App">
      <div id="coin" className={result} key={+new Date()}>
        <div className="side-a">
          <h2>TAIL</h2>
        </div>
        <div className="side-b">
          <h2>HEAD</h2>
        </div>
      </div>
      <h1>Flip a coin</h1>
      <button id="btn" onClick={coinToss}>
        Coin Toss
      </button>
    </div>
  );
};

export default CoinToss;
