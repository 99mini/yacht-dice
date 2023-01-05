import PedigreeItem from "components/PedigreeItem";
import { RootState } from "modules";
import { fixPedigree, PedigreeState, score } from "modules/pedigree";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PedigreeModel } from "../models/PedigreeModel";

function PedigreeContainer() {
  const pedigreeArray = useSelector((state: RootState) => state.pedigree);
  const diceArray = useSelector((state: RootState) => state.dice);

  const dispatch = useDispatch();

  const pedigreeModel = new PedigreeModel();

  const onFix = (title: string) => {
    dispatch(fixPedigree(title));
  };

  function _isFixed(pedigree: PedigreeState): boolean {
    if (pedigree.fixed) return true;
    return false;
  }

  useEffect(() => {
    pedigreeModel.basicPedigree.evaluateBasicDice(diceArray);
    pedigreeArray.map((pedigree, index) => {
      if (!_isFixed(pedigree)) {
        dispatch(
          score(pedigree.title, pedigreeModel.basicPedigree.scores[index])
        );

        pedigreeModel.specialPedigree.setScore(diceArray, pedigree.title);

        dispatch(
          score(
            pedigree.title,
            pedigreeModel.specialPedigree.getScore(pedigree.title)
          )
        );
      }
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
