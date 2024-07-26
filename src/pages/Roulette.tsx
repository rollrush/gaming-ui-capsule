import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../style.css";
const Roulette = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/lokesh-katari/roulette/app.js";
    script.async = true; // Optional: makes the script load asynchronously
    document.body.appendChild(script);

    // Cleanup: remove the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, [Link]);
  return (
    <div
      style={{
        backgroundColor: "rgb(1,109,41)",
      }}
      className=" h-screen absolute w-screen -z-10 "
    ></div>
  );
};

export default Roulette;
