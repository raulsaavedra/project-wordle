"use client";
import { useEffect, useRef, useState } from "react";
import { IRow, Letter } from "./types";
import { RowList } from "./RowList";
import { getAnswer } from "./answers";
import { AnimatePresence, motion } from "motion/react";

export const Game = () => {
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

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rows.length === activeRow) return;
    if (input.length !== 5) return;
    const newRows = [...rows];
    newRows[activeRow].letters = input
      .split("")
      .map((letter: string, index: number) => {
        let status: Letter["status"] = "default";

        const answerLower = answer.toLowerCase();
        const letterLower = letter.toLowerCase();

        if (letterLower === answerLower[index]) {
          status = "correct";
        } else if (answerLower.includes(letterLower)) {
          status = "misplaced";
        } else {
          status = "incorrect";
        }

        return {
          id: crypto.randomUUID(),
          value: letter,
          status,
        };
      });

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

  useEffect(() => {
    if (gameStatus === "playing") {
      inputRef.current?.focus();
    }
  }, [gameStatus]);

  const handleLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.match(/[^a-zA-Z]/)) return;

    let index;
    let inputLetter;

    if (input.length > value.length) {
      index = value.length;
      inputLetter = "";
    } else {
      index = input.length;
      inputLetter = value[value.length - 1];
    }

    const newRows = [...rows];
    const updatedRow = newRows[activeRow];

    updatedRow.letters[index].value = inputLetter;

    setInput(value);
    setRows(newRows);
  };

  return (
    <>
      <RowList rows={rows} activeRow={activeRow} />
      <div className="flex justify-center mt-8">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            ref={inputRef}
            className="w-full bg-black border border-gray-500 rounded-md p-2 max-w-xs disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-300"
            placeholder="Enter your guess"
            value={input}
            maxLength={5}
            minLength={5}
            onChange={(e) => handleLetterChange(e)}
            disabled={gameStatus !== "playing"}
          />
        </form>
      </div>
      <div className="flex justify-center mt-8 max-w-xs text-center mx-auto">
        <AnimatePresence>
          {gameStatus === "win" && (
            <motion.div
              className="text-green-500 text-2xl font-semibold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: "spring",
                duration: 1,
                bounce: 0.5,
              }}
            >
              You win! 🎉
            </motion.div>
          )}
          {gameStatus === "lose" && (
            <motion.div
              className="text-red-500 text-2xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              You lose! ❌
            </motion.div>
          )}
          {gameStatus === "goose" && (
            <motion.div
              className="text-white-500 text-xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              The actual answer is not {lastGuess?.toUpperCase()}, but the
              developer likes geese.{" "}
              <span className="text-green-500">Therefore, you win. 🪿</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
