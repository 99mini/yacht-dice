import { PEDIGREE_NAME } from "enums/pedigreeNames";
import { DicesState } from "modules/dice";

export class SpecialPedigreeModel {
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
   * findDuplicates(array: DicesState): Array<number>
   */
  private findDuplicates(array: DicesState): Array<number> {
    let diceCount = Array<number>(6).fill(0);
    array.map((item) => (diceCount[item.eyes - 1] += 1));

    return diceCount;
  }

  private sumDice(array: DicesState): number {
    const result: number = array.reduce((acc, curr) => acc + curr.eyes, 0);
    return result;
  }

  private isContainAllDices(
    diceArray: DicesState,
    answerArray: Array<number>
  ): boolean {
    const diceEyesArray: Array<number> = diceArray.map((dice) => dice.eyes);
    return answerArray.every((value) => diceEyesArray.includes(value));
  }

  /**
   * setScore
   */
  public setScore(diceArray: DicesState, title: string): void {
    switch (title) {
      case PEDIGREE_NAME.Choice:
        this.setChoice(diceArray);
        break;
      case PEDIGREE_NAME.FourOfAKind:
        this.setFourOfAKind(diceArray);
        break;
      case PEDIGREE_NAME.LargeStraight:
        this.setLargeStraight(diceArray);
        break;
      case PEDIGREE_NAME.SmallStraight:
        this.setSmallStraight(diceArray);
        break;
      case PEDIGREE_NAME.FullHouse:
        this.setFullHouse(diceArray);
        break;
      case PEDIGREE_NAME.Yacht:
        this.setYacht(diceArray);
        break;
      default:
        break;
    }
  }

  /**
   * setChoice
   */
  private setChoice(diceArray: DicesState): void {
    this._choice = this.sumDice(diceArray);
  }

  /**
   * setFourOfAKind
   */
  private setFourOfAKind(diceArray: DicesState): void {
    let result = 0;
    const diceCount = this.findDuplicates(diceArray);

    const fourDice: Array<number> = diceCount.filter((item) => item >= 4);
    if (fourDice.length === 1) result = this.sumDice(diceArray);

    this._fourOfAKind = result;
  }

  /**
   * setFullHouse
   */
  private setFullHouse(diceArray: DicesState): void {
    let result = 0;
    const diceCount = this.findDuplicates(diceArray);

    const twoDice: Array<number> = diceCount.filter((item) => item === 2);
    const threeDice: Array<number> = diceCount.filter((item) => item === 3);
    if (twoDice.length === 1 && threeDice.length === 1)
      result = this.sumDice(diceArray);

    this._fullHouse = result;
  }

  /**
   * setLargeStraight
   */
  private setLargeStraight(diceArray: DicesState): void {
    let result = 0;
    const largeStraightArray: Array<Array<number>> = [
      [1, 2, 3, 4, 5],
      [2, 3, 4, 5, 6],
    ];

    largeStraightArray.reduce(
      (curr, largeStraight) =>
        curr || this.isContainAllDices(diceArray, largeStraight),
      false
    )
      ? (result = 30)
      : (result = 0);

    this._largeStraight = result;
  }

  /**
   * setSmallStraight
   */
  private setSmallStraight(diceArray: DicesState): void {
    let result: number = 0;

    function _makeSmallStraightArray(): Array<Array<number>> {
      let smallStraightArray = [];
      for (let i = 0; i < 3; i++) {
        let tmpArray = [];
        for (let j = i; j < 4 + i; j++) {
          tmpArray.push(j);
        }
        smallStraightArray.push(tmpArray);
      }
      return smallStraightArray;
    }

    const smallStraightArray = _makeSmallStraightArray();

    smallStraightArray.reduce(
      (curr, smallStraight) =>
        curr || this.isContainAllDices(diceArray, smallStraight),
      false
    )
      ? (result = 15)
      : (result = 0);

    this._smallStraight = result;
  }

  /**
   * setYacht
   */
  private setYacht(diceArray: DicesState): void {
    let result: number = 0;
    const diceCount = this.findDuplicates(diceArray);
    const yachtDices: Array<number> = diceCount.filter((item) => item === 5);
    if (yachtDices.length === 1) result = 50;

    this._yacht = result;
  }

  /**
   * getScore
   */
  public getScore(title: string): number {
    switch (title) {
      case PEDIGREE_NAME.Choice:
        return this._choice;
      case PEDIGREE_NAME.FourOfAKind:
        return this._fourOfAKind;
      case PEDIGREE_NAME.LargeStraight:
        return this._largeStraight;
      case PEDIGREE_NAME.SmallStraight:
        return this._smallStraight;
      case PEDIGREE_NAME.FullHouse:
        return this._fullHouse;
      case PEDIGREE_NAME.Yacht:
        return this._yacht;
      default:
        return 0;
    }
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
