import { Dice } from "modules/dice";
import React from "react";
import DiceItem from "./DiceItem";

type DiceListProps = {
  dices: Dice[];
  onFix: (id: number) => void;
};

function DiceList({ dices, onFix }: DiceListProps) {
  return (
    <ul>
      {dices.map((dice) => (
        <DiceItem onFix={onFix} dice={dice} key={dice.id} />
      ))}
    </ul>
  );
}

export default DiceList;
