import PedigreeItem from "components/PedigreeItem";
import { RootState } from "modules";
import { fixPedigree, score } from "modules/pedigree";
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
    dispatch(
      score(pedigreeArray[0].title, pedigreeModel.basicPedigree.scores[0])
    );
  }, [diceArray]);

  return <PedigreeItem pedigree={pedigreeArray[0]} onFix={onFix} />;
}

export default PedigreeContainer;
