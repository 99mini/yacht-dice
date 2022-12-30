import { PedigreeState } from "modules/pedigree";
import React from "react";

type PedigreeItemPros = {
  pedigree: PedigreeState;
  onFix: (title: string) => void;
};
function PedigreeItem({ pedigree, onFix }: PedigreeItemPros) {
  const handleClick = () => {
    onFix(pedigree.title);
  };

  return (
    <table>
      <thead></thead>
      <tbody>
        <tr>
          <td>{pedigree.title}</td>
          <td>
            <button onClick={handleClick}>{pedigree.score}</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default PedigreeItem;
