export interface IPedigree {
  basic: IBasicPedigree;
  special: ISpecialPedigree;
  subtotal: number;
  bonus: number;
  total: number;
}

export interface IBasicPedigree {
  scores: Array<number>;
}

export interface ISpecialPedigree {
  choice: number;
  fourOfAKind: number;
  fullHouse: number;
  smallStraight: number;
  largeStraight: number;
  yacht: number;
}
