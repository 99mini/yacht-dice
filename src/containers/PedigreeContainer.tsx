import PedigreeItem from "components/PedigreeItem";
import ScoreBoardItem from "components/ScoreBoardItem";
import { RootState } from "modules";
import { fixPedigree, PedigreeState, score } from "modules/pedigree";
import { sumScore } from "modules/scoreBoard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PedigreeModel } from "../models/PedigreeModel";

function PedigreeContainer() {
  const pedigreeArray = useSelector((state: RootState) => state.pedigree);
  const diceArray = useSelector((state: RootState) => state.dice);
  const scoreBoard = useSelector((state: RootState) => state.scoreBorad);

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
        if (index < 6) {
          console.log(
            pedigree.title,
            pedigreeModel.basicPedigree.scores[index]
          );

          dispatch(
            score(pedigree.title, pedigreeModel.basicPedigree.scores[index])
          );
        }

        pedigreeModel.specialPedigree.setScore(diceArray, pedigree.title);

        dispatch(
          score(
            pedigree.title,
            pedigreeModel.specialPedigree.getScore(pedigree.title)
          )
        );
      }
    });
    pedigreeModel.setSubtotal();
    pedigreeModel.setBonus();
    pedigreeModel.setTotal();
    dispatch(sumScore("SubTotal", pedigreeModel.subTotal));
    dispatch(sumScore("Bonus", pedigreeModel.bonus));
    dispatch(sumScore("Total", pedigreeModel.total));
  }, [diceArray]);

  return (
    <>
      <ul>
        {pedigreeArray.map((pedigree) => (
          <PedigreeItem
            pedigree={pedigree}
            onFix={onFix}
            key={pedigree.title}
          />
        ))}
      </ul>
      <ul>
        {scoreBoard.map((scoreBoard) => (
          <ScoreBoardItem scoreBoard={scoreBoard} key={scoreBoard.title} />
        ))}
      </ul>
    </>
  );
}

export default PedigreeContainer;
