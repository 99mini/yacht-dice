import DiceItem from "components/DiceItem";
import DiceList from "components/DiceList";
import RollDiceBtn from "components/RollDiceBtn";
import { RootState } from "modules";
import { fix, roll } from "modules/dice";
import { useDispatch, useSelector } from "react-redux";

function DiceContainer() {
  const diceArray = useSelector((state: RootState) => state.dice);
  const dispatch = useDispatch();

  const onFix = (id: number) => {
    dispatch(fix(id));
  };

  const onRoll = () => {
    dispatch(roll());
  };

  return (
    <>
      <RollDiceBtn onRoll={onRoll} />
      <DiceList dices={diceArray} onFix={onFix} />
    </>
  );
}

export default DiceContainer;
