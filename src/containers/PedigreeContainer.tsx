import PedigreeItem from "components/PedigreeItem";
import { RootState } from "modules";
import pedigree, { fixPedigree, score } from "modules/pedigree";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PedigreeModel } from "../models/PedigreeModel";

function PedigreeContainer() {
  const pedigreeArray = useSelector((state: RootState) => state.pedigree);
  const diceArray = useSelector((state: RootState) => state.dice);

  const dispatch = useDispatch();

  const pedigreeModel = PedigreeModel.getPedigreeModel();

  const onFix = (title: string) => {
    dispatch(fixPedigree(title));
  };

  useEffect(() => {
    pedigreeModel.basicPedigree.evaluateBasicDice(diceArray, pedigreeArray);
    pedigreeArray.map((pedigree, index) => {
      dispatch(
        score(pedigree.title, pedigreeModel.basicPedigree.scores[index])
      );
    });
  }, [diceArray]);

  return (
    <ul>
      {pedigreeArray.map((pedigree) => (
        <PedigreeItem pedigree={pedigree} onFix={onFix} key={pedigree.title} />
      ))}
    </ul>
  );
}

export default PedigreeContainer;
