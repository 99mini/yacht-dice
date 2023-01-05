// 액션 타입을 선언합니다
// 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type 의 값을 추론하는 과정에서

import { rollDice } from "Utils/utils";

// action.type 이 string 으로 추론되지 않고 'dice/INCREASE' 와 같이 실제 문자열 값으로 추론 되도록 해줍니다.
const ROLL = "dice/ROLL" as const;
const FIX = "dice/FIX" as const;

// 액션 생성함수를 선언합니다
export const roll = () => ({
  type: ROLL,
});

export const fix = (id: number) => ({
  type: FIX,
  payload: id,
});

// 모든 액션 겍체들에 대한 타입을 준비해줍니다.
// ReturnType<typeof _____> 는 특정 함수의 반환값을 추론해줍니다
// 상단부에서 액션타입을 선언 할 떄 as const 를 하지 않으면 이 부분이 제대로 작동하지 않습니다.
type DiceAction = ReturnType<typeof roll> | ReturnType<typeof fix>;

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
export type Dice = {
  id: number;
  eyes: number;
  fixed: boolean;
};

export type DicesState = Dice[];

const initialDiceState: Dice = {
  id: 0,
  eyes: 0,
  fixed: false,
};

const initialDicesState: DicesState = [];

for (let index = 0; index < 5; index++) {
  const newDice: Dice = {
    ...initialDiceState,
    id: index,
  };

  initialDicesState.push(newDice);
}

// 초기상태를 선언합니다.
// 리듀서를 작성합니다.
// 리듀서에서는 state 와 함수의 반환값이 일치하도록 작성하세요.
// 액션에서는 우리가 방금 만든 DiceAction 을 타입으로 설정합니다.
function dice(
  state: DicesState = initialDicesState,
  action: DiceAction
): DicesState {
  switch (action.type) {
    case ROLL: // case 라고 입력하고 Ctrl + Space 를 누르면 어떤 종류의 action.type들이 있는지 확인 할 수 있습니다.
      return state.map((dice) =>
        dice.fixed ? { ...dice } : { ...dice, eyes: rollDice() }
      );
    case FIX:
      return state.map((dice) =>
        dice.id === action.payload
          ? { ...dice, fixed: !dice.fixed }
          : { ...dice }
      );
    default:
      return state;
  }
}

export default dice;
