import { createContext, useCallback, useMemo } from "react";

import { useState } from "react";
import { getAnswer } from "../components/answers";
import { Letter, IRow } from "../components/types";
import { guessWord } from "@/utils/letterStatus";

export type GameStatus = "win" | "lose" | "playing" | "guessing" | "goose";

type GameContextType = {
  rows: IRow[];
  activeRow: number;
  guess: string;
  lastGuess: string;
  gameStatus: GameStatus;
  handleLetterChange: (letter: string) => void;
  handleSubmit: () => void;
  resetGame: () => void;
};

export const GameContext = createContext<GameContextType>({
  rows: [],
  activeRow: 0,
  guess: "",
  lastGuess: "",
  gameStatus: "playing",
  handleLetterChange: () => {},
  handleSubmit: () => {},
  resetGame: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
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
  const [guess, setGuess] = useState<string>("");

  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  const resetGame = useCallback(() => {
    setRows(defaultRows);
    setActiveRow(0);
    setGuess("");
    setGameStatus("playing");
  }, [defaultRows]);

  const guesses = rows
    .map((row) =>
      row.letters.map((letter) => letter.value.toLowerCase()).join("")
    )
    .filter(Boolean);

  const lastGuess = guesses?.[guesses.length - 1];

  const handleSubmit = useCallback(() => {
    if (rows.length === activeRow) return;
    if (guess.length !== 5) return;
    const newRows = [...rows];
    newRows[activeRow].letters = guessWord(guess, answer.word);

    const newActiveRow = activeRow + 1;

    const newGuesses = newRows.map((row) =>
      row.letters.map((letter) => letter.value.toLowerCase()).join("")
    );

    const hasWinningGuess = newGuesses.includes(answer.word.toLowerCase());
    const hasNoMoreGuesses = newActiveRow === rows.length;

    const isGoose =
      newGuesses.includes("goose") ||
      newGuesses.includes("geese") ||
      newGuesses.includes("honks");

    setRows(newRows);
    setActiveRow(newActiveRow);
    setGuess("");

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
  }, [rows, activeRow, guess, answer]);

  const handleBackspace = useCallback(() => {
    if (guess.length === 0) return;

    const newGuess = guess.slice(0, -1);
    setGuess(newGuess);

    const newRows = [...rows];
    const updatedRow = newRows[activeRow];

    const guessIndex = guess.length - 1;
    updatedRow.letters[guessIndex].value = "";

    setRows(newRows);
  }, [guess, rows, activeRow]);

  const handleLetterChange = useCallback(
    (letter: string) => {
      if (letter === "⌫") {
        handleBackspace();
        return;
      }
      if (guess.length === 5) return;
      const newGuess = guess + letter;
      setGuess(newGuess);

      const newRows = [...rows];
      const updatedRow = newRows[activeRow];

      const guessIndex = guess.length;
      updatedRow.letters[guessIndex].value = letter;

      setRows(newRows);
    },
    [rows, activeRow, guess, handleBackspace]
  );

  const value = useMemo(
    () => ({
      rows,
      activeRow,
      guess,
      lastGuess,
      gameStatus,
      handleLetterChange,
      handleSubmit,
      resetGame,
    }),
    [
      rows,
      activeRow,
      guess,
      lastGuess,
      gameStatus,
      handleLetterChange,
      handleSubmit,
      resetGame,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
