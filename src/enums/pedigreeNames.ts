export const PEDIGREE_NAME = {
  Aces: "Aces",
  Deuces: "Deuces",
  Threes: "Threes",
  Fours: "Fours",
  Fives: "Fives",
  Sixes: "Sixes",
  Choice: "Choice",
  FourOfAKind: "FourOfAKind",
  FullHouse: "FullHouse",
  SmallStraight: "SmallStraight",
  LargeStraight: "LargeStraight",
  Yacht: "Yacht",
} as const;

type PEDIGREE_NAME = typeof PEDIGREE_NAME[keyof typeof PEDIGREE_NAME];
