import React from "react";

type PedigreePros = {
  title: string;
  score: number;
};
function Pedigree({ title, score }: PedigreePros) {
  return (
    <table>
      <tr>
        <td>{title}</td>
        <td>{score}</td>
      </tr>
    </table>
  );
}

export default Pedigree;
