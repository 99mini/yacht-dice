import { DicesState } from "modules/dice";

export class BasicPedigreeModel {
  private _scores: Array<number>;

  constructor() {
    this._scores = new Array<number>(6).fill(0);
  }

  /**
   * evaluateBasicDice
   */
  public evaluateBasicDice(diceArray: DicesState): void {
    diceArray.map((dice) => {
      this._scores[dice.eyes - 1] += dice.eyes;
    });
  }

  public get scores(): Array<number> {
    return this._scores;
  }
}
