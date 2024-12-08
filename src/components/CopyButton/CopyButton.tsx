import React from "react";
import { IRow } from "../types";
import { AnimatePresence, motion } from "motion/react";
interface CopyButtonProps {
  gameStatus: string;
  rows: IRow[];
  gameNumber?: number;
  answer: string;
}

const getLetterStatus = (
  letter: string,
  answer: string,
  index: number
): string => {
  if (letter.toLowerCase() === answer[index].toLowerCase()) return "🟩";
  if (answer.toLowerCase().includes(letter.toLowerCase())) return "🟨";
  return "⬛";
};

const formatGameResult = (
  rows: IRow[],
  gameNumber: number,
  answer: string
): string => {
  const filledRows = rows.filter((row) =>
    row.letters.every((letter) => letter.value !== "")
  );

  const resultPattern = filledRows
    .map((row) =>
      row.letters
        .map((letter, index) => getLetterStatus(letter.value, answer, index))
        .join("")
    )
    .join("\n");

  return `Wordle ${gameNumber} ${filledRows.length}/6\n\n${resultPattern}`;
};

export const CopyButton: React.FC<CopyButtonProps> = ({
  gameStatus,
  rows,
  gameNumber = 1,
  answer,
}) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = async () => {
    if (gameStatus !== "win" && gameStatus !== "lose") return;

    const result = formatGameResult(rows, gameNumber, answer);

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      // You might want to add some visual feedback here
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <AnimatePresence>
      {gameStatus === "win" || gameStatus === "lose" ? (
        <div className="flex justify-center mt-8 max-w-xs text-center mx-auto">
          <motion.button
            onClick={handleCopy}
            className="px-6 py-3 bg-green-700 text-white text-xl rounded-xl hover:bg-green-500 transition-colors font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="mr-2">
              {copied ? "Copied to clipboard! " : "Share"}
            </span>
            {copied ? null : (
              <>
                <span className="text-base">💬</span>
              </>
            )}
          </motion.button>
        </div>
      ) : null}
    </AnimatePresence>
  );
};
