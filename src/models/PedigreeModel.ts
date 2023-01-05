import { BasicPedigreeModel } from "./BasicPedigreeModel";
import { SpecialPedigreeModel } from "./SpecialPedigreeModel";

export class PedigreeModel {
  basicPedigree: BasicPedigreeModel;
  specialPedigree: SpecialPedigreeModel;
  subtotal: number;
  bonus: number;
  total: number;

  constructor() {
    this.basicPedigree = new BasicPedigreeModel();
    this.specialPedigree = new SpecialPedigreeModel();
    this.subtotal = 0;
    this.bonus = 0;
    this.total = 0;
  }
}
