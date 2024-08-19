import devLog from "./devLog";
import { Fruit } from "../enums";
// Define the payout structure for different fruits
type Payout = {
  three: number;
  two: number;
};

// Create an object that holds the payouts for each fruit
const payouts: Record<Fruit, Payout> = {
  [Fruit.cherry]: { three: 50, two: 40 },
  [Fruit.apple]: { three: 20, two: 10 },
  [Fruit.banana]: { three: 15, two: 5 },
  [Fruit.lemon]: { three: 3, two: 0 },
  [Fruit.crown]: { three: 100, two: 50 },
  [Fruit.seven]: { three: 200, two: 100 },
  [Fruit.star]: { three: 30, two: 15 },
  [Fruit.diamond]: { three: 70, two: 35 },
  [Fruit.goldcoin]: { three: 150, two: 75 },
  [Fruit.none]: {
    three: 0,
    two: 0,
  },
};

/**
 * Returns the amount of coins won at the end of a spin
 *
 * @param fruit0 - The fruit result of reel 0
 * @param fruit1 - The fruit result of reel 1
 * @param fruit2 - The fruit result of reel 2
 * @returns Coins won
 *
 * @example
 * An example of a win:
 * ```
 * // Returns 50
 * endgame(Fruit.cherry, Fruit.cherry, Fruit.cherry)
 * ```
 *
 * @example
 * An example of a loss:
 * ```
 * // Returns 0
 * endgame(Fruit.cherry, Fruit.apple, Fruit.apple)
 * ```
 */
const endgame = (fruit0: Fruit, fruit1: Fruit, fruit2: Fruit): number => {
  let coins = 0;

  devLog("ENDGAME RUN<<<<<<<<<<<<<<<<<<<<<<<<");

  // Check for 3 of a kind
  if (fruit0 === fruit1 && fruit1 === fruit2) {
    coins = payouts[fruit0].three;
  }
  // Check for 2 of a kind
  else if (fruit0 === fruit1 || fruit0 === fruit2 || fruit1 === fruit2) {
    const matchingFruit =
      fruit0 === fruit1 || fruit0 === fruit2 ? fruit0 : fruit1;
    coins = payouts[matchingFruit].two;
  }

  if (coins > 0) {
    devLog(`Coins won: ${coins}`);
  }

  // Return coins won or 0 if no winning combination
  return coins;
};

export default endgame;
