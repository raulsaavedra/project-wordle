import { useState } from "react";
import { getAnswer } from "../components/answers";
import { Letter, IRow } from "../components/types";
import { guessLetter } from "../utils/guessLetter";

export const useGame = () => {
  const answer = getAnswer();

  const defaultRows = Array.from({ length: 6 }, (_, rowIndex) => ({
    id: crypto.randomUUID(),
    index: rowIndex,
    letters: Array.from({ length: 5 }, (_, letterIndex) => ({
      index: letterIndex,
      id: crypto.randomUUID(),
      value: "",
      status: "default",
    })) as Letter[],
  }));

  const [rows, setRows] = useState<IRow[]>(defaultRows);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<
    "win" | "lose" | "playing" | "guessing" | "goose"
  >("playing");

  const guesses = rows
    .map((row) =>
      row.letters.map((letter) => letter.value.toLowerCase()).join("")
    )
    .filter(Boolean);

  const lastGuess = guesses?.[guesses.length - 1];

  const handleSubmit = () => {
    if (rows.length === activeRow) return;
    if (input.length !== 5) return;
    const newRows = [...rows];
    newRows[activeRow].letters = input
      .split("")
      .map((letter: string, index: number) =>
        guessLetter(letter, index, answer)
      );

    const newActiveRow = activeRow + 1;

    const newGuesses = newRows.map((row) =>
      row.letters.map((letter) => letter.value.toLowerCase()).join("")
    );

    const hasWinningGuess = newGuesses.includes(answer.toLowerCase());
    const hasNoMoreGuesses = newActiveRow === rows.length;

    const isGoose =
      newGuesses.includes("goose") ||
      newGuesses.includes("geese") ||
      newGuesses.includes("honks");

    setRows(newRows);
    setActiveRow(newActiveRow);
    setInput("");

    setGameStatus("guessing");
    setTimeout(() => {
      if (isGoose) {
        setGameStatus("goose");
      } else if (hasWinningGuess) {
        setGameStatus("win");
      } else if (hasNoMoreGuesses) {
        setGameStatus("lose");
      } else {
        setGameStatus("playing");
      }
    }, 1500);
  };

  const handleLetterChange = (letter: string) => {
    if (letter === "⌫" && input.length === 0) return;

    const newInput = letter === "⌫" ? input.slice(0, -1) : input + letter;
    const index = letter === "⌫" ? input.length - 1 : input.length;

    const newRows = [...rows];
    const updatedRow = newRows[activeRow];

    updatedRow.letters[index].value = letter === "⌫" ? "" : letter;

    setInput(newInput);
    setRows(newRows);
  };

  return {
    rows,
    activeRow,
    input,
    gameStatus,
    lastGuess,
    handleSubmit,
    handleLetterChange,
    answer,
  };
};
