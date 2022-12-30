import { DicesState } from "modules/dice";

export const CATEGOTY = {
  ACES: 1,
  DEUCES: 2,
} as const;

type CATEGOTY = typeof CATEGOTY[keyof typeof CATEGOTY];

export function rollDice(): number {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);

  return (array[0] % 6) + 1;
}

export function evaluationDices(
  diceArray: DicesState,
  category: CATEGOTY
): number {
  switch (category) {
    case CATEGOTY.ACES:
      const acesScore = diceArray.reduce<number>((acc, currentDice) => {
        if (currentDice.eyes === 1) {
          return acc + currentDice.eyes;
        } else {
          return acc;
        }
      }, 0);
      return acesScore;
    default:
      return 0;
  }
}
