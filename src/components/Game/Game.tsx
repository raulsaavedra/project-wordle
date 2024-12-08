"use client";

import { RowList } from "../RowList";
import { Finished } from "../Finished";
import { Keyboard } from "../Keyboard/Keyboard";
import { useGame } from "../../hooks/useGame";
import { Header } from "../Header";

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
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
  } = useGame();

  return (
    <div className="pb-10">
      <Header />
      <RowList rows={rows} activeRow={activeRow} />
      <Keyboard
        rows={rows}
        handleLetterChange={handleLetterChange}
        handleSubmit={handleSubmit}
        input={input}
        gameStatus={gameStatus}
      />
      <Finished
        gameStatus={gameStatus}
        lastGuess={lastGuess}
        rows={rows}
        answer={answer}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        isModalOpen={isModalOpen}
      />
    </div>
  );
};
