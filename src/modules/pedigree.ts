const FIX_PEDIGREE = "pedigree/FIX_PEDIGREE" as const;
const SCORE = "pedigree/SCORE" as const;

export const fixPedigree = (title: string) => ({
  type: FIX_PEDIGREE,
  payload: title,
});

export const score = (title: string, score: number) => ({
  type: SCORE,
  payload: { title, score },
});

type PedigreeAction = ReturnType<typeof fixPedigree> | ReturnType<typeof score>;

export type PedigreeState = {
  title: string;
  score: number;
  fixed: boolean;
};

export type PedigreeArrayState = PedigreeState[];

const initialPedigreeState: PedigreeState = {
  title: "",
  score: 0,
  fixed: false,
};

const initialPedigreeArrayState: PedigreeArrayState = [];

const pedigreeNames = [
  "Aces",
  "Deuces",
  "Threes",
  "Fours",
  "Fives",
  "Sixes",
  "Choice",
  "FourOfAKind",
  "FullHouse",
  "SmallStraight",
  "LargeStraight",
  "Yacht",
];

pedigreeNames.forEach((title) => {
  initialPedigreeArrayState.push({ ...initialPedigreeState, title: title });
});

function pedigree(
  state: PedigreeArrayState = initialPedigreeArrayState,
  action: PedigreeAction
): PedigreeArrayState {
  switch (action.type) {
    case FIX_PEDIGREE:
      return state.map((item) =>
        item.title === action.payload
          ? item.fixed
            ? { ...item }
            : { ...item, fixed: true }
          : { ...item }
      );
    case SCORE:
      return state.map((item) =>
        item.title === action.payload.title
          ? { ...item, score: action.payload.score }
          : { ...item }
      );

    default:
      return state;
  }
}

export default pedigree;
