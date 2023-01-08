const SUM_SCORE = "scoreBoard/sumScore" as const;

export const sumScore = (title: string, score: number) => ({
  type: SUM_SCORE,
  payload: { title, score },
});

type scoreBoardAction = ReturnType<typeof sumScore>;

export type ScoreBoardState = {
  title: string;
  score: number;
};

export type ScoreBoardArrayState = ScoreBoardState[];

const initialScoreBoardState: ScoreBoardState = {
  title: "",
  score: 0,
};

const initialScoreBoardArrayState: ScoreBoardArrayState = [];

const ScoreNames = ["SubTotal", "Bouns", "Total"];

ScoreNames.forEach((title) => {
  initialScoreBoardArrayState.push({ ...initialScoreBoardState, title: title });
});

function scoreBorad(
  state: ScoreBoardArrayState = initialScoreBoardArrayState,
  action: scoreBoardAction
): ScoreBoardArrayState {
  switch (action.type) {
    case SUM_SCORE:
      return state.map((item) =>
        item.title === action.payload.title
          ? { ...item, score: action.payload.score }
          : { ...item }
      );
    default:
      return state;
  }
}

export default scoreBorad;
