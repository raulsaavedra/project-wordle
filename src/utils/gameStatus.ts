import { IRow } from "@/components/types";

/**
 * Get the game status based on the rows and answer
 */
export const getGameStatus = (
  rows: IRow[],
  activeRow: number,
  answer: string
) => {
  const guesses = rows.map((row) =>
    row.guess.map((letter) => letter.value.toLowerCase()).join("")
  );
  const hasWinningGuess = guesses.includes(answer.toLowerCase());
  const hasNoMoreGuesses = activeRow === rows.length;
  const isGoose =
    guesses.includes("goose") ||
    guesses.includes("geese") ||
    guesses.includes("honks");

  if (isGoose) return "goose";
  if (hasWinningGuess) return "win";
  if (hasNoMoreGuesses) return "lose";
  return "playing";
};
