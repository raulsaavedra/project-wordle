import React, { useContext } from "react";
import { Letter } from "../types";
import { statusMap } from "../Letter/Letter";
import { motion } from "motion/react";
import { getKeyboardLetterStatus } from "@/utils/letterStatus";
import { GameContext } from "@/providers/GameProvider";
import { useKeyDown } from "@/hooks/useKeydown";

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

export const Keyboard: React.FC = () => {
  const { handleLetterChange, handleSubmit, gameStatus, rows } =
    useContext(GameContext);

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

  const handleKeyDown = (key: string) => {
    if (gameStatus !== "playing") return;
    if (key === "BACKSPACE") {
      return handleLetterChange("⌫");
    }
    if (key === "ENTER") {
      return handleSubmit();
    }
    if (key.length === 1 && key.match(/[A-Z]/)) {
      return handleLetterChange(key);
    }
  };

  useKeyDown((e) => {
    handleKeyDown(e.key.toUpperCase());
  });

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
