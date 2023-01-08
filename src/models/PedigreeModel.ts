import { BasicPedigreeModel } from "./BasicPedigreeModel";
import { SpecialPedigreeModel } from "./SpecialPedigreeModel";

export class PedigreeModel {
  basicPedigree: BasicPedigreeModel;
  specialPedigree: SpecialPedigreeModel;
  private _subTotal: number;
  private _bonus: number;
  private _total: number;

  constructor() {
    this.basicPedigree = new BasicPedigreeModel();
    this.specialPedigree = new SpecialPedigreeModel();
    this._subTotal = 0;
    this._bonus = 0;
    this._total = 0;
  }

  /**
   * setSubtotal
   */
  public setSubtotal(): void {
    this._subTotal = this.basicPedigree.scores.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }

  /**
   * setBonus
   */
  public setBonus(): void {
    if (this._subTotal >= 63) {
      this._bonus = 35;
    }
  }

  /**
   * setTotal
   */
  public setTotal(): void {
    this._total =
      this.specialPedigree.totalScore + this._subTotal + this._bonus;
  }

  public get subTotal(): number {
    return this._subTotal;
  }
  public get bonus(): number {
    return this._bonus;
  }
  public get total(): number {
    return this._total;
  }
}
