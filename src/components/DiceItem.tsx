import { Dice } from "modules/dice";

type DiceProps = {
  dice: Dice;
  onFix: (id: number) => void;
};

function DiceItem({ dice, onFix }: DiceProps) {
  const handleClick = () => {
    onFix(dice.id);
  };
  return <button onClick={handleClick}>{dice.eyes}</button>;
}

export default DiceItem;
