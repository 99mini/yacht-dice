import PedigreeItem from "components/PedigreeItem";
import rootReducer, { RootState } from "modules";
import { fix, score } from "modules/pedigree";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { evaluationDices, CATEGOTY } from "Utils/utils";

function PedigreeContainer() {
  const pedigreeArray = useSelector((state: RootState) => state.pedigree);
  const diceArray = useSelector((state: RootState) => state.dice);

  const dispatch = useDispatch();

  const onFix = (title: string) => {
    dispatch(fix(title));
  };

  useEffect(() => {
    const acesScore = evaluationDices(diceArray, CATEGOTY.ACES);
    dispatch(score(pedigreeArray[0].title, acesScore));
  }, [diceArray]);

  return <PedigreeItem pedigree={pedigreeArray[0]} onFix={onFix} />;
}

export default PedigreeContainer;
