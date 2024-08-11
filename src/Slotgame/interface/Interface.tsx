// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import useGame from "../stores/store";
import "./style.css";

const Interface = () => {
  // const phase = useGame((state) => state.phase);

  const coins = useGame((state) => state.coins);
  const spins = useGame((state) => state.spins);

  return (
    <>
      {/* Logo */}

      <div className="interface">
        {/* Coins */}
        <div className="coins-section">
          <div className="coins-number">{coins}</div>
          <img className="coins-image" src="/public/images/coin.png" />
        </div>

        {/* Spins */}
        <div className="spins-section">
          <div className="spins-number">{spins}</div>
        </div>

        {/* Phase */}
        {/* <div >{phase.toUpperCase()}</div> */}
      </div>
    </>
  );
};

export default Interface;
