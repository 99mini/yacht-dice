import { IPedigree } from "interfaces/Ipedigree";
import { DicesState } from "modules/dice";
import { PedigreeArrayState } from "modules/pedigree";

export class PedigreeModel {
  private static pedigree: PedigreeModel;
  basicPedigree: BasicPedigree;
  specialPedigree: SpecialPedigree;
  subtotal: number;
  bonus: number;
  total: number;

  constructor() {
    this.basicPedigree = new BasicPedigree();
    this.specialPedigree = new SpecialPedigree();
    this.subtotal = 0;
    this.bonus = 0;
    this.total = 0;
  }

  public static getPedigreeModel() {
    return this.pedigree || (this.pedigree = new this());
  }
}

export class BasicPedigree {
  private _scores: Array<number>;

  constructor() {
    this._scores = new Array<number>(6).fill(0);
  }

  /**
   * evaluateBasicDice
   */
  public evaluateBasicDice(
    diceArray: DicesState,
    pedigreeArray: PedigreeArrayState
  ): void {
    let tempScores = new Array<number>(6).fill(0);
    diceArray.map((dice) => {
      tempScores[dice.eyes - 1] += dice.eyes;
    });

    pedigreeArray.map((pedigree, index) => {
      if (!pedigree.fixed) {
        this._scores[index] = tempScores[index];
      }
    });
  }

  public get scores(): Array<number> {
    return this._scores;
  }
}

export class SpecialPedigree {
  private _choice: number;
  private _fourOfAKind: number;
  private _fullHouse: number;
  private _smallStraight: number;
  private _largeStraight: number;
  private _yacht: number;

  constructor() {
    this._choice = 0;
    this._fourOfAKind = 0;
    this._fullHouse = 0;
    this._smallStraight = 0;
    this._largeStraight = 0;
    this._yacht = 0;
  }

  /**
   * setFourOfAKind
   */
  public setFourOfAKind(diceArray: DicesState): void {
    const findDuplicates = (array: DicesState) =>
      array.filter((item, index) => array.indexOf(item) !== index);
    const duplicateElementa = findDuplicates(diceArray);

    let result = 0;

    if (duplicateElementa.length >= 4) {
      result = diceArray.reduce((acc, curr) => {
        return acc + curr.eyes;
      }, 0);
    }
    this._fourOfAKind = result;
  }

  /**
   * setFullHouse
   */
  public setFullHouse(diceArray: DicesState): void {
    const findDuplicates = (array: DicesState) =>
      array.filter((item, index) => array.indexOf(item) !== index);
    const duplicateElementa = findDuplicates(diceArray);
  }

  public get choice(): number {
    return this._choice;
  }
  public get fourOfAKind(): number {
    return this._fourOfAKind;
  }
  public get fullHouse(): number {
    return this._fullHouse;
  }
  public get largeStraight(): number {
    return this._largeStraight;
  }
  public get smallStraight(): number {
    return this._smallStraight;
  }
  public get yacht(): number {
    return this._yacht;
  }
}
