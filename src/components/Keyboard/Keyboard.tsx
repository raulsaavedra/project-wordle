import React from "react";
import { IRow, Letter } from "../types";
import { statusMap } from "../Letter/Letter";
import { motion } from "motion/react";
import { getKeyboardLetterStatus } from "@/utils/letterStatus";

interface KeyboardProps {
  handleLetterChange: (letter: string) => void;
  handleSubmit: () => void;
  input: string;
  gameStatus: string;
  rows: IRow[];
}

const keyStatusMap = {
  ...statusMap,
  default: {
    backgroundColor: "rgb(140, 135, 136)",
    borderColor: "transparent",
  },
};

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

export const Keyboard: React.FC<KeyboardProps> = ({
  handleLetterChange,
  handleSubmit,
  gameStatus,
  rows,
}) => {
  const handleKeyClick = (key: string) => {
    if (gameStatus !== "playing") return;
    if (key === "ENTER") {
      handleSubmit();
    } else {
      handleLetterChange(key);
    }
  };

  // Get the most relevant status for each letter from all guessed rows
  const getLetterStatus = (letter: string): Letter["status"] => {
    return getKeyboardLetterStatus(letter, rows);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== "playing") return;

      const key = e.key.toUpperCase();
      if (key === "BACKSPACE") {
        handleLetterChange("⌫");
      } else if (key === "ENTER") {
        handleSubmit();
      } else if (key.length === 1 && key.match(/[A-Z]/)) {
        handleLetterChange(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStatus, handleLetterChange, handleSubmit]);

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-stretch sm:justify-center mb-2 px-1.5"
        >
          {row.map((key) => {
            const status =
              key === "ENTER" || key === "⌫" ? "default" : getLetterStatus(key);
            return (
              <motion.button
                key={key}
                onClick={() => handleKeyClick(key)}
                disabled={gameStatus !== "playing"}
                animate={{
                  backgroundColor: keyStatusMap[status].backgroundColor,
                  borderColor: keyStatusMap[status].borderColor,
                }}
                initial={false}
                transition={{
                  delay: gameStatus === "guessing" ? 1.25 : 0,
                }}
                className={`
                  mx-0.5 px-2 sm:mx-1 py-3 sm:px-3 sm:py-4 rounded 
                  text-white font-bold
                  sm:min-w-[40px]
                  flex-1
                  sm:flex-initial
                  disabled:opacity-25 disabled:cursor-not-allowed
                  transition-all duration-300
                  ${key === "⌫" ? "min-w-[40px] text-lg" : ""}
                `}
              >
                {key}
              </motion.button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
