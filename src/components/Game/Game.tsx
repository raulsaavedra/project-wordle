"use client";

import { RowList } from "../RowList";
import { Finished } from "../Finished";
import { Keyboard } from "../Keyboard/Keyboard";
import { CopyButton } from "../CopyButton/CopyButton";
import { useGame } from "../../hooks/useGame";

export const Game = () => {
  const {
    rows,
    activeRow,
    input,
    gameStatus,
    lastGuess,
    handleLetterChange,
    handleSubmit,
    answer,
  } = useGame();

  return (
    <div>
      <RowList rows={rows} activeRow={activeRow} />
      <Keyboard
        rows={rows}
        handleLetterChange={handleLetterChange}
        handleSubmit={handleSubmit}
        input={input}
        gameStatus={gameStatus}
      />
      <Finished gameStatus={gameStatus} lastGuess={lastGuess} />
      <CopyButton gameStatus={gameStatus} rows={rows} answer={answer} />
    </div>
  );
};
