type RollDiceBtnProps = {
  onRoll: () => void;
};

function RollDiceBtn({ onRoll }: RollDiceBtnProps) {
  return <button onClick={onRoll}>Roll Dice</button>;
}

export default RollDiceBtn;
