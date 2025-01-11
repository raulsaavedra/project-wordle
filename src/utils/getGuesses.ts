import { IRow } from "@/components/types";

export const getGuessesFromRows = (rows: IRow[]) => {
  return rows
    .map((row) =>
      row.guess.map((letter) => letter.value.toLowerCase()).join("")
    )
    .filter(Boolean);
};

export const getLastGuess = (rows: IRow[]) => {
  const guesses = getGuessesFromRows(rows);
  return guesses[guesses.length - 1];
};
