import { createContext, useCallback, useMemo } from "react";

import { useState } from "react";
import { getAnswer } from "../components/answers";
import { Letter, IRow } from "../components/types";
import { guessWord } from "@/utils/letterStatus";
import { getGameStatus } from "@/utils/gameStatus";

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
    guess: Array.from({ length: 5 }, (_, letterIndex) => ({
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
      row.guess.map((letter) => letter.value.toLowerCase()).join("")
    )
    .filter(Boolean);

  const lastGuess = guesses?.[guesses.length - 1];

  const handleSubmit = useCallback(() => {
    if (rows.length === activeRow) return;
    if (guess.length !== 5) return;
    const newRows = [...rows];
    newRows[activeRow].guess = guessWord(guess, answer.word);

    const newActiveRow = activeRow + 1;

    setRows(newRows);
    setActiveRow(newActiveRow);
    setGuess("");

    setGameStatus("guessing");
    setTimeout(() => {
      setGameStatus(getGameStatus(newRows, newActiveRow, answer.word));
    }, 1500);
  }, [rows, activeRow, guess, answer]);

  const handleBackspace = useCallback(() => {
    if (guess.length === 0) return;

    const newGuess = guess.slice(0, -1);
    setGuess(newGuess);
    const newRows = [...rows];
    const updatedRow = newRows[activeRow];

    const letterIndex = guess.length - 1;
    updatedRow.guess[letterIndex].value = "";
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
      const letterIndex = guess.length;
      updatedRow.guess[letterIndex].value = letter;
      setRows(newRows);
    },
    [guess, rows, activeRow, handleBackspace]
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
