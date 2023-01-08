import React from "react";
import { ScoreBoardState } from "modules/scoreBoard";

type ScoreBoardProps = {
  scoreBoard: ScoreBoardState;
};

function ScoreBoardItem({ scoreBoard }: ScoreBoardProps) {
  return (
    <table>
      <thead></thead>
      <tbody>
        <tr>
          <td>{scoreBoard.title}</td>
          <td>{scoreBoard.score}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ScoreBoardItem;
