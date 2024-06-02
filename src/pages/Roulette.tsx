import { useEffect } from "react";
import { Link } from "react-router-dom";

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
  return <div></div>;
};

export default Roulette;
